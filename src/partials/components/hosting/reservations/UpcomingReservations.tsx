import useGetUpcomingReservations from "@/hooks/useGetUpcomingReservations";
import Lottie from "lottie-react";
import noReservations from "../../../../assets/no-pending-payments.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { format, formatDistance } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { ScrollArea } from "@/components/ui/scroll-area";

function UpcomingReservations() {
  const { data, isPending } = useGetUpcomingReservations();

  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.pages[0].data.upcomingReservations?.length > 0 ? (
        <ScrollArea className="h-max max-h-96">
          {data?.pages.flatMap((page) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            page.data.upcomingReservations.map((v: any) => (
              <Card className="w-full" key={v._id}>
                <CardHeader className="flex-row justify-between p-4">
                  <div className="flex items-center gap-2">
                    <CardTitle className="m-0">
                      <Badge className="rounded-full text-sm">
                        {v.guestID.username}
                      </Badge>
                    </CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link to={"/messages"}>
                            <Button
                              variant={"outline"}
                              className="rounded-full"
                            >
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
                                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                                />
                              </svg>
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Chat {v.guestID.username}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant={"link"} className="p-0 text-xs">
                      <Link to={`/users/visit/show/${v.guestID._id}`}>
                        View profile
                      </Link>
                    </Button>
                  </div>
                  <Badge
                    className={`rounded-full font-bold uppercase ${
                      v.status === "scheduled"
                        ? "text-blue-600"
                        : v.status === "ongoing"
                          ? "text-yellow-600"
                          : v.status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                    variant={"outline"}
                  >
                    {v.status}
                  </Badge>
                </CardHeader>
                <Separator />
                <CardContent className="flex w-full justify-between p-4">
                  <div className="flex gap-2">
                    <div className="h-full w-44 overflow-hidden rounded-md">
                      <img
                        src={v.listingID.listingAssets[0]?.secure_url}
                        alt="Image"
                        className="h-44 w-full object-cover transition-transform hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-bold ">
                        {v.listingID.serviceTitle}
                      </span>
                      <span className="text-sm font-semibold ">
                        {v.listingID.serviceType}
                      </span>
                      <span className="text-sm font-semibold">
                        Requested dates:{" "}
                        {format(new Date(v.bookingStartsAt), "iii MMMM do")} -{" "}
                        {format(new Date(v.bookingEndsAt), "iii MMMM do")}
                      </span>
                      <Badge
                        variant={"outline"}
                        className={`w-max font-bold ${
                          v.listingID.cancellationPolicy === "Flexible"
                            ? "text-green-600"
                            : v.listingID.cancellationPolicy === "Moderate"
                              ? "text-amber-600"
                              : v.listingID.cancellationPolicy ===
                                  "Non-refundable"
                                ? "text-red-600"
                                : " text-red-800"
                        }`}
                      >
                        Cancellation policy - {v.listingID.cancellationPolicy}
                      </Badge>
                      <Badge className="w-max">
                        Booking starts{" "}
                        {formatDistance(
                          new Date(v.bookingStartsAt),
                          new Date().setHours(0, 0, 0, 0),
                          {
                            addSuffix: true,
                          },
                        ) === "less than a minute ago" && "Today"}
                        {formatDistance(
                          new Date(v.bookingStartsAt),
                          new Date().setHours(0, 0, 0, 0),
                          {
                            addSuffix: true,
                          },
                        ) !== "less than a minute ago" &&
                          formatDistance(
                            new Date(v.bookingStartsAt),
                            new Date().setHours(0, 0, 0, 0),
                            {
                              addSuffix: true,
                            },
                          )}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <div className="flex h-full flex-col items-end justify-between ">
                      <div className="flex flex-col">
                        <Badge
                          variant={"secondary"}
                          className="text-base font-bold"
                        >
                          Total:{" "}
                          {formatValue({
                            value: String(v.paymentAmount),
                            intlConfig: {
                              locale: "PH",
                              currency: "php",
                            },
                          })}
                        </Badge>
                      </div>
                    </div>
                    {v.status !== "cancelled" && (
                      <Button size={"sm"} variant={"outline"}>
                        View reservation details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )),
          )}
        </ScrollArea>
      ) : (
        <div className="mx-auto flex w-max flex-col items-center justify-center gap-2 p-6 ">
          <Lottie
            loop={false}
            animationData={noReservations}
            className="h-32 w-32"
          />
          <span className="font-semibold text-gray-600">
            No upcoming reservations
          </span>
        </div>
      )}
    </>
  );
}

export default UpcomingReservations;
