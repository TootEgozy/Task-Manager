import { Request, Response } from "express";
import ModelsType from "../../types/models.type";
import ServicesType from "../../types/services.type";

export const createTask = (models: ModelsType, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const {userId, taskData} = req.body.data;
            const newTask = await services.taskManager.createTask(userId, taskData);
            res.send(`New task created! ${newTask._id}`);
        } catch (e) {
            res.send(e);
        }
    }
}