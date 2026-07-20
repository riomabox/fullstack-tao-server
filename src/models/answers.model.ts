import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import prompts from "./prompts.model";
import users from "./users.model";

const answers = pgTable("answers", {
        id: uuid().primaryKey().defaultRandom(),
        prompt_id: uuid("prompt_id").references(() => prompts.id),
        user_id: uuid("user_id").references(() => users.id),
        text: varchar("text", { length: 500 }).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export default answers;
