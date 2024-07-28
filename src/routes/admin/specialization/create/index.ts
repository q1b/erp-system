import { zod } from "sveltekit-superforms/adapters";
import { createSpecializationSchema, type CreateSpecializationSchema } from "./create-specialization-schema";
import { superValidate, type Infer, type SuperValidated } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";

export const getCreateSpecializationForm = async (event?:RequestEvent) => {
    const cache = zod(createSpecializationSchema)
    if (!event) {
        return await superValidate(cache)
    }
    return await superValidate(event, cache)
};

export type CreateSpecializationFormType = SuperValidated<Infer<CreateSpecializationSchema>>