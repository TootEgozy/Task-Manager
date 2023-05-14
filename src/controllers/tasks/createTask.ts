import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";

export const createTask = (models: Models, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const { taskData } = req.body;
            const newTask = await services.taskManager.create(taskData);
            res.send(`New task created! ${JSON.stringify(newTask)}`);
        } catch (e) {
            res.send(e);
        }
    }
}