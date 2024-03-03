import { Input } from "@/components/ui/input";
import BookingRequestsFilter from "./inbox/BookingRequestsFilter";
import { NavLink, Navigate, Outlet, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useMemo, useState } from "react";
import useGetHostBookingRequests from "@/hooks/useGetHostBookingRequests";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import useSearchGuest from "@/hooks/useSearchGuest";

function Inbox() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data } = useGetHostBookingRequests();
  const [username, setUsername] = useState("");
  const guestNames = useSearchGuest(username);

  const guests = useMemo(() => {
    if (username) {
      return guestNames.data?.data.guestNames;
    } else {
      return [];
    }
  }, [username, guestNames.data?.data.guestNames]);

  useEffect(() => {
    document.title = "Host Inbox - IGotYou";
  }, []);

  return (
    <section className="flex gap-4 p-4">
      <div className="flex w-1/3 flex-col gap-2">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold"> Booking requests</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    queryClient.invalidateQueries({
                      queryKey: ["host-booking-requests"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["booking-request"],
                      exact: false,
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["host-notifications"],
                      exact: false,
                    });
                  }}
                  size={"sm"}
                  className="rounded-full"
                  variant={"outline"}
                >
                  <ReloadIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">Reload requests</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search guest name..."
            className="w-full font-medium"
          />
          <BookingRequestsFilter />
        </div>
        {guests?.length > 0 ? (
          <>
            <ScrollArea className="mt-2 h-max max-h-[484px]">
              <div className="flex w-full flex-col gap-4">
                {guests.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (v: any) =>
                    v.type === "Service-Cancellation-Request" ? (
                      <NavLink
                        key={v._id}
                        to={`/hosting-inbox/booking-request/${v._id}`}
                        className="rounded-md border font-bold text-gray-600 shadow-md"
                      >
                        <div className="flex gap-2 px-4 py-2">
                          <Avatar>
                            <AvatarImage
                              className="object-cover"
                              src={v.guestID.photoUrl}
                              alt={v.guestID.username}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex w-full flex-col">
                            <div className="flex w-full items-start justify-between">
                              <span className="text-xs">
                                {v.guestID.username}
                              </span>

                              <span className="text-xs text-gray-600">
                                {formatDistanceToNow(new Date(v.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                              <div className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
                                <span className="max-w-xs text-xs capitalize italic">
                                  {String(v.type).split("-").join(" ")}
                                </span>
                              </div>
                              <span
                                className={` ${
                                  v.status === "pending"
                                    ? "text-amber-600 hover:text-amber-500"
                                    : v.status === "approved"
                                      ? "text-green-600 hover:text-green-500"
                                      : "text-red-600 hover:text-red-500"
                                }  w-max text-xs font-extrabold`}
                              >
                                {v.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ) : (
                      <NavLink
                        key={v._id}
                        to={`/hosting-inbox/booking-request/${v._id}`}
                        className="rounded-md border font-bold text-gray-600 shadow-md"
                      >
                        <div className="flex gap-2 px-4 py-2">
                          <Avatar>
                            <AvatarImage
                              className="object-cover"
                              src={v.guestID.photoUrl}
                              alt={v.guestID.username}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex w-full flex-col">
                            <div className="flex w-full items-start justify-between">
                              <span className="text-xs">
                                {v.guestID.username}
                              </span>

                              <span className="text-xs text-gray-600">
                                {formatDistanceToNow(new Date(v.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                              <div className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
                                <span className="max-w-xs text-xs italic">
                                  {v.message}
                                </span>
                              </div>
                              <span
                                className={` ${
                                  v.status === "pending"
                                    ? "text-amber-600 hover:text-amber-500"
                                    : v.status === "approved"
                                      ? "text-green-600 hover:text-green-500"
                                      : "text-red-600 hover:text-red-500"
                                }  w-max text-xs font-extrabold`}
                              >
                                {v.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    ),
                )}
              </div>
            </ScrollArea>
            <Separator />
          </>
        ) : (
          data?.pages.flatMap((page) =>
            page.data.bookingRequests.length > 0 ? (
              <>
                <ScrollArea className="mt-2 h-max max-h-[484px]">
                  <div className="mt-2 flex w-full flex-col gap-4">
                    {data?.pages.flatMap((page) =>
                      page.data.bookingRequests.map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (v: any) =>
                          v.type === "Service-Cancellation-Request" ? (
                            <NavLink
                              key={v._id}
                              to={`/hosting-inbox/booking-request/${v._id}`}
                              className="rounded-md border font-bold shadow-md"
                            >
                              <div className="flex gap-2 px-4 py-2">
                                <Avatar>
                                  <AvatarImage
                                    className="object-cover"
                                    src={v.guestID.photoUrl}
                                    alt={v.guestID.username}
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex w-full flex-col">
                                  <div className="flex w-full items-start justify-between">
                                    <span className="text-xs">
                                      {v.guestID.username}
                                    </span>

                                    <span className="text-xs text-gray-600">
                                      {formatDistanceToNow(
                                        new Date(v.createdAt),
                                        {
                                          addSuffix: true,
                                        },
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex w-full items-center justify-between">
                                    <div className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
                                      <span className="max-w-xs text-xs capitalize italic">
                                        {String(v.type).split("-").join(" ")}
                                      </span>
                                    </div>
                                    <span
                                      className={` ${
                                        v.status === "pending"
                                          ? "text-amber-600 hover:text-amber-500"
                                          : v.status === "approved"
                                            ? "text-green-600 hover:text-green-500"
                                            : "text-red-600 hover:text-red-500"
                                      }  w-max text-xs font-extrabold`}
                                    >
                                      {v.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          ) : (
                            <NavLink
                              key={v._id}
                              to={`/hosting-inbox/booking-request/${v._id}`}
                              className="rounded-md border font-bold text-gray-600 shadow-md"
                            >
                              <div className="flex gap-2 px-4 py-2">
                                <Avatar>
                                  <AvatarImage
                                    className="object-cover"
                                    src={v.guestID.photoUrl}
                                    alt={v.guestID.username}
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex w-full flex-col">
                                  <div className="flex w-full items-start justify-between">
                                    <span className="text-xs">
                                      {v.guestID.username}
                                    </span>

                                    <span className="text-xs text-gray-600">
                                      {formatDistanceToNow(
                                        new Date(v.createdAt),
                                        {
                                          addSuffix: true,
                                        },
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex w-full items-center justify-between">
                                    <div className="w-44 overflow-hidden text-ellipsis whitespace-nowrap">
                                      <span className="max-w-xs text-xs italic">
                                        {v.message}
                                      </span>
                                    </div>
                                    <span
                                      className={` ${
                                        v.status === "pending"
                                          ? "text-amber-600 hover:text-amber-500"
                                          : v.status === "approved"
                                            ? "text-green-600 hover:text-green-500"
                                            : "text-red-600 hover:text-red-500"
                                      }  w-max text-xs font-extrabold`}
                                    >
                                      {v.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          ),
                      ),
                    )}
                  </div>
                </ScrollArea>
                <Separator />
              </>
            ) : (
              <>
                {<Navigate to={"/hosting-inbox"} replace />}
                <div className="p-4">
                  <p className="text-center text-lg font-semibold text-gray-600">
                    No booking requests
                  </p>
                </div>
              </>
            ),
          )
        )}
      </div>
      <div className="w-full">
        {id ? (
          <Outlet />
        ) : (
          <div className="flex min-h-[70vh] w-full flex-col items-center justify-center p-8">
            <h1 className="text-2xl font-bold">
              This is your Booking Requests page.
            </h1>
            <p className="text-lg font-medium text-gray-600">
              Select a booking request to be shown here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Inbox;
