// @ts-ignore
import express from 'express';
import {createTask} from "../../controllers/createTask";
import {TaskManager} from "../../services/TaskManager";
import ModelsType from "../../types/models.type";
import ServicesType from "../../types/services.type";

const router = express.Router();

const tasks = (models: ModelsType, services: ServicesType) => {
    // get all tasks
    // create new task
    // edit task by id
    // delete task
    // ...same for sub tasks
    return router.use('/', createTask(models, services));
};

export default tasks;