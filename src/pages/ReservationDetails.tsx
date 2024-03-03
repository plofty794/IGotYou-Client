import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetReservationDetails from "@/hooks/useGetReservationDetails";
import Loader from "@/partials/loaders/Loader";
import { useEffect, useState } from "react";
import UserInformation from "./inbox/UserInformation";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { differenceInDays, format } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "react-custom-rating-component";
import useRateUser from "@/hooks/useRateUser";
import ReservationCancellationDialog from "@/partials/components/ReservationCancellationDialog";
import { toast } from "sonner";
import { CheckCircledIcon } from "@radix-ui/react-icons";

function ReservationDetails() {
  const { mutate } = useRateUser();
  const { data, isPending } = useGetReservationDetails();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    document.title = "Reservation Details - IGotYou";
  }, []);

  async function copyToClipboard(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      toast("Email copied to clipboard!", {
        duration: 1000,
        icon: (
          <CheckCircledIcon
            color="#FFF"
            className="inline-block rounded-full bg-[#39c152]"
          />
        ),
      });
    } catch (error) {
      toast("Oops! Something went wrong", {
        description: (error as Error).message as string,
      });
    }
  }

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <section className="p-6">
          <div className="flex w-max items-center justify-center gap-2">
            <Button
              onClick={() => history.back()}
              variant={"ghost"}
              className="rounded-full"
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
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </Button>
            <h1 className="text-2xl font-bold">Reservation details</h1>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex w-2/4 flex-col gap-4 px-4 py-6">
              {data?.data.isHost ? (
                <Card className="flex w-full items-center justify-between">
                  <div>
                    <CardHeader className="px-6 py-4">
                      <CardTitle className="text-xl font-bold">
                        Guest information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold">
                        {data?.data.reservationDetails.guestID.username}
                      </p>
                      <div className="flex w-max items-center justify-center gap-2">
                        <p className="text-sm font-semibold">
                          {data?.data.reservationDetails.guestID.email}
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                onClick={async () =>
                                  await copyToClipboard(
                                    data?.data.reservationDetails.guestID.email,
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                  />
                                </svg>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy email</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </div>
                  <Avatar className="m-6 h-max w-max">
                    <AvatarImage
                      className="h-16 w-16 object-cover"
                      src={data.data.reservationDetails.guestID.photoUrl}
                      loading="lazy"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Card>
              ) : (
                <Card className="flex w-full items-center justify-between">
                  <div>
                    <CardHeader className="px-6 py-4">
                      <CardTitle className="text-xl font-bold">
                        Host information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold">
                        {data?.data.reservationDetails.hostID.username}
                      </p>
                      <div className="flex w-max items-center justify-center gap-2">
                        <p className="text-sm font-semibold">
                          {data?.data.reservationDetails.hostID.email}
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                onClick={async () =>
                                  await copyToClipboard(
                                    data?.data.reservationDetails.hostID.email,
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                  />
                                </svg>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy email</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </div>
                  <Avatar className="m-6 h-max w-max">
                    <AvatarImage
                      className="h-16 w-16 object-cover"
                      src={data?.data.reservationDetails.hostID.photoUrl}
                      loading="lazy"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Card>
              )}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>
                    Overall rating{" "}
                    {data?.data.isHost ? (
                      !data?.data.reservationDetails.guestID.rating.length ? (
                        <Badge className="ml-2">No ratings</Badge>
                      ) : (
                        data?.data.reservationDetails.guestID.rating.length
                      )
                    ) : !data?.data.reservationDetails.hostID.rating.length ? (
                      <Badge className="ml-2">No ratings</Badge>
                    ) : (
                      data?.data.reservationDetails.hostID.rating.length
                    )}
                  </CardTitle>
                </CardHeader>
              </Card>
              <div className="flex w-full items-center justify-between">
                <UserInformation
                  userID={
                    data?.data.isHost
                      ? data.data.reservationDetails.guestID
                      : data?.data.reservationDetails.hostID
                  }
                />
                <Button variant={"link"} size={"sm"}>
                  <Link
                    to={`/users/visit/show/${
                      data?.data.isHost
                        ? data?.data.reservationDetails.guestID._id
                        : data?.data.reservationDetails.hostID._id
                    }`}
                  >
                    Visit profile
                  </Link>
                </Button>
              </div>
              <Separator />
              <div className="flex w-full items-center gap-4">
                <Button size={"sm"} className="w-full rounded-full bg-gray-950">
                  <Link className="w-full" to={"/messages"}>
                    Message
                  </Link>
                </Button>
                <Button size={"sm"} className="w-full rounded-full bg-gray-950">
                  <Link
                    className="w-full"
                    to={`mailto:${data?.data.reservationDetails.guestID.email}`}
                  >
                    Email
                  </Link>
                </Button>
              </div>
              <div className="flex w-full items-center justify-center">
                {data?.data.isHost ? (
                  <Badge variant={"outline"}>
                    {data?.data.reservationDetails.guestID.mobilePhone ??
                      "No mobile phone"}
                  </Badge>
                ) : (
                  <Badge variant={"outline"}>
                    {data?.data.reservationDetails.hostID.mobilePhone ??
                      "No mobile phone"}
                  </Badge>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-600">Listing name</p>
                <p className="text-sm font-bold ">
                  {data?.data.reservationDetails.listingID.serviceTitle}
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-600">
                  Service starting date
                </p>
                <p className="text-sm font-bold ">
                  {format(
                    new Date(data!.data.reservationDetails.bookingStartsAt),
                    "PP",
                  )}
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-600">
                  Service end date
                </p>
                <p className="text-sm font-bold ">
                  {format(
                    new Date(data!.data.reservationDetails.bookingEndsAt),
                    "PP",
                  )}
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-600">
                  Cancellation policy
                </p>
                <p
                  className={`w-max text-sm font-bold ${
                    data?.data.reservationDetails.listingID
                      .cancellationPolicy === "Flexible"
                      ? "text-green-600"
                      : data?.data.reservationDetails.listingID
                            .cancellationPolicy === "Moderate"
                        ? "text-amber-600"
                        : data?.data.reservationDetails.listingID
                              .cancellationPolicy === "Non-refundable"
                          ? "text-red-600"
                          : " text-red-800"
                  }`}
                >
                  {data?.data.reservationDetails.listingID.cancellationPolicy}
                </p>
              </div>
            </div>
            <div className="flex w-2/4 flex-col gap-4 px-4 py-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {data?.data.isHost ? "Payout" : "Payment"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold text-gray-600">
                        Amount per service
                      </span>
                      <span className="text-sm font-semibold">
                        {formatValue({
                          value: String(
                            data?.data.reservationDetails.listingID.price,
                          ),
                          intlConfig: {
                            locale: "PH",
                            currency: "php",
                          },
                        })}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold text-gray-600">
                        Service duration (
                        {Math.abs(
                          differenceInDays(
                            new Date(
                              data?.data.reservationDetails.bookingStartsAt,
                            ),
                            new Date(
                              data?.data.reservationDetails.bookingEndsAt,
                            ),
                          ),
                        )}
                        )
                      </span>
                      <span className="text-sm font-semibold">
                        {Math.abs(
                          differenceInDays(
                            new Date(
                              data?.data.reservationDetails.bookingStartsAt,
                            ),
                            new Date(
                              data?.data.reservationDetails.bookingEndsAt,
                            ),
                          ),
                        )}{" "}
                        x{" "}
                        {formatValue({
                          value: String(
                            data?.data.reservationDetails.listingID.price,
                          ),
                          intlConfig: {
                            locale: "PH",
                            currency: "php",
                          },
                        })}{" "}
                      </span>
                    </div>
                    {data?.data.reservationDetails.listingID
                      .cancellationPolicy === "Non-refundable" && (
                      <div className="flex w-full items-center justify-between">
                        <span className="font-semibold text-gray-600">
                          Cancellation policy rules applied
                        </span>
                        <span className="text-sm font-semibold">
                          {formatValue({
                            value: String(
                              parseInt(
                                data.data.reservationDetails.listingID.price,
                              ) *
                                Math.abs(
                                  differenceInDays(
                                    new Date(
                                      data?.data.reservationDetails
                                        .bookingStartsAt,
                                    ),
                                    new Date(
                                      data?.data.reservationDetails
                                        .bookingEndsAt,
                                    ),
                                  ),
                                ),
                            ),
                            intlConfig: {
                              locale: "ph",
                              currency: "php",
                            },
                          })}{" "}
                          - 10%
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold text-gray-600">Total</span>
                      <span className="text-sm font-semibold">
                        {formatValue({
                          value: String(
                            data?.data.reservationDetails.paymentAmount,
                          ),
                          intlConfig: {
                            locale: "PH",
                            currency: "php",
                          },
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Separator />
              <Button className="border-black" variant={"outline"}>
                <Link
                  className="w-full"
                  to={`/reservation-details/${data?.data.reservationDetails._id}/payment-details`}
                >
                  View payment details
                </Link>
              </Button>
              <div className="flex flex-col gap-2 p-2">
                <p className="text-sm font-semibold">
                  Review {data?.data.isHost ? "guest" : "host"}
                </p>
                {data?.data.isHost &&
                data?.data.hasRating != null &&
                data?.data.hasRating.hostFeedback != null ? (
                  <Textarea
                    defaultValue={data?.data.hasRating.hostFeedback}
                    readOnly
                    placeholder="Write a feedback"
                  />
                ) : !data?.data.isHost &&
                  data?.data.hasRating != null &&
                  data?.data.hasRating.guestFeedback != null ? (
                  <Textarea
                    defaultValue={data?.data.hasRating.guestFeedback}
                    readOnly
                    placeholder="Write a feedback"
                  />
                ) : (
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write a feedback"
                  />
                )}
                <div className="flex flex-col items-center justify-center gap-2 py-2">
                  <p className="text-sm font-semibold">
                    How would you rate the{" "}
                    {data?.data.isHost ? "guest" : "service"}?
                  </p>
                  {data?.data.isHost &&
                  data?.data.hasRating != null &&
                  data?.data.hasRating.hostRating != null ? (
                    <Rating
                      defaultValue={data?.data.hasRating.hostRating}
                      readOnly
                      size="30px"
                      spacing="10px"
                      onChange={(value) => setRating(value)}
                    />
                  ) : !data?.data.isHost &&
                    data?.data.hasRating != null &&
                    data?.data.hasRating.guestRating != null ? (
                    <Rating
                      defaultValue={data?.data.hasRating.guestRating}
                      readOnly
                      size="30px"
                      spacing="10px"
                      onChange={(value) => setRating(value)}
                    />
                  ) : (
                    <Rating
                      defaultValue={0}
                      precision={1}
                      size="30px"
                      spacing="10px"
                      onChange={(value) => setRating(value)}
                    />
                  )}
                </div>
                {data?.data.isHost ? (
                  <Button
                    onClick={() => {
                      mutate({
                        reservationID: data?.data.reservationDetails._id,
                        guestID: data?.data.reservationDetails.guestID._id,
                        hostID: data?.data.reservationDetails.hostID._id,
                        hostFeedback: feedback,
                        hostRating: rating,
                      });
                      setFeedback("");
                      setRating(0);
                    }}
                    disabled={!feedback || !rating}
                    className=" bg-gray-950"
                  >
                    Leave a review
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      mutate({
                        reservationID: data?.data.reservationDetails._id,
                        guestID: data?.data.reservationDetails.guestID._id,
                        hostID: data?.data.reservationDetails.hostID._id,
                        guestFeedback: feedback,
                        guestRating: rating,
                      });
                      setFeedback("");
                      setRating(0);
                    }}
                    disabled={!feedback || !rating}
                    className=" bg-gray-950"
                  >
                    Leave a review
                  </Button>
                )}
                {data?.data.isHost && data.data.hasRating == null && (
                  <ReservationCancellationDialog
                    status={data.data.reservationDetails.status}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ReservationDetails;
