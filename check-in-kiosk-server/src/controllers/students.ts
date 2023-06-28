import { Router, Request, Response } from 'express';
import StudentsRepo from '../repos/students_repo';
import bodyParser from 'body-parser';
const app: Router = Router();

const jsonParser = bodyParser.json()

const validateEmail = (email: string) => {
    const parts = email.split("@");
    if (parts.length !== 2) {
        return false;
    }
    const domains = parts[1].split(".");
    return domains[domains.length - 1] === "edu";
}

app.get('/students', async (req: Request, res: Response) => {
    const result = await new StudentsRepo().getAll();
    res.json(result);
});

app.post('/students', jsonParser, async (req: Request, res: Response) => {
    let checkIn = req.body;
    console.log(checkIn);
    checkIn.check_in_time = new Date();

    try {
        if (!validateEmail(checkIn.email)) {
            res.statusCode = 401;
            res.json({ err: "Wrong email format" });
        }
        const result = await new StudentsRepo().insert(checkIn);
        console.log("insert result: ", result);
        res.statusCode = 201;
        res.json(result);
    }
    catch (err) {
        res.statusCode = 500;
        res.json({ err: err });
    }

})

export default app;