import config from "../../config/index.js";
import type { Response } from "express";
import AppError from "../../errors/AppError.js";
import { setCookie } from "../../utils/cookieHandler.js";
import { createToken } from "../../utils/jwtHelper/index.js";
import User from "../user/user.model.js";

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

  const userAccessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string
  );

  const userRefreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  const { password, ...user } = result.toObject();

  setCookie(res, "accessToken", userAccessToken);
  setCookie(res, "refreshToken", userRefreshToken);

  return user;
};

export const AuthService = {
  registerUserIntoDB,
};
