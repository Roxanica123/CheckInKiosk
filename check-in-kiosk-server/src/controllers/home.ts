import { Router, Request, Response } from 'express';
const app: Router = Router();

app.get('/', (req: Request, res: Response) => {
    res.send("Home");
});

export default app;