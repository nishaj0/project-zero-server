import mongoose from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

type UserModel = mongoose.Model<IUser>;

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

export const User: UserModel = mongoose.model<IUser, UserModel>(
  "User",
  userSchema
);
