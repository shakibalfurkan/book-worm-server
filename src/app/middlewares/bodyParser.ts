import type { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../errors/AppError.js";

export const parseBody = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.data) {
      throw new AppError(400, "Please provide data in the body under data key");
    }
    req.body = JSON.parse(req.body.data);
    next();
  }
);
