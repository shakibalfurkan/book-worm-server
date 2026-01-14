import type { Types } from "mongoose";

export interface IUserShelve {
  user: Types.ObjectId;
  book: Types.ObjectId;
  shelve: string;
  progressPages: number;
  finishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
