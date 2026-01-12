export interface IUser {
  name: string;
  email: string;
  photo: string;
  password: string;
  role: "USER" | "ADMIN";

  readingGoal: {
    targetBooks: number;
  };

  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
