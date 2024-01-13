import { ScrollArea } from "@/components/ui/scroll-area";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";

function BookingsLayout() {
  return (
    <>
      <Navigate to={"/bookings/all"} replace />
      <main className="min-h-screen">
        <nav className="shadow py-5 px-28 flex justify-between items-center w-full max-w-screen-2xl mx-auto 2xl:rounded-b-lg">
          <Link to={"/"}>
            <span>
              <img
                className="object-cover w-[30px] max-h-full max-w-full"
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
            className="text-sm font-semibold text-gray-600 px-4 py-2 border rounded-full"
          >
            All Requests
          </NavLink>
          <NavLink
            to={"/bookings/approved"}
            className="text-sm font-semibold text-gray-600 px-4 py-2 border rounded-full"
          >
            Approved
          </NavLink>
          <NavLink
            to={"/bookings/pending"}
            className="text-sm font-semibold text-gray-600 px-4 py-2 border rounded-full"
          >
            Pending
          </NavLink>
          <NavLink
            to={"/bookings/declined"}
            className="text-sm font-semibold text-gray-600 px-4 py-2 border rounded-full"
          >
            Declined
          </NavLink>
          <NavLink
            to={"/bookings/cancelled"}
            className="text-sm font-semibold text-gray-600 px-4 py-2 border rounded-full"
          >
            Cancelled
          </NavLink>
        </div>

        <ScrollArea className="h-[70vh] px-2 mx-2 mt-6 bg-[#F5F5F5] rounded-lg">
          {<Outlet />}
        </ScrollArea>
      </main>
    </>
  );
}

export default BookingsLayout;
