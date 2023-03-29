import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";

export const deleteTask = (models: Models, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const deleted = await services.taskManager.delete(taskId);
            res.send(deleted);
        } catch (e) {
            res.send(e);
        }
    }
};