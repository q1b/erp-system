import { zod } from "sveltekit-superforms/adapters";
import { createLectureSchema, type CreateLectureSchema } from "./create-lecture-schema";
import { superValidate, type Infer, type SuperValidated } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";

export const getCreateLectureForm = async (event?:RequestEvent) => {
    const cache = zod(createLectureSchema)
    if (!event) {
        return await superValidate(cache)
    }
    return await superValidate(event, cache)
};

export type CreateLectureFormType = SuperValidated<Infer<CreateLectureSchema>>