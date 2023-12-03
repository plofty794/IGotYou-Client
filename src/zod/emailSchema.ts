import { z } from "zod";

export const ZodEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/(@gmail.com)$/, { message: "A gmail account is required" })
    .email({ message: "Invalid email" }),
});

export type EmailSchema = z.infer<typeof ZodEmailSchema>;
