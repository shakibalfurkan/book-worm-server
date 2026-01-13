import type { Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  book: Types.ObjectId;
  rating: number;
  comment: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
