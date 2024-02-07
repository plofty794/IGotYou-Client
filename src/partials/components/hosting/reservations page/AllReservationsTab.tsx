import useGetReservations from "@/hooks/useGetReservations";
import ReservationsTable from "./table/ReservationsTable";

function AllReservationsTab() {
  const { data, isPending } = useGetReservations();

  return (
    <div>
      {isPending ? (
        "No Reservations"
      ) : (
        <ReservationsTable
          data={data!.pages.flatMap((page) => page.data.allReservations)}
        />
      )}
    </div>
  );
}

export default AllReservationsTab;
