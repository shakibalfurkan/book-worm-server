import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req);
});

export const AuthController = {
  registerUser,
};
