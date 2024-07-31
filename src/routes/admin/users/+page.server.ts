import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { getCreateUserForm } from './create';

export const load: PageServerLoad = async () => {
	return {
		users: db.query.userTable.findMany(),
		roleList: db.query.roleTable.findMany(),
		createUserForm: await getCreateUserForm(),
	};
};

export const actions: Actions = {
	default: async (event) => {}
};
