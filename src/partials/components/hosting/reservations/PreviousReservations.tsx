import useGetPreviousReservations from "@/hooks/useGetPreviousReservations";
import Lottie from "lottie-react";
import noReservations from "../../../../assets/no-pending-payments.json";

function PreviousReservations() {
  const { data, isPending } = useGetPreviousReservations();

  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.pages[0].data.previousReservations?.length > 0 ? (
        <div className="p-4 bg-white">Has previous reservations</div>
      ) : (
        <div className="p-6 w-max mx-auto flex flex-col items-center justify-center gap-2 ">
          <Lottie
            loop={false}
            animationData={noReservations}
            className="w-32 h-32"
          />
          <span className="font-semibold text-gray-600">
            No previous reservations
          </span>
        </div>
      )}
    </>
  );
}

export default PreviousReservations;
