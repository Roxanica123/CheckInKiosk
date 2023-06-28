
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri: string = process.env.CONNECTION_STRING ?? "";

const clientConfig = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

class DBClient {
    private client: Promise<MongoClient>;
    constructor() {
        this.client = new MongoClient(uri, clientConfig).connect();
    }

    public async getDb() {
        return (await this.client).db("checkin");
    }
}

export default class SingletonDBClient {
    private static instance: DBClient;
    public static getInstance() {
        if (!SingletonDBClient.instance) {
            SingletonDBClient.instance = new DBClient();
        }
        return SingletonDBClient.instance;
    }
}
