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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useGetBookingRequestDetails from "@/hooks/useGetBookingRequestDetails";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { compareAsc, formatDistance } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";
import DeclineReasons from "./DeclineReasons";

function BookingRequest() {
  const { data, isPending } = useGetBookingRequestDetails();

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
                <span className="text-sm font-semibold underline">
                  {data?.data.bookingRequest.listingID.serviceDescription}
                </span>
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
                <CardDescription className="text-sm font-semibold italic">
                  {data?.data.bookingRequest.message}
                </CardDescription>
              </div>
              <div className="flex w-full items-end justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="border-black text-xs"
                      variant={"outline"}
                    >
                      {data?.data.bookingRequest.guestID.username}'s information
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Card className="w-max">
                      <CardHeader className="p-4"></CardHeader>
                      <CardContent className="flex flex-col gap-2">
                        {data?.data.bookingRequest.guestID.emailVerified ? (
                          <div className="flex w-max items-center justify-center gap-2">
                            {" "}
                            <CheckCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block rounded-full bg-green-600"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Email verified
                            </p>
                          </div>
                        ) : (
                          <div className="flex w-max items-center justify-center gap-2">
                            {" "}
                            <CrossCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block rounded-full bg-red-600"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Email verified
                            </p>
                          </div>
                        )}
                        {data?.data.bookingRequest.guestID.identityVerified ? (
                          <div className="flex w-max items-center justify-center gap-2">
                            {" "}
                            <CheckCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block rounded-full bg-green-600"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Identity verified
                            </p>
                          </div>
                        ) : (
                          <div className="flex w-max items-center justify-center gap-2">
                            {" "}
                            <CrossCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block rounded-full bg-red-600"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Identity (not verified)
                            </p>
                          </div>
                        )}
                        {data?.data.bookingRequest.guestID.mobileVerified ? (
                          <div className="flex w-max items-center justify-center gap-2">
                            {" "}
                            <CheckCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block rounded-full bg-green-600"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Mobile verified
                            </p>
                            <p className="text-sm font-semibold text-gray-600">
                              {data?.data.bookingRequest.guestID.mobilePhone}
                            </p>
                          </div>
                        ) : (
                          <div className="flex w-max items-center justify-center gap-2">
                            {" "}
                            <CrossCircledIcon
                              color="#FFF"
                              width={22}
                              height={22}
                              className="inline-block rounded-full bg-red-600"
                            />{" "}
                            <p className="text-sm font-semibold text-gray-600">
                              Mobile (not verified)
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>

                <div className="h-max w-max rounded-md border p-4 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <CardDescription className="text-sm font-semibold text-black">
                      Requested dates
                    </CardDescription>
                    {compareAsc(
                      new Date().setHours(0, 0, 0, 0),
                      new Date(
                        data?.data.bookingRequest.requestedBookingDateStartsAt,
                      ),
                    ) > 0 ? (
                      <Badge variant={"destructive"}>Expired</Badge>
                    ) : (
                      <Badge>Available</Badge>
                    )}
                  </div>
                  <CardDescription className="mt-2 font-medium">
                    {new Date(
                      data?.data.bookingRequest.requestedBookingDateStartsAt,
                    ).toDateString()}
                    {" - "}
                    {new Date(
                      data?.data.bookingRequest.requestedBookingDateEndsAt,
                    ).toDateString()}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="justify-between gap-2 p-4">
            <div className="flex items-center gap-2">
              <Button className="rounded-full bg-gray-950">Accept</Button>
              <DeclineReasons />
            </div>
            <Button variant={"link"}>
              <Link to={"/"}>View profile</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

export default BookingRequest;
