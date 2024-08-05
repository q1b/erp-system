import type { PageServerLoad, Actions } from './$types.js';
import { fail } from 'sveltekit-superforms';
import { getCreateProgramForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from '$lib/server/db/index.js';
import { programTable } from '$lib/server/db/schema/program/index.js';

export const load: PageServerLoad = async () => {
	return {
		programForm: await getCreateProgramForm()
	};
};

export const actions: Actions = {
	default: async (event) => {
		await validateUser(event);
		const form = await getCreateProgramForm(event);
		if (!form.valid) return fail(400, { form });
		await db.insert(programTable).values({
			name: form.data.name,
			description: form.data.description
		});
		return {
			form
		};
	}
};
