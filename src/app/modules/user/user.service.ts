import AppError from "../../errors/AppError.js";
import type { IUser } from "./user.interface.js";
import User from "./user.model.js";

const getUserFromDB = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(400, "User does not exist!");
  }
  return user;
};

const getAllUsersFromDB = async () => {
  const users = await User.find();
  return users;
};

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload);
  return result;
};

export const UserService = {
  getUserFromDB,
  getAllUsersFromDB,
  updateUserIntoDB,
};
