import useGetCurrentReservations from "@/hooks/useGetCurrentReservations";
import noReservations from "../../../../assets/no-pending-payments.json";
import Lottie from "lottie-react";

function CurrentReservations() {
  const { data, isPending } = useGetCurrentReservations();

  return (
    <>
      {isPending ? (
        <h1>Loading...</h1>
      ) : data?.pages[0].data.currentReservations?.length > 0 ? (
        <div className="p-4 bg-white">Has current reservations</div>
      ) : (
        <div className="p-6 w-max mx-auto flex flex-col items-center justify-center gap-2 ">
          <Lottie
            loop={false}
            animationData={noReservations}
            className="w-32 h-32"
          />
          <span className="font-semibold text-gray-600">
            No current reservations
          </span>
        </div>
      )}
    </>
  );
}

export default CurrentReservations;
