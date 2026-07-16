import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import prompts from "./prompts.model";

const answers = pgTable("answers", {
        id: uuid().primaryKey().defaultRandom(),
        prompt_id: uuid("prompt_id").references(() => prompts.id),
        text: varchar("text", { length: 500 }).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const promptsRelations = relations(prompts, ({ many }) => ({
        answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
        prompt: one(prompts, {
                fields: [answers.prompt_id],
                references: [prompts.id],
        }),
}));

export default answers;
