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

    slug: {
      type: String,
      unique: true,
      lowercase: true,
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
genreSchema.index({ slug: 1 });

genreSchema.pre("save", function (this: IGenre & mongoose.Document) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
});

const Genre = mongoose.model<IGenre>("Genre", genreSchema);

export default Genre;
