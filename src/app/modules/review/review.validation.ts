import z from "zod";

const createReviewSchema = z.object({
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
    rating: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Rating is required"
            : "Rating must be a string",
      })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be less than 5"),
    comment: z.string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Comment is required";
        }
        return "Comment must be a string";
      },
    }),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
};
