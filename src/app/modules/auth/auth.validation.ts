import z from "zod";

const userRegistrationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .min(2, { error: "Name must be 2 characters long" })
      .trim(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less then 20 characters" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      ),
  }),
});

const userLoginSchema = z.object({
  body: z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Invalid email address",
      })
      .trim(),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(8, { error: "Password must be 8 characters long" })
      .max(20, { error: "Password must be less then 20 characters" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      ),
  }),
});

export const AuthValidation = {
  userRegistrationSchema,
  userLoginSchema,
};
