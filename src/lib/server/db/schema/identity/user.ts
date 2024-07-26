import { integer, text } from "drizzle-orm/sqlite-core";
import { createdAt, id, table } from "../../helpers";

export const userTable = table("user", {
  id,
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role").references(() => roleTable.id, { onDelete: 'set default' , onUpdate: 'cascade'}).default('user'),
  createdAt,
})

export const roleTable = table("role", {
    id: text("id").primaryKey(),
    label: text("label").notNull(),
    description: text("description"),
})