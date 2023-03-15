// @ts-ignore
import express from 'express';
import {createTask} from "../../controllers/tasks/createTask";
import ModelsType from "../../types/models.type";
import ServicesType from "../../types/services.type";
import { Request, Response } from "express-serve-static-core";
import {getTasks} from "../../controllers/tasks/getTasks";

const router = express.Router();

const tasks = (models: ModelsType, services: ServicesType) => {
    return (req: Request, res: Response) => {
        // get all tasks
        // create new task
        // edit task by id
        // delete task
        // ...same for sub tasks
        router.get('/', getTasks(models, services));
        router.post('/', createTask(models, services));
        // router.put('/:id', editTask(models, services));
        // router.delete('/', deleteTask(models, services));
    }
};

export default tasks;