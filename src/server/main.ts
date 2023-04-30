import express from "express";
import ViteExpress from "vite-express";
import { openAIGenerateAnimal } from "./api/generate";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

// req.body is undefined
app.post('/api/generate', (req: any, res: any) => {
  req.body = { animal: 'Oliver' };
  openAIGenerateAnimal(req, res)
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
