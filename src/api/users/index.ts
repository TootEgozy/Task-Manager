import express from 'express';
import Models from "../../types/models";
import ServicesType from "../../types/services.type";
import { Request, Response } from "express-serve-static-core";
import { login } from "../../controllers/users/login";
import { register } from "../../controllers/users/register";

const router = express.Router();

const tasks = (models: Models, services: ServicesType) => {
  return (req: Request, res: Response) => {
    router.post('/login', login(models, services));
    router.post('/register', register(models, services));
  }
};

export default tasks;