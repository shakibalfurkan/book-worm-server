import mongoose from "mongoose";
import type { ITutorial } from "./tutorial.interface.js";

const tutorialSchema = new mongoose.Schema<ITutorial>(
  {
    title: {
      type: String,
      required: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tutorial = mongoose.model<ITutorial>("Tutorial", tutorialSchema);
