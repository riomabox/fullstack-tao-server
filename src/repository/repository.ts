import db from "../db/index";
import { lt, eq, and, asc } from "drizzle-orm";
import models from "../models";

const { prompts, answers } = models;

function mapPromptToDomainObject(result) {
        return {
                prompt: result[0].prompts,
                answers: result.map((r) => r.answers),
        };
}

export default {
        async getPromptByDate(date, user) {
                const currentPrompt = db
                        .select()
                        .from(prompts)
                        .where(lt(prompts.started_date, date))
                        .orderBy(asc(prompts.started_date))
                        .limit(1)
                        .as("prompts");

                const result = await db
                        .select()
                        .from(currentPrompt)
                        .leftJoin(answers, and(eq(currentPrompt.id, answers.prompt_id), eq(answers.user_id, user.id)));

                return mapPromptToDomainObject(result);
        },
};
