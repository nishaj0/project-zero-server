import type { Request, Response } from "express";
import { type IUser, User } from "../models/userModel";
import type { HydratedDocument } from "mongoose";

const login = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Request body is missing" });
      return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    let user: HydratedDocument<IUser> | null;

    if (email.includes("@")) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ username: email }); // If 'email' does not have @, it's a username
    }

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    res.status(200).json({ message: "Login successful" });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export { login };
