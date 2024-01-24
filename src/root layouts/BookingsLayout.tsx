import { ScrollArea } from "@/components/ui/scroll-area";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";

const locations = [
  "/bookings/all",
  "/bookings/approved",
  "/bookings/cancelled",
  "/bookings/pending",
  "/bookings/declined",
];

function BookingsLayout() {
  const location = useLocation();

  return (
    <>
      {!locations.includes(location.pathname) && (
        <Navigate to={"/bookings/all"} />
      )}
      <main className="min-h-screen">
        <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-28 py-5 shadow 2xl:rounded-b-lg">
          <Link to={"/"}>
            <span>
              <img
                className="max-h-full w-[30px] max-w-full object-cover"
                loading="lazy"
                src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                alt="logo"
              />
            </span>
          </Link>
          <div className="flex items-center justify-center gap-4">
            <UserDropDownButton />
          </div>
        </nav>

        <div className="flex items-center justify-center gap-4 p-4 pb-2">
          <NavLink
            to={"/bookings/all"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600"
          >
            All Requests
          </NavLink>
          <NavLink
            to={"/bookings/approved"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600"
          >
            Approved
          </NavLink>
          <NavLink
            to={"/bookings/pending"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600"
          >
            Pending
          </NavLink>
          <NavLink
            to={"/bookings/declined"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600"
          >
            Declined
          </NavLink>
          <NavLink
            to={"/bookings/cancelled"}
            className="rounded-full border px-4 py-2 text-sm font-semibold text-gray-600"
          >
            Cancelled
          </NavLink>
        </div>

        <ScrollArea className="mx-2 mt-6 h-[70vh] rounded-lg bg-[#F5F5F5] px-2">
          {<Outlet />}
        </ScrollArea>
      </main>
    </>
  );
}

export default BookingsLayout;
