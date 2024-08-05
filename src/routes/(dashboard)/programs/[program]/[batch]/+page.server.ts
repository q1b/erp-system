import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { semesterTable } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const semester = await db.query.semesterTable.findFirst({
		where: and(eq(semesterTable.completed, false), eq(semesterTable.programId, event.params.program), eq(semesterTable.batchId, event.params.batch))
	});
	if(semester) redirect(307,`/programs/${event.params.program}/${event.params.batch}/${semester.id}`);
	else error(404, 'Semester not found');
};
