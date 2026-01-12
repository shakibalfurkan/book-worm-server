import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { GenreService } from "./genre.service.js";

const createGenre = catchAsync(async (req: Request, res: Response) => {
  const result = await GenreService.createGenreIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Genre created successfully.",
    data: result,
  });
});

const getAllGenres = catchAsync(async (req: Request, res: Response) => {
  const result = await GenreService.getAllGenresFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Genres retrieved successfully.",
    data: result,
  });
});

export const GenreController = {
  createGenre,
  getAllGenres,
};
