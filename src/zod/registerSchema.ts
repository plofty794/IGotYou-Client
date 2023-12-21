import { z } from "zod";

export const ZodRegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .regex(/(@gmail.com)$/, { message: "A gmail account is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password is too short" })
      .max(15, { message: "Password must contain at least 15 characters" })
      // .regex(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]*$/,
      //   {
      //     message:
      //       "Password must contain at least 1 number, 1 lower, 1 uppercase letter, and 1 special character",
      //   }
      // )
      .trim(),
    confirmPassword: z.string().min(1, { message: "Field required" }).trim(),
  })
  .refine((prop) => prop.password === prop.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof ZodRegisterSchema>;
