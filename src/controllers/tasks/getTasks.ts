import { Request, Response } from "express";
import ModelsType from "../../types/models.type";
import ServicesType from "../../types/services.type";

export const getTasks = (models: ModelsType, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const {userId} = req.body.data;
            const tasks = await services.taskManager.getTasks(userId);
            res.send(tasks);
        } catch (e) {
            res.send(e);
        }
    }
};