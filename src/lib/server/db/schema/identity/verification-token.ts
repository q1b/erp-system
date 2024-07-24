// NOT IN USE
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The verificationTokensTable is optional and only required if you’re using a Magic Link provider.
export const verificationTokensTable = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 