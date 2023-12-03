import { z } from "zod";

export const ZodWorkSchema = z.object({
  work: z.string().min(1, { message: "This field is required" }).max(20, {
    message: "Just write a short description about your work",
  }),
});

export type WorkSchema = z.infer<typeof ZodWorkSchema>;
