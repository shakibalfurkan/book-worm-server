import AppError from "../../errors/AppError.js";
import { Book } from "../book/book.model.js";
import User from "../user/user.model.js";
import { UserShelve } from "./userShelve.model.js";

const toggleShelve = async (payload: {
  book: string;
  user: string;
  shelve?: "WANT_TO_READ" | "CURRENTLY_READING" | "READ";
}) => {
  const { book: bookId, user: userId, shelve } = payload;

  const [book, user] = await Promise.all([
    Book.findById(bookId),
    User.findById(userId),
  ]);

  if (!book) throw new AppError(404, "Book not found");
  if (!user) throw new AppError(404, "User not found");

  const existingShelve = await UserShelve.findOne({
    user: userId,
    book: bookId,
  });

  if (existingShelve) {
    await Promise.all([
      UserShelve.deleteOne({ _id: existingShelve._id }),
      Book.findByIdAndUpdate(bookId, {
        $pull: { userShelves: user._id },
      }),
    ]);
    return { message: "Removed from shelf", status: "removed" };
  } else {
    const shelveStatus = shelve || "WANT_TO_READ";

    const newShelve = await UserShelve.create({
      user: userId,
      book: bookId,
      shelve: shelveStatus,
      finishedAt: shelveStatus === "READ" ? new Date() : null,
    });

    await Book.findByIdAndUpdate(bookId, {
      $addToSet: { userShelves: user._id },
    });

    return { data: newShelve, status: "added", message: "Added to shelf" };
  }
};

const getMyShelvesFromDB = async (userId: string) => {
  const shelves = await UserShelve.find({ user: userId }).populate({
    path: "book",
    populate: "genre",
  });
  if (!shelves) throw new AppError(404, "Shelves not found");
  return shelves;
};

export const UserShelveService = {
  toggleShelve,
  getMyShelvesFromDB,
};
