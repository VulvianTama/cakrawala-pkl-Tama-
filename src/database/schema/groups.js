import { relations } from "drizzle-orm";
import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { primaryId } from "./helpers.js";
import { offices } from "./offices.js";
import { users } from "./users.js";

export const groupStatusEnum = pgEnum("group_status", [
  "requesting", // Meminta izin / menunggu surat pengantar PKL dari guru
  "applying", // Siswa submit bukti penerimaan kantor ke S3
  "accept", // Resmi diterima & aktif PKL (absensi dibuka)
  "rejected", // Ditolak oleh guru / kantor (bisa dibubarkan)
]);

export const groups = pgTable("groups", {
  id: primaryId(), // Group ID (UUID v7)
  name: text("name").notNull(), // Nama kelompok PKL
  leader_id: uuid("leader_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }), // Ketua / pembuat kelompok
  teacher_id: uuid("teacher_id").references(() => users.id, {
    onDelete: "set null",
  }), // Guru pendamping kelompok
  office_id: uuid("office_id").references(() => offices.id, {
    onDelete: "set null",
  }), // Kantor / instansi yang diajukan
  status: groupStatusEnum("status").notNull().default("requesting"), // Status alur PKL
  request_letter_key: text("request_letter_key"), // Path surat pengajuan bertanda tangan di S3 (request_letters/*)
  acceptance_document_key: text("acceptance_document_key"), // Path bukti penerimaan dari kantor di S3
  documents: jsonb("documents").default([]), // Lampiran dokumen tambahan (maks 4)
  rejection_reason: text("rejection_reason"), // Alasan penolakan jika tidak diizinkan
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  leader: one(users, {
    fields: [groups.leader_id],
    references: [users.id],
    relationName: "group_leader",
  }),
  teacher: one(users, {
    fields: [groups.teacher_id],
    references: [users.id],
    relationName: "group_supervisor",
  }),
  office: one(offices, {
    fields: [groups.office_id],
    references: [offices.id],
  }),
  members: many(users, {
    relationName: "group_members",
  }),
}));
