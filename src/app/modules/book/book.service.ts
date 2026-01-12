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

export const BookService = {
  createBookIntoDB,
};
