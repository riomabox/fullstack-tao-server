import express, { Request, Response } from "express";
import { env } from "./config/env";
import db from "./db/index";
import models from "./models";
import { lt, desc } from "drizzle-orm";

const { prompts } = models;

const app = express();
const port = env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
        res.send("Hello from Express + TypeScript!");
});

app.get("/prompts", async (req: Request, res: Response) => {
        const user = { id: 1 };
        const currentDate = new Date();

        const [prompt] = await db
                .select()
                .from(prompts)
                .where(lt(prompts.started_date, currentDate))
                .orderBy(desc(prompts.started_date))
                .limit(1);
        res.json(prompt);
});

app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
});
