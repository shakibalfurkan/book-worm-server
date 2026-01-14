import z from "zod";

const createTutorialSchema = z.object({
  body: z.object({
    title: z.string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Title is required";
        }
        return "Title must be a string";
      },
    }),
    youtubeUrl: z.string({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Youtube URL is required";
        }
        return "Youtube URL must be a string";
      },
    }),
  }),
});

export const TutorialValidation = {
  createTutorialSchema,
};
