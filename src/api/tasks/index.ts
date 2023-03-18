import express from 'express';
import {createTask} from "../../controllers/tasks/createTask";
import ModelsType from "../../types/models.type";
import ServicesType from "../../types/services.type";
import { Request, Response } from "express-serve-static-core";
import {getTasks} from "../../controllers/tasks/getTasks";
import {updateTask} from "../../controllers/tasks/updateTask";
import {deleteTask} from "../../controllers/tasks/deleteTask";

const router = express.Router();

const tasks = (models: ModelsType, services: ServicesType) => {
    return (req: Request, res: Response) => {
        router.get('/', getTasks(models, services));
        router.post('/', createTask(models, services));
        router.put('/:id', updateTask(models, services));
        router.delete('/:id', deleteTask(models, services));
    }
};

export default tasks;