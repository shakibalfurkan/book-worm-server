import type { Types } from "mongoose";

export interface ITutorial {
  title: string;
  youtubeUrl: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
