import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, Outlet } from "react-router-dom";

function BookingsLayout() {
  return (
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
      {<Outlet />}
    </main>
  );
}

export default BookingsLayout;
