import express from 'express';
import {getModelForClass, mongoose} from "@typegoose/typegoose";
import config from "./config";
import Models from "./types/models";
import ServicesType from "./types/services.type";
import { User } from "./schemas/User";
import { Task } from "./schemas/Task";
import { SubTask } from "./schemas/SubTask";
import { TaskManager } from "./services/TaskManager";
import api from "./api";
import { Express } from "express-serve-static-core";
import { ExpandedError } from "./utils/ExpandedError";

export class App {
    public app: Express;

    private config: Record<any, any>;

    public models: Models;

    public services: ServicesType;

    public server: any

    constructor(services?: ServicesType) {
        this.app = express();
        this.config = config;


        this.models = {
            User: getModelForClass(User),
            Task: getModelForClass(Task),
            SubTask: getModelForClass(SubTask),
        };
        this.services = {
            taskManager: services? services.taskManager : new TaskManager(this.models),
        }
    }

    private connectToDB() {
        return mongoose.connect(config.mongoDBUrl)
            .then(() => console.log('Connected to MongoDB'))
            .catch((e) => console.log(`Error connecting to MongoDB: ${e}`));
    }

    private async loadAPIs() {
        this.app.use('/routes', api(this.models, this.services));
    }

    public async start() {
        try {
            this.server = this.app.listen(config.port, () => {
                console.log(`App listening on port ${config.port}`);
            });
            await Promise.all([
                this.connectToDB(),
                this.loadAPIs(),
            ]);
            await new Promise((res) => {
                setTimeout(res, 3000);
            });
            await this.stop();
        }
        catch(e: any) {
            console.log(`Error starting app: ${e.message}`);
        }
    }

    public async stop() {
        try {
            const { db } = mongoose.connection;
            const collections = await db.listCollections().toArray();
            await Promise.all(
                collections.map(async (collection) => db.dropCollection(collection.name))
            ).then(() => console.log('Dropped collections'));
            await mongoose.connection.close().then(() => console.log('MongoDB connection is closed'));
            await this.server.close(() => console.log('HTTP server is closed'));
            throw new ExpandedError('TestError', 'error stopping app');
        }
        catch(e: any) {
            console.log('hello');
            console.log(e.stack)
        }
    }
}

export default App;