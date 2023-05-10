import express from 'express';
import {createTask} from "../../controllers/tasks/createTask";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";
import {getTasks} from "../../controllers/tasks/getTasks";
import {updateTask} from "../../controllers/tasks/updateTask";
import {deleteTask} from "../../controllers/tasks/deleteTask";
import { Request, Response } from "express-serve-static-core";

const tasks = (models: Models, services: ServicesType) => {
    const router = express.Router();
    router.get('/', getTasks(models, services));
    router.post('/', createTask(models, services));
    router.put('/:id', updateTask(models, services));
    router.delete('/:id', deleteTask(models, services));
    return router;
};

export default tasks;