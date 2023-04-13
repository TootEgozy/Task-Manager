import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

export const login = (models: Models, services: ServicesType) => {
  return async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          config.tokenKey,
          {
            expiresIn: "24h",
          }
        );
        user.token = token;
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  }
}