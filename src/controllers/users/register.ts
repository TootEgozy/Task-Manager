import { Request, Response } from "express";
import Models from "../../types/models";
import ServicesType from "../../types/services.type";
import bcrypt from 'bcrypt';

export const register = (models: Models, services: ServicesType) => {
  return async (req: Request, res: Response) => {
    // try {
    //   // const {userId, taskData} = req.body.data;
    //   res.send(`New user created!`);
    // } catch (e) {
    //   res.send(e);
    // }

    try {
      const { first_name, last_name, email, password } = req.body;
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      const oldUser = await models.User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await models.User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
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