// @ts-ignore
import express from 'express';
import {createTask} from "../../controllers/createTask";
import ModelsType from "../../types/models.type";
import ServicesType from "../../types/services.type";
import { Request, Response } from "express-serve-static-core";

const router = express.Router();

const tasks = (models: ModelsType, services: ServicesType) => {
    return (req: Request, res: Response) => {
        // get all tasks
        // create new task
        // edit task by id
        // delete task
        // ...same for sub tasks
        router.use('/', createTask(models, services));
    }
};

export default tasks;