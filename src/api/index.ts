import express, { Router } from 'express';
import Models from "../types/models";
import ServicesType from "../types/services.type";
import tasks from "./tasks";
import { Request, Response } from "express-serve-static-core";
import users from "./users";

const router = express.Router();


const api = (models: Models, services: ServicesType) => {
    return (req: Request, res: Response) => {
        // const loadApi = (router: Router) => {
        //     // router.use('/tasks', tasks(models, services));
        //     // router.use('/users', users(models, services));
        //     router.get('/testRoute', (req, res) => res.json('test res!!'));
        // }
        // loadApi(router);
        // return router;

    }
};

export default api;