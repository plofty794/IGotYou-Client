import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetReservationDetails from "@/hooks/useGetReservationDetails";
import Loader from "@/partials/loaders/Loader";
import { useEffect } from "react";
import { TUser } from "./Home";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import GuestPaymentDetails from "@/partials/components/GuestPaymentDetails";
import HostPayoutDetails from "@/partials/components/HostPayoutDetails";
import { Separator } from "@/components/ui/separator";
import { formatValue } from "react-currency-input-field";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useConfirmServiceEnded from "@/hooks/useConfirmServiceEnded";

function PaymentDetails() {
  const { data, isPending } = useGetReservationDetails();

  useEffect(() => {
    document.title = "Transaction History - IGotYou";
  }, []);

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <>
          {(data?.data.reservationDetails as TReservationDetails)
            .partialPaymentAmount == null && (
            <Dialog
              defaultOpen={
                sessionStorage.getItem("read") === "true" ? false : true
              }
            >
              <DialogContent className="max-w-xl p-0">
                <DialogHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon
                      color="orange"
                      width={25}
                      height={25}
                    />
                    <DialogTitle className="text-base font-semibold">
                      Information About Your Payment Method
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <Separator />
                <DialogFooter>
                  <ScrollArea className="max-h-64">
                    <div className="flex flex-col gap-4 px-6 py-4">
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-sm ">
                          We use a secure{" "}
                          <Link
                            target="_blank"
                            to={
                              "https://www.investopedia.com/terms/e/escrow.asp"
                            }
                            className="font-bold text-red-500 underline underline-offset-2"
                          >
                            escrow payment method
                          </Link>{" "}
                          for all transactions. This means that your payment is
                          held safely in a third-party account until the service
                          is completed to your satisfaction. This ensures both
                          parties are protected throughout the process.
                        </span>
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-sm font-bold">
                          Here's how it works:
                        </span>
                        <ul className="flex list-disc flex-col gap-1 px-6">
                          <li className="text-sm">
                            You will make your payment through our secure
                            platform before the service begins or before it
                            ends.
                          </li>
                          <li className="text-sm ">
                            The funds will be held in an escrow account until
                            the service is complete.
                          </li>
                          <li className="text-sm ">
                            Once the guest confirms they're satisfied with the
                            service, the funds will be available for release to
                            the service provider/host.
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-sm font-bold">
                          For 50% Partial Payment Option:
                        </span>
                        <span className="text-sm">
                          Please note that if you chose the{" "}
                          <span className="font-bold text-red-500 underline underline-offset-2">
                            50% partial payment option
                          </span>
                          , it's essential to{" "}
                          <span className="font-bold text-red-500 underline underline-offset-2">
                            select "50% Partial Payment" again
                          </span>{" "}
                          when making your second payment to avoid excess
                          payment.
                          <span className="text-sm">
                            {" "}
                            Selecting another option might cause problems that
                            will affect the completion of your service.
                          </span>
                        </span>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogFooter>
                <Separator />
                <div className="m-2 ml-auto flex w-max items-center justify-center gap-2 p-2">
                  <Label htmlFor="checkbox" className="text-xs font-medium">
                    Don't show this again
                  </Label>
                  <Checkbox
                    className="rounded-full"
                    onCheckedChange={(checked) =>
                      sessionStorage.setItem("read", JSON.stringify(checked))
                    }
                    id="checkbox"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
          <section className="flex flex-col gap-8 p-6">
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
              <h1 className="text-2xl font-bold">Payment</h1>
            </div>
            <div className="mx-auto flex w-full max-w-5xl gap-6">
              {data?.data.isHost ? (
                <HostPayoutDetails
                  reservationDetails={
                    data?.data.reservationDetails as TReservationDetails
                  }
                />
              ) : (
                <GuestPaymentDetails
                  reservationDetails={
                    data?.data.reservationDetails as TReservationDetails
                  }
                />
              )}
              <Card className="h-max w-full shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Transaction history</CardTitle>
                </CardHeader>
                <CardContent>
                  {(data?.data.reservationDetails as TReservationDetails)
                    .partialPaymentVerificationStatus != null &&
                  (data?.data.reservationDetails as TReservationDetails)
                    .fullPaymentVerificationStatus != null ? (
                    <Tabs defaultValue="partial" className="w-full p-2">
                      <TabsList className="w-full gap-2 bg-white">
                        <TabsTrigger
                          asChild
                          className="w-full border"
                          value="partial"
                        >
                          <Button variant={"ghost"}>Partial payment</Button>
                        </TabsTrigger>
                        <TabsTrigger
                          asChild
                          className="w-full border"
                          value="full"
                        >
                          <Button variant={"ghost"}>Full payment</Button>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="partial">
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Payment type
                            </p>
                            <p className="text-sm font-semibold capitalize">
                              {(
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).paymentType
                                .split("-")
                                .join(" ")}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Amount paid
                            </p>
                            <p className="text-sm font-semibold">
                              {formatValue({
                                value: String(
                                  (
                                    data?.data
                                      .reservationDetails as TReservationDetails
                                  ).partialPaymentAmount,
                                ),
                                intlConfig: {
                                  locale: "ph",
                                  currency: "php",
                                },
                              })}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Reference no.
                            </p>
                            <p className="text-sm font-semibold">
                              {
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).partialPaymentRefNo
                              }
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Date & time of payment
                            </p>
                            <p className="text-xs font-semibold">
                              {format(
                                new Date(
                                  data?.data.reservationDetails.updatedAt,
                                ),
                                "PP p",
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Payment proof photo
                            </p>
                            <img
                              loading="lazy"
                              alt="Partial payment photo"
                              className="rounded-lg border object-cover shadow-lg"
                              src={
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).partialPaymentProofPhoto.thumbnail_url
                              }
                            />
                          </div>
                          <Separator />
                          {data?.data.reservationDetails
                            .partialPaymentVerificationStatus === "success" && (
                            <>
                              {" "}
                              <div className="mt-4 flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  Remaining balance
                                </p>
                                <p className="text-sm font-semibold">
                                  {formatValue({
                                    value: String(
                                      (
                                        data?.data
                                          .reservationDetails as TReservationDetails
                                      ).balance,
                                    ),
                                    intlConfig: {
                                      locale: "ph",
                                      currency: "php",
                                    },
                                  })}
                                </p>
                              </div>
                              <Separator />
                            </>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Payment verification status
                            </p>
                            <Badge>
                              {
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).partialPaymentVerificationStatus
                              }
                            </Badge>
                          </div>
                          {!data?.data.isHost &&
                          data?.data.reservationDetails.confirmServiceEnded ===
                            false ? (
                            <>
                              {data?.data.reservationDetails
                                .fullPaymentVerificationStatus === "success" ? (
                                <ConfirmServiceEndedAlertDialog />
                              ) : (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button className="mt-2 bg-green-500 hover:bg-green-600">
                                      Confirm service ended
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
                                              To ensure that your experience
                                              meets your expectations, we've
                                              implemented a simple confirmation
                                              and payment process.
                                            </span>
                                          </div>
                                          <div className="flex flex-col justify-center gap-2">
                                            <span className="text-sm font-bold">
                                              Here's how it works:
                                            </span>
                                            <ul className="flex list-disc flex-col gap-1 px-6">
                                              <li className="text-sm">
                                                <span className="font-bold">
                                                  Confirmation of Service
                                                  Completion:
                                                </span>{" "}
                                                After the service has concluded,
                                                you will have the opportunity to
                                                confirm its completion. This
                                                step ensures that you are fully
                                                satisfied with the service
                                                before finalizing it.
                                              </li>
                                              <li className="text-sm ">
                                                <span className="font-bold">
                                                  Payment Fulfillment:
                                                </span>{" "}
                                                Before confirming the service's
                                                end, please ensure that all
                                                payments associated with the
                                                service have been fulfilled.
                                                This step helps us maintain a
                                                secure and transparent payment
                                                process, especially if you're
                                                using our escrow payment method.
                                              </li>
                                              <li className="text-sm ">
                                                <span className="font-bold">
                                                  Host Notification:
                                                </span>{" "}
                                                Once you confirm the service's
                                                completion, we'll notify the
                                                host/provider about the
                                                confirmation. This allows them
                                                to proceed with requesting
                                                payment checkout.
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="flex flex-col justify-center gap-2">
                                            <span className="text-sm">
                                              We strive to make this process as
                                              seamless as possible for you.
                                              Should you have any questions or
                                              concerns, feel free to reach out
                                              to our customer support team.
                                              We're here to assist you every
                                              step of the way.
                                            </span>
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </>
                          ) : (
                            <Badge className="mx-auto w-max bg-green-500 hover:bg-green-600">
                              {data?.data.reservationDetails
                                .confirmServiceEnded === false
                                ? "Awaiting Guest Service Completion"
                                : "Confirmed Service Ended"}
                            </Badge>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="full">
                        <div className="flex w-full flex-col gap-2">
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Payment type
                            </p>
                            <p className="text-sm font-semibold capitalize">
                              {(
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).paymentType
                                .split("-")
                                .join(" ")}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Amount paid
                            </p>
                            <p className="text-sm font-semibold">
                              {formatValue({
                                value: String(
                                  (
                                    data?.data
                                      .reservationDetails as TReservationDetails
                                  ).fullPaymentAmount,
                                ),
                                intlConfig: {
                                  locale: "ph",
                                  currency: "php",
                                },
                              })}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Reference no.
                            </p>
                            <p className="text-sm font-semibold">
                              {
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).fullPaymentRefNo
                              }
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Date & time of payment
                            </p>
                            <p className="text-xs font-semibold">
                              {format(
                                new Date(
                                  data?.data.reservationDetails.fullPaymentDate,
                                ),
                                "PP p",
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Payment proof photo
                            </p>
                            <img
                              loading="lazy"
                              alt="Partial payment photo"
                              className="rounded-lg border object-cover shadow-lg"
                              src={
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).fullPaymentProofPhoto.thumbnail_url
                              }
                            />
                          </div>
                          <Separator />
                          {data?.data.reservationDetails
                            .fullPaymentVerificationStatus === "success" && (
                            <>
                              {" "}
                              <div className="mt-4 flex w-full items-center justify-between">
                                <p className="text-sm font-semibold text-gray-600">
                                  Remaining balance
                                </p>
                                <p className="text-sm font-semibold">
                                  {formatValue({
                                    value: String(
                                      (
                                        data?.data
                                          .reservationDetails as TReservationDetails
                                      ).balance,
                                    ),
                                    intlConfig: {
                                      locale: "ph",
                                      currency: "php",
                                    },
                                  })}
                                </p>
                              </div>
                              <Separator />
                            </>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600">
                              Payment verification status
                            </p>
                            <Badge>
                              {
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).fullPaymentVerificationStatus
                              }
                            </Badge>
                          </div>
                          {!data?.data.isHost &&
                          data?.data.reservationDetails.confirmServiceEnded ===
                            false ? (
                            <>
                              {data?.data.reservationDetails
                                .fullPaymentVerificationStatus === "success" ? (
                                <ConfirmServiceEndedAlertDialog />
                              ) : (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button className="mt-2 bg-green-500 hover:bg-green-600">
                                      Confirm service ended
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
                                              To ensure that your experience
                                              meets your expectations, we've
                                              implemented a simple confirmation
                                              and payment process.
                                            </span>
                                          </div>
                                          <div className="flex flex-col justify-center gap-2">
                                            <span className="text-sm font-bold">
                                              Here's how it works:
                                            </span>
                                            <ul className="flex list-disc flex-col gap-1 px-6">
                                              <li className="text-sm">
                                                <span className="font-bold">
                                                  Confirmation of Service
                                                  Completion:
                                                </span>{" "}
                                                After the service has concluded,
                                                you will have the opportunity to
                                                confirm its completion. This
                                                step ensures that you are fully
                                                satisfied with the service
                                                before finalizing it.
                                              </li>
                                              <li className="text-sm ">
                                                <span className="font-bold">
                                                  Payment Fulfillment:
                                                </span>{" "}
                                                Before confirming the service's
                                                end, please ensure that all
                                                payments associated with the
                                                service have been fulfilled.
                                                This step helps us maintain a
                                                secure and transparent payment
                                                process, especially if you're
                                                using our escrow payment method.
                                              </li>
                                              <li className="text-sm ">
                                                <span className="font-bold">
                                                  Host Notification:
                                                </span>{" "}
                                                Once you confirm the service's
                                                completion, we'll notify the
                                                host/provider about the
                                                confirmation. This allows them
                                                to proceed with requesting
                                                payment checkout.
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="flex flex-col justify-center gap-2">
                                            <span className="text-sm">
                                              We strive to make this process as
                                              seamless as possible for you.
                                              Should you have any questions or
                                              concerns, feel free to reach out
                                              to our customer support team.
                                              We're here to assist you every
                                              step of the way.
                                            </span>
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </>
                          ) : (
                            <Badge className="mx-auto w-max bg-green-500 hover:bg-green-600">
                              {data?.data.reservationDetails
                                .confirmServiceEnded === false
                                ? "Awaiting Guest Service Completion"
                                : "Confirmed Service Ended"}
                            </Badge>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (data?.data.reservationDetails as TReservationDetails)
                      .partialPaymentVerificationStatus != null &&
                    (data?.data.reservationDetails as TReservationDetails)
                      .fullPaymentVerificationStatus == null ? (
                    <>
                      {" "}
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Payment type
                          </p>
                          <p className="text-sm font-semibold capitalize">
                            {(
                              data?.data
                                .reservationDetails as TReservationDetails
                            ).paymentType
                              .split("-")
                              .join(" ")}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Amount paid
                          </p>
                          <p className="text-sm font-semibold">
                            {formatValue({
                              value: String(
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).partialPaymentAmount,
                              ),
                              intlConfig: {
                                locale: "ph",
                                currency: "php",
                              },
                            })}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Reference no.
                          </p>
                          <p className="text-sm font-semibold">
                            {
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).partialPaymentRefNo
                            }
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Date & time of payment
                          </p>
                          <p className="text-xs font-semibold">
                            {format(
                              new Date(data?.data.reservationDetails.updatedAt),
                              "PP p",
                            )}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Payment proof photo
                          </p>
                          <img
                            loading="lazy"
                            alt="Partial payment photo"
                            className="rounded-lg border object-cover shadow-lg"
                            src={
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).partialPaymentProofPhoto.thumbnail_url
                            }
                          />
                        </div>
                        <Separator />
                        {data?.data.reservationDetails
                          .partialPaymentVerificationStatus === "success" && (
                          <>
                            {" "}
                            <div className="mt-4 flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Remaining balance
                              </p>
                              <p className="text-sm font-semibold">
                                {formatValue({
                                  value: String(
                                    (
                                      data?.data
                                        .reservationDetails as TReservationDetails
                                    ).balance,
                                  ),
                                  intlConfig: {
                                    locale: "ph",
                                    currency: "php",
                                  },
                                })}
                              </p>
                            </div>
                            <Separator />
                          </>
                        )}
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Payment verification status
                          </p>
                          <Badge>
                            {
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).partialPaymentVerificationStatus
                            }
                          </Badge>
                        </div>
                        {!data?.data.isHost &&
                        data?.data.reservationDetails.confirmServiceEnded ===
                          false ? (
                          <>
                            {data?.data.reservationDetails
                              .fullPaymentVerificationStatus === "success" ? (
                              <ConfirmServiceEndedAlertDialog />
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="mt-2 bg-green-500 hover:bg-green-600">
                                    Confirm service ended
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
                                            To ensure that your experience meets
                                            your expectations, we've implemented
                                            a simple confirmation and payment
                                            process.
                                          </span>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2">
                                          <span className="text-sm font-bold">
                                            Here's how it works:
                                          </span>
                                          <ul className="flex list-disc flex-col gap-1 px-6">
                                            <li className="text-sm">
                                              <span className="font-bold">
                                                Confirmation of Service
                                                Completion:
                                              </span>{" "}
                                              After the service has concluded,
                                              you will have the opportunity to
                                              confirm its completion. This step
                                              ensures that you are fully
                                              satisfied with the service before
                                              finalizing it.
                                            </li>
                                            <li className="text-sm ">
                                              <span className="font-bold">
                                                Payment Fulfillment:
                                              </span>{" "}
                                              Before confirming the service's
                                              end, please ensure that all
                                              payments associated with the
                                              service have been fulfilled. This
                                              step helps us maintain a secure
                                              and transparent payment process,
                                              especially if you're using our
                                              escrow payment method.
                                            </li>
                                            <li className="text-sm ">
                                              <span className="font-bold">
                                                Host Notification:
                                              </span>{" "}
                                              Once you confirm the service's
                                              completion, we'll notify the
                                              host/provider about the
                                              confirmation. This allows them to
                                              proceed with requesting payment
                                              checkout.
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2">
                                          <span className="text-sm">
                                            We strive to make this process as
                                            seamless as possible for you. Should
                                            you have any questions or concerns,
                                            feel free to reach out to our
                                            customer support team. We're here to
                                            assist you every step of the way.
                                          </span>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </>
                        ) : (
                          <Badge className="mx-auto w-max bg-green-500 hover:bg-green-600">
                            {data?.data.reservationDetails
                              .confirmServiceEnded === false
                              ? "Awaiting Guest Service Completion"
                              : "Confirmed Service Ended"}
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (data?.data.reservationDetails as TReservationDetails)
                      .fullPaymentVerificationStatus ? (
                    <>
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Payment type
                          </p>
                          <p className="text-sm font-semibold capitalize">
                            {(
                              data?.data
                                .reservationDetails as TReservationDetails
                            ).paymentType
                              .split("-")
                              .join(" ")}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Amount paid
                          </p>
                          <p className="text-sm font-semibold">
                            {formatValue({
                              value: String(
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).fullPaymentAmount,
                              ),
                              intlConfig: {
                                locale: "ph",
                                currency: "php",
                              },
                            })}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Reference no.
                          </p>
                          <p className="text-sm font-semibold">
                            {
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).fullPaymentRefNo
                            }
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Date & time of payment
                          </p>
                          <p className="text-xs font-semibold">
                            {format(
                              new Date(
                                (
                                  data?.data
                                    .reservationDetails as TReservationDetails
                                ).fullPaymentDate,
                              ),
                              "PP p",
                            )}
                          </p>
                        </div>
                        <Separator />
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Payment proof photo
                          </p>
                          <img
                            loading="lazy"
                            alt="Partial payment photo"
                            className="rounded-lg border object-cover shadow-lg"
                            src={
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).fullPaymentProofPhoto.thumbnail_url
                            }
                          />
                        </div>
                        <Separator />
                        {(data?.data.reservationDetails as TReservationDetails)
                          .fullPaymentVerificationStatus === "success" && (
                          <>
                            {" "}
                            <div className="mt-4 flex w-full items-center justify-between">
                              <p className="text-sm font-semibold text-gray-600">
                                Remaining balance
                              </p>
                              <p className="text-sm font-semibold">
                                {formatValue({
                                  value: String(
                                    (
                                      data?.data
                                        .reservationDetails as TReservationDetails
                                    ).balance,
                                  ),
                                  intlConfig: {
                                    locale: "ph",
                                    currency: "php",
                                  },
                                })}
                              </p>
                            </div>
                            <Separator />
                          </>
                        )}
                        <div className="flex w-full items-center justify-between">
                          <p className="text-sm font-semibold text-gray-600">
                            Payment verification status
                          </p>
                          <Badge>
                            {
                              (
                                data?.data
                                  .reservationDetails as TReservationDetails
                              ).fullPaymentVerificationStatus
                            }
                          </Badge>
                        </div>
                        {!data?.data.isHost &&
                        data?.data.reservationDetails.confirmServiceEnded ===
                          false ? (
                          <>
                            {data?.data.reservationDetails
                              .fullPaymentVerificationStatus === "success" ? (
                              <ConfirmServiceEndedAlertDialog />
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="mt-2 bg-green-500 hover:bg-green-600">
                                    Confirm service ended
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
                                            To ensure that your experience meets
                                            your expectations, we've implemented
                                            a simple confirmation and payment
                                            process.
                                          </span>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2">
                                          <span className="text-sm font-bold">
                                            Here's how it works:
                                          </span>
                                          <ul className="flex list-disc flex-col gap-1 px-6">
                                            <li className="text-sm">
                                              <span className="font-bold">
                                                Confirmation of Service
                                                Completion:
                                              </span>{" "}
                                              After the service has concluded,
                                              you will have the opportunity to
                                              confirm its completion. This step
                                              ensures that you are fully
                                              satisfied with the service before
                                              finalizing it.
                                            </li>
                                            <li className="text-sm ">
                                              <span className="font-bold">
                                                Payment Fulfillment:
                                              </span>{" "}
                                              Before confirming the service's
                                              end, please ensure that all
                                              payments associated with the
                                              service have been fulfilled. This
                                              step helps us maintain a secure
                                              and transparent payment process,
                                              especially if you're using our
                                              escrow payment method.
                                            </li>
                                            <li className="text-sm ">
                                              <span className="font-bold">
                                                Host Notification:
                                              </span>{" "}
                                              Once you confirm the service's
                                              completion, we'll notify the
                                              host/provider about the
                                              confirmation. This allows them to
                                              proceed with requesting payment
                                              checkout.
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2">
                                          <span className="text-sm">
                                            We strive to make this process as
                                            seamless as possible for you. Should
                                            you have any questions or concerns,
                                            feel free to reach out to our
                                            customer support team. We're here to
                                            assist you every step of the way.
                                          </span>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </>
                        ) : (
                          <Badge className="mx-auto w-max bg-green-500 hover:bg-green-600">
                            {data?.data.reservationDetails
                              .confirmServiceEnded === false
                              ? "Awaiting Guest Service Completion"
                              : "Confirmed Service Ended"}
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-lg font-semibold text-gray-600">
                      No transactions to show
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function ConfirmServiceEndedAlertDialog() {
  const { mutate, isPending } = useConfirmServiceEnded();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-2 bg-green-500 hover:bg-green-600">
          Confirm service ended
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you all set and ready to end the service?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Kindly confirm that you are no longer
            in need of further assistance so we can finalize the service.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => mutate()}
            className="rounded-full bg-green-500 hover:bg-green-600"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PaymentDetails;

export type TReservationDetails = {
  _id: string;
  bookingStartsAt: string;
  bookingEndsAt: string;
  paymentStatus: string;
  paymentAmount: number;
  partialPaymentRefNo: string;
  fullPaymentRefNo: string;
  paymentType: "full-payment" | "partial-payment";
  status: string;
  createdAt: string;
  updatedAt: string;
  guestID: TUser;
  hostID: TUser;
  listingID: TListing;
  partialPaymentDate: string;
  fullPaymentDate: string;
  partialPaymentProofPhoto: {
    public_id: string;
    secure_url: string;
    thumbnail_url: string;
  };
  fullPaymentProofPhoto: {
    public_id: string;
    secure_url: string;
    thumbnail_url: string;
  };
  fullPaymentAmount: number;
  partialPaymentAmount: number;
  partialPaymentVerificationStatus: "pending" | "success" | "rejected";
  fullPaymentVerificationStatus: "pending" | "success" | "rejected";
  balance: number;
  confirmServiceEnded: boolean;
};
