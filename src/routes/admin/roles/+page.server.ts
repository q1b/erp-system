import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateRoleForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        roleList: db.query.roleTable.findMany(),
        roleForm: await getCreateRoleForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};