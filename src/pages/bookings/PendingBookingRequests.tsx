import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { compareAsc, formatDistance } from "date-fns";
import Lottie from "lottie-react";
import { formatValue } from "react-currency-input-field";
import noRequest from "../../assets/no-pending-payments.json";
import useGetGuestPendingBookingRequests from "@/hooks/useGetGuestPendingBookingRequests";
import { jelly } from "ldrs";
import { useEffect } from "react";
import CancelRequestDialog from "./components/CancelRequestDialog";
jelly.register();

function PendingBookingRequests() {
  const { data, isPending } = useGetGuestPendingBookingRequests();

  useEffect(() => {
    document.title = "Pending Booking Requests - IGotYou";
  }, []);

  return isPending ? (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <l-jelly size="40" speed="0.9" color="black"></l-jelly>
    </div>
  ) : data?.pages.flatMap((page) => page.data.pendingBookingRequests).length ??
    [].length > 0 ? (
    data?.pages.flatMap((page) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      page.data.pendingBookingRequests.map((v: any) => (
        <Card className="my-2 w-full" key={v._id}>
          <CardHeader className="flex-row justify-between p-4">
            <div className="flex items-center gap-2">
              <CardTitle className="m-0">
                <Badge className="rounded-full text-sm">
                  {v.hostID.username}
                </Badge>
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"} className="rounded-full">
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
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form className="flex flex-col gap-2" method="get">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">
                        New Message
                      </DialogTitle>
                      <div className="flex w-full flex-col items-center justify-center gap-2">
                        <div className="flex w-full items-center justify-center gap-2">
                          <Label className="text-sm font-semibold text-gray-600">
                            To:{" "}
                          </Label>
                          <div className="mr-auto w-max">
                            <span className="border-none p-2 text-sm font-semibold shadow-none outline-none focus-visible:border-none focus-visible:ring-0">
                              {v.hostID.username}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                    <Textarea minLength={1} />
                    <DialogFooter className="mt-2">
                      <Button className="rounded-full bg-gray-950">Send</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <CardDescription className="font-semibold">
                View profile
              </CardDescription>
            </div>
            <Badge
              className={`rounded-full font-bold uppercase ${
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
          <CardContent className="flex w-full justify-between p-4">
            <div className="flex gap-2">
              <div className="h-full w-44 overflow-hidden rounded-md">
                <img
                  src={v.listingID.listingAssets[0].secure_url}
                  alt="Image"
                  className="h-full w-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold ">
                  {v.listingID.serviceTitle}
                </span>
                <span className="text-sm font-semibold ">
                  {v.listingID.serviceType}
                </span>
                <span className="text-sm font-semibold">
                  Requested date:{" "}
                  {new Date(v.requestedBookingDateStartsAt).toDateString()} -{" "}
                  {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
                </span>
                <Badge
                  variant={"outline"}
                  className={`w-max font-bold ${
                    v.listingID.cancellationPolicy === "Flexible"
                      ? "text-green-600"
                      : v.listingID.cancellationPolicy === "Moderate"
                        ? "text-amber-600"
                        : v.listingID.cancellationPolicy === "Non-refundable"
                          ? "text-red-600"
                          : " text-red-800"
                  }`}
                >
                  Cancellation policy - {v.listingID.cancellationPolicy}
                </Badge>
                <Badge className="w-max">
                  Duration{" "}
                  {formatDistance(
                    new Date(v.requestedBookingDateStartsAt).setHours(
                      0,
                      0,
                      0,
                      0,
                    ),
                    new Date(v.requestedBookingDateEndsAt).setHours(0, 0, 0, 0),
                  )}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between gap-2">
              <div className="flex flex-col">
                <Badge variant={"secondary"} className="text-base font-bold">
                  Total:{" "}
                  {formatValue({
                    value: String(v.totalPrice),
                    intlConfig: {
                      locale: "PH",
                      currency: "php",
                    },
                  })}
                </Badge>
                <CancelRequestDialog bookingRequestID={v._id as string} />
              </div>
              {v.status === "pending" &&
              compareAsc(
                new Date(v.requestedBookingDateStartsAt),
                new Date().setHours(0, 0, 0, 0),
              ) < 0 ? (
                <Badge variant={"destructive"}>Expired booking request</Badge>
              ) : (
                <Badge className="bg-green-600 hover:bg-green-500">
                  Awaiting host approval
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )),
    )
  ) : (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center">
      <Lottie animationData={noRequest} loop={false} className="h-36 w-36" />{" "}
      <span className="text-lg font-bold text-gray-600">
        No pending requests
      </span>
    </div>
  );
}

export default PendingBookingRequests;
