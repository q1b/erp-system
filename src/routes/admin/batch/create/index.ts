import { zod } from "sveltekit-superforms/adapters";
import { createBatchSchema, type CreateBatchSchema } from "./create-batch-schema";
import { superValidate, type Infer, type SuperValidated } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";

export const getCreateBatchForm = async (event?:RequestEvent) => {
    const cache = zod(createBatchSchema)
    if (!event) {
        return await superValidate(cache)
    }
    return await superValidate(event, cache)
};

export type CreateBatchFormType = SuperValidated<Infer<CreateBatchSchema>>