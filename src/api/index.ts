// @ts-ignore
import express from 'express';
import ModelsType from "../types/models.type";
import ServicesType from "../types/services.type";
import tasks from "./tasks";

const router = express.Router();

const api = (models: ModelsType, services: ServicesType) => {
    return router.use('/tasks', tasks(models, services))
};

export default api;