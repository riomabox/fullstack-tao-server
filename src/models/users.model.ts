import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
        id: uuid("id").primaryKey().defaultRandom(),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull().unique(),
});

export default users;
