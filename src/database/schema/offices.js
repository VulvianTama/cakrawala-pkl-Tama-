import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { groups } from "./groups.js";
import { primaryId } from "./helpers.js";
import { users } from "./users.js";

export const offices = pgTable("offices", {
  id: primaryId(), // Office ID (UUID v7)
  name: text("name").notNull(), // Nama instansi / kantor / perusahaan
  address: text("address").notNull(), // Alamat lokasi PKL
  field: text("field"), // Bidang usaha / industri (misal: Software, Multimedia, Otomotif)
  phone: text("phone"), // Nomor telepon / kontak kantor
  email: text("email"), // Email kantor
  website: text("website"), // Website resmi perusahaan
  quota: integer("quota"), // Batas kuota siswa (opsional)
  is_verified: boolean("is_verified").notNull().default(false), // Verifikasi guru jika dibuat oleh siswa
  created_by: uuid("created_by").references(() => users.id, {
    onDelete: "set null",
  }), // User pembuat (bisa siswa atau guru)
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const officesRelations = relations(offices, ({ one, many }) => ({
  creator: one(users, {
    fields: [offices.created_by],
    references: [users.id],
  }),
  groups: many(groups),
}));
