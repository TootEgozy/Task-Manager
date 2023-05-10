import express from 'express';
import Models from "../../types/models";
import ServicesType from "../../types/services.type";
import { login } from "../../controllers/users/login";
import { register } from "../../controllers/users/register";
import { Request, Response } from "express-serve-static-core";

const users = (models: Models, services: ServicesType) => {
  const router = express.Router();
  router.post('/login', login(models, services));
  router.post('/register', register(models, services));
  return router;
};

export default users;