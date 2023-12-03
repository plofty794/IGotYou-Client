import { Link, Navigate, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { auth } from "@/firebase config/config";
import { Suspense, useEffect, useState } from "react";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import useUploadListing from "@/hooks/useUploadListing";
import { BASE_PRICE, PRICE_CAP } from "@/constants/price";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import { dotPulse } from "ldrs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Pending from "@/pages/subscription/Pending";
import Loader from "@/partials/loaders/Loader";
import { DateRange } from "react-day-picker";

dotPulse.register();

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  thumbnail_url: string;
  format: string;
};

export type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingPhotos: TFileType[];
  price: number;
  date: DateRange;
  serviceLocation: string;
};

function BecomeAHostLayout() {
  const { mutate, isPending, status } = useUploadListing();
  const userProfile = useGetCurrentUserProfile();
  const [service, setService] = useState<TListing>({
    serviceType: "",
    serviceDescription: "",
    listingPhotos: [],
    price: 0,
    date: {
      from: undefined,
      to: undefined,
    },
    serviceLocation: "",
  });

  const {
    step,
    next,
    previous,
    isFetching,
    isLastPage,
    isFirstPage,
    currentStepIndex,
  } = useMultistepForm([
    "overview",
    "about-your-service",
    "service",
    "service-description",
    "service-location",
    "make-it-standout",
    "photos",
    "price",
    "listing-date",
    "success",
  ]);

  useEffect(() => {
    if (status === "success") {
      next();
    }
  }, [next, status]);

  return (
    <>
      {userProfile.isPending ? (
        <Loader />
      ) : userProfile.data?.data.user.userStatus === "host" ? (
        <main className="relative overflow-hidden h-screen">
          {
            <Navigate
              to={`/become-a-host/${
                auth.currentUser && auth.currentUser.uid
              }/${step}`}
              replace
            />
          }
          <nav className="bg-white sticky top-0 z-10 py-8 px-16 flex justify-between items-center">
            <Link to={"/hosting"}>
              <span>
                <img
                  className="w-[30px] h-[30px]"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <UserDropDownButton />
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate(service);
            }}
          >
            {<Outlet context={{ setService, service }} />}
            <div className="absolute bottom-0 w-full flex justify-between items-center px-8 py-6">
              {isFirstPage && (
                <Button
                  type="button"
                  onClick={next}
                  size={"lg"}
                  className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                >
                  {isFetching ? (
                    // Default values shown
                    <l-dot-pulse
                      size="43"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    "Get started"
                  )}
                </Button>
              )}
              {currentStepIndex > 0 &&
                currentStepIndex !== 2 &&
                currentStepIndex !== 3 &&
                currentStepIndex !== 4 &&
                currentStepIndex !== 6 &&
                currentStepIndex !== 7 &&
                currentStepIndex !== 8 &&
                !isLastPage && (
                  <>
                    <Button
                      type="button"
                      onClick={previous}
                      size={"lg"}
                      variant={"link"}
                      className="text-sm font-medium p-6"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={next}
                      size={"lg"}
                      className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                    >
                      {isFetching ? (
                        // Default values shown
                        <l-dot-pulse
                          size="43"
                          speed="1.3"
                          color="white"
                        ></l-dot-pulse>
                      ) : (
                        "Next"
                      )}
                    </Button>
                  </>
                )}
              {currentStepIndex === 2 && (
                <>
                  <Button
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="text-sm font-medium p-6"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.serviceType}
                    type="button"
                    onClick={next}
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isFetching ? ( // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </>
              )}
              {currentStepIndex === 3 && (
                <>
                  <Button
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="text-sm font-medium p-6"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.serviceDescription}
                    type="button"
                    onClick={next}
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isFetching ? ( // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </>
              )}
              {currentStepIndex === 4 && (
                <>
                  <Button
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="text-sm font-medium p-6"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.serviceLocation}
                    type="button"
                    onClick={next}
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isFetching ? ( // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </>
              )}
              {currentStepIndex === 6 && (
                <>
                  <Button
                    disabled={service.listingPhotos.length > 0}
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="text-sm font-medium p-6"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={service.listingPhotos.length < 5}
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isFetching ? ( // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </>
              )}
              {currentStepIndex === 7 && (
                <>
                  <Button
                    disabled={service.price != null}
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="text-sm font-medium p-6"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={
                      service.price < BASE_PRICE || service.price > PRICE_CAP
                    }
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isFetching ? ( // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </>
              )}
              {currentStepIndex === 8 && (
                <>
                  <Button
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="text-sm font-medium p-6"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={
                      service.price < BASE_PRICE || service.price > PRICE_CAP
                    }
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isPending ? ( // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </>
              )}
              {isLastPage && (
                <>
                  <Button
                    type="button"
                    size={"lg"}
                    className="bg-gray-950 rounded-full text-lg font-semibold p-6"
                  >
                    {isPending ? (
                      // Default values shown
                      <l-dot-pulse
                        size="43"
                        speed="1.3"
                        color="white"
                      ></l-dot-pulse>
                    ) : (
                      "Check your listing"
                    )}
                  </Button>
                </>
              )}
            </div>
          </form>
        </main>
      ) : userProfile.data?.data.user.subscriptionStatus === "pending" ? (
        <Suspense fallback={<Loader />}>
          <Pending user={userProfile.data.data.user} />
        </Suspense>
      ) : (
        <section className="bg-[#F5F5F5] min-h-screen flex flex-col items-center justify-center gap-4">
          <Card className="w-2/4">
            <CardHeader>
              <CardTitle className="text-3xl font-bold ">
                Unlock your potential!
                <span className="block text-base text-gray-700">
                  Subscribe now and unlock the ability to create and share your
                  listings with the world.
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <span className="text-base font-bold text-gray-700">
                Hello {userProfile.data?.data.user.username},
              </span>
              <span className="text-sm font-semibold text-gray-600">
                Hey there! We've noticed you haven't subscribed yet. Don't miss
                out on all the fantastic listing opportunities waiting for you.
                Subscribe now and start showcasing your listings to the world!
                <br /> Subscribe today to create, share, and shine!
              </span>
            </CardContent>
            <CardFooter className="w-max mx-auto">
              <Button className="text-sm font-bold bg-gray-950 text-white rounded-full py-5 px-6">
                <Link
                  to={`/subscription/${
                    auth.currentUser && auth.currentUser.uid
                  }`}
                  replace
                >
                  Click to subscribe
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Button variant={"link"} className="text-sm font-bold text-gray-600">
            <Link to={"/"}>Go back</Link>
          </Button>
        </section>
      )}
    </>
  );
}

export default BecomeAHostLayout;
