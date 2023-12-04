import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { SocketContextProvider } from "@/context/SocketContext";
import { auth } from "@/firebase config/config";
import DatePicker from "@/partials/components/DatePicker";
import { format, formatDistanceToNow } from "date-fns";
import { useContext, useMemo, useState } from "react";
import { formatValue } from "react-currency-input-field";
import { DateRange } from "react-day-picker";
import { Navigate, useOutletContext } from "react-router-dom";
import { dotPulse } from "ldrs";
import { Badge } from "@/components/ui/badge";
dotPulse.register();

function MakeABooking() {
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    listing: { listing },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userProfileData: { user },
  } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContextProvider);
  const [isDateReserved, setIsDateReserved] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  useMemo(() => {
    const fromDateString = listing.reservedDates.map(
      (date: { from: string | number | Date }) =>
        new Date(date.from).toDateString()
    );
    const toDateString = listing.reservedDates.map(
      (date: { to: string | number | Date }) => new Date(date.to).toDateString()
    );
    const reservedDates = fromDateString.concat(toDateString);

    if (
      reservedDates.includes(date?.from?.toDateString()) ||
      reservedDates.includes(date?.to?.toDateString())
    ) {
      setIsDateReserved(true);
    } else {
      setIsDateReserved(false);
    }
  }, [date?.from, date?.to, listing.reservedDates]);

  function sendEmitter({
    guestName,
    hostName,
    hostID,
    listingID,
  }: {
    guestName: string;
    hostName: string;
    hostID: string;
    listingID: string;
  }) {
    socket?.emit("send-bookingRequest", {
      guestName,
      hostName,
      date,
      hostID,
      message,
      type: "Booking-Request",
      listingID,
    });
    document.location.reload();
  }

  return (
    <>
      {user.bookingRequests.find(
        (v: { listingID: string }) => v.listingID === listing._id
      ) ? (
        <Navigate replace to="/bookings" />
      ) : null}
      <section className="py-12 px-24">
        <div className="w-full flex items-center">
          <Button
            variant={"ghost"}
            className="rounded-full w-max"
            onClick={() => history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Button>
          <span className="text-4xl font-medium">Make a booking</span>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-8 mt-8 px-12">
            <div>
              <span className="text-2xl font-semibold">Your booking</span>
              <div className="mt-4 w-full flex justify-between items-start">
                <div className="flex flex-col text-base font-semibold gap-1">
                  <span className="text-lg">Dates</span>
                  <span
                    className={`${
                      isDateReserved ? "text-red-600" : "text-gray-600"
                    } font-semibold`}
                  >
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </span>
                  {isDateReserved && (
                    <Badge
                      variant={"destructive"}
                      className="text-xs rounded-full w-max mx-auto"
                    >
                      Dates are already taken
                    </Badge>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="font-semibold text-lg underline rounded-full underline-offset-2"
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold">
                        Choose a date
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <DatePicker
                        date={date}
                        setDate={setDate}
                        listingEndsAt={listing.endsAt}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Separator />
            <div className="w-full">
              <div className="w-full flex items-center justify-between">
                <Label className="text-xl font-semibold" htmlFor="message">
                  Message{" "}
                  <span className="text-sm text-gray-600 font-semibold">
                    (required)
                  </span>
                </Label>
                <span className="font-semibold text-sm text-gray-600">
                  {message.length} / 100
                </span>
              </div>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here."
                maxLength={100}
                id="message"
              />
            </div>
            <Button
              disabled={
                !message.length ||
                loading ||
                !date?.from ||
                !date?.to ||
                isDateReserved
              }
              className="bg-gray-950 rounded-full w-max ml-auto text-lg font-medium p-6"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  sendEmitter({
                    guestName: auth.currentUser?.displayName as string,
                    hostName: listing.host.username as string,
                    listingID: listing._id as string,
                    hostID: listing.host._id,
                  });
                }, 1000);
              }}
            >
              {loading ? (
                <l-dot-pulse size="40" speed="1.3" color="white"></l-dot-pulse>
              ) : (
                "Send request"
              )}
            </Button>
          </div>
          <div className="px-12">
            <Card className="p-6">
              <CardHeader className="p-0 mb-4 flex-row gap-4">
                <span className="w-32 h-32 overflow-hidden rounded-md border">
                  <img
                    src={listing.listingPhotos[1].secure_url}
                    className="max-w-full object-cover w-full h-full hover:scale-110 transition-transform"
                    alt=""
                  />
                </span>
                <div className="flex flex-col gap-1 w-2/3">
                  <span className="text-lg font-bold">
                    {listing.serviceDescription}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {listing.serviceLocation}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {formatDistanceToNow(new Date(listing.endsAt))} before
                    service ends
                  </span>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="px-2 py-4">
                <span className="text-2xl font-semibold">Price details</span>
                <div className="mt-4 w-full flex justify-between items-center">
                  <span className="font-semibold text-gray-600">
                    Total (PHP)
                  </span>
                  <span className="font-semibold">
                    {formatValue({
                      value: listing.price.toString(),
                      intlConfig: {
                        locale: "PH",
                        currency: "php",
                      },
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default MakeABooking;
