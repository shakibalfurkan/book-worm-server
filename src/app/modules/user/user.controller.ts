import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { UserService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";

const getUser = catchAsync(async (req: Request, res: Response) => {
  const email = req.user?.email;

  const result = await UserService.getUserFromDB(email!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully.",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully.",
    data: result,
  });
});

export const UserController = {
  getUser,
  getAllUsers,
};
