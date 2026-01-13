import type { Types } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre: Types.ObjectId;
  description: string;
  coverImage: string;
  totalPages: number;
  shelfCount: {
    wantToRead: number;
    currentlyReading: number;
    read: number;
  };
  reviews: Types.ObjectId[];
  avgRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
