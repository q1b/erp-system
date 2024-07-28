import { text } from "drizzle-orm/sqlite-core";
import { id, table } from "../helpers";

export const domain = table('domain', {
    id,
    name: text('name'),
    description: text('description'),
})