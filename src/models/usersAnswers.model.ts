import answers from "./answers.model";
import users from "./users.model";

import { defineRelations } from "drizzle-orm";

const usersAnswers = defineRelations({ users, answers }, (r) => ({
        answers: {
                user: r.one.users({
                        from: r.answers.user_id,
                        to: r.users.id,
                }),
        },
        users: {
                answers: r.many.answers(),
        },
}));

export default usersAnswers;
