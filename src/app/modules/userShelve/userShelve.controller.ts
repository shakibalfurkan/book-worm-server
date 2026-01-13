import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { UserShelveService } from "./userShelve.service.js";
import sendResponse from "../../utils/sendResponse.js";

const toggleShelve = catchAsync(async (req: Request, res: Response) => {
  const result = await UserShelveService.toggleShelve(req.body);

  sendResponse(res, {
    statusCode: result.status === "removed" ? 200 : 201,
    success: true,
    message: result.message,
    data: result.status === "removed" ? result.data : null,
  });
});

export const UserShelveController = {
  toggleShelve,
};
