import mongoose from "mongoose";
import type { IGenre } from "./genre.interface.js";

const genreSchema = new mongoose.Schema<IGenre>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

genreSchema.index({ name: 1 });

const Genre = mongoose.model<IGenre>("Genre", genreSchema);

export default Genre;
