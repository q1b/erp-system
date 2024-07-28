import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { getCreateBuildingForm } from "./create";

export const load: PageServerLoad = async () => {
    return {
        buildingList: db.query.buildingTable.findMany(),
        buildingForm: await getCreateBuildingForm(),
    }
};

export const actions: Actions = {
    default: async () => {
    }
};