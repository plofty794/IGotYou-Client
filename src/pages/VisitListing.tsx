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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/firebase config/config";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { formatValue } from "react-currency-input-field";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function VisitListing() {
  const navigate = useNavigate();
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    listing: { listing },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userProfileData: { user },
  } = useOutletContext();
  const [wishlist, setWishlist] = useState(false);

  console.log(listing);

  useEffect(() => {
    document.title = "View Listing - IGotYou";
  }, []);

  return (
    <>
      <section className="mx-auto w-5/6">
        <div className="pt-6 w-full flex justify-between items-center">
          <span className="flex items-center gap-1 text-2xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>
            {listing.serviceDescription}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => setWishlist((prev) => !prev)}
                className="flex items-center justify-center gap-2 rounded-md"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`w-6 h-6 stroke-gray-500 hover:stroke-slate-600 cursor-pointer ${
                    wishlist ? "fill-red-600" : "fill-none"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="underline font-medium text-sm">Save</span>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-950">
                <p>Save to wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="shadow-md border mt-4 grid grid-cols-2 gap-1 rounded-xl overflow-hidden h-72">
          <img
            src={listing.listingPhotos[0].secure_url}
            className="object-cover max-h-full max-w-full h-full w-full"
            loading="lazy"
          />
          <div className="grid grid-cols-2 gap-1 h-max">
            {listing.listingPhotos.map(
              (photo: TListingPhoto, i: number) =>
                i != 0 && (
                  <img
                    key={photo._id}
                    src={photo.secure_url}
                    className="object-cover max-w-full h-36 w-full"
                    loading="lazy"
                  />
                )
            )}
          </div>
        </div>
        <div className="mt-6 w-full flex gap-4 mb-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {listing.serviceLocation}
              </span>
              <span className="flex items-center font-semibold text-base underline underline-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {listing.host.rating.length
                  ? listing.host.rating
                  : "No ratings yet "}
              </span>
              <div className="flex items-center">
                <span>{listing.host.rating}</span>
              </div>
            </div>
            <Card className="border-0 shadow-none">
              <Separator />
              <CardHeader className="flex-row gap-6 items-start w-max">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    className="max-w-full object-cover"
                    src={
                      listing.host.photoUrl ??
                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    Hosted by {listing.host.username}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {formatDistanceToNow(
                      subDays(new Date(listing.host.subscriptionExpiresAt), 30)
                    )}{" "}
                    hosting
                  </span>
                </div>
              </CardHeader>
              <Separator />
            </Card>
          </div>
          <Card className="w-3/6 border-gray-300 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {formatValue({
                  value: listing.price.toString(),
                  prefix: "₱",
                  intlConfig: {
                    locale: "PH",
                    currency: "php",
                  },
                })}{" "}
                <span className="uppercase text-sm">service</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 rounded-md border border-gray-400 w-full">
                <div className="flex flex-col gap-1 p-2 border-r border-gray-400 ">
                  <span className="text-xs uppercase font-bold">
                    Available at
                  </span>
                  <span className="text-sm text-gray-600 font-bold">
                    {new Date(listing.availableAt as Date).toDateString()}
                  </span>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  <span className="text-xs uppercase font-bold">Ends at</span>
                  <span className="text-sm text-gray-600 font-bold">
                    {new Date(listing.endsAt as Date).toDateString()}
                  </span>
                </div>
              </div>
              {auth.currentUser?.emailVerified ? (
                <Button className="mt-6 w-full p-6 bg-gray-950 text-sm font-semibold rounded-full">
                  {user?.bookingRequests.find(
                    (v: { listingID: string }) => v.listingID === listing._id
                  ) ? (
                    <Link className="w-full" to="/bookings">
                      Check request status
                    </Link>
                  ) : (
                    <Link
                      className="w-full"
                      to={`/booking/create/${listing._id}`}
                    >
                      Continue
                    </Link>
                  )}
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-6 w-full p-6 bg-gray-950 text-sm font-semibold rounded-full">
                      Continue
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="p-0 gap-0">
                    <AlertDialogHeader>
                      <div className="flex items-center gap-2 p-6">
                        <CircleBackslashIcon
                          color="red"
                          width={25}
                          height={25}
                        />
                        <AlertDialogTitle className="font-semibold text-base">
                          Oops! Your email isn't verified yet.
                        </AlertDialogTitle>
                      </div>
                    </AlertDialogHeader>
                    <Separator />
                    <div className="px-6 py-4">
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-sm text-zinc-900">
                          We hope this message finds you well. In order to
                          enhance the{" "}
                          <span className="font-bold text-red-500 underline underline-offset-2">
                            security
                          </span>{" "}
                          and{" "}
                          <span className="font-bold text-red-500 underline underline-offset-2">
                            trustworthiness
                          </span>{" "}
                          of our platform, we kindly request your assistance in
                          verifying your email address. This verification is
                          necessary before you can proceed to create a listing
                          on our website.
                        </span>
                        <span className="text-sm text-zinc-900 ">
                          Thank you for your cooperation in ensuring the
                          security and integrity of our platform. We look
                          forward to having your verified email and seeing your
                          listing soon!
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <AlertDialogFooter className="p-4">
                      <AlertDialogCancel className="font-medium text-sm rounded-full">
                        Close
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          navigate(
                            `/users/show/${
                              auth.currentUser && auth.currentUser.uid
                            }`
                          )
                        }
                        className="font-medium text-sm bg-gray-950 text-white rounded-full"
                      >
                        Go to your profile
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

type TListingPhoto = {
  secure_url: string;
  public_id: string;
  _id: string;
  original_filename: string;
};

export default VisitListing;
