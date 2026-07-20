import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { env } from "../config/env";

const { Pool } = pg;

const pool = new Pool({
        connectionString: env.DATABASE_URL,
});

const db = drizzle({ client: pool });

export default db;
