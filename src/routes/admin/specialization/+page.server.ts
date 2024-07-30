import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { getCreateSpecializationForm } from './create';

export const load: PageServerLoad = async () => {
	return {
		programs: db.query.programTable.findMany({
			columns: {
				id: true,
				name: true
			}
		}),
		specializationList: db.query.specializationTable.findMany({
			with: {
				program: true
			}
		}),
		specializationForm: await getCreateSpecializationForm()
	};
};

export const actions: Actions = {
	default: async () => {}
};
