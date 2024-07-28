import { z } from "zod";
 
export const createRoomSchema = z.object({
  number: z.string(),
  capacity: z.string(),
  buildingId: z.string(),
});
 
export type CreateRoomSchema = typeof createRoomSchema;