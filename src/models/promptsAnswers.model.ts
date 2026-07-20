import answers from "./answers.model";
import prompts from "./prompts.model";

import { defineRelations } from "drizzle-orm";

const promptAnswers = defineRelations({ prompts, answers }, (r) => ({
        answers: {
                prompt: r.one.prompts({
                        from: r.answers.prompt_id,
                        to: r.prompts.id,
                }),
        },
        prompts: {
                answers: r.many.answers(),
        },
}));

export default promptAnswers;
