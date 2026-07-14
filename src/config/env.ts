import dotenv from "dotenv";

dotenv.config();

export const env = {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: parseInt(process.env.PORT || "8000"),
        DATABASE_URL: process.env.DATABASE_URL!,
        // JWT_SECRET: process.env.JWT_SECRET!,
} as const;

// Validasi env saat startup
Object.entries(env).forEach(([key, value]) => {
        if (value === undefined) {
                throw new Error(`Missing env variable: ${key}`);
        }
});
