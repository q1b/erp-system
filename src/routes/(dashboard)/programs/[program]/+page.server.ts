import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { batchTable, programTable, specializationTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	return {
		program: db.query.programTable.findFirst({
			where: eq(programTable.id, event.params.program)
		}),
		specializations: db.query.specializationTable.findMany({
			where: eq(specializationTable.programId, event.params.program)
		}),
		batches: db.query.batchTable.findMany({
			where: eq(batchTable.programId, event.params.program),
			with: {
				specialization: true
			},
			orderBy: batchTable.year
		})
	};
};
