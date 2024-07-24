// NOT IN USE
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./user";

// AuthenticatorTable
// A webauthn authenticator. 
// Represents an entity capable of authenticating the account it references, 
// and contains the auhtenticator’s credentials and related information.
export const authenticatorTable = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)