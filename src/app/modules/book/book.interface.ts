import type { Types } from "mongoose";

export interface IBook {
  _id: Types.ObjectId | string;
  title: string;
  author: string;
  genre: Types.ObjectId;
  description: string;
  coverImage: string;
  totalPages: number;
  userShelves: Types.ObjectId[];
  reviews: Types.ObjectId[];
  avgRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
