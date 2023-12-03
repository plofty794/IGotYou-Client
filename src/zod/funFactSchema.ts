import { z } from "zod";

export const ZodFunFactSchema = z.object({
  funFact: z.string().min(1, { message: "This field is required" }).max(25, {
    message: "Just write a short fact about you at least 25 characters",
  }),
});

export type FunFactSchema = z.infer<typeof ZodFunFactSchema>;
