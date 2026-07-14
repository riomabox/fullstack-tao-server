import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

const prompts = pgTable("prompts", {
        id: uuid().primaryKey().defaultRandom(),
        title: varchar("title", { length: 100 }).notNull().unique(),
        slug: varchar("slug", { length: 100 }).notNull().unique(),
        color: varchar("color", { length: 7 }), // hex color
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export default prompts;
