import AppError from "../../errors/AppError.js";
import getMostFrequent from "../../utils/getMostFrequent.js";
import Genre from "../genre/genre.model.js";
import { Review } from "../review/review.model.js";
import { UserShelve } from "../userShelve/userShelve.model.js";
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
    .populate("genre")
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

const getBookByIdFromDB = async (id: string) => {
  const result = await Book.findById(id).populate("genre");

  const reviews = await Review.find({ book: id, status: "APPROVED" }).populate(
    "user"
  );

  if (!result) {
    throw new AppError(404, "Book not found");
  }
  return {
    book: result,
    reviews,
  };
};

const updateBookInDB = async (id: string, payload: Partial<IBook>) => {
  const { title, author } = payload;

  const existingBook = await Book.findById(id);
  if (!existingBook) {
    throw new AppError(404, "Book not found");
  }

  if (title || author) {
    const searchTitle = title || existingBook.title;
    const searchAuthor = author || existingBook.author;

    const isDuplicate = await Book.findOne({
      _id: { $ne: id },
      title: { $regex: new RegExp(`^${searchTitle}$`, "i") },
      author: { $regex: new RegExp(`^${searchAuthor}$`, "i") },
    });

    if (isDuplicate) {
      throw new AppError(
        400,
        "Another book with this title and author already exists"
      );
    }
  }

  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteBook = async (id: string) => {
  await Book.findByIdAndDelete(id);

  return null;
};

const getRecommendedBooks = async (userId: string) => {
  const readBooks = await UserShelve.find({
    user: userId,
    status: "READ",
  }).populate("book");

  let recommendedBooks: IBook[] = [];
  let reason = "Recommended for you based on community popularity";

  const readBookIds = readBooks.map((b) => (b.book as any)._id);

  if (readBooks.length >= 3) {
    const genreIds = readBooks
      .map((item) => {
        const book = item.book as any;
        return book.genre?.toString();
      })
      .filter(Boolean);

    const topGenreId = getMostFrequent(genreIds);

    if (topGenreId) {
      recommendedBooks = await Book.find({
        genre: topGenreId,
        _id: { $nin: readBookIds },
      })
        .populate("genre")
        .sort({ avgRating: -1 })
        .limit(12);

      const genreDoc = await Genre.findById(topGenreId);
      if (genreDoc) {
        reason = `Matches your preference for ${genreDoc.name} and high-rated reviews`;
      }
    }
  }

  if (recommendedBooks.length < 12) {
    const currentRecIds = recommendedBooks.map((b) => (b as any)._id);

    const extraBooks = await Book.find({
      _id: { $nin: [...readBookIds, ...currentRecIds] },
    })
      .populate("genre")
      .sort({ avgRating: -1 })
      .limit(18 - recommendedBooks.length);

    recommendedBooks = [...recommendedBooks, ...extraBooks];
  }

  return { books: recommendedBooks, reason };
};

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getBookByIdFromDB,
  updateBookInDB,
  deleteBook,
  getRecommendedBooks,
};
