import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { BookService } from "./book.service.js";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const coverImage = req.file?.path;
  const result = await BookService.createBookIntoDB({
    ...req.body,
    coverImage,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book created successfully.",
    data: result,
  });
});

export const BookController = {
  createBook,
};
