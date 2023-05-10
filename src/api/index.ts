import express, { Router } from 'express';
import Models from "../types/models";
import ServicesType from "../types/services.type";
import tasks from "./tasks";
import { Request, Response } from "express-serve-static-core";
import users from "./users";

const api = (models: Models, services: ServicesType) => {
  const router = express.Router();
  router.use('/users', users(models, services));
  router.use('/tasks', tasks(models, services));
  return router;
};

export default api;