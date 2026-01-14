import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { UserShelveService } from "./userShelve.service.js";
import sendResponse from "../../utils/sendResponse.js";

const toggleShelve = catchAsync(async (req: Request, res: Response) => {
  const { user, book } = req.body;
  const result = await UserShelveService.toggleShelve({ user, book });

  sendResponse(res, {
    statusCode: result.status === "removed" ? 200 : 201,
    success: true,
    message: result.message,
    data: result.status === "removed" ? result.data : null,
  });
});

const getMyShelves = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.id;
  const result = await UserShelveService.getMyShelvesFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shelves retrieved successfully.",
    data: result,
  });
});

export const UserShelveController = {
  toggleShelve,
  getMyShelves,
};
