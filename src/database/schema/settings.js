import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { primaryId } from "./helpers.js";

export const settings = pgTable("settings", {
  id: primaryId(), // Setting ID (UUID v7)
  type_content: text("type_content").notNull().unique(), // Jenis konfigurasi / template dokumen
  content: jsonb("content").notNull().default({}), // Payload konfigurasi / template
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});
