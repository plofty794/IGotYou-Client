import { NavLink } from "react-router-dom";

function ReservationsTabs() {
  return (
    <div className="flex items-center gap-4 py-2">
      <NavLink
        className="rounded-full border px-6 py-2 font-semibold text-gray-600 shadow-md"
        to={"all"}
      >
        All
      </NavLink>
      <NavLink
        className="rounded-full border px-6 py-2 font-semibold text-gray-600 shadow-md"
        to={"upcoming"}
      >
        Upcoming
      </NavLink>
      <NavLink
        className="rounded-full border px-6 py-2 font-semibold text-gray-600 shadow-md"
        to={"previous"}
      >
        Previous
      </NavLink>
    </div>
  );
}

export default ReservationsTabs;
