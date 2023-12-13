import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/firebase config/config";
import ErrorMessage from "@/partials/components/ErrorMessage";
import {
  ComposeMessageSchema,
  ZodComposeMessageSchema,
} from "@/zod/composeMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";

function BookingRequestCard({
  notification,
  socket,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notification: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any;
}) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ComposeMessageSchema>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(ZodComposeMessageSchema),
  });

  function updateNotification({
    status,
    hostID,
    guestID,
    bookingRequestID,
    notificationID,
  }: {
    status: "approved" | "declined";
    hostID: unknown;
    guestID: unknown;
    bookingRequestID: unknown;
    notificationID: string;
  }) {
    socket?.emit("host-update-bookingRequest", {
      status,
      hostID,
      guestID,
      bookingRequestID,
      notificationID,
    });
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }

  function handleSendMessage(data: ComposeMessageSchema) {
    socket?.emit("chat-message", {
      message: data.message,
      receiverName: notification.fromUserID.username,
      senderName: auth.currentUser?.displayName,
    });
  }

  return (
    <Card className="px-4">
      <CardHeader className="w-full flex-row items-start justify-between">
        <div className="flex gap-4 ">
          <Avatar>
            <AvatarImage
              className="object-cover max-w-full w-10 h-10"
              src={notification.fromUserID.photoUrl}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="flex items-center gap font-bold">
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
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              {notification.fromUserID.username}
            </CardTitle>
            <CardDescription className="font-semibold">
              sent{" "}
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </CardDescription>
          </div>
        </div>
        {!notification.read ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="#0866FF"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-[#0866FF] rounded-full"
          >
            <path
              d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="green"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-sm text-gray-600">
          Subject: {String(notification.notificationType).split("-").join(" ")}
        </h1>
        <CardDescription className="mt-4 font-semibold text-gray-600">
          Message: {notification.bookingRequest.message}
        </CardDescription>
        <CardFooter className="flex flex-col items-start gap-2 mt-2 p-0">
          <span className="text-sm font-semibold text-gray-600">
            {" "}
            Request: {notification.fromUserID.username} is requesting you to
            accept their booking on{" "}
            {format(
              new Date(
                notification.bookingRequest.requestedBookingDateStartsAt
              ),
              "PPPP"
            )}{" "}
            until{" "}
            {format(
              new Date(notification.bookingRequest.requestedBookingDateEndsAt),
              "PPPP"
            )}{" "}
            for this listing named{" "}
            <span className="text-green-600 underline underline-offset-2">
              "{notification.bookingRequest.listingID.serviceDescription}"
            </span>
          </span>
          <div className="flex items-center justify-center gap-2 ml-auto">
            <Dialog>
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
                            {notification.fromUserID.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogHeader>
                  <span className="ml-auto font-bold text-xs text-gray-600">
                    {watch("message").length} / 200
                  </span>
                  <Textarea {...register("message")} maxLength={201} />
                  {errors.message && (
                    <ErrorMessage message={errors.message.message} />
                  )}
                  <DialogFooter className="mt-2">
                    <Button className="rounded-full bg-gray-950">Send</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {notification.bookingRequest.status === "approved" ? (
              <span className="text-xs font-bold text-gray-600">
                You have accepted this request{" "}
                {formatDistanceToNow(
                  new Date(notification.bookingRequest.updatedAt),
                  { addSuffix: true }
                )}
              </span>
            ) : notification.bookingRequest.status === "declined" ? (
              <span className="text-xs font-bold text-gray-600">
                You declined this request
              </span>
            ) : (
              <>
                {" "}
                <Button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      updateNotification({
                        status: "approved",
                        guestID: notification.fromUserID,
                        hostID: notification.toUserID,
                        bookingRequestID: notification.bookingRequest,
                        notificationID: notification._id,
                      });
                    }, 1000);
                  }}
                  className={` bg-gray-950 rounded-full ${
                    loading ? "opacity-70" : "opacity-100"
                  }`}
                >
                  Accept
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    updateNotification({
                      status: "declined",
                      guestID: notification.fromUserID,
                      hostID: notification.toUserID,
                      bookingRequestID: notification.bookingRequest,
                      notificationID: notification._id,
                    })
                  }
                  variant={"outline"}
                  className=" rounded-full"
                >
                  Decline
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default BookingRequestCard;
