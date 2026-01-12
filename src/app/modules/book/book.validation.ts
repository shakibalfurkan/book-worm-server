import z from "zod";

const createBookValidation = z.object({
  body: z.object({
    title: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Title is required"
            : "Title must be a string",
      })
      .min(2, "Title must be at least 2 characters")
      .max(300, "Title must be less than 300 characters")
      .trim(),
    author: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Author is required"
            : "Author must be a string",
      })
      .min(2, "Author must be at least 2 characters")
      .max(100, "Author must be less than 100 characters")
      .trim(),
    genre: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Genre is required"
            : "Genre must be a string",
      })
      .trim(),

    description: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Description is required"
            : "Description must be a string",
      })
      .min(2, "Description must be at least 2 characters")
      .max(1000, "Description must be less than 1000 characters")
      .trim(),
    totalPages: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Description is required"
            : "Description must be a string",
      })
      .min(1, "Total pages must be at least 1")
      .trim(),
  }),
});

export const BookValidation = {
  createBookValidation,
};
