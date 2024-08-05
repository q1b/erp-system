import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from 'sveltekit-superforms';
import { getCreateLectureForm } from './index.js';
import { validateUser } from '$lib/server/index.js';
import { db } from "$lib/server/db/index.js";
import { lectureTable } from "$lib/server/db/schema/index.js";

export const load: PageServerLoad = async () => {
  return {
    professorList: db.query.professorTable.findMany(
      {with: {
        user: true
      }}
    ),
    courseList: db.query.courseTable.findMany(),
    lectureForm: await getCreateLectureForm(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    await validateUser(event);
    const form = await getCreateLectureForm(event);
    if (!form.valid) return fail(400, {form});
    await db.insert(lectureTable).values({
      semester: form.data.semester,
      professorId: form.data.professorId,
      courseId: form.data.courseId
    });
    return {
      form
    }
  }
};