import AppError from "../../errors/AppError.js";
import { Book } from "../book/book.model.js";
import User from "../user/user.model.js";
import { UserShelve } from "./userShelve.model.js";

const toggleShelve = async ({
  payload,
}: {
  payload: { book: string; user: string };
}) => {
  const { book: bookId, user: userId } = payload;

  const book = await Book.findById(bookId);
  if (!book) throw new AppError(404, "Book not found");

  const user = await User.findById(userId);
  if (!user) throw new AppError(404, "User not found");

  const existingShelve = await UserShelve.findOne({
    user: userId,
    book: bookId,
  });

  if (existingShelve) {
    await Promise.all([
      UserShelve.deleteOne({ _id: existingShelve._id }),
      Book.findByIdAndUpdate(bookId, {
        $pull: { userShelves: existingShelve._id },
      }),
    ]);
    return { message: "Removed from shelf", status: "removed" };
  } else {
    const newShelve = await UserShelve.create({ user: userId, book: bookId });

    await Book.findByIdAndUpdate(bookId, {
      $push: { userShelves: newShelve._id },
    });

    return { data: newShelve, status: "added", message: "Added to shelf" };
  }
};

export const UserShelveService = {
  toggleShelve,
};
