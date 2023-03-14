// @ts-ignore
import express from 'express';
import ModelsType from "../types/models.type";
import ServicesType from "../types/services.type";
import tasks from "./tasks";
import { Request, Response } from "express-serve-static-core";

const router = express.Router();

const api = (models: ModelsType, services: ServicesType) => {
    return (req: Request, res: Response) => {
        router.use('/tasks', tasks(models, services))
    }
};

export default api;