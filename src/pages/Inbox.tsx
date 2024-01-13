import { Input } from "@/components/ui/input";
import BookingRequestsFilter from "./inbox/BookingRequestsFilter";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import useGetHostBookingRequests from "@/hooks/useGetHostBookingRequests";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function Inbox() {
  const { id } = useParams();
  const { data } = useGetHostBookingRequests();

  useEffect(() => {
    document.title = "Host Inbox - IGotYou";
  }, []);

  return (
    <section className="flex gap-4 p-4">
      <div className="flex w-1/3 flex-col gap-2">
        <h1 className="text-2xl font-bold"> Booking requests</h1>
        <div className="flex w-full items-center justify-between gap-2">
          <Input
            placeholder="Search guest name..."
            className="w-full font-medium"
          />
          <BookingRequestsFilter />
        </div>
        {data?.pages.flatMap((page) =>
          page.data.bookingRequests.length > 0 ? (
            <>
              <ScrollArea className="mt-2 h-[420px]">
                <div className="flex w-full flex-col gap-4">
                  {data?.pages.flatMap((page) =>
                    page.data.bookingRequests.map(
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (v: any) => (
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
                    ),
                  )}
                </div>
              </ScrollArea>
              <Separator />
            </>
          ) : (
            <div className="p-4">
              <p className="text-center text-lg font-semibold text-gray-600">
                No booking requests.
              </p>
            </div>
          ),
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
