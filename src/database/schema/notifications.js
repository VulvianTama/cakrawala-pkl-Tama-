import { relations } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { primaryId } from "./helpers.js";
import { users } from "./users.js";

export const pushSubscriptions = pgTable("push_subscriptions", {
  id: primaryId(), // ID subscription
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // User pemilik subscription
  endpoint: text("endpoint").notNull().unique(), // Web Push endpoint
  keys: jsonb("keys").notNull(), // { p256dh, auth }
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const pushSubscriptionsRelations = relations(
  pushSubscriptions,
  ({ one }) => ({
    user: one(users, {
      fields: [pushSubscriptions.user_id],
      references: [users.id],
    }),
  }),
);
