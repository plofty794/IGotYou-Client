import { z } from "zod";

export const ZodUsernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Invalid username" })
    .min(4, { message: "Username too short" })
    .max(15, { message: "Username must be at least 15 characters" }),
});

export type UsernameSchema = z.infer<typeof ZodUsernameSchema>;
