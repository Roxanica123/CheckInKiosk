import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Home from "./src/controllers/home";
import Students from "./src/controllers/students";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use(cors())
app.use(Home);
app.use(Students);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});