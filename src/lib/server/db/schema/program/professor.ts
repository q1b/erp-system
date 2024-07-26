import { relations } from "drizzle-orm";
import { id, table } from "../../helpers";
import { lectureTable } from "./lecture";

export const professorTable = table('professor', {
    id
})

export const professorRelation = relations(professorTable, ({ many }) => ({
    lectures: many(lectureTable)
}))