import "../lib/dotenv";

function toNumberInt(num, defaultValue = undefined) {
  if (num === undefined || num === null || num === "") return defaultValue;
  const parsed = Number.parseInt(String(num).replace(/[^\d.-]+/g, ""), 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

const host = process.env.DB_HOST || "localhost";
const isSupabase = host.includes("supabase.com");
const isSslEnabled = process.env.DB_SSL_ENABLE === "true" || isSupabase;
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === "true";

const configdb = {
  host,
  user: process.env.DB_USERNAME || "postgres",
  port: toNumberInt(process.env.DB_PORT, 5432),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || "postgres",
  max: toNumberInt(process.env.DB_CLIENT_MAX, 1),
  ssl: isSslEnabled
    ? {
        rejectUnauthorized,
        ca: process.env.DB_SSL_CA || undefined,
        cert: process.env.DB_SSL_CERT || undefined,
        key: process.env.DB_SSL_KEY || undefined,
      }
    : undefined,
};

export default configdb;
