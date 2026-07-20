import express, { Request, Response, NextFunction } from "express";
import { env } from "./config/env";
import db from "./db/index";
import models from "./models";
import { lt, desc, eq, and } from "drizzle-orm";

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
        const currentDate = new Date();

        let prompt;
        try {
                [prompt] = await db
                        .select()
                        .from(prompts)
                        .where(lt(prompts.started_date, currentDate))
                        .orderBy(desc(prompts.started_date))
                        .limit(1);
        } catch (err) {
                console.error("Failed to query prompts:", err);
                return res.status(500).json({ message: "Database query failed", error: String(err) });
        }

        if (!prompt) {
                return res.status(404).json({ message: "No prompt found" });
        }

        const hasAnswered = await db
                .select()
                .from(answers)
                .where(and(eq(answers.user_id, req.user.id), eq(answers.prompt_id, prompt.id)));

        if (hasAnswered.length === 0) {
                return res.json({ ...prompt, answers: [] });
        }

        const resultAnswers = await db
                .select()
                .from(answers)
                .where(and(eq(answers.user_id, req.user.id), eq(answers.prompt_id, prompt.id)));
        return res.status(200).json({ ...prompt, answers: resultAnswers });
});

app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
});
