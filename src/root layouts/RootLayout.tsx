import { Link, Navigate, Outlet } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { Suspense, lazy } from "react";
import useGetListings from "@/hooks/useGetListings";

const AlertVerifyEmail = lazy(
  () => import("@/partials/components/AlertVerifyEmail"),
);

function RootLayout() {
  const listings = useGetListings();
  const token = localStorage.getItem("token");

  return (
    <>
      {listings.status === "success" && auth.currentUser ? (
        <main className="min-h-screen">
          <nav className="flex items-center justify-between bg-white px-20 py-5 shadow">
            <Link to={"/"}>
              <span className="h-full w-full">
                <img
                  className="max-h-full w-[30px] max-w-full object-cover"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <span className="flex items-center justify-center gap-4">
              {/* outline-1 outline outline-[#FF385C] hover:text-[#FF385C]  */}
              {auth.currentUser?.emailVerified ? (
                <Button
                  className="rounded-full font-semibold"
                  variant={"ghost"}
                >
                  <Link to={"/hosting"} replace reloadDocument>
                    {" "}
                    Switch to hosting
                  </Link>
                </Button>
              ) : (
                <Suspense>
                  <AlertVerifyEmail User={auth.currentUser} />
                </Suspense>
              )}

              <UserDropDownButton />
            </span>
          </nav>

          {
            <Outlet
              context={{ listings: listings.data, uid: auth.currentUser.uid }}
            />
          }
        </main>
      ) : auth.currentUser == null && token == null ? (
        <Navigate to={"/login"} replace />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default RootLayout;
