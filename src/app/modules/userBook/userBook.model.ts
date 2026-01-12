import mongoose from "mongoose";
import type { IUserBook } from "./userBook.interface.js";

const userBookSchema = new mongoose.Schema<IUserBook>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    shelf: {
      type: String,
      enum: ["WANT_TO_READ", "CURRENTLY_READING", "READ"],
      default: "WANT_TO_READ",
    },

    progressPages: {
      type: Number,
      default: 0,
    },

    finishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const UserBook = mongoose.model<IUserBook>("UserBook", userBookSchema);
