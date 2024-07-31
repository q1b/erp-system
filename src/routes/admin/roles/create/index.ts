import { zod } from "sveltekit-superforms/adapters";
import { createRoleSchema, type CreateRoleSchema } from "./create-role-schema";
import { superValidate, type Infer, type SuperValidated } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";

export const getCreateRoleForm = async (event?:RequestEvent) => {
    const cache = zod(createRoleSchema)
    if (!event) {
        return await superValidate(cache)
    }
    return await superValidate(event, cache)
};

export type CreateRoleFormType = SuperValidated<Infer<CreateRoleSchema>>