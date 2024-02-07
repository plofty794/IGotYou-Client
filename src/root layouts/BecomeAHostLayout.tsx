import { Link, Navigate, Outlet } from "react-router-dom";
import { Button } from "../components/ui/button";
import useMultistepForm from "@/hooks/useMultistepForm";
import { auth } from "@/firebase config/config";
import { Suspense, useEffect, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-dropdown-menu";
import HostingDropdownMenu from "@/partials/components/HostingDropdownMenu";
import HostNotification from "@/partials/components/notification/HostNotification";
import { compareAsc } from "date-fns";

dotPulse.register();

export type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes?: number;
  thumbnail_url: string;
  resource_type: string;
  format: string;
  _id?: string;
};

export type TListing = {
  _id?: string;
  serviceType: string;
  serviceDescription?: string;
  serviceTitle: string;
  listingAssets: TFileType[];
  price: number;
  date: DateRange;
  serviceLocation: string;
  cancellationPolicy: string;
  status?: string;
  reservedDates?: [];
  availableAt: string;
  endsAt: string;
  host?: {
    subscriptionExpiresAt: string;
    uid?: string
  };
};

function BecomeAHostLayout() {
  const { mutate, isPending, status, data } = useUploadListing();
  const userProfile = useGetCurrentUserProfile();
  const [service, setService] = useState<TListing>({
    serviceType: "",
    listingAssets: [],
    price: 0,
    date: {
      from: undefined,
      to: undefined,
    },
    serviceLocation: "",
    cancellationPolicy: "",
    serviceTitle: "",
    availableAt: "",
    endsAt: "",
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
    "service-type",
    "service-title",
    "service-location",
    "make-it-standout",
    "service-assets",
    "price",
    "listing-date",
    "cancellation-policy",
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
        <main className="relative h-screen overflow-hidden">
          {
            <Navigate
              to={`/become-a-host/${auth.currentUser?.uid}/${step}`}
              replace
            />
          }
          <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-16 py-8">
            <Link to={"/hosting"}>
              <span>
                <img
                  className="max-h-full w-[30px] max-w-full object-cover"
                  loading="lazy"
                  src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                  alt="logo"
                />
              </span>
            </Link>
            <div className="flex items-center justify-center gap-6">
              <HostNotification />
              <HostingDropdownMenu />
            </div>
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate(service);
            }}
          >
            {<Outlet context={{ setService, service }} />}
            <div className="absolute bottom-0 flex w-full items-center justify-between px-8 py-6">
              {isFirstPage && (
                <Button
                  type="button"
                  onClick={next}
                  size={"lg"}
                  className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                currentStepIndex !== 9 &&
                !isLastPage && (
                  <>
                    <Button
                      type="button"
                      onClick={previous}
                      size={"lg"}
                      variant={"link"}
                      className="p-6 text-sm font-medium"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={next}
                      size={"lg"}
                      className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    className="p-6 text-sm font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.serviceType}
                    type="button"
                    onClick={next}
                    size={"lg"}
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    className="p-6 text-sm font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.serviceTitle}
                    type="button"
                    onClick={next}
                    size={"lg"}
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    className="p-6 text-sm font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.serviceLocation}
                    type="button"
                    onClick={next}
                    size={"lg"}
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    disabled={service.listingAssets.length > 0}
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="p-6 text-sm font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={service.listingAssets.length < 5}
                    size={"lg"}
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    className="p-6 text-sm font-medium"
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
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    className="p-6 text-sm font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={next}
                    disabled={
                      service.date.from == null ||
                      service.date.to == null ||
                      compareAsc(service.date.from, service.date.to) === 0
                    }
                    size={"lg"}
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
              {currentStepIndex === 9 && (
                <>
                  <Button
                    type="button"
                    onClick={previous}
                    size={"lg"}
                    variant={"link"}
                    className="p-6 text-sm font-medium"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!service.cancellationPolicy}
                    size={"lg"}
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
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
                    className="rounded-full bg-gray-950 p-6 text-lg font-semibold"
                  >
                    <Link
                      to={`/hosting-listings/edit/${data?.data.newListingID}`}
                      reloadDocument
                      replace
                    >
                      Check your listing
                    </Link>
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
        <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F5F5]">
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
            <CardFooter className="mx-auto w-max">
              {userProfile.data?.data.user.identityVerified ? (
                <Button className="rounded-full bg-gray-950 px-6 py-5 text-sm font-bold">
                  {" "}
                  <Link
                    to={`/subscription/${
                      auth.currentUser && auth.currentUser.uid
                    }`}
                    replace
                  >
                    Click to subscribe
                  </Link>{" "}
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="rounded-full bg-gray-950 px-6 py-5 text-sm font-bold">
                      {" "}
                      Click to subscribe
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="gap-0 p-0">
                    <AlertDialogHeader>
                      <div className="flex items-center gap-2 p-6">
                        <CircleBackslashIcon
                          color="red"
                          width={25}
                          height={25}
                        />
                        <AlertDialogTitle className="text-base font-semibold">
                          Oops! Your identity isn't verified yet.
                        </AlertDialogTitle>
                      </div>
                    </AlertDialogHeader>
                    <Separator className="h-[1px] w-full bg-gray-300" />
                    <div className="px-6 py-4">
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-sm ">
                          We hope this message finds you well. In order to
                          enhance the{" "}
                          <span className="font-bold text-red-500 underline underline-offset-2">
                            security
                          </span>{" "}
                          and{" "}
                          <span className="font-bold text-red-500 underline underline-offset-2">
                            reliability
                          </span>{" "}
                          of our platform, we appreciate your cooperation in
                          verifying your identity before subscribing to our
                          services. This step is crucial to ensure a secure and
                          trustworthy environment for all users.
                        </span>
                        <span className="text-sm">
                          Before you can proceed with subscribing to our
                          service, we kindly request you to complete the
                          identity verification process. This involves providing
                          necessary information and possibly uploading
                          identification documents.
                        </span>
                        <span className="text-sm">
                          Thank you for your understanding and cooperation.
                        </span>
                      </div>
                    </div>
                    <Separator className="h-[1px] w-full bg-gray-300" />
                    <AlertDialogFooter className="p-4">
                      <AlertDialogCancel className="rounded-full text-sm font-medium">
                        Close
                      </AlertDialogCancel>
                      <AlertDialogAction className="rounded-full bg-gray-950 text-sm font-medium text-white">
                        <Link
                          to={`/users/identity-verification/${userProfile.data?.data.user.uid}`}
                          replace
                        >
                          Verify your identity
                        </Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
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
