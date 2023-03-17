import express from 'express';
import {getModelForClass, mongoose} from "@typegoose/typegoose";
import config from "./config";
import ModelsType from "./types/models.type";
import ServicesType from "./types/services.type";
import { User } from "./schemas/User";
import { Task } from "./schemas/Task";
import { SubTask } from "./schemas/SubTask";
import { TaskManager } from "./services/TaskManager";
import api from "./api";
import { Express } from "express-serve-static-core";
import {ModelType} from "@typegoose/typegoose/lib/types";
import testingDB from "./testingDB";

export class App {
    public app: Express;

    private config: Record<any, any>;

    public models: ModelsType;

    public services: ServicesType;

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
        this.app.use('/api', api(this.models, this.services));
    }

    public async start() {
        try {
            this.app.listen(config.port, () => {
                console.log(`App listening on port ${config.port}`);
            });
            await this.connectToDB();
            await this.loadAPIs();

            testingDB(this.models, this.services);
        }
        catch(e) {
            console.log('error starting app');
        }
    }
}

export default new App().app;