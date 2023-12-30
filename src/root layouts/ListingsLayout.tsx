import { Button } from "@/components/ui/button";
import { auth } from "@/firebase config/config";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import useVisitListing from "@/hooks/useVisitListing";
import AlertVerifyEmail from "@/partials/components/AlertVerifyEmail";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import Loader from "@/partials/loaders/Loader";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

function ListingsLayout() {
  const userProfileData = useGetCurrentUserProfile();
  const { data, isPending } = useVisitListing();

  return (
    <>
      {userProfileData.isPending ? (
        <Loader />
      ) : isPending ? (
        <Loader />
      ) : (
        <main>
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
                  {auth.currentUser && (
                    <AlertVerifyEmail User={auth.currentUser} />
                  )}
                </Suspense>
              )}

              <UserDropDownButton />
            </span>
          </nav>
          {
            <Outlet
              context={{
                listing: data?.data,
                userProfileData: userProfileData.data?.data,
              }}
            />
          }
        </main>
      )}
    </>
  );
}

export default ListingsLayout;
