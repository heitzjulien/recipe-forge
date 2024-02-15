import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { envConfig } from "../env/env.config";
import { Database } from "./database.types";

envConfig();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    max: 10,
  }),
});

export const db = new Kysely<Database>({ dialect });
