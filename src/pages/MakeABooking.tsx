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
import { compareAsc, differenceInDays, format, formatDistance } from "date-fns";
import { useEffect, useMemo, useState } from "react";
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
    from:
      compareAsc(
        new Date().setHours(0, 0, 0, 0),
        new Date(listing.availableAt),
      ) > 0
        ? new Date(new Date().setHours(0, 0, 0, 0))
        : new Date(listing.availableAt),
    to: new Date(listing.endsAt),
  });

  const totalPrice = useMemo(() => {
    if (listing.cancellationPolicy === "Non-refundable") {
      const basePrice =
        listing.price * differenceInDays(date?.to ?? 0, date?.from ?? 0);
      return basePrice - (basePrice * 10) / 100;
    } else {
      return listing.price * differenceInDays(date?.to ?? 0, date?.from ?? 0);
    }
  }, [date?.from, date?.to, listing.cancellationPolicy, listing.price]);

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
      totalPrice,
    });
  }

  return (
    <>
      <section className="px-24 py-12">
        <div className="flex w-full items-center">
          <Button
            variant={"ghost"}
            className="w-max rounded-full"
            onClick={() => history.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
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
          <div className="mt-8 flex flex-col gap-8 px-12">
            <div>
              <span className="text-2xl font-semibold">Your booking</span>
              <div className="mt-4 flex w-full flex-col gap-2">
                <div className="flex w-full items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">Dates</span>
                    <span
                      className={`${
                        date?.from == null || date?.to == null
                          ? "text-red-600"
                          : "text-gray-600"
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
                        "Pick a date"
                      )}
                    </span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"link"}
                        className="items-start rounded-full p-0 text-lg font-semibold"
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
                          endsAt={listing.endsAt}
                          availableAt={listing.availableAt}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            <Separator />
            <form onSubmit={handleSubmit(sendBookingRequest)}>
              <div className="flex w-full flex-col gap-2">
                <div className="flex w-full items-center justify-between">
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
                  spellCheck="true"
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
                    isPending ||
                    !totalPrice
                  }
                  className="ml-auto w-max rounded-full bg-gray-950 p-6 text-lg font-medium"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
          <div className="px-12">
            <Card className="p-6">
              <CardHeader className="mb-4 flex-row gap-4 p-0">
                <span className="h-32 w-32 overflow-hidden rounded-md border">
                  <img
                    src={listing.listingAssets[1].secure_url}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                    alt=""
                  />
                </span>
                <div className="flex w-2/3 flex-col gap-1">
                  <span className="text-lg font-bold">
                    {listing.serviceDescription}
                  </span>
                  <Link
                    to={`https://www.google.com/maps/place/${listing.serviceLocation}`}
                    target="_blank"
                    className="text-sm font-bold text-gray-600 hover:underline"
                  >
                    {listing.serviceLocation}
                  </Link>
                  <Badge className="w-max">
                    {formatDistance(
                      new Date().setHours(0, 0, 0, 0),
                      new Date(listing.endsAt),
                    )}{" "}
                    before listing ends
                  </Badge>
                  <div className="mt-4 flex w-full items-center justify-between">
                    <Badge variant={"outline"}>Cancellation policy</Badge>
                    <Badge
                      variant={"outline"}
                      className={`font-bold ${
                        listing.cancellationPolicy === "Flexible"
                          ? "text-green-600"
                          : listing.cancellationPolicy === "Moderate"
                            ? "text-amber-600"
                            : listing.cancellationPolicy === "Non-refundable"
                              ? "text-red-600"
                              : "text-red-800"
                      }`}
                    >
                      {listing.cancellationPolicy}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="px-2 py-4">
                <span className="text-2xl font-semibold">Price details</span>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold text-gray-600">Price</span>
                    <span className="font-semibold ">
                      {formatValue({
                        value: String(listing.price),
                        intlConfig: {
                          locale: "PH",
                          currency: "php",
                        },
                      })}
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      {date?.from != null && date.to != null
                        ? listing.price +
                          " x " +
                          formatDistance(date.from, date.to)
                        : date?.from == null || date?.to == null
                          ? "Invalid dates"
                          : "No dates"}
                    </span>
                    <span className="font-semibold ">
                      {listing.cancellationPolicy === "Non-refundable" ? (
                        <>
                          {date?.from != null &&
                            date.to != null &&
                            formatValue({
                              value: String(
                                Math.abs(
                                  listing.price *
                                    differenceInDays(
                                      date?.from ?? 0,
                                      date?.to ?? 0,
                                    ),
                                ),
                              ),
                              intlConfig: {
                                locale: "ph",
                                currency: "php",
                              },
                            })}
                          {date?.from == null ||
                            (date?.to == null && (
                              <p className="text-base text-red-600">
                                Pick 2 dates
                              </p>
                            ))}
                        </>
                      ) : (
                        <>
                          {date?.from != null &&
                            date.to != null &&
                            formatValue({
                              value: String(totalPrice),
                              intlConfig: {
                                locale: "ph",
                                currency: "php",
                              },
                            })}
                          {date?.from == null ||
                            (date?.to == null && (
                              <p className="text-base text-red-600">
                                Pick 2 dates
                              </p>
                            ))}
                        </>
                      )}
                    </span>
                  </div>
                  {listing.cancellationPolicy === "Non-refundable" && (
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">
                        Cancellation policy rules applied
                      </span>
                      <span className="font-semibold "> - 10%</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="font-semibold">
                      {date?.from == null || date.to == null ? (
                        <Badge variant={"destructive"}>
                          Invalid date range
                        </Badge>
                      ) : listing.cancellationPolicy === "Non-refundable" ? (
                        formatValue({
                          value: String(totalPrice),
                          intlConfig: {
                            locale: "ph",
                            currency: "php",
                          },
                        })
                      ) : (
                        formatValue({
                          value: String(totalPrice),
                          intlConfig: {
                            locale: "ph",
                            currency: "php",
                          },
                        })
                      )}
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
