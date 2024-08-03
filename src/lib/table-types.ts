import type { InferSelectModel } from 'drizzle-orm';
import type { programTable } from './server/db/old_schema';

export type ProgramTableType = InferSelectModel<typeof programTable>;
