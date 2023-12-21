import { Link, Navigate, Outlet } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { Suspense, lazy } from "react";
import ListingsNavigation from "@/partials/components/ListingsNavigation";
import useGetListings from "@/hooks/useGetListings";

const AlertVerifyEmail = lazy(
  () => import("@/partials/components/AlertVerifyEmail")
);

function RootLayout() {
  const listings = useGetListings();
  const token = localStorage.getItem("token");

  return (
    <>
      {listings.status === "success" && auth.currentUser ? (
        <main className="min-h-screen">
          <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
            <Link to={"/"}>
              <span className="w-full h-full">
                <img
                  className="object-cover w-[30px] max-h-full max-w-full"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <span className="flex justify-center items-center gap-4">
              {/* outline-1 outline outline-[#FF385C] hover:text-[#FF385C]  */}
              {auth.currentUser?.emailVerified ? (
                <Button
                  className="text-sm font-semibold hover:bg-zinc-100 rounded-full"
                  variant={"ghost"}
                >
                  <Link to={"/hosting"} reloadDocument replace>
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
          {listings.data?.pages[0]?.data.listings.length > 0 && (
            <ListingsNavigation />
          )}
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
