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

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const {
    searchTerm,
    genre,
    minRating,
    maxRating,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  } = req?.query;

  const query: any = {};

  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { author: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (genre) {
    const genreIds = (genre as string).split(",");
    query.genre = { $in: genreIds };
  }

  if (minRating || maxRating) {
    query.avgRating = {};
    if (minRating) query.avgRating.$gte = Number(minRating);
    if (maxRating) query.avgRating.$lte = Number(maxRating);
  }

  const sortOptions: any = {};

  if (sortBy === "rating") {
    sortOptions.avgRating = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "shelved") {
    sortOptions["shelfCount.wantToRead"] = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "title") {
    sortOptions.title = sortOrder === "asc" ? 1 : -1;
  } else if (sortBy === "createdAt") {
    sortOptions.createdAt = sortOrder === "asc" ? 1 : -1;
  } else {
    sortOptions.createdAt = -1;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const result = await BookService.getAllBooksFromDB({
    query,
    sortOptions,
    pageNumber,
    skip,
    limitNumber,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved successfully.",
    data: result,
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBookByIdFromDB(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book retrieved successfully.",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = { ...req.body };

  if (req.file) {
    payload.coverImage = req.file.path;
  }

  const result = await BookService.updateBookInDB(id as string, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully.",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book deleted successfully.",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
