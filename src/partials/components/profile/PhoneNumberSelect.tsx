import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "../ErrorMessage";
import ParsePhoneNumber from "libphonenumber-js/mobile"; // isPossiblePhoneNumber, // isValidPhoneNumber,

import { useForm } from "react-hook-form";
import {
  MobilePhoneSchema,
  ZodMobilePhoneSchema,
} from "@/zod/mobilePhoneSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { Link, useParams } from "react-router-dom";
import Flag from "react-svg-country-flags";
import { dotPulse } from "ldrs";
import { unlink } from "firebase/auth";
import { PhoneAuth, auth } from "@/firebase config/config";

dotPulse.register();

type TMobilePhone = {
  mobilePhone?: string;
  mobileVerified?: boolean;
};

function PhoneNumberSelect({ mobilePhone, mobileVerified }: TMobilePhone) {
  const { id } = useParams();
  const { mutate, isPending } = useUpdateUserProfile();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
    watch,
  } = useForm<MobilePhoneSchema>({
    defaultValues: {
      mobile_phone: mobilePhone ?? "",
    },
    resolver: zodResolver(ZodMobilePhoneSchema),
  });

  async function mobilePhoneSubmit(data: MobilePhoneSchema) {
    const phoneNumber = ParsePhoneNumber(data.mobile_phone, "PH");
    if (!phoneNumber?.isValid()) {
      return setError("mobile_phone", { message: "Invalid mobile phone" });
    }
    if (
      mobilePhone &&
      auth.currentUser?.providerData
        .map((value) => value.providerId)
        .some((value) => value === "phone")
    ) {
      await unlink(auth.currentUser!, PhoneAuth.providerId);
      mutate({
        mobilePhone: phoneNumber.formatInternational(),
        mobileVerified: false,
      });
    } else {
      mutate({
        mobilePhone: phoneNumber.formatInternational(),
        mobileVerified: false,
      });
    }
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <form onSubmit={handleSubmit(mobilePhoneSubmit)}>
        <div className="mb-2 flex items-center gap-2">
          {<Flag country={"PH"} className="h-9 w-9" />}
          <Input autoFocus inputMode="numeric" {...register("mobile_phone")} />
        </div>
        {errors.mobile_phone && (
          <ErrorMessage message={errors.mobile_phone?.message} />
        )}
        <div className="mt-4 flex items-center gap-2">
          <Button
            disabled={isPending || mobilePhone === watch().mobile_phone}
            className="w-max rounded-full bg-gray-950 text-xs font-semibold"
          >
            {mobilePhone ? "Change" : "Add"}
          </Button>
          {!mobileVerified && mobilePhone ? (
            <Button className="rounded-full bg-gray-950 text-xs">
              <Link to={`/account/verify-phone/${id}`} replace>
                Verify mobile phone
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default PhoneNumberSelect;
