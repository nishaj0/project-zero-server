import type { Request, Response } from "express";
import type { HydratedDocument } from "mongoose";
import { type IUser, User } from "../models/userModel";
import { FieldError } from "../utils/error/customError";

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user: HydratedDocument<IUser> | null;

  if (email.includes("@")) {
    user = await User.findOne({ email });
  } else {
    user = await User.findOne({ username: email }); // If 'email' does not have @, it's a username
  }

  if (!user) throw new FieldError("User not found", 404, "email");

  if (user.password !== password)
    throw new FieldError("Invalid password", 400, "password");

  const response = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };

  res.status(200).json({ message: "Login successful", user: response });
  return;
};

const userRegister = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  const response = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };

  res
    .status(201)
    .json({ message: "User registered successfully", user: response });
  return;
};

export { userLogin, userRegister };
