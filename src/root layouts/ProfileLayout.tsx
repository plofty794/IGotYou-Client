import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { Link, Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <main className="min-h-screen">
      <nav className="sticky top-0 z-20 mx-auto flex w-full max-w-screen-2xl items-center justify-between bg-white px-28 py-5 shadow-md 2xl:rounded-b-lg">
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
      {<Outlet />}
    </main>
  );
}

export default ProfileLayout;
