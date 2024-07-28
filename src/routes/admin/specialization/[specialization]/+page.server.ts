import { validateUser } from "$lib/server";
import { specializationTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { db } from "$lib/server/db";

export const actions: Actions = {
    update: async () => {
    },
    delete: async (event) => {
        await validateUser(event);
        await db.delete(specializationTable).where(eq(specializationTable.id, event.params.specialization))
        return {
            id: event.params.specialization
        }
    }
};