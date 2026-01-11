import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  photo: string;
  password?: string;
  role: "USER" | "ADMIN";

  readingGoal: {
    year: number;
    targetBooks: number;
  };

  following: Types.ObjectId[] | IUser[];
  followers: Types.ObjectId[] | IUser[];
  favoriteGenres: Types.ObjectId[];

  stats: {
    totalBooksRead: number;
    totalPagesRead: number;
    booksReadThisYear: number;
    lastReadingDate: Date | null;
    currentStreak: number;
    longestStreak: number;
  };

  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;

  readonly readingGoalProgress: number;
  readonly followersCount: number;
  readonly followingCount: number;
}
