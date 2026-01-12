import config from "../../config/index.js";
import type { Response } from "express";
import AppError from "../../errors/AppError.js";
import { setCookie } from "../../utils/cookieHandler.js";
import { createToken } from "../../utils/jwtHelper/index.js";
import User from "../user/user.model.js";
import { isPasswordMatched } from "../../utils/passwordManager.js";

const registerUserIntoDB = async (
  res: Response,
  payload: {
    name: string;
    email: string;
    password: string;
    photo: string;
    role?: string;
  }
) => {
  const { name, email, password: givenPassword, photo } = payload;

  if (!name || !email || !givenPassword || !photo) {
    throw new AppError(400, "All fields are required!");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(400, "User already exists with this email!");
  }

  const userData: any = {
    name,
    email,
    photo,
    password: givenPassword,
  };

  if (payload.role) {
    userData.role = payload.role;
  }

  const result = await User.create(userData);

  const jwtPayload = {
    id: result._id.toString(),
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  const { password, ...user } = result.toObject();

  setCookie(res, "accessToken", accessToken);
  setCookie(res, "refreshToken", refreshToken);

  return user;
};

const loginUser = async (
  res: Response,
  payload: {
    email: string;
    password: string;
  }
) => {
  const { email, password: plainPassword } = payload;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(400, "User does not exist!");
  }

  const passwordMatch = await isPasswordMatched(
    plainPassword,
    user?.password as string
  );

  if (!passwordMatch) {
    throw new AppError(400, "Invalid credentials!");
  }

  const jwtPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  const { password, ...userInfo } = user.toObject();

  setCookie(res, "accessToken", accessToken);
  setCookie(res, "refreshToken", refreshToken);

  return userInfo;
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
};
