import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import configdb from "./init.js";

const pool = new Pool(configdb);
const db = drizzle(pool);

async function main() {
  console.log("Running Drizzle migrations...");
  await migrate(db, { migrationsFolder: "./src/database/drizzle" });
  console.log("Migrations completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed!");
  console.error(err);
  process.exit(1);
});
