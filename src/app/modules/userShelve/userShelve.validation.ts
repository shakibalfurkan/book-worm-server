import z from "zod";

const toggleShelveSchema = z.object({
  body: z.object({
    user: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "User is required"
            : "User must be a string",
      })
      .trim(),
    book: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Book is required"
            : "Book must be a string",
      })
      .trim(),
  }),
});

export const UserShelveValidation = {
  toggleShelveSchema,
};
