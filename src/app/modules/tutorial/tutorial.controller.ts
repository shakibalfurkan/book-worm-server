import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { TutorialService } from "./tutorial.service.js";
import sendResponse from "../../utils/sendResponse.js";

const addTutorial = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorialService.addTutorial(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tutorial created successfully.",
    data: result,
  });
});

const getTutorials = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorialService.getTutorials();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tutorials retrieved successfully.",
    data: result,
  });
});

export const TutorialController = {
  addTutorial,
  getTutorials,
};
