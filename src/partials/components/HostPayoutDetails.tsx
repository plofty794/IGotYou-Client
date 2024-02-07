import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TReservationDetails } from "@/pages/PaymentDetails";
import { Button } from "@/components/ui/button";
import { formatValue } from "react-currency-input-field";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function HostPayoutDetails({
  reservationDetails,
}: {
  reservationDetails: TReservationDetails;
}) {
  return (
    <Card className="h-max w-full shadow-lg">
      <CardHeader className="flex w-full flex-row items-center justify-between">
        <CardTitle className="text-lg">Payout details</CardTitle>
        {reservationDetails.partialPaymentVerificationStatus != null &&
          reservationDetails.fullPaymentVerificationStatus == null && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"} variant={"link"} className="p-0">
                  Previous payment details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Partial payment details</DialogTitle>
                </DialogHeader>
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Reference no.
                    </p>
                    <p className="text-sm font-semibold ">
                      {reservationDetails.partialPaymentRefNo ?? "N/A"}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Amount received
                    </p>
                    <p className="text-sm font-semibold ">
                      {formatValue({
                        value: String(reservationDetails.partialPaymentAmount),
                        intlConfig: {
                          locale: "ph",
                          currency: "php",
                        },
                      }) ?? "N/A"}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Payment type
                    </p>
                    <p className="text-sm font-semibold capitalize">
                      {reservationDetails.paymentType.split("-").join(" ") ??
                        "N/A"}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm font-semibold text-gray-600">
                      Date & time of payment
                    </p>
                    <p className="text-xs font-semibold">
                      {format(
                        new Date(reservationDetails.partialPaymentDate),
                        "PP p",
                      )}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex w-full flex-col items-center gap-2">
                    <Badge>Payment proof photo</Badge>
                    <img
                      loading="lazy"
                      alt="Partial payment photo"
                      className="h-full max-h-64 w-full max-w-md rounded-lg border object-cover shadow-lg"
                      src={
                        (reservationDetails as TReservationDetails)
                          .partialPaymentProofPhoto.secure_url
                      }
                    />
                  </div>
                </CardContent>
              </DialogContent>
            </Dialog>
          )}
      </CardHeader>
      <Avatar className="mx-auto h-max w-max">
        <AvatarImage
          className="h-20 w-20"
          src={reservationDetails.guestID.photoUrl!}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <CardDescription className="text-center text-base font-bold text-black">
        {reservationDetails.guestID.username}
      </CardDescription>
      {reservationDetails.fullPaymentVerificationStatus != null &&
      reservationDetails.partialPaymentVerificationStatus != null ? (
        <>
          <Tabs defaultValue="payment-1" className="mt-4 w-full p-2">
            <TabsList className="w-full gap-2 bg-white">
              <TabsTrigger asChild className="w-full border" value="payment-1">
                <Button variant={"ghost"}>Payment #1</Button>
              </TabsTrigger>
              <TabsTrigger asChild className="w-full border" value="payment-2">
                <Button variant={"ghost"}>Payment #2</Button>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="payment-1">
              <CardContent className="mt-4 flex flex-col gap-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Reference no.
                  </p>
                  <p className="text-sm font-semibold ">
                    {reservationDetails.partialPaymentRefNo ?? "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Amount received
                  </p>
                  <p className="text-sm font-semibold ">
                    {formatValue({
                      value: String(reservationDetails.partialPaymentAmount),
                      intlConfig: {
                        locale: "ph",
                        currency: "php",
                      },
                    }) ?? "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Payment type
                  </p>
                  <p className="text-sm font-semibold capitalize">
                    {reservationDetails.paymentType.split("-").join(" ") ??
                      "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Date & time of payment
                  </p>
                  <p className="text-xs font-semibold">
                    {format(
                      new Date(reservationDetails.partialPaymentDate),
                      "PP p",
                    )}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full flex-col items-center gap-2">
                  <Badge>Payment proof photo</Badge>
                  <img
                    loading="lazy"
                    alt="Partial payment photo"
                    className="h-full max-h-64 w-full max-w-md rounded-lg border object-cover shadow-lg"
                    src={
                      (reservationDetails as TReservationDetails)
                        .partialPaymentProofPhoto.secure_url
                    }
                  />
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="payment-2">
              <CardContent className="mt-4 flex flex-col gap-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Reference no.
                  </p>
                  <p className="text-sm font-semibold ">
                    {reservationDetails.fullPaymentRefNo ?? "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Amount received
                  </p>
                  <p className="text-sm font-semibold ">
                    {formatValue({
                      value: String(reservationDetails.partialPaymentAmount),
                      intlConfig: {
                        locale: "ph",
                        currency: "php",
                      },
                    }) ?? "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Payment type
                  </p>
                  <p className="text-sm font-semibold capitalize">
                    {reservationDetails.paymentType.split("-").join(" ") ??
                      "N/A"}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Date & time of payment
                  </p>
                  <p className="text-xs font-semibold">
                    {format(
                      new Date(reservationDetails.fullPaymentDate),
                      "PP p",
                    )}
                  </p>
                </div>
                <Separator />
                <div className="flex w-full flex-col items-center gap-2">
                  <Badge>Payment proof photo</Badge>
                  <img
                    loading="lazy"
                    alt="Partial payment photo"
                    className="h-full max-h-64 w-full max-w-md rounded-lg border object-cover shadow-lg"
                    src={
                      (reservationDetails as TReservationDetails)
                        .fullPaymentProofPhoto.secure_url
                    }
                  />
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex w-full flex-col gap-2">
              {reservationDetails.confirmServiceEnded === true &&
              reservationDetails.fullPaymentVerificationStatus === "success" ? (
                <Button
                  className="w-full gap-2 bg-green-500 hover:bg-green-600"
                  size={"lg"}
                >
                  Request payout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full gap-2 bg-green-500 hover:bg-green-600"
                      size={"lg"}
                    >
                      Request payout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl p-0">
                    <DialogHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon
                          color="orange"
                          width={25}
                          height={25}
                        />
                        <DialogTitle className="text-base font-semibold">
                          Oops! Request Payment Payout Blocked
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <Separator />
                    <DialogFooter>
                      <ScrollArea className="max-h-64">
                        <div className="flex flex-col gap-4 px-6 py-4">
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm ">
                              To ensure that your experience meets your
                              expectations, we've implemented a simple
                              confirmation and payment process.
                            </span>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm font-bold">
                              Here's how it works:
                            </span>
                            <ul className="flex list-disc flex-col gap-1 px-6">
                              <li className="text-sm">
                                <span className="font-bold">
                                  Confirmation of Service Completion:
                                </span>{" "}
                                After the service has concluded, the guest have
                                the opportunity to confirm its completion. This
                                step ensures that you are fully satisfied with
                                the service before finalizing it.
                              </li>
                              <li className="text-sm ">
                                <span className="font-bold">
                                  Payment Fulfillment:
                                </span>{" "}
                                Before confirming the service's end, please
                                ensure that all payments associated with the
                                service have been fulfilled. This step helps us
                                maintain a secure and transparent payment
                                process, especially if you're using our escrow
                                payment method.
                              </li>
                              <li className="text-sm ">
                                <span className="font-bold">
                                  Host Notification:
                                </span>{" "}
                                Once the guest has confirm the service's
                                completion, we'll notify the host/provider about
                                the confirmation. This allows them to proceed
                                with requesting payment checkout.
                              </li>
                            </ul>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm">
                              We strive to make this process as seamless as
                              possible for you. Should you have any questions or
                              concerns, feel free to reach out to our customer
                              support team. We're here to assist you every step
                              of the way.
                            </span>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full gap-2">
                {" "}
                <Button size={"sm"} className="w-full bg-gray-950">
                  Email {reservationDetails.guestID.username}
                </Button>
                <Button size={"sm"} className="w-full bg-gray-950">
                  Message
                </Button>
              </div>
            </div>
          </CardFooter>
          <div className="mx-auto flex w-max flex-col px-6 py-0 pb-4">
            <Badge variant={"destructive"}>
              Payment must be fulfilled before the service ends
            </Badge>
            <Button variant={"link"} size={"sm"}>
              <Link
                to={"https://www.investopedia.com/terms/e/escrow.asp"}
                target="_blank"
                className="w-full"
              >
                Learn more about this payment method
              </Link>
            </Button>
          </div>
        </>
      ) : reservationDetails.paymentType === "full-payment" ? (
        <>
          <CardContent className="mt-4 flex flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Reference no.
              </p>
              <p className="text-sm font-semibold ">
                {reservationDetails.fullPaymentRefNo ?? "N/A"}
              </p>
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Amount received
              </p>
              <p className="text-sm font-semibold ">
                {formatValue({
                  value: String(reservationDetails.fullPaymentAmount),
                  intlConfig: {
                    locale: "ph",
                    currency: "php",
                  },
                }) ?? "N/A"}
              </p>
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Payment type
              </p>
              <p className="text-sm font-semibold capitalize">
                {reservationDetails.paymentType.split("-").join(" ") ?? "N/A"}
              </p>
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Date & time of payment
              </p>
              <p className="text-xs font-semibold">
                {format(new Date(reservationDetails.fullPaymentDate), "PP p")}
              </p>
            </div>
            <Separator />
            <div className="flex w-full flex-col items-center gap-2">
              <Badge>Payment proof photo</Badge>
              <img
                loading="lazy"
                alt="Partial payment photo"
                className="h-full max-h-64 w-full max-w-md rounded-lg border object-cover shadow-lg"
                src={
                  (reservationDetails as TReservationDetails)
                    .fullPaymentProofPhoto.secure_url
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex w-full flex-col gap-2">
              {reservationDetails.status === "completed" &&
              reservationDetails.fullPaymentVerificationStatus === "success" ? (
                <Button
                  className="w-full gap-2 bg-green-500 hover:bg-green-600"
                  size={"lg"}
                >
                  Request payout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full gap-2 bg-green-500 hover:bg-green-600"
                      size={"lg"}
                    >
                      Request payout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl p-0">
                    <DialogHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon
                          color="orange"
                          width={25}
                          height={25}
                        />
                        <DialogTitle className="text-base font-semibold">
                          Oops! Request Payment Payout Blocked
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <Separator />
                    <DialogFooter>
                      <ScrollArea className="max-h-64">
                        <div className="flex flex-col gap-4 px-6 py-4">
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm ">
                              To ensure that your experience meets your
                              expectations, we've implemented a simple
                              confirmation and payment process.
                            </span>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm font-bold">
                              Here's how it works:
                            </span>
                            <ul className="flex list-disc flex-col gap-1 px-6">
                              <li className="text-sm">
                                <span className="font-bold">
                                  Confirmation of Service Completion:
                                </span>{" "}
                                After the service has concluded, the guest have
                                the opportunity to confirm its completion. This
                                step ensures that you are fully satisfied with
                                the service before finalizing it.
                              </li>
                              <li className="text-sm ">
                                <span className="font-bold">
                                  Payment Fulfillment:
                                </span>{" "}
                                Before confirming the service's end, please
                                ensure that all payments associated with the
                                service have been fulfilled. This step helps us
                                maintain a secure and transparent payment
                                process, especially if you're using our escrow
                                payment method.
                              </li>
                              <li className="text-sm ">
                                <span className="font-bold">
                                  Host Notification:
                                </span>{" "}
                                Once the guest has confirm the service's
                                completion, we'll notify the host/provider about
                                the confirmation. This allows them to proceed
                                with requesting payment checkout.
                              </li>
                            </ul>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm">
                              We strive to make this process as seamless as
                              possible for you. Should you have any questions or
                              concerns, feel free to reach out to our customer
                              support team. We're here to assist you every step
                              of the way.
                            </span>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full gap-2">
                {" "}
                <Button size={"sm"} className="w-full bg-gray-950">
                  Email {reservationDetails.guestID.username}
                </Button>
                <Button size={"sm"} className="w-full bg-gray-950">
                  Message
                </Button>
              </div>
            </div>
          </CardFooter>
          <div className="mx-auto flex w-max flex-col px-6 py-0 pb-4">
            <Badge variant={"destructive"}>
              Payment must be fulfilled before the service ends
            </Badge>
            <Button variant={"link"} size={"sm"}>
              <Link
                to={"https://www.investopedia.com/terms/e/escrow.asp"}
                target="_blank"
                className="w-full"
              >
                Learn more about this payment method
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <CardContent className="flex flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Reference no.
              </p>
              <p className="text-sm font-semibold ">
                {reservationDetails.partialPaymentRefNo ?? "N/A"}
              </p>
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Amount received
              </p>
              <p className="text-sm font-semibold ">
                {reservationDetails.partialPaymentAmount ? (
                  formatValue({
                    value: String(reservationDetails.partialPaymentAmount),
                    intlConfig: {
                      locale: "ph",
                      currency: "php",
                    },
                  })
                ) : (
                  <p className="text-sm font-semibold">N/A</p>
                )}
              </p>
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Payment type
              </p>
              <p className="text-sm font-semibold capitalize">
                {reservationDetails.paymentType?.split("-").join(" ") ?? "N/A"}
              </p>
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Date & time of payment
              </p>
              <p className="text-xs font-semibold">
                {reservationDetails.partialPaymentDate ? (
                  format(
                    new Date(reservationDetails.partialPaymentDate),
                    "PP p",
                  )
                ) : (
                  <p className="text-sm font-semibold">N/A</p>
                )}
              </p>
            </div>
            <Separator />
            <div className="flex w-full flex-col items-center gap-2">
              <Badge>Payment proof photo</Badge>
              {reservationDetails.partialPaymentProofPhoto?.secure_url ? (
                <img
                  loading="lazy"
                  alt="Partial payment photo"
                  className="h-full max-h-64 w-full max-w-md rounded-lg border object-cover shadow-lg"
                  src={
                    (reservationDetails as TReservationDetails)
                      .partialPaymentProofPhoto.secure_url
                  }
                />
              ) : (
                <Card className="max-h-64 w-full">
                  <div className="flex flex-col items-center justify-center gap-2 p-8">
                    <p className="text-sm font-semibold text-gray-600">
                      Payment proof photo will be shown here
                    </p>
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
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                </Card>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex w-full flex-col gap-2">
              {reservationDetails.status === "completed" &&
              reservationDetails.fullPaymentVerificationStatus === "success" ? (
                <Button
                  className="w-full gap-2 bg-green-500 hover:bg-green-600"
                  size={"lg"}
                >
                  Request payout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full gap-2 bg-green-500 hover:bg-green-600"
                      size={"lg"}
                    >
                      Request payout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl p-0">
                    <DialogHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon
                          color="orange"
                          width={25}
                          height={25}
                        />
                        <DialogTitle className="text-base font-semibold">
                          Oops! Service Confirmation Blocked
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <Separator />
                    <DialogFooter>
                      <ScrollArea className="max-h-64">
                        <div className="flex flex-col gap-4 px-6 py-4">
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm ">
                              To ensure that your experience meets your
                              expectations, we've implemented a simple
                              confirmation and payment process.
                            </span>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm font-bold">
                              Here's how it works:
                            </span>
                            <ul className="flex list-disc flex-col gap-1 px-6">
                              <li className="text-sm">
                                <span className="font-bold">
                                  Confirmation of Service Completion:
                                </span>{" "}
                                After the service has concluded, the guest have
                                the opportunity to confirm its completion. This
                                step ensures that you are fully satisfied with
                                the service before finalizing it.
                              </li>
                              <li className="text-sm ">
                                <span className="font-bold">
                                  Payment Fulfillment:
                                </span>{" "}
                                Before confirming the service's end, please
                                ensure that all payments associated with the
                                service have been fulfilled. This step helps us
                                maintain a secure and transparent payment
                                process, especially if you're using our escrow
                                payment method.
                              </li>
                              <li className="text-sm ">
                                <span className="font-bold">
                                  Host Notification:
                                </span>{" "}
                                Once the guest has confirm the service's
                                completion, we'll notify the host/provider about
                                the confirmation. This allows them to proceed
                                with requesting payment checkout.
                              </li>
                            </ul>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <span className="text-sm">
                              We strive to make this process as seamless as
                              possible for you. Should you have any questions or
                              concerns, feel free to reach out to our customer
                              support team. We're here to assist you every step
                              of the way.
                            </span>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full gap-2">
                {" "}
                <Button size={"sm"} className="w-full bg-gray-950">
                  Email {reservationDetails.guestID.username}
                </Button>
                <Button size={"sm"} className="w-full bg-gray-950">
                  Message
                </Button>
              </div>
            </div>
          </CardFooter>
          <div className="mx-auto flex w-max flex-col px-6 py-0 pb-4">
            <Badge variant={"destructive"}>
              Payment must be fulfilled before the service ends
            </Badge>
            <Button variant={"link"} size={"sm"}>
              <Link
                to={"https://www.investopedia.com/terms/e/escrow.asp"}
                target="_blank"
                className="w-full"
              >
                Learn more about this payment method
              </Link>
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default HostPayoutDetails;
