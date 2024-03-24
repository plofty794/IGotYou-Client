import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MobilePhoneSchema,
  ZodMobilePhoneSchema,
} from "@/zod/mobilePhoneSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ParsePhoneNumber from "libphonenumber-js/mobile";
import ErrorMessage from "./ErrorMessage";
import useRequestPayout from "@/hooks/useRequestPayout";

function RequestPayoutDetails() {
  const { mutate, isPending } = useRequestPayout();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<MobilePhoneSchema>({
    defaultValues: {
      mobile_phone: "",
    },
    resolver: zodResolver(ZodMobilePhoneSchema),
  });

  function sendPayoutRequest(data: MobilePhoneSchema) {
    const phoneNumber = ParsePhoneNumber(data.mobile_phone, "PH");
    if (!phoneNumber?.isValid()) {
      return setError("mobile_phone", { message: "Invalid mobile phone" });
    }
    mutate(data.mobile_phone);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full gap-2 bg-green-500 hover:bg-green-600"
          size={"lg"}
        >
          Request payout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your mobile phone number</DialogTitle>
          <DialogDescription>
            This will serve as the mobile no. receiving the payout.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-1 flex flex-col gap-2"
          onSubmit={handleSubmit(sendPayoutRequest)}
        >
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            autoComplete="off"
            autoFocus
            inputMode="numeric"
            {...register("mobile_phone")}
          />
          {errors.mobile_phone && (
            <ErrorMessage message={errors.mobile_phone?.message} />
          )}
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={isPending || errors.mobile_phone != null}
              className="ml-auto bg-gray-950"
            >
              Send request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RequestPayoutDetails;
