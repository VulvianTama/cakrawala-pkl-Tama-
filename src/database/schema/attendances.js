import { relations } from "drizzle-orm";
import {
  date,
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { primaryId } from "./helpers.js";
import { users } from "./users.js";

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present", // Hadir (foto selfie + GPS)
  "sick", // Sakit (keterangan > 30 char + bukti opsional)
  "permission", // Izin (keterangan > 30 char + bukti opsional)
]);

export const attendances = pgTable(
  "attendances",
  {
    id: primaryId(), // Attendance ID (UUID v7)
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Siswa yang absen
    date: date("date").notNull(), // Tanggal absensi (YYYY-MM-DD)
    status: attendanceStatusEnum("status").notNull().default("present"), // Hadir / Sakit / Izin
    notes: text("notes"), // Keterangan sakit atau izin (> 30 karakter jika izin/sakit)
    image_key: text("image_key"), // Path foto selfie di S3 (attendances/*)
    document_key: text("document_key"), // Path surat izin / bukti di S3 (absences/*)
    latitude: doublePrecision("latitude"), // Koordinat GPS latitude saat absen
    longitude: doublePrecision("longitude"), // Koordinat GPS longitude saat absen
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("attendances_user_date_idx").on(table.user_id, table.date),
  ],
);

export const attendancesRelations = relations(attendances, ({ one }) => ({
  user: one(users, {
    fields: [attendances.user_id],
    references: [users.id],
  }),
}));
