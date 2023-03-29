import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";

export const updateTask = (models: Models, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const { data } = req.body.data;
            const task = await services.taskManager.update(taskId, data);
            res.send(task);
        } catch (e) {
            res.send(e);
        }
    }
};