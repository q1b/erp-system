import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { semesterLectureTable, semesterTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	return {
		semester: db.query.semesterTable.findFirst({
			where: eq(semesterTable.id, event.params.semester)
		}),
		semesterLectures: db.query.semesterLectureTable.findMany({
			where: eq(semesterLectureTable.semesterId, event.params.semester),
			with: {
				lecture: {
					with: {
						course: true,
						professor: {
							with: {
								user: true
							}
						}
					}
				}
			}
		})
	};
};