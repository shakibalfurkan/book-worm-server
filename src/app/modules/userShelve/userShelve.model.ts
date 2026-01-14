import mongoose from "mongoose";
import type { IUserShelve } from "./userShelve.interface.js";

const userShelveSchema = new mongoose.Schema<IUserShelve>(
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

    shelve: {
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

export const UserShelve = mongoose.model<IUserShelve>(
  "UserShelve",
  userShelveSchema
);
