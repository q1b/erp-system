import { table } from "../../helpers";
import { text } from "drizzle-orm/sqlite-core";

export const roleTable = table("role", {
    id: text("id").primaryKey(),
    label: text("label").notNull(),
    description: text("description"),
})