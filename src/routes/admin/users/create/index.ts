import { zod } from "sveltekit-superforms/adapters";
import { createUserSchema, type CreateUserSchema } from "./create-user-schema";
import { superValidate, type Infer, type SuperValidated } from "sveltekit-superforms";
import type { RequestEvent } from "./$types";

export const getCreateUserForm = async (event?:RequestEvent) => {
    const cache = zod(createUserSchema)
    if (!event) {
        return await superValidate(cache)
    }
    return await superValidate(event, cache)
};

export type CreateUserFormType = SuperValidated<Infer<CreateUserSchema>>