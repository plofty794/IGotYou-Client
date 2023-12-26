import useGetUpcomingReservations from "@/hooks/useGetUpcomingReservations";
import Lottie from "lottie-react";
import noReservations from "../../../../assets/no-pending-payments.json";

function UpcomingReservations() {
  const { data, isPending } = useGetUpcomingReservations();

  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.pages[0].data.upcomingReservations?.length > 0 ? (
        <div className="p-4 bg-white">Has upcoming reservations</div>
      ) : (
        <div className="p-6 w-max mx-auto flex flex-col items-center justify-center gap-2 ">
          <Lottie
            loop={false}
            animationData={noReservations}
            className="w-32 h-32"
          />
          <span className="font-semibold text-gray-600">
            No upcoming reservations
          </span>
        </div>
      )}
    </>
  );
}

export default UpcomingReservations;
