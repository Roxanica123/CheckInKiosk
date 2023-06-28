import { Db } from "mongodb";
import SingletonDBClient from "./connection";

export default class StudentsRepo {
    private db: Promise<Db>;
    private collectionName: string = "students";

    constructor() {
        this.db = SingletonDBClient.getInstance().getDb();
    }

    public async getAll() {
        const collection = (await this.db).collection(this.collectionName);
        return await collection.find({}).toArray();
    }

    public async insert(checkIn: object) {
        const collection = (await this.db).collection(this.collectionName);
        return await collection.insertOne(checkIn);
    }
}