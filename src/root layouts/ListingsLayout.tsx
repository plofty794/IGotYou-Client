import { Button } from "@/components/ui/button";
import { auth } from "@/firebase config/config";
import useVisitListing from "@/hooks/useVisitListing";
import AlertVerifyEmail from "@/partials/components/AlertVerifyEmail";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import Loader from "@/partials/loaders/Loader";
import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

function ListingsLayout() {
  const { data, isPending } = useVisitListing();

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <main>
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
                  className="rounded-full text-sm font-semibold hover:bg-zinc-100"
                  variant={"ghost"}
                >
                  <Link to={"/hosting"} replace>
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
              }}
            />
          }
        </main>
      )}
    </>
  );
}

export default ListingsLayout;
