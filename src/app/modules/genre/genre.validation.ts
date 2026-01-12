import z from "zod";

const createGenreSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .trim(),

    description: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Description is required"
            : "Description must be a string",
      })
      .min(2, "Description must be at least 2 characters")
      .max(100, "Description must be less than 100 characters")
      .trim(),
  }),
});

export const GenreValidation = {
  createGenreSchema,
};
