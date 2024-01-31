import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetBookingRequestDetails from "@/hooks/useGetBookingRequestDetails";
import { compareAsc, format, formatDistance } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";
import DeclineReasons from "./DeclineReasons";
import GuestInformation, { TGuestID } from "./GuestInformation";
import useSendBookingRequestUpdate from "@/hooks/useSendBookingRequestUpdate";

function BookingRequest() {
  const { data, isPending } = useGetBookingRequestDetails();
  const sendBookingRequestUpdate = useSendBookingRequestUpdate();

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <Card className="w-full">
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-bold">Booking request details</h1>
              <Badge
                className={` ${
                  data?.data.bookingRequest.status === "pending"
                    ? "bg-amber-600 hover:bg-amber-500"
                    : data?.data.bookingRequest.status === "approved"
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-red-600 hover:bg-red-500"
                } w-max uppercase`}
              >
                {data?.data.bookingRequest.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="mx-auto flex w-max flex-col items-center">
              <div className="h-20 w-20">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    className="object-cover"
                    src={data?.data.bookingRequest.guestID.photoUrl}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <span className="mt-2 text-sm font-bold">
                {data?.data.bookingRequest.guestID.username} wants to book{" "}
              </span>
              <div className="flex gap-1">
                <Link
                  replace
                  to={`/hosting-listings/edit/${data?.data.bookingRequest.listingID._id}`}
                  className="text-sm font-semibold underline"
                >
                  {data?.data.bookingRequest.listingID.serviceTitle}
                </Link>
                <span className="text-sm font-semibold ">
                  for{" "}
                  {formatDistance(
                    new Date(
                      data?.data.bookingRequest.requestedBookingDateEndsAt,
                    ),
                    new Date(
                      data?.data.bookingRequest.requestedBookingDateStartsAt,
                    ),
                  )}
                  {" - "}
                  {formatValue({
                    value: String(data?.data.bookingRequest.totalPrice),
                    intlConfig: {
                      locale: "PH",
                      currency: "php",
                    },
                  })}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-2">
                <h3 className="text-sm font-semibold uppercase">Message</h3>
                <CardDescription className="mt-2 text-sm font-semibold italic">
                  {data?.data.bookingRequest.message}
                </CardDescription>
              </div>
              <div className="flex w-full items-end justify-between">
                <GuestInformation
                  guestID={data?.data.bookingRequest.guestID as TGuestID}
                />
                <div className="h-max w-max rounded-md border p-3 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <CardDescription className="text-sm font-semibold text-black">
                      Requested dates
                    </CardDescription>
                    {data?.data.bookingRequest.status === "approved" ? (
                      <Badge
                        variant={"outline"}
                        className="font-bold text-green-600"
                      >
                        Reserved
                      </Badge>
                    ) : compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ) > 0 ? (
                      <Badge variant={"destructive"}>Expired</Badge>
                    ) : (
                      <Badge
                        variant={"outline"}
                        className="font-bold text-green-600"
                      >
                        Valid
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-2 font-semibold">
                    {format(
                      new Date(
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ),
                      "EEE MMMM do",
                    )}
                    {" - "}
                    {format(
                      new Date(
                        new Date(
                          data?.data.bookingRequest.requestedBookingDateEndsAt,
                        ),
                      ),
                      "EEE MMMM do",
                    )}
                  </CardDescription>
                  {data?.data.bookingRequest.guestCancelReasons && (
                    <Badge variant={"destructive"} className="capitalize">
                      Cancellation Reason -{" "}
                      {data?.data.bookingRequest.guestCancelReasons}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          {data?.data.bookingRequest.status !== "approved" && (
            <>
              <Separator />
              <CardFooter className="justify-between gap-2 p-4">
                <div className="flex items-center gap-2">
                  <Button
                    disabled={
                      compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ) > 0 ||
                      sendBookingRequestUpdate.isPending ||
                      data?.data.bookingRequest.status === "cancelled"
                    }
                    onClick={() =>
                      sendBookingRequestUpdate.mutate({
                        bookingRequestID: data?.data.bookingRequest._id,
                        receiverName:
                          data?.data.bookingRequest.guestID.username,
                      })
                    }
                    className="rounded-full bg-gray-950"
                  >
                    Accept
                  </Button>
                  <DeclineReasons
                    isCancelled={
                      data?.data.bookingRequest.status === "cancelled"
                    }
                    isExpired={
                      compareAsc(
                        new Date().setHours(0, 0, 0, 0),
                        new Date(
                          data?.data.bookingRequest
                            .requestedBookingDateStartsAt,
                        ),
                      ) > 0
                    }
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Link to={"/messages"}>
                    <Button variant={"ghost"} className="rounded-full">
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
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>
                    </Button>
                  </Link>
                  <Button variant={"link"}>
                    <Link
                      reloadDocument
                      replace
                      to={`/users/visit/show/${data?.data.bookingRequest.guestID._id}`}
                    >
                      View profile
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
}

export default BookingRequest;
