import express, {Request} from 'express';
import { Response } from 'express-serve-static-core';

export const createTask = (models: any, services: any) => {
    return (req: Request, res: Response) => {
        res.send('ok');
    }
};