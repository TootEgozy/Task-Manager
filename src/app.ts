import express from 'express';
import {getModelForClass, mongoose} from "@typegoose/typegoose";
import config from "./config";
import ModelsType from "./types/models.type";
import ServicesType from "./types/services.type";
import { UserClass } from "./schemas/User";
import { TaskClass } from "./schemas/Task";
import { SubTaskClass } from "./schemas/SubTask";
import { TaskManager } from "./services/TaskManager";
import api from "./api";
import { Express } from "express-serve-static-core";

export class App {
    public app: Express;

    private config: Record<any, any>;

    public models: ModelsType;

    public services: ServicesType;

    constructor(services?: ServicesType) {
        this.app = express();
        this.config = config;
        this.models = {
            User: getModelForClass(UserClass),
            Task: getModelForClass(TaskClass),
            SubTask: getModelForClass(SubTaskClass),
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
            this.loadAPIs();
        }
        catch(e) {
            console.log('error starting app');
        }
    }
}

export default new App().app;