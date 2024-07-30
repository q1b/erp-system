import type { InferSelectModel } from 'drizzle-orm';
import type { programTable } from './server/db/schema';

export type ProgramTableType = InferSelectModel<typeof programTable>;
