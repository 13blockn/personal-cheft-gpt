import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import bodyParser from 'body-parser';
import ViteExpress from "vite-express";
import { openAIGenerateAnimal } from "./api/generate";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post('/api/generate', (req: any, res: any) => {
  openAIGenerateAnimal(req, res)
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
