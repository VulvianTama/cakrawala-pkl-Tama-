import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import db from "../database/db.js";
import { users } from "../database/schema/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "cakrawala-super-secret-jwt-key";

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Middleware autentikasi
export async function authMiddleware(c, next) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json(
      {
        error: {
          status: 401,
          message: "Unauthorized: Missing or invalid token",
        },
      },
      401,
    );
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded?.id) {
    return c.json(
      {
        error: {
          status: 401,
          message: "Unauthorized: Invalid or expired token",
        },
      },
      401,
    );
  }

  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      full_name: users.full_name,
      role: users.role,
      group_id: users.group_id,
      class_name: users.class_name,
      nis_nip: users.nis_nip,
    })
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

  if (!user) {
    return c.json(
      {
        error: {
          status: 401,
          message: "Unauthorized: User not found",
        },
      },
      401,
    );
  }

  c.set("user", user);
  await next();
}

// Middleware khusus guru/admin
export async function requireTeacher(c, next) {
  const user = c.get("user");
  if (user?.role !== "teacher") {
    return c.json(
      {
        error: {
          status: 403,
          message: "Forbidden: Only teachers can perform this action",
        },
      },
      403,
    );
  }
  await next();
}

// Middleware khusus siswa
export async function requireStudent(c, next) {
  const user = c.get("user");
  if (user?.role !== "student") {
    return c.json(
      {
        error: {
          status: 403,
          message: "Forbidden: Only students can perform this action",
        },
      },
      403,
    );
  }
  await next();
}
