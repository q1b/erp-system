import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';
import { batchTable, semesterTable } from '$lib/server/db/schema';

export const load: LayoutServerLoad = async (event) => {
	return {
		batch: db.query.batchTable.findFirst({
			where: eq(batchTable.programId, event.params.program),
		}),
		semesters: db.query.semesterTable.findMany({
			where: and(eq(semesterTable.programId, event.params.program), eq(semesterTable.batchId, event.params.batch))
		}),
	};
};