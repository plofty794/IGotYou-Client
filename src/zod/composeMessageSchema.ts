import { z } from "zod";

export const ZodComposeMessageSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .min(20, { message: "Message is too short" })
    .max(100, { message: "Message can't exceed over 100 characters" }),
});

export type ComposeMessageSchema = z.infer<typeof ZodComposeMessageSchema>;
