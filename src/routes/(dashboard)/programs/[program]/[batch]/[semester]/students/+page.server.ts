import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { studentTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	return {
		studentList: db.query.studentTable.findMany({
            where: eq(studentTable.batchId, event.params.batch),
			with: {
				user:true
			}
        }),
	};
};
