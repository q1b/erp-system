import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';
import { batchTable, programTable } from '$lib/server/db/schema';

export const load: LayoutServerLoad = async (event) => {
	return {
		program: db.query.programTable.findFirst({
			where: eq(programTable.id, event.params.program)
		}),
		batches: db.query.batchTable.findMany({
			where: eq(batchTable.programId, event.params.program),
			orderBy: batchTable.year
		})
	};
};