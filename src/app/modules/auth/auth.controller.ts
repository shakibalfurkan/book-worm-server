import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AuthService } from "./auth.service.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const photo = req.file?.path;
  const result = await AuthService.registerUserIntoDB(res, {
    ...req.body,
    photo,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully.",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(res, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully.",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
};
