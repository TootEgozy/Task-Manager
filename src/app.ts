import express, {Application} from 'express';
import config from "./config";
import ModelsType from "./types/models.type";
import ServicesType from "./types/services.type";
import UserClass from "./schemas/User";
import {TaskManager} from "./services/TaskManager";
import { getModelForClass } from "@typegoose/typegoose";
import TaskClass from "./schemas/Task";
import SubTaskClass from "./schemas/SubTask";
export class App {
    public app: Application;

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

    public async connectToDB() {

    }

    public async loadAPIs() {

    }

    private mountRoutes() {
        // // Definition of the possible API routes
        // this.app.route('/users')
        //     .get((req, res) => {
        //         var repo = new UserRepository();
        //         // we catch the result with the typical "then"
        //         repo.getUsers().then((x) => {
        //             // .json(x) instead of .send(x) should also be okay
        //             res.status(200).send(x);
        //         });
        //     });
        //
        // //               here with parameter
        // //                      |
        // //                      v
        // this.app.route('/users/:id')
        //     .get((req, res) => {
        //         var repo = new UserRepository();
        //
        //         repo.getUser(req.params.id).then((x) => {
        //             res.status(200).send(x);
        //         });
        //     });
    }
}

export default new App().app;