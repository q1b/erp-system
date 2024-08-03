import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateLectureForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        professorList: db.query.professorTable.findMany(
            {with: {
              user: true
            }}
        ),
        courseList: db.query.courseTable.findMany(),
        lectureList: db.query.lectureTable.findMany(),
        lectureForm: await getCreateLectureForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};