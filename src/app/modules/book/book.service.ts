import AppError from "../../errors/AppError.js";
import type { IBook } from "./book.interface.js";
import { Book } from "./book.model.js";

const createBookIntoDB = async (payload: Partial<IBook>) => {
  const { title, author } = payload;

  const isBookExists = await Book.findOne({
    title: { $regex: new RegExp(`^${title}$`, "i") },
    author: { $regex: new RegExp(`^${author}$`, "i") },
  });

  if (isBookExists) {
    throw new AppError(
      400,
      "Book with the same title and author already exists"
    );
  }

  const book = await Book.create(payload);

  return book;
};

const getAllBooksFromDB = async ({
  query,
  sortOptions,
  pageNumber,
  skip,
  limitNumber,
}: Record<string, any>) => {
  const books = await Book.find(query)
    .populate("genre", "name")
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);

  const total = await Book.countDocuments(query);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
    data: books,
  };
};

const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);

  return null;
};

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  deleteBook,
};
