import express, { Request, Response, NextFunction } from "express";
import { env } from "./config/env";
import promptService from "./services";

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
        const prompt = await promptService.getCurrentPrompt(req.user);
        return res.status(200).json(prompt);
});

app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
});
