import express, { Request, Response, NextFunction } from "express";
import { env } from "./config/env";
import db from "./db/index";
import models from "./models";
import { lt, desc, eq, and, asc } from "drizzle-orm";
import { getCurrentDate } from "./dates";

const { prompts, answers } = models;

const app = express();
const port = env.PORT;

app.use(express.json());

const getCurrentUser = (req) => {
        return { id: "8256bce6-a8e0-4d7a-a1ac-305d4a0c0db4" };
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
        const user = getCurrentUser(req);
        if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
};

app.get("/", (req: Request, res: Response) => {
        res.send("Hello from Express + TypeScript!");
});

app.get("/prompts", authenticate, async (req: Request, res: Response) => {
        const currentDate = getCurrentDate();

        const currentPrompt = db
                .select()
                .from(prompts)
                .where(lt(prompts.started_date, currentDate))
                .orderBy(asc(prompts.started_date))
                .limit(1)
                .as("prompts");

        const result = await db
                .select()
                .from(currentPrompt)
                .leftJoin(answers, and(eq(currentPrompt.id, answers.prompt_id), eq(answers.user_id, req.user.id)));

        const formattedPromptAndAnswers = {
                prompt: null,
                answers: [] as Array<Record<string, unknown>>,
        };

        result.forEach((row) => {
                formattedPromptAndAnswers.prompt ??= row.prompts;

                if (row.answers) {
                        formattedPromptAndAnswers.answers.push(row.answers);
                }
        });

        return res.status(200).json(formattedPromptAndAnswers);
});

app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
});
