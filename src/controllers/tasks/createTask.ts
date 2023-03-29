import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";

export const createTask = (models: Models, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const {userId, taskData} = req.body.data;
            const newTask = await services.taskManager.create(userId, taskData);
            res.send(`New task created! ${newTask._id}`);
        } catch (e) {
            res.send(e);
        }
    }
}