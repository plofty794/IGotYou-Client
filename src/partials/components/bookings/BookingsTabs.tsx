import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatValue } from "react-currency-input-field";
import { compareAsc, differenceInDays, formatDistance } from "date-fns";
import { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import noRequest from "../../../assets/no-pending-payments.json";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import {
  ComposeMessageSchema,
  ZodComposeMessageSchema,
} from "@/zod/composeMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocketContextProvider } from "@/context/SocketContext";
import { auth } from "@/firebase config/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BookingsTabs({ bookingRequests }: { bookingRequests: any[] }) {
  const { socket } = useContext(SocketContextProvider);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [declinedRequests, setDeclinedRequests] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cancelledRequests, setCancelledRequests] = useState<any[]>([]);
  const [receiverName, setReceiverName] = useState("");

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<ComposeMessageSchema>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(ZodComposeMessageSchema),
  });

  useEffect(() => {
    setPendingRequests(
      bookingRequests.filter((v) => v.status === "pending") ?? []
    );
    setApprovedRequests(
      bookingRequests.filter((v) => v.status === "approved") ?? []
    );
    setDeclinedRequests(
      bookingRequests.filter((v) => v.status === "declined") ?? []
    );
    setCancelledRequests(
      bookingRequests.filter((v) => v.status === "cancelled") ?? []
    );
  }, [bookingRequests]);

  function handleSendMessage(data: ComposeMessageSchema) {
    if (receiverName == null) return;
    socket?.emit("chat-message", {
      message: data.message,
      receiverName,
      senderName: auth.currentUser?.displayName,
    });
  }

  return (
    <>
      <div className="px-8 pt-6 ">
        <h1 className="text-3xl font-bold">Your bookings</h1>
      </div>
      <Tabs defaultValue="all" className="p-6">
        <TabsList className="justify-between items-center gap-2 bg-white">
          <TabsTrigger
            className="flex gap-1 rounded-full px-4 py-2 border font-semibold"
            value="all"
          >
            All Requests
            <span className="text-xs font-bold">
              ({bookingRequests.length})
            </span>
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-1 rounded-full px-4 py-2 border font-semibold"
            value="approved"
          >
            Approved
            <span className="text-xs font-bold">
              ({approvedRequests.length})
            </span>
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-1 rounded-full px-4 py-2 border font-semibold"
            value="pending"
          >
            Pending
            <span className="text-xs font-bold">
              ({pendingRequests.length})
            </span>
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-1 rounded-full px-4 py-2 border font-semibold"
            value="declined"
          >
            Declined{" "}
            <span className="text-xs font-bold">
              ({declinedRequests.length})
            </span>
          </TabsTrigger>
          <TabsTrigger
            className="flex gap-1 rounded-full px-4 py-2 border font-semibold"
            value="cancelled"
          >
            Cancelled{" "}
            <span className="text-xs font-bold">
              ({cancelledRequests.length})
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-6 p-4 rounded-md bg-[#F7F7F7]" value="all">
          <ScrollArea className="h-[60vh]">
            {bookingRequests.length > 0 ? (
              bookingRequests.map((v) => (
                <Card className="w-full my-2" key={v._id}>
                  <CardHeader className="flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="m-0">
                        <Badge className="text-sm rounded-full">
                          {v.hostID.username}
                        </Badge>
                      </CardTitle>
                      <Dialog
                        onOpenChange={(val) => {
                          if (val) {
                            setReceiverName(v.hostID.username);
                          } else {
                            setReceiverName("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant={"outline"} className="rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                              />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form
                            onSubmit={handleSubmit(handleSendMessage)}
                            className="flex flex-col gap-2"
                            method="get"
                          >
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">
                                New Message
                              </DialogTitle>
                              <div className="flex flex-col items-center justify-center gap-2 w-full">
                                <div className="flex items-center justify-center gap-2 w-full">
                                  <Label className="text-sm font-semibold text-gray-600">
                                    To:{" "}
                                  </Label>
                                  <div className="w-max mr-auto">
                                    <span className="p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold">
                                      {v.hostID.username}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <span className="ml-auto font-bold text-xs text-gray-600">
                              {watch("message").length} / 200
                            </span>
                            <Textarea
                              {...register("message")}
                              maxLength={201}
                            />
                            {errors.message && (
                              <ErrorMessage message={errors.message.message} />
                            )}
                            <DialogFooter className="mt-2">
                              <Button className="rounded-full bg-gray-950">
                                Send
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <CardDescription className="font-semibold">
                        View profile
                      </CardDescription>
                    </div>
                    <Badge
                      className={`uppercase font-bold rounded-full ${
                        v.status === "pending"
                          ? "text-amber-600"
                          : v.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      variant={"outline"}
                    >
                      {v.status}
                    </Badge>
                  </CardHeader>
                  <Separator />
                  <CardContent className="w-full flex justify-between py-4 px-6">
                    <div className="flex gap-2">
                      <div className="w-44 h-full overflow-hidden rounded-md">
                        <img
                          src={v.listingID.listingPhotos[0].secure_url}
                          alt="Image"
                          className="object-cover w-full h-full hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg ">
                          {v.listingID.serviceDescription}
                        </span>
                        <span className="font-semibold text-sm ">
                          {v.listingID.serviceType}
                        </span>
                        <span className="font-semibold text-sm">
                          Requested date:{" "}
                          {new Date(
                            v.requestedBookingDateStartsAt
                          ).toDateString()}{" "}
                          -{" "}
                          {new Date(
                            v.requestedBookingDateEndsAt
                          ).toDateString()}{" "}
                        </span>
                        <span className="font-bold">
                          {formatValue({
                            value: v.listingID.price.toString(),
                            intlConfig: {
                              locale: "PH",
                              currency: "php",
                            },
                          })}
                        </span>
                        <Badge className="w-max">
                          Duration{" "}
                          {formatDistance(
                            new Date(v.requestedBookingDateStartsAt).setHours(
                              0,
                              0,
                              0,
                              0
                            ),
                            new Date(v.requestedBookingDateEndsAt).setHours(
                              0,
                              0,
                              0,
                              0
                            )
                          )}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-2">
                      {v.status === "pending" &&
                      compareAsc(
                        new Date(v.requestedBookingDateStartsAt),
                        new Date().setHours(0, 0, 0, 0)
                      ) < 0 ? (
                        <Badge variant={"destructive"}>
                          Expired booking request
                        </Badge>
                      ) : (
                        <Badge className="bg-green-600 hover:bg-green-500">
                          Awaiting host approval
                        </Badge>
                      )}
                      <div className="flex flex-col">
                        <Badge
                          variant={"secondary"}
                          className="text-base font-bold"
                        >
                          Total:{" "}
                          {formatValue({
                            value: String(
                              differenceInDays(
                                new Date(v.requestedBookingDateEndsAt),
                                new Date(v.requestedBookingDateStartsAt)
                              ) * v.listingID.price
                            ),
                            intlConfig: {
                              locale: "PH",
                              currency: "php",
                            },
                          })}
                        </Badge>
                        <Button className="p-0 text-red-600" variant={"link"}>
                          Cancel request
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="h-[60vh] w-full flex flex-col items-center justify-center">
                <Lottie
                  animationData={noRequest}
                  loop={false}
                  className="w-36 h-36"
                />{" "}
                <span className="text-gray-600 font-bold text-lg">
                  No requests
                </span>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent
          className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
          value="pending"
        >
          <ScrollArea className="h-[60vh]">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((v) => (
                <Card className="w-full my-2" key={v._id}>
                  <CardHeader className="flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="m-0">
                        <Badge className="text-sm rounded-full">
                          {v.hostID.username}
                        </Badge>
                      </CardTitle>
                      <Dialog
                        onOpenChange={(val) => {
                          if (val) {
                            setReceiverName(v.hostID.username);
                          } else {
                            setReceiverName("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant={"outline"} className="rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                              />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form
                            onSubmit={handleSubmit(handleSendMessage)}
                            className="flex flex-col gap-2"
                            method="get"
                          >
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">
                                New Message
                              </DialogTitle>
                              <div className="flex flex-col items-center justify-center gap-2 w-full">
                                <div className="flex items-center justify-center gap-2 w-full">
                                  <Label className="text-sm font-semibold text-gray-600">
                                    To:{" "}
                                  </Label>
                                  <div className="w-max mr-auto">
                                    <span className="p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold">
                                      {v.hostID.username}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <span className="ml-auto font-bold text-xs text-gray-600">
                              {watch("message").length} / 200
                            </span>
                            <Textarea
                              {...register("message")}
                              maxLength={201}
                            />
                            {errors.message && (
                              <ErrorMessage message={errors.message.message} />
                            )}
                            <DialogFooter className="mt-2">
                              <Button className="rounded-full bg-gray-950">
                                Send
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <CardDescription className="font-semibold">
                        View profile
                      </CardDescription>
                    </div>
                    <Badge
                      className={`uppercase font-bold rounded-full ${
                        v.status === "pending"
                          ? "text-amber-600"
                          : v.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      variant={"outline"}
                    >
                      {v.status}
                    </Badge>
                  </CardHeader>
                  <Separator />
                  <CardContent className="w-full flex justify-between py-4 px-6">
                    <div className="flex gap-2">
                      <div className="w-44 h-full overflow-hidden rounded-md">
                        <img
                          src={v.listingID.listingPhotos[0].secure_url}
                          alt="Image"
                          className="object-cover w-full h-full hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg ">
                          {v.listingID.serviceDescription}
                        </span>
                        <span className="font-semibold text-sm ">
                          {v.listingID.serviceType}
                        </span>
                        <div className="flex flex-col gap-2">
                          <span className="font-semibold text-sm">
                            Requested date:{" "}
                            {new Date(
                              v.requestedBookingDateStartsAt
                            ).toDateString()}{" "}
                            -{" "}
                            {new Date(
                              v.requestedBookingDateEndsAt
                            ).toDateString()}{" "}
                          </span>
                          <span className="font-bold">
                            {formatValue({
                              value: v.listingID.price.toString(),
                              intlConfig: {
                                locale: "PH",
                                currency: "php",
                              },
                            })}
                          </span>
                          <Badge className="w-max">
                            Duration{" "}
                            {formatDistance(
                              new Date(v.requestedBookingDateStartsAt).setHours(
                                0,
                                0,
                                0,
                                0
                              ),
                              new Date(v.requestedBookingDateEndsAt).setHours(
                                0,
                                0,
                                0,
                                0
                              )
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-2">
                      {v.status === "pending" &&
                      compareAsc(
                        new Date(v.requestedBookingDateStartsAt),
                        new Date().setHours(0, 0, 0, 0)
                      ) < 0 ? (
                        <Badge variant={"destructive"}>
                          Expired booking request
                        </Badge>
                      ) : (
                        <Badge className="bg-green-600 hover:bg-green-500">
                          Awaiting host approval
                        </Badge>
                      )}
                      <div className="flex flex-col">
                        <Badge
                          variant={"secondary"}
                          className="text-base font-bold"
                        >
                          Total:{" "}
                          {formatValue({
                            value: String(
                              parseInt(
                                formatDistance(
                                  new Date(v.requestedBookingDateStartsAt),
                                  new Date(v.requestedBookingDateEndsAt)
                                )
                              ) * v.listingID.price
                            ),
                            intlConfig: {
                              locale: "PH",
                              currency: "php",
                            },
                          })}
                        </Badge>
                        <Button className="p-0 text-red-600" variant={"link"}>
                          Cancel request
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="h-[60vh] w-full flex flex-col items-center justify-center">
                <Lottie
                  animationData={noRequest}
                  loop={false}
                  className="w-36 h-36"
                />{" "}
                <span className="text-gray-600 font-bold text-lg">
                  No pending requests
                </span>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent
          className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
          value="approved"
        >
          <ScrollArea className="h-[60vh]">
            {approvedRequests.length > 0 ? (
              approvedRequests.map((v) => (
                <Card className="w-full" key={v._id}>
                  <CardHeader className="flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="m-0">
                        <Badge className="text-sm rounded-full">
                          {v.hostID.username}
                        </Badge>
                      </CardTitle>
                      <Dialog
                        onOpenChange={(val) => {
                          if (val) {
                            setReceiverName(v.hostID.username);
                          } else {
                            setReceiverName("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant={"outline"} className="rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                              />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form
                            onSubmit={handleSubmit(handleSendMessage)}
                            className="flex flex-col gap-2"
                            method="get"
                          >
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">
                                New Message
                              </DialogTitle>
                              <div className="flex flex-col items-center justify-center gap-2 w-full">
                                <div className="flex items-center justify-center gap-2 w-full">
                                  <Label className="text-sm font-semibold text-gray-600">
                                    To:{" "}
                                  </Label>
                                  <div className="w-max mr-auto">
                                    <span className="p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold">
                                      {v.hostID.username}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <span className="ml-auto font-bold text-xs text-gray-600">
                              {watch("message").length} / 200
                            </span>
                            <Textarea
                              {...register("message")}
                              maxLength={201}
                            />
                            {errors.message && (
                              <ErrorMessage message={errors.message.message} />
                            )}
                            <DialogFooter className="mt-2">
                              <Button className="rounded-full bg-gray-950">
                                Send
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <CardDescription className="font-semibold">
                        View profile
                      </CardDescription>
                    </div>
                    <Badge
                      className={`uppercase font-bold rounded-full ${
                        v.status === "pending"
                          ? "text-amber-600"
                          : v.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      variant={"outline"}
                    >
                      {v.status}
                    </Badge>
                  </CardHeader>
                  <Separator />
                  <CardContent className="w-full flex justify-between py-4 px-6">
                    <div className="flex gap-2">
                      <div className="w-44 h-32 overflow-hidden rounded-md">
                        <img
                          src={v.listingID.listingPhotos[0].secure_url}
                          alt="Image"
                          className="object-cover w-full h-full hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg ">
                          {v.listingID.serviceDescription}
                        </span>
                        <span className="font-semibold text-sm ">
                          {v.listingID.serviceType}
                        </span>
                        <span className="font-medium text-sm text-gray-600">
                          Requested date:{" "}
                          {new Date(
                            v.requestedBookingDateStartsAt
                          ).toDateString()}{" "}
                          -{" "}
                          {new Date(
                            v.requestedBookingDateEndsAt
                          ).toDateString()}{" "}
                          {compareAsc(
                            new Date(v.requestedBookingDateEndsAt),
                            new Date()
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between flex-col gap-2">
                      <span className="font-semibold text-lg">
                        {formatValue({
                          value: v.listingID.price.toString(),
                          intlConfig: {
                            locale: "ph-PH",
                            currency: "PHP",
                          },
                        })}{" "}
                      </span>
                      {compareAsc(
                        new Date(v.requestedBookingDateStartsAt).getDate(),
                        new Date().getDate()
                      ) === 0 &&
                      compareAsc(
                        new Date(v.requestedBookingDateEndsAt).getDate(),
                        new Date().getDate()
                      ) === 1 ? (
                        <Badge
                          variant={"outline"}
                          className="font-bold text-sm uppercase text-green-600"
                        >
                          Ongoing
                        </Badge>
                      ) : compareAsc(
                          new Date(v.requestedBookingDateStartsAt).getDate(),
                          new Date().getDate()
                        ) === -1 ? (
                        <Badge
                          variant={"outline"}
                          className="font-bold text-sm uppercase text-amber-600"
                        >
                          Upcoming
                        </Badge>
                      ) : (
                        <Badge
                          variant={"outline"}
                          className="font-bold text-sm uppercase text-rose-600"
                        >
                          Done
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="h-[60vh] w-full flex flex-col items-center justify-center">
                <Lottie
                  animationData={noRequest}
                  loop={false}
                  className="w-36 h-36"
                />{" "}
                <span className="text-gray-600 font-bold text-lg">
                  No approved requests
                </span>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent
          className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
          value="declined"
        >
          <ScrollArea className="h-[60vh]">
            {declinedRequests.length > 0 ? (
              declinedRequests.map((v) => (
                <Card className="w-full" key={v._id}>
                  <CardHeader className="flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="m-0">
                        <Badge className="text-sm rounded-full">
                          {v.hostID.username}
                        </Badge>
                      </CardTitle>
                      <Dialog
                        onOpenChange={(val) => {
                          if (val) {
                            setReceiverName(v.hostID.username);
                          } else {
                            setReceiverName("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant={"outline"} className="rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                              />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form
                            onSubmit={handleSubmit(handleSendMessage)}
                            className="flex flex-col gap-2"
                            method="get"
                          >
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">
                                New Message
                              </DialogTitle>
                              <div className="flex flex-col items-center justify-center gap-2 w-full">
                                <div className="flex items-center justify-center gap-2 w-full">
                                  <Label className="text-sm font-semibold text-gray-600">
                                    To:{" "}
                                  </Label>
                                  <div className="w-max mr-auto">
                                    <span className="p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold">
                                      {v.hostID.username}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <span className="ml-auto font-bold text-xs text-gray-600">
                              {watch("message").length} / 200
                            </span>
                            <Textarea
                              {...register("message")}
                              maxLength={201}
                            />
                            {errors.message && (
                              <ErrorMessage message={errors.message.message} />
                            )}
                            <DialogFooter className="mt-2">
                              <Button className="rounded-full bg-gray-950">
                                Send
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <CardDescription className="font-semibold">
                        View profile
                      </CardDescription>
                    </div>
                    <Badge
                      className={`uppercase font-bold rounded-full ${
                        v.status === "pending"
                          ? "text-amber-600"
                          : v.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      variant={"outline"}
                    >
                      {v.status}
                    </Badge>
                  </CardHeader>
                  <Separator />
                  <CardContent className="w-full flex justify-between py-4 px-6">
                    <div className="flex gap-2">
                      <div className="w-44 h-32 overflow-hidden rounded-md">
                        <img
                          src={v.listingID.listingPhotos[0].secure_url}
                          alt="Image"
                          className="object-cover w-full h-full hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg ">
                          {v.listingID.serviceDescription}
                        </span>
                        <span className="font-semibold text-sm ">
                          {v.listingID.serviceType}
                        </span>
                        <span className="font-medium text-sm text-gray-600">
                          Requested date:{" "}
                          {new Date(
                            v.requestedBookingDateStartsAt
                          ).toDateString()}{" "}
                          -{" "}
                          {new Date(
                            v.requestedBookingDateEndsAt
                          ).toDateString()}{" "}
                          {compareAsc(
                            new Date(v.requestedBookingDateEndsAt),
                            new Date()
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-lg">
                        {formatValue({
                          value: v.listingID.price.toString(),
                          intlConfig: {
                            locale: "ph-PH",
                            currency: "PHP",
                          },
                        })}{" "}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="h-[60vh] w-full flex flex-col items-center justify-center">
                <Lottie
                  animationData={noRequest}
                  loop={false}
                  className="w-36 h-36"
                />{" "}
                <span className="text-gray-600 font-bold text-lg">
                  No declined requests
                </span>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent
          className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
          value="cancelled"
        >
          <ScrollArea className="h-[60vh]">
            {cancelledRequests.length > 0 ? (
              cancelledRequests.map((v) => (
                <Card className="w-full" key={v._id}>
                  <CardHeader className="flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="m-0">
                        <Badge className="text-sm rounded-full">
                          {v.hostID.username}
                        </Badge>
                      </CardTitle>
                      <Dialog
                        onOpenChange={(val) => {
                          if (val) {
                            setReceiverName(v.hostID.username);
                          } else {
                            setReceiverName("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant={"outline"} className="rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                              />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <form
                            onSubmit={handleSubmit(handleSendMessage)}
                            className="flex flex-col gap-2"
                            method="get"
                          >
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">
                                New Message
                              </DialogTitle>
                              <div className="flex flex-col items-center justify-center gap-2 w-full">
                                <div className="flex items-center justify-center gap-2 w-full">
                                  <Label className="text-sm font-semibold text-gray-600">
                                    To:{" "}
                                  </Label>
                                  <div className="w-max mr-auto">
                                    <span className="p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold">
                                      {v.hostID.username}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </DialogHeader>
                            <span className="ml-auto font-bold text-xs text-gray-600">
                              {watch("message").length} / 200
                            </span>
                            <Textarea
                              {...register("message")}
                              maxLength={201}
                            />
                            {errors.message && (
                              <ErrorMessage message={errors.message.message} />
                            )}
                            <DialogFooter className="mt-2">
                              <Button className="rounded-full bg-gray-950">
                                Send
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <CardDescription className="font-semibold">
                        View profile
                      </CardDescription>
                    </div>
                    <Badge
                      className={`uppercase font-bold rounded-full ${
                        v.status === "pending"
                          ? "text-amber-600"
                          : v.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      variant={"outline"}
                    >
                      {v.status}
                    </Badge>
                  </CardHeader>
                  <Separator />
                  <CardContent className="w-full flex justify-between py-4 px-6">
                    <div className="flex gap-2">
                      <div className="w-44 h-32 overflow-hidden rounded-md">
                        <img
                          src={v.listingID.listingPhotos[0].secure_url}
                          alt="Image"
                          className="object-cover w-full h-full hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-lg ">
                          {v.listingID.serviceDescription}
                        </span>
                        <span className="font-semibold text-sm ">
                          {v.listingID.serviceType}
                        </span>
                        <span className="font-medium text-sm text-gray-600">
                          Requested date:{" "}
                          {new Date(
                            v.requestedBookingDateStartsAt
                          ).toDateString()}{" "}
                          -{" "}
                          {new Date(
                            v.requestedBookingDateEndsAt
                          ).toDateString()}{" "}
                          {compareAsc(
                            new Date(v.requestedBookingDateEndsAt),
                            new Date()
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-lg">
                        {formatValue({
                          value: v.listingID.price.toString(),
                          intlConfig: {
                            locale: "ph-PH",
                            currency: "PHP",
                          },
                        })}{" "}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="h-[60vh] w-full flex flex-col items-center justify-center">
                <Lottie
                  animationData={noRequest}
                  loop={false}
                  className="w-36 h-36"
                />{" "}
                <span className="text-gray-600 font-bold text-lg">
                  No cancelled requests
                </span>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default BookingsTabs;
