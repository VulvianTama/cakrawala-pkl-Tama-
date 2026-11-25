import { uuid } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const primaryId = (name = "id") =>
  uuid(name)
    .primaryKey()
    .$defaultFn(() => uuidv7());
