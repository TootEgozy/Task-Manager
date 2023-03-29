// @ts-ignore
import express from 'express';
import Models from "../types/models";
import ServicesType from "../types/services.type";
import tasks from "./tasks";
import { Request, Response } from "express-serve-static-core";

const router = express.Router();

const api = (models: Models, services: ServicesType) => {
    return (req: Request, res: Response) => {
        router.use('/tasks', tasks(models, services));
        // router.use('/users', users(models, services));
    }
};

export default api;