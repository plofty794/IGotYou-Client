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
    <div className="w-full flex flex-col gap-1">
      <form onSubmit={handleSubmit(mobilePhoneSubmit)}>
        <div className="flex items-center gap-2 mb-2">
          {<Flag country={"PH"} className="w-9 h-9" />}
          <Input autoFocus inputMode="numeric" {...register("mobile_phone")} />
        </div>
        {errors.mobile_phone && (
          <ErrorMessage message={errors.mobile_phone?.message} />
        )}
        <div className="mt-4 flex items-center gap-2">
          <Button
            disabled={isPending || mobilePhone === watch().mobile_phone}
            className="w-max font-semibold bg-gray-950 rounded-full text-xs"
          >
            {mobilePhone ? "Change" : "Add"}
          </Button>
          {!mobileVerified && mobilePhone ? (
            <Button className="bg-gray-950 rounded-full text-xs">
              <Link to={`/account/verify-phone/${id}`} reloadDocument replace>
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
