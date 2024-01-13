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
import { compareAsc, differenceInDays, formatDistance } from "date-fns";
import Lottie from "lottie-react";
import { formatValue } from "react-currency-input-field";
import noRequest from "../../assets/no-pending-payments.json";
import useGetGuestPendingBookingRequests from "@/hooks/useGetGuestPendingBookingRequests";
import { jelly } from "ldrs";
import { useEffect } from "react";
jelly.register();

function PendingBookingRequests() {
  const { data, isPending } = useGetGuestPendingBookingRequests();

  useEffect(() => {
    document.title = "Pending Booking Requests - IGotYou";
  }, []);

  return isPending ? (
    <div className="flex items-center justify-center w-full h-[50vh]">
      <l-jelly size="40" speed="0.9" color="black"></l-jelly>
    </div>
  ) : data?.pages.flatMap((page) => page.data.pendingBookingRequests).length ??
    [].length > 0 ? (
    data?.pages.flatMap((page) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      page.data.pendingBookingRequests.map((v: any) => (
        <Card className="w-full my-2" key={v._id}>
          <CardHeader className="flex-row justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="m-0">
                <Badge className="text-sm rounded-full">
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
                  <form className="flex flex-col gap-2" method="get">
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
                  src={v.listingID.listingAssets[0].secure_url}
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
                  {new Date(v.requestedBookingDateStartsAt).toDateString()} -{" "}
                  {new Date(v.requestedBookingDateEndsAt).toDateString()}{" "}
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
                    new Date(v.requestedBookingDateEndsAt).setHours(0, 0, 0, 0)
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
                <Badge variant={"destructive"}>Expired booking request</Badge>
              ) : (
                <Badge className="bg-green-600 hover:bg-green-500">
                  Awaiting host approval
                </Badge>
              )}
              <div className="flex flex-col">
                <Badge variant={"secondary"} className="text-base font-bold">
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
    )
  ) : (
    <div className="h-[50vh] w-full flex flex-col items-center justify-center">
      <Lottie animationData={noRequest} loop={false} className="w-36 h-36" />{" "}
      <span className="text-gray-600 font-bold text-lg">
        No pending requests
      </span>
    </div>
  );
}

export default PendingBookingRequests;
