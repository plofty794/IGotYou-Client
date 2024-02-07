import { z } from "zod";

export const ZodSendServicePayment = z.object({
  paymentRefNo: z.string().regex(/^([0-9]){4} ([0-9]){3} ([0-9]){6}$/, {
    message: "Invalid Gcash Reference no.",
  }),
});

export type SendServicePaymentSchema = z.infer<typeof ZodSendServicePayment>;
