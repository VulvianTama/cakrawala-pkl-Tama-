import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getCloudFrontSignedUrl } from "@aws-sdk/cloudfront-signer";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Helper untuk membaca env AWS_*
const getEnv = (key, defaultValue = "") => {
  const val = process.env[key];
  return val !== undefined && val !== "" ? val : defaultValue;
};

// 1. Konfigurasi Utama Internal S3 (Hanya AWS_*)
const region = String(getEnv("AWS_REGION", "us-east-1"));
const bucket = String(getEnv("AWS_BUCKET", "cakrawala-bucket"));
const rawEndpoint = String(getEnv("AWS_ENDPOINT", ""));
const forcePathStyle =
  getEnv("AWS_USE_PATH_STYLE_ENDPOINT", "false") === "true";
const accessKeyId = getEnv("AWS_ACCESS_KEY_ID", "");
const secretAccessKey = getEnv("AWS_SECRET_ACCESS_KEY", "");

const isAWS = !rawEndpoint || rawEndpoint.includes("amazonaws.com");
const endpoint = !rawEndpoint
  ? `https://${bucket}.s3.${region}.amazonaws.com`
  : rawEndpoint.startsWith("http")
    ? rawEndpoint
    : `http://${rawEndpoint}`;

if (endpoint.includes("amazonaws.com") && forcePathStyle) {
  console.warn(
    "S3 Endpoint contains 'amazonaws.com' and forcePathStyle is true, this may cause issues",
  );
}

// Client internal untuk upload, delete, cek file, list, dll.
const s3Client = new S3Client({
  region: region || "us-east-1",
  endpoint: isAWS ? undefined : endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle,
});

// 2. Konfigurasi CloudFront (Prioritas Utama untuk Public jika ENABLE_CLOUDFRONT="true")
const enableCloudFront = getEnv("ENABLE_CLOUDFRONT", "false") === "true";
const cloudFrontDomain = getEnv("CLOUDFRONT_DOMAIN_NAME", "");
const cloudFrontPrivateKey = getEnv("CLOUDFRONT_PRIVATE_KEY", "");
const cloudFrontPublicKeyId = getEnv("CLOUDFRONT_PUBLIC_KEY_ID", "");

// 3. Konfigurasi Public / Frontend (AWS_PUBLIC_* dengan Fallback ke AWS_*)
// Jika AWS_PUBLIC_ENDPOINT tidak ada, fallback ke AWS_ENDPOINT
const rawPublicEndpoint = String(
  getEnv(
    "AWS_PUBLIC_ENDPOINT",
    getEnv("AWS_PUBLIC_HOST", getEnv("AWS_ENDPOINT", "")),
  ),
);

// Jika AWS_PUBLIC_USE_PATH_STYLE_ENDPOINT tidak ada, fallback ke AWS_USE_PATH_STYLE_ENDPOINT
const publicForcePathStyle =
  getEnv(
    "AWS_PUBLIC_USE_PATH_STYLE_ENDPOINT",
    getEnv("AWS_USE_PATH_STYLE_ENDPOINT", "false"),
  ) === "true";

const publicIsAWS =
  !rawPublicEndpoint || rawPublicEndpoint.includes("amazonaws.com");
const publicEndpoint = !rawPublicEndpoint
  ? `https://${bucket}.s3.${region}.amazonaws.com`
  : rawPublicEndpoint.startsWith("http")
    ? rawPublicEndpoint
    : `http://${rawPublicEndpoint}`;

// Format read URL template untuk frontend / BucketOpenURL
function resolveReadEndpoint() {
  // Jika CloudFront aktif dan ada domainnya, semua get/open url diarahkan ke CloudFront
  if (enableCloudFront && cloudFrontDomain) {
    const cfDomain = cloudFrontDomain.startsWith("http")
      ? cloudFrontDomain
      : `https://${cloudFrontDomain}`;
    return `${cfDomain}/{{file}}`;
  }

  // Jika AWS S3 resmi
  if (publicIsAWS) {
    return rawPublicEndpoint
      ? `${publicEndpoint}/{{file}}`
      : `https://${bucket}.s3.${region}.amazonaws.com/{{file}}`;
  }

  // Custom storage (R2, MinIO, Rustfs, Supabase, dll.)
  if (publicForcePathStyle) {
    return `${publicEndpoint}/${bucket}/{{file}}`;
  }

  // Virtual-hosted style: tambahkan bucket di subdomain jika belum ada
  try {
    const urlObj = new URL(publicEndpoint);
    if (!urlObj.hostname.startsWith(`${bucket}.`)) {
      urlObj.hostname = `${bucket}.${urlObj.hostname}`;
    }
    return `${urlObj.origin}/{{file}}`;
  } catch {
    return `${publicEndpoint}/{{file}}`;
  }
}

const readEndpoint = resolveReadEndpoint();

// Dedicated client untuk signing public URL agar signature sesuai dengan host publik
const signingClient = enableCloudFront
  ? s3Client
  : new S3Client({
      region: region || "us-east-1",
      endpoint: publicIsAWS ? undefined : publicEndpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: publicForcePathStyle,
    });

const BUCKET_NAME = bucket;

/**
 * Mendapatkan Public URL langsung (tanpa presign)
 * Jika CloudFront aktif -> mengarah ke CloudFront
 * Jika tidak -> mengarah ke AWS_PUBLIC_* (atau fallback AWS_*)
 */
export function BucketOpenURL(id, defaultID = null) {
  if (!id && defaultID) {
    return readEndpoint.replace("{{file}}", defaultID);
  }
  if (!id) {
    return null;
  }
  return readEndpoint.replace("{{file}}", id);
}

async function ensureBucketExists() {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    return { success: true };
  } catch (error) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      console.debug(`Bucket ${BUCKET_NAME} does not exist. Creating...`);
      try {
        await s3Client.send(
          new CreateBucketCommand({
            ACL: "public-read",
            Bucket: BUCKET_NAME,
          }),
        );
        console.debug(`Bucket ${BUCKET_NAME} created successfully.`);
        return { success: true };
      } catch (createError) {
        console.error({ error: createError });
        return {
          success: false,
          error: "s3:s3-bucket-create-failed",
          params: [{ bucket: BUCKET_NAME }],
        };
      }
    } else {
      console.error({ error });
      return {
        success: false,
        error: "s3:s3-bucket-check-failed",
        params: [{ bucket: BUCKET_NAME }],
      };
    }
  }
}

export async function UploadFile(
  buffer,
  id = undefined,
  { ext = ".ext", original_name = "" } = {},
) {
  const bucketCheck = await ensureBucketExists();
  if (!bucketCheck.success) {
    return { error: bucketCheck.error, params: bucketCheck.params };
  }
  const ids = id ?? crypto.randomUUID();
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: ids,
    Body: buffer,
    Metadata: {
      "file-extension": ext,
      "original-name": original_name,
      "date-upload": new Date().toISOString(),
    },
  });
  try {
    await s3Client.send(command);
    return { id: ids };
  } catch (error) {
    console.error({ error });
    return { error: "s3:s3-upload-failed" };
  }
}

export async function DeleteFile(id) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: id,
  });
  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error({ error });
    return { error: "s3:s3-delete-failed", params: [{ id }] };
  }
}

export async function FileExists(id) {
  const command = new HeadObjectCommand({
    Bucket: BUCKET_NAME,
    Key: id,
  });
  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    return { error: "s3:s3-exists-failed", params: [{ id }] };
  }
}

export async function ReadFile(id) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: id,
  });
  try {
    const response = await s3Client.send(command);
    const byteArray = await response.Body.transformToByteArray();
    return Buffer.from(byteArray);
  } catch (error) {
    console.error({ error });
    return { error: "s3:s3-read-failed", params: [{ id }] };
  }
}

export async function SignedURLAsCloudfront(id) {
  if (!cloudFrontDomain || !cloudFrontPrivateKey || !cloudFrontPublicKeyId) {
    console.error("CloudFront configuration is missing");
    return { error: "cloudfront:configuration-missing" };
  }

  const cleanDomain = cloudFrontDomain.startsWith("http")
    ? cloudFrontDomain
    : `https://${cloudFrontDomain}`;
  const url = `${cleanDomain}/${id}`;
  const dateLessThan = new Date(Date.now() + 5 * 3600 * 1000).toISOString(); // 5 hours

  try {
    const signedUrl = getCloudFrontSignedUrl({
      url,
      keyPairId: cloudFrontPublicKeyId,
      privateKey: String(cloudFrontPrivateKey).replace(/\\n/g, "\n"),
      dateLessThan,
    });
    return signedUrl;
  } catch (error) {
    console.error({ error });
    return { error: "cloudfront:signed-url-failed", params: [{ id }] };
  }
}

/**
 * Mendapatkan Presigned URL untuk get file:
 * - Jika ENABLE_CLOUDFRONT="true", otomatis pakai CloudFront Signed URL
 * - Jika tidak, pakai S3 Presigned URL mengarah ke AWS_PUBLIC_* (atau fallback AWS_*)
 */
export async function SignedURL(id) {
  if (enableCloudFront) {
    return await SignedURLAsCloudfront(id);
  }
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: id,
  });
  try {
    const url = await getSignedUrl(signingClient, command, {
      expiresIn: 5 * 3600,
    });
    return url;
  } catch (error) {
    console.error({ error });
    return { error: "s3:s3-signed-url-failed", params: [{ id }] };
  }
}

export async function ListFiles(tokenNext = undefined) {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    MaxKeys: 20,
    ContinuationToken: tokenNext,
  });
  try {
    const response = await s3Client.send(command);
    return {
      list: response.Contents,
      next_token: response.NextContinuationToken,
      is_next: Boolean(response.NextContinuationToken),
    };
  } catch (error) {
    console.error({ error });
    return { error: "s3:s3-list-failed" };
  }
}
