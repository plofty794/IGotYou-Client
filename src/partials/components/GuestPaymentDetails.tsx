import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  SendServicePaymentSchema,
  ZodSendServicePayment,
} from "@/zod/sendServicePaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CloudinaryUploadResult,
  CloudinaryUploadWidget,
} from "@/types/createUploadWidget";
import useRemoveAsset from "@/hooks/useRemoveAsset";
import CurrencyInput, { formatValue } from "react-currency-input-field";
import useSendReservationPaymentToAdmin from "@/hooks/useSendReservationPaymentToAdmin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TReservationDetails } from "@/pages/PaymentDetails";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useRequestServiceCancellation from "@/hooks/useRequestServiceCancellation";
import { toast } from "sonner";
import { CheckCircledIcon } from "@radix-ui/react-icons";

function GuestPaymentDetails({
  reservationDetails,
}: {
  reservationDetails: TReservationDetails;
}) {
  const sendReservationPaymentToAdmin = useSendReservationPaymentToAdmin();
  const removeAsset = useRemoveAsset();
  const [expectedPaymentAmount, setExpectedPaymentAmount] = useState<
    string | undefined
  >("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentProofPhoto, setPaymentProofPhoto] = useState({
    secure_url: "",
    public_id: "",
    thumbnail_url: "",
  });
  const [hasSelectedPaymentType, setHasSelectedPaymentType] = useState<
    boolean | undefined
  >();
  const [hasPaymentPhotoProof, setHasPaymentPhotoProof] = useState<
    boolean | undefined
  >();
  const [cloudinaryWidget, setCloudinaryWidget] =
    useState<CloudinaryUploadWidget>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SendServicePaymentSchema>({
    defaultValues: {
      paymentRefNo: undefined,
    },
    resolver: zodResolver(ZodSendServicePayment),
    mode: "onChange",
  });

  useEffect(() => {
    if (cloudinaryWidget) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
        folder: "IGotYou-Service-Payments",
        resourceType: "image",
        sources: ["local"],
        multiple: true,
      },
      (_: unknown, result: CloudinaryUploadResult) => {
        if (result.event === "success") {
          setPaymentProofPhoto({
            public_id: result.info.public_id,
            secure_url: result.info.secure_url,
            thumbnail_url: result.info.thumbnail_url,
          });
          toast("Payment photo has been uploaded!", {
            icon: (
              <CheckCircledIcon
                color="#FFF"
                className="inline-block rounded-full bg-[#39c152]"
              />
            ),
          });
        }
      },
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget]);

  function handlePaymentSubmit(paymentDetails: SendServicePaymentSchema) {
    if (!paymentType) {
      setHasSelectedPaymentType(false);
      return;
    } else {
      setHasSelectedPaymentType(true);
    }
    if (!paymentProofPhoto.public_id) {
      setHasPaymentPhotoProof(false);
      return;
    } else {
      setHasPaymentPhotoProof(true);
    }
    setHasSelectedPaymentType(true);
    setHasPaymentPhotoProof(true);
    sendReservationPaymentToAdmin.mutate({
      expectedPaymentAmount,
      paymentProofPhoto,
      paymentRefNo: paymentDetails.paymentRefNo,
      paymentType,
    });
    setPaymentProofPhoto({ public_id: "", secure_url: "", thumbnail_url: "" });
    setPaymentType("");
    setExpectedPaymentAmount("");
    reset();
  }

  return (
    <>
      <Card className="h-max w-full shadow-lg">
        <CardHeader className="flex w-full flex-row items-center justify-between">
          <CardTitle className="text-lg">Payment details</CardTitle>
          {reservationDetails.partialPaymentVerificationStatus != null &&
            reservationDetails.fullPaymentVerificationStatus == null && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    className="p-0 text-gray-600"
                  >
                    Previous payment details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Previous payment details</DialogTitle>
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
                        Amount sent
                      </p>
                      <p className="text-sm font-semibold ">
                        {formatValue({
                          value: String(
                            reservationDetails.partialPaymentAmount,
                          ),
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
        {reservationDetails.fullPaymentVerificationStatus != null &&
        reservationDetails.partialPaymentVerificationStatus != null ? (
          <>
            <Tabs defaultValue="payment-1" className="w-full p-2">
              <TabsList className="w-full gap-2 bg-white">
                <TabsTrigger
                  asChild
                  className="w-full border"
                  value="payment-1"
                >
                  <Button variant={"ghost"}>Payment #1</Button>
                </TabsTrigger>
                <TabsTrigger
                  asChild
                  className="w-full border"
                  value="payment-2"
                >
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
                      Amount sent
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
                      Amount sent
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
            <CardFooter>
              <div className="flex w-full flex-col gap-2">
                <ServiceCancelRequestDialog />
                <div className="flex w-full gap-2">
                  {" "}
                  <Button
                    type="button"
                    size={"sm"}
                    className="w-full bg-gray-950"
                  >
                    <Link
                      className="w-full"
                      to={`mailto:${reservationDetails.hostID.email}`}
                    >
                      Email
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    size={"sm"}
                    className="w-full bg-gray-950"
                  >
                    <Link className="w-full" to={"/messages"}>
                      Message
                    </Link>
                  </Button>
                </div>
              </div>
            </CardFooter>
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
                  Amount sent
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
            <CardFooter>
              <div className="flex w-full flex-col gap-2">
                <ServiceCancelRequestDialog />
                <div className="flex w-full gap-2">
                  <Button
                    type="button"
                    size={"sm"}
                    className="w-full bg-gray-950"
                  >
                    <Link
                      className="w-full"
                      to={`mailto:${reservationDetails.hostID.email}`}
                    >
                      Email
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    size={"sm"}
                    className="w-full bg-gray-950"
                  >
                    <Link className="w-full" to={"/messages"}>
                      Message
                    </Link>
                  </Button>
                </div>
              </div>
            </CardFooter>
          </>
        ) : (
          <>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(handlePaymentSubmit)}
            >
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-sm font-semibold">Pay with</p>{" "}
                  <img
                    src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_gcash.b8705e185f2ff5d047a01ecd97799c17.svg"
                    alt="Gcash"
                  />
                </div>
                <Badge
                  variant={"outline"}
                  className="mx-auto w-max font-bold text-blue-600"
                >
                  Send the payment to +63907 925 1189
                </Badge>
                <Select onValueChange={(value) => setPaymentType(value)}>
                  <SelectTrigger className="flex w-full items-center justify-center gap-2 font-semibold">
                    <SelectValue placeholder="Payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        className="flex flex-row gap-2 font-semibold"
                        value="partial-payment"
                      >
                        {" "}
                        Partial payment 50%
                      </SelectItem>
                      <SelectItem
                        className="flex gap-2 font-semibold"
                        value="full-payment"
                      >
                        {" "}
                        Full payment
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {hasSelectedPaymentType === false && (
                  <p className="text-xs font-bold text-red-600">
                    Select a payment type
                  </p>
                )}
                <Input
                  {...register("paymentRefNo")}
                  autoComplete="off"
                  className="font-medium"
                  placeholder="Reference no. XXXX XXX XXXXXX"
                />
                {errors.paymentRefNo && (
                  <p className="text-xs font-bold text-red-600">
                    {errors.paymentRefNo.message}
                  </p>
                )}
                <CurrencyInput
                  prefix="₱"
                  allowNegativeValue={false}
                  decimalsLimit={2}
                  className="rounded-md border p-2 text-sm font-medium outline-none focus-within:border-black"
                  placeholder={`Expected amount ${
                    paymentType === "partial-payment"
                      ? formatValue({
                          value: String(reservationDetails.paymentAmount / 2),
                          intlConfig: {
                            locale: "ph",
                            currency: "php",
                          },
                        })
                      : formatValue({
                          value: String(reservationDetails.paymentAmount),
                          intlConfig: {
                            locale: "ph",
                            currency: "php",
                          },
                        })
                  }`}
                  onValueChange={(value) => setExpectedPaymentAmount(value)}
                  value={expectedPaymentAmount}
                />
                {paymentType === "partial-payment" &&
                  expectedPaymentAmount != null &&
                  parseInt(expectedPaymentAmount) !==
                    reservationDetails.paymentAmount / 2 && (
                    <p className="text-xs font-bold text-red-600">
                      Expected amount is{" "}
                      {formatValue({
                        value: String(reservationDetails.paymentAmount / 2),
                        intlConfig: {
                          locale: "ph",
                          currency: "php",
                        },
                      })}
                    </p>
                  )}
                {paymentType === "full-payment" &&
                  expectedPaymentAmount != null &&
                  parseInt(expectedPaymentAmount) !==
                    reservationDetails.paymentAmount && (
                    <p className="text-xs font-bold text-red-600">
                      Expected amount is{" "}
                      {formatValue({
                        value: String(reservationDetails.paymentAmount),
                        intlConfig: {
                          locale: "ph",
                          currency: "php",
                        },
                      })}
                    </p>
                  )}
                {!paymentProofPhoto.public_id && (
                  <Button
                    type="button"
                    size={"sm"}
                    variant={
                      hasPaymentPhotoProof === false ? "destructive" : "outline"
                    }
                    className="gap-2"
                    onClick={() => cloudinaryWidget?.open()}
                  >
                    Upload payment proof
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z" />
                      <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
                    </svg>
                  </Button>
                )}

                {paymentProofPhoto.public_id != "" &&
                  paymentProofPhoto.secure_url != "" && (
                    <Card className="relative">
                      <Button
                        size={"sm"}
                        className="absolute right-3 top-2 h-7 w-7 cursor-pointer rounded-full bg-white p-1"
                        variant={"outline"}
                        onClick={() => {
                          removeAsset.mutate({
                            publicId: paymentProofPhoto.public_id,
                          });
                          setPaymentProofPhoto({
                            public_id: "",
                            secure_url: "",
                            thumbnail_url: "",
                          });
                          toast("Payment photo has been removed!", {
                            icon: (
                              <CheckCircledIcon
                                color="#FFF"
                                className="inline-block rounded-full bg-[#39c152]"
                              />
                            ),
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-7 w-7"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                      <img
                        className="h-full max-h-64 w-full max-w-md rounded-lg border object-cover shadow-lg"
                        src={paymentProofPhoto.secure_url}
                        loading="lazy"
                        alt="Payment photo proof"
                      />
                    </Card>
                  )}
              </CardContent>
              <CardFooter>
                <div className="flex w-full flex-col gap-2">
                  <Button
                    disabled={
                      errors.paymentRefNo != null ||
                      removeAsset.isPending ||
                      !expectedPaymentAmount ||
                      (paymentType === "full-payment" &&
                        expectedPaymentAmount != null &&
                        parseInt(expectedPaymentAmount) !==
                          reservationDetails.paymentAmount) ||
                      (paymentType === "partial-payment" &&
                        expectedPaymentAmount != null &&
                        parseInt(expectedPaymentAmount) !==
                          reservationDetails.paymentAmount / 2) ||
                      sendReservationPaymentToAdmin.isPending
                    }
                    className="w-full gap-2 bg-green-500 hover:bg-green-600"
                    size={"lg"}
                  >
                    Confirm and pay
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
                  <CardFooter className="px-0">
                    <div className="flex w-full flex-col gap-2">
                      <ServiceCancelRequestDialog />
                      <div className="flex w-full gap-2">
                        <Button
                          type="button"
                          size={"sm"}
                          className="w-full bg-gray-950"
                        >
                          <Link
                            className="w-full"
                            to={`mailto:${reservationDetails.hostID.email}`}
                          >
                            Email
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          size={"sm"}
                          className="w-full bg-gray-950"
                        >
                          <Link className="w-full" to={"/messages"}>
                            Message
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </div>
              </CardFooter>
            </form>
            <div className="mx-auto flex w-max flex-col gap-2 px-6 py-0 pb-4">
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
    </>
  );
}

function ServiceCancelRequestDialog() {
  const [cancelReason, setCancelReason] = useState("");
  const { mutate } = useRequestServiceCancellation();

  const REASONS = [
    "unverified identity",
    "unexpected events",
    "mismatched expectations",
    "safety concerns",
    "no reviews",
    "negative reviews",
    "change of heart",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="gap-2" size={"lg"}>
          Request a service cancellation
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle className="mb-2 text-2xl font-bold">
            Why are you cancelling?
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 pr-4">
          <RadioGroup onValueChange={(v) => setCancelReason(v)}>
            {REASONS.map((reason, index) => (
              <>
                <div
                  key={index}
                  className="flex h-max w-full items-center justify-between py-2"
                >
                  <Label
                    htmlFor={reason}
                    className="text-base font-medium capitalize"
                  >
                    {reason}
                  </Label>
                  <RadioGroupItem
                    className="h-6 w-6"
                    value={reason}
                    id={reason}
                  />
                </div>
                <Separator />
              </>
            ))}
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={!cancelReason}
                className="rounded-full bg-gray-950 p-6 text-lg"
              >
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to cancel?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <p className="text-sm font-semibold text-gray-600">
                Please be informed that simply sending a cancellation request
                does not automatically halt the service. To ensure a smooth
                process, kindly communicate directly with your host regarding
                your cancellation intentions.
              </p>

              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Close
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutate({ guestCancelReasons: cancelReason })}
                  className="rounded-full bg-gray-950"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GuestPaymentDetails;
