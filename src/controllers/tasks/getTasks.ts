import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";

export const getTasks = (models: Models, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;
            const tasks = await services.taskManager.getAll(userId);
            res.send(tasks);
        } catch (e) {
            res.send(e);
        }
    }
};