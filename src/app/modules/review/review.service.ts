import AppError from "../../errors/AppError.js";
import { Book } from "../book/book.model.js";
import User from "../user/user.model.js";
import { Review } from "./review.model.js";
interface CreateReviewPayload {
  user: string;
  book: string;
  rating: number;
  comment: string;
}
export const createReviewIntoDB = async (payload: CreateReviewPayload) => {
  const { user, book, rating, comment } = payload;

  const isBookExists = await Book.findById(book);
  if (!isBookExists) {
    throw new AppError(404, "Book not found");
  }

  const existingReview = await Review.findOne({ user: user, book: book });
  if (existingReview) {
    throw new AppError(400, "You have already reviewed this book");
  }

  const isUserExists = await User.findOne({ user });

  if (isUserExists) {
    throw new Error("User already reviewed this book");
  }

  const result = await Review.create({ user, book, rating, comment });
  return result;
};

const getAllReviews = async () => {
  const result = await Review.find({});
  return result;
};

export const ReviewService = {
  createReviewIntoDB,
  getAllReviews,
};
