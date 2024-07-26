import { id, table } from "../helpers";
import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";
import { lectureTable } from "./program/lecture";

export const roomTable = table('room', {
    id,
    buildingId: text('building_id').references(() => buildingTable.id),
    capacity: text('capacity'),
});

export const roomRelation = relations(roomTable, ({ one,many }) => ({
    building: one(buildingTable,{
        fields: [roomTable.buildingId],
        references: [buildingTable.id]
    }),
    lectures: many(lectureTable)
}))

export const buildingTable = table('building', {
    id,
    name: text('name').notNull(),
    description: text('description'),
})

export const buildingRelation = relations(buildingTable, ({ many }) => ({
    rooms: many(roomTable)
}))