// NOT IN USE
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./user";

// The sessionsTable is optional and only required if you’re using the database session strategy.
export const sessionTable = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})