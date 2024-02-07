import useGetPreviousReservations from "@/hooks/useGetPreviousReservations";
import PreviousReservationsTable from "./table/PreviousReservationsTable";

function PreviousReservationsTab() {
  const { data, isPending } = useGetPreviousReservations();

  return (
    <div>
      {isPending ? (
        "No Reservations"
      ) : (
        <PreviousReservationsTable
          data={data!.pages.flatMap((page) => page.data.previousReservations)}
        />
      )}
    </div>
  );
}

export default PreviousReservationsTab;
