import config from "../../config/index.js";
import AppError from "../../errors/AppError.js";
import { createToken, jwtHelper } from "../../utils/jwtHelper/index.js";
import User from "../user/user.model.js";
import { isPasswordMatched } from "../../utils/passwordManager.js";
import type { JwtPayload } from "jsonwebtoken";

const registerUserIntoDB = async (payload: {
  name: string;
  email: string;
  password: string;
  photo: string;
  role?: string;
}) => {
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

  return { user, accessToken, refreshToken };
};

const loginUser = async (payload: { email: string; password: string }) => {
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

  return { user: userInfo, accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  const decodedToken = jwtHelper.verifyToken(
    token,
    config.jwt_refresh_token_secret!
  ) as JwtPayload;

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

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
  refreshToken,
};
