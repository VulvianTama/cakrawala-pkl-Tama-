import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { attendances } from "./attendances.js";
import { groups } from "./groups.js";
import { primaryId } from "./helpers.js";

export const userRoleEnum = pgEnum("user_role", [
  "student", // Siswa
  "teacher", // Guru (sekaligus admin & pendamping)
]);

export const users = pgTable("users", {
  id: primaryId(), // User ID (UUID v7)
  username: text("username").notNull().unique(), // Username login (NIS / NIP)
  password_hash: text("password_hash").notNull(), // Hash password (argon2)
  full_name: text("full_name").notNull(), // Nama lengkap
  class_name: text("class_name"), // Kelas siswa (contoh: XII RPL 1, null untuk guru)
  nis_nip: text("nis_nip"), // Nomor Induk Siswa / NIP Guru
  role: userRoleEnum("role").notNull().default("student"), // Role pengguna
  group_id: uuid("group_id").references(() => groups.id, {
    onDelete: "set null",
  }), // Kelompok PKL aktif (khusus siswa)
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  group: one(groups, {
    fields: [users.group_id],
    references: [groups.id],
    relationName: "group_members",
  }),
  led_groups: many(groups, {
    relationName: "group_leader",
  }),
  supervised_groups: many(groups, {
    relationName: "group_supervisor",
  }),
  attendances: many(attendances),
}));
