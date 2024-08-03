import type { PageServerLoad, Actions } from './$types.js';
import { fail } from 'sveltekit-superforms';
import { getCreateUserForm } from '.';
import { validateUser } from '$lib/server/index.js';
import { db } from '$lib/server/db/index.js';
import { professorTable, studentTable, userTable } from '$lib/server/db/old_schema/index.js';

export const load: PageServerLoad = async () => {
	return {
		userForm: await getCreateUserForm(),
		roleList: await db.query.roleTable.findMany(),
	};
};

export const actions: Actions = {
	default: async (event) => {
		await validateUser(event);
		const form = await getCreateUserForm(event);
		if (!form.valid) return fail(400, { form });
		const user = await db.insert(userTable).values({
			email: form.data.email,
			name: form.data.name,
			role: form.data.role
		}).returning()
		if(user) {
			if(user[0].role === 'professor') {
				await db.insert(professorTable).values({
					userId: user[0].id
				});
			}
			if(user[0].role === 'student') {
				await db.insert(studentTable).values({
					userId: user[0].id
				});
			}
		}
		return {
			form
		};
	}
};
