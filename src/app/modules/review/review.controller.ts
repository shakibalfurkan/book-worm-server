import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { ReviewService } from "./review.service.js";

const createReview = async (req: Request, res: Response) => {
  const result = await ReviewService.createReviewIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review added successfully. Wait for admin approval.",
    data: result,
  });
};

export const ReviewController = {
  createReview,
};
