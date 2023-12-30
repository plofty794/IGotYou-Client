import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useGetBookingRequests from "@/hooks/useGetBookingRequests";
import BookingsTabs from "@/partials/components/bookings/BookingsTabs";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Bookings() {
  const { data, isPending, status } = useGetBookingRequests();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Your Bookings - IGotYou";
    if (status === "success") {
      data?.pages.map((page) => setBookingRequests(page.data.bookingRequests));
    }
  }, [data?.pages, status]);

  return (
    <>
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          {bookingRequests?.length > 0 ? (
            <BookingsTabs bookingRequests={bookingRequests} />
          ) : (
            <section className="flex flex-col gap-4 px-16 py-8">
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-semibold">Bookings</h1>
                <Separator />
              </div>

              <div className="flex flex-col gap-4 py-6">
                <h3 className="font-semibold text-2xl ">
                  No listings booked...yet!
                </h3>
                <span className="text-lg font-semibold text-gray-600">
                  Time to power up your devices and start planning your next
                  multimedia experience!
                </span>
                <Button className="w-max p-6 text-lg font-semibold bg-gray-950 rounded-full">
                  <Link to={"/"} replace>
                    Start searching
                  </Link>
                </Button>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default Bookings;
