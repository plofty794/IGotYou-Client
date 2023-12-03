import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Collapsible } from "@radix-ui/react-collapsible";
import { QueryState } from "@tanstack/react-query";
import { useState } from "react";
import PhoneNumberSelect from "../PhoneNumberSelect";

type TUserData = {
  user: {
    email?: string;
    username?: string;
    userStatus?: string;
    work?: string;
    address?: string;
    funFact?: string;
    school?: string;
    emailVerified: boolean;
    mobilePhone: string;
    mobileVerified: boolean;
  };
};

type TCollapsibleData = {
  data: QueryState<TUserData, unknown> | undefined;
};

function CollapsiblePhoneNumber({ data }: TCollapsibleData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="flex justify-between items-start gap-2">
        <div className="text-sm">
          <Label htmlFor="phone-number">Mobile phone</Label>
          <p
            id="phone-number"
            className={`text-xs mt-2 ${isOpen ? "hidden" : ""}`}
          >
            {data?.data?.user.mobilePhone
              ? "Edit your mobile phone"
              : "Add a phone number so confirmed guests and IGotYou can get in touch."}
          </p>
        </div>
        <CollapsibleTrigger>
          <span className="underline font-medium text-sm">
            {isOpen ? "Cancel" : data?.data?.user.mobilePhone ? "Edit" : "Add"}
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <span className="text-xs">
          Use a phone number you’ll always have access to.
        </span>
        <div className="mt-4 flex gap-2">
          <PhoneNumberSelect
            mobilePhone={data?.data?.user.mobilePhone}
            mobileVerified={data?.data?.user.mobileVerified}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapsiblePhoneNumber;
