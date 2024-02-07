import ReservationsTabs from "@/partials/components/hosting/ReservationsTabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Reservations() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Reservations - IGotYou";
  }, []);

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex w-1/3 flex-col gap-2">
        <div className="flex w-full items-center justify-between"></div>
        <h1 className="text-2xl font-bold">Reservations</h1>
      </div>
      <ReservationsTabs />
      <Card className="mt-4 border-none py-4 shadow-none">
        {location.pathname.includes("/all") ||
        location.pathname.includes("/upcoming") ||
        location.pathname.includes("/previous") ? (
          <Outlet />
        ) : (
          <CardContent className="mx-auto w-max p-8">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                This is your Booking Requests page.
              </CardTitle>
              <CardDescription className="text-center text-lg font-bold">
                Select a booking request to be shown here.
              </CardDescription>
            </CardHeader>
          </CardContent>
        )}
      </Card>
    </section>
  );
}

export default Reservations;
