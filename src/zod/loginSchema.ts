import { z } from "zod";

export const ZodLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/(@gmail.com)$/, { message: "A gmail account is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export type LoginSchema = z.infer<typeof ZodLoginSchema>;
