import { defineConfig } from "drizzle-kit";
import { env } from "./config/env";

module.exports = defineConfig({
        dialect: "postgresql",
        out: "./src/drizzle",
        schema: "./src/models",
        dbCredentials: {
                url: env.DATABASE_URL,
        },
});
