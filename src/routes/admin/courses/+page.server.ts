import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { getCreateCourseForm } from './create';

export const load: PageServerLoad = async () => {
	return {
		courses: db.query.courseTable.findMany(),
		courseForm: await getCreateCourseForm()
	};
};

export const actions: Actions = {
	default: async () => {}
};
