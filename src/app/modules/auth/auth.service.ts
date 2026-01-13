import config from "../../config/index.js";
import type { Response } from "express";
import AppError from "../../errors/AppError.js";
import { cookieOptions, setCookie } from "../../utils/cookieHandler.js";
import { createToken, jwtHelper } from "../../utils/jwtHelper/index.js";
import User from "../user/user.model.js";
import { isPasswordMatched } from "../../utils/passwordManager.js";
import type { JwtPayload } from "jsonwebtoken";

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

const refreshToken = async (token: string, res: Response) => {
  const decodedToken = jwtHelper.verifyToken(
    token,
    config.jwt_refresh_token_secret!
  ) as JwtPayload;

  console.log({ decodedToken });

  if (
    !decodedToken ||
    !decodedToken.id ||
    !decodedToken.email ||
    !decodedToken.role
  ) {
    throw new AppError(401, "You are not authorized!");
  }

  const user = await User.findOne({ email: decodedToken.email });

  if (!user) {
    throw new AppError(401, "You are not authorized!");
  }

  const newAccessToken = jwtHelper.createToken(
    {
      id: user._id.toString(),
      email: user.email,
      role: decodedToken.role,
    },
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string
  );

  setCookie(res, "accessToken", newAccessToken);
  return null;
};

const getUserFromDB = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(400, "User does not exist!");
  }
  return user;
};

const logout = async (res: Response) => {
  const isProd = config.node_env === "production";

  const clearOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? ("none" as const) : ("lax" as const),
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  };

  res.cookie("accessToken", "", clearOptions);
  res.cookie("refreshToken", "", clearOptions);

  return null;
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
  refreshToken,
  getUserFromDB,
  logout,
};
