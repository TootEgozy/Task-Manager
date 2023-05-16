import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";

export const deleteTask = (models: Models, services: ServicesType) => {
    return async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            await services.taskManager.delete(userId, id);
            res.status(200);
        } catch (e) {
            res.send(e);
        }
    }
};

