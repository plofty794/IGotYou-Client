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
import DatePicker from "@/partials/components/DatePicker";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { formatValue } from "react-currency-input-field";
import { DateRange } from "react-day-picker";
import { Link, useOutletContext } from "react-router-dom";
import { dotPulse } from "ldrs";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import {
  ComposeMessageSchema,
  ZodComposeMessageSchema,
} from "@/zod/composeMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendBookingRequest from "@/hooks/useSendBookingRequest";
dotPulse.register();

function MakeABooking() {
  const { mutate, isPending } = useSendBookingRequest();
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    listing: { listing },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useOutletContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ComposeMessageSchema>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(ZodComposeMessageSchema),
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setHours(0, 0, 0, 0)),
    to: new Date(new Date(listing.endsAt).setHours(0, 0, 0, 0)),
  });

  useEffect(() => {
    document.title = "Make A Request - IGotYou";
  }, []);

  function sendBookingRequest(message: ComposeMessageSchema) {
    mutate({
      message: message.message,
      hostID: listing.host._id,
      listingID: listing._id,
      requestedBookingDateStartsAt: date?.from,
      requestedBookingDateEndsAt: date?.to,
    });
  }

  return (
    <>
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
                  <span className="text-gray-600 font-semibold">
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
            <form onSubmit={handleSubmit(sendBookingRequest)}>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full flex items-center justify-between">
                  <Label className="text-xl font-semibold" htmlFor="message">
                    Message{" "}
                  </Label>
                  <Badge
                    variant={`${
                      errors.message?.message ? "destructive" : "secondary"
                    }`}
                  >
                    {watch().message.length} / 100
                  </Badge>
                </div>
                <Textarea
                  {...register("message")}
                  placeholder="Type your message here."
                  id="message"
                  className="font-semibold"
                />
                {errors.message && (
                  <Badge variant={"destructive"} className="block w-max">
                    {errors.message.message}
                  </Badge>
                )}
                <Button
                  disabled={
                    date?.from == null ||
                    date.to == null ||
                    errors.message?.message != null ||
                    isPending
                  }
                  className="bg-gray-950 rounded-full w-max ml-auto text-lg font-medium p-6"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
          <div className="px-12">
            <Card className="p-6">
              <CardHeader className="p-0 mb-4 flex-row gap-4">
                <span className="w-32 h-32 overflow-hidden rounded-md border">
                  <img
                    src={listing.listingPhotos[1].secure_url}
                    className="object-cover w-full h-full hover:scale-110 transition-transform"
                    alt=""
                  />
                </span>
                <div className="flex flex-col gap-1 w-2/3">
                  <span className="text-lg font-bold">
                    {listing.serviceDescription}
                  </span>
                  <Link
                    to={`https://www.google.com/maps/place/${listing.serviceLocation}`}
                    target="_blank"
                    className="hover:underline text-sm font-bold text-gray-600"
                  >
                    {listing.serviceLocation}
                  </Link>
                  <Badge className="w-max">
                    {formatDistanceToNow(new Date(listing.endsAt))} before
                    listing ends
                  </Badge>
                  <div className="mt-4 w-full flex items-center justify-between">
                    <Badge variant={"outline"}>Cancellation policy</Badge>
                    <span
                      className={`text-sm font-bold underline ${
                        listing.cancellationPolicy === "Flexible"
                          ? "text-green-600"
                          : listing.cancellationPolicy === "Moderate"
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {listing.cancellationPolicy}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="px-2 py-4">
                <span className="text-2xl font-semibold">Price details</span>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Price</span>
                    <span className="font-semibold text-gray-600">
                      {formatValue({
                        value: String(listing.price),
                        intlConfig: {
                          locale: "PH",
                          currency: "php",
                        },
                      })}
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                      {date?.from != null && date.to != null
                        ? listing.price +
                          " x " +
                          formatDistance(date.from, date.to)
                        : "No dates"}
                    </span>
                    <span className="font-semibold text-gray-600">
                      {date?.from != null && date.to != null
                        ? formatDistance(date?.to, date?.from)
                        : "?"}
                    </span>
                  </div>
                  <Separator />
                  <div className="w-full flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="font-semibold">
                      {date?.from != null && date.to != null
                        ? formatValue({
                            value: String(
                              listing.price *
                                parseInt(formatDistance(date?.to, date?.from))
                            ),
                            intlConfig: {
                              locale: "PH",
                              currency: "php",
                            },
                          })
                        : "0"}
                    </span>
                  </div>
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
