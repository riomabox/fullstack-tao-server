import express, { Request, Response } from "express";
import { env } from "./config/env";

const app = express();
const port = env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
        res.send("Hello from Express + TypeScript!");
});

// app.get("/prompts", (req, res) => {
//         const user = { id: 1 };
//         const currentDate = new Date();
// });

app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
});
