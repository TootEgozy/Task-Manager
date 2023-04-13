import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";

export const register = (models: Models, services: ServicesType) => {
  return async (req: Request, res: Response) => {
    try {
      const { name, email, password, tasks } = req.body;
      const oldUser = await models.User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await models.User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        tasks
      });

      // Create token
      const token = jwt.sign(
        { email },
        config.tokenKey,
        // {
        //   expiresIn: "24h",
        // }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}