import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/firebase config/config";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { TUser } from "./Home";
import { formatValue } from "react-currency-input-field";
import { differenceInDays, subDays } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

function Subscription() {
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData<AxiosResponse<{ user: TUser }>>([
    "profile",
    auth.currentUser?.uid,
  ]);

  useEffect(() => {
    document.title = "Subscription Details - IGotYou";
  }, []);

  return (
    <div className="flex justify-center gap-4 p-12">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Subscription details
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
            />
          </svg>
        </CardHeader>
        <Card className="mx-5 mb-5">
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Status</p>
            <Badge
              className={`font-bold capitalize ${
                profileData?.data.user.subscriptionStatus === "active"
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }`}
            >
              {profileData?.data.user.subscriptionStatus}
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Terms</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {formatValue({
                value: "50",
                intlConfig: {
                  locale: "ph",
                  currency: "php",
                },
              })}{" "}
              / monthly
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Initial Amount</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {formatValue({
                value: "50",
                intlConfig: {
                  locale: "ph",
                  currency: "php",
                },
              })}{" "}
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">Start date</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {subDays(
                new Date(profileData!.data.user.subscriptionExpiresAt),
                30,
              ).toDateString()}
            </Badge>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between p-6 hover:bg-gray-100">
            <p className="text-sm font-bold text-gray-600">End date</p>
            <Badge variant={"secondary"} className="font-bold capitalize">
              {new Date(
                profileData!.data.user.subscriptionExpiresAt,
              ).toDateString()}
            </Badge>
          </div>
        </Card>
      </Card>
      <Card className="h-max w-2/4">
        <CardHeader className="mx-auto w-max">
          <CardTitle className="text-4xl font-extrabold">
            {differenceInDays(
              new Date(profileData!.data.user.subscriptionExpiresAt).setHours(
                0,
                0,
                0,
                0,
              ),
              new Date().setHours(0, 0, 0, 0),
            )}{" "}
            <span className="text-lg font-bold">
              {" "}
              days before subscription ends
            </span>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Subscription;
