import { Request, Response } from "express";
import ModelsType from "../types/models.type";
import ServicesType from "../types/services.type";

export const createTask = (models: ModelsType, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const {userId, taskData} = req.body.data;
            const newTask = await services.taskManager.createTask(userId, taskData);
            // @ts-ignore
            res.send(`New task created! ${newTask._id}`);
        } catch (e) {
            // @ts-ignore
            res.send(e);
        }
    }
};