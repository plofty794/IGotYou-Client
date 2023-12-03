import { z } from "zod";

export const ZodMobilePhoneSchema = z.object({
  mobile_phone: z.string().min(1, { message: "Mobile phone is required" }),
});

export type MobilePhoneSchema = z.infer<typeof ZodMobilePhoneSchema>;
