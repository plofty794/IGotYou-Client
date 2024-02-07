import useGetUpcomingReservations from "@/hooks/useGetUpcomingReservations";
import UpcomingReservationsTable from "./table/UpcomingReservationsTable";

function UpcomingReservationsTab() {
  const { data, isPending } = useGetUpcomingReservations();

  return (
    <div>
      {isPending ? (
        "No Reservations"
      ) : (
        <UpcomingReservationsTable
          data={data!.pages.flatMap((page) => page.data.upcomingReservations)}
        />
      )}
    </div>
  );
}
export default UpcomingReservationsTab;
