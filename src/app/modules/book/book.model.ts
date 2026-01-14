import mongoose from "mongoose";
import type { IBook } from "./book.interface.js";

const bookSchema = new mongoose.Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },

    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },

    description: { type: String, required: true },

    coverImage: { type: String, required: true },

    totalPages: { type: Number, required: true },
    userShelves: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    reviews: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
      default: [],
    },
    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
