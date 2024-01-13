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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/firebase config/config";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { compareAsc, formatDistanceToNow, subDays } from "date-fns";
import { useEffect } from "react";
import { formatValue } from "react-currency-input-field";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import AssetsDrawer from "@/partials/components/AssetsDrawer";
import UpdateWishlist from "@/partials/components/UpdateWishlist";
import MessageHost from "@/partials/components/messages/MessageHost";
import VisitListingAccordion from "@/partials/components/VisitListingAccordion";

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

  useEffect(() => {
    document.title = "View Listing - IGotYou";
  }, []);

  return (
    <>
      <section className="mx-auto w-5/6">
        <div className="flex w-full items-center justify-between pt-6">
          <span className="flex items-center gap-1 text-2xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
              />
            </svg>
            {listing.serviceTitle}
          </span>
          <div className="flex items-center justify-center gap-2 p-2">
            <p className="text-sm font-semibold underline">Save</p>
            <UpdateWishlist listingID={listing._id} />
          </div>
        </div>
        <AssetsDrawer listing={listing} />
        <div className="mb-4 mt-6 flex w-full gap-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="w-max text-xl font-semibold">
                  {listing.serviceLocation}
                </span>
              </div>
              <span className="w-max text-base font-semibold text-gray-600">
                {listing.serviceDescription ?? "No description"}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {listing.host.rating.length ? (
                  listing.host.rating
                ) : (
                  <p className="text-lg font-semibold">No ratings yet</p>
                )}
              </span>
              <div className="flex items-center">
                <span>{listing.host.rating}</span>
              </div>
            </div>
            <Card className="border-0 shadow-none">
              <Separator />
              <CardHeader className="w-full flex-row items-center justify-between">
                <div className="flex w-max items-center justify-center gap-2">
                  <Avatar className="h-12 w-12">
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
                    <Badge variant={"outline"} className="w-max">
                      {formatDistanceToNow(
                        subDays(
                          new Date(listing.host.subscriptionExpiresAt),
                          30,
                        ),
                      )}{" "}
                      of hosting
                    </Badge>
                  </div>
                </div>
                <MessageHost listing={listing} />
              </CardHeader>
              <Separator />
              <VisitListingAccordion listing={listing} />
            </Card>
          </div>
          <Card className="h-max w-3/6 border-gray-300 shadow-xl">
            <CardHeader className="w-full flex-row justify-between">
              <CardTitle className="text-xl font-semibold">
                {formatValue({
                  value: String(listing.price),
                  intlConfig: {
                    locale: "PH",
                    currency: "php",
                  },
                })}{" "}
                <span className="text-sm uppercase">service</span>
              </CardTitle>
              {listing.status === "Ended" && (
                <Badge variant={"destructive"} className="w-max">
                  Listing ended
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid w-full grid-cols-2 rounded-md border border-gray-400">
                <div className="flex flex-col gap-1 border-r border-gray-400 p-2 ">
                  <span className="text-xs font-bold uppercase">
                    Available at
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    {new Date(listing.availableAt as Date).toDateString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-2">
                  <span className="text-xs font-bold uppercase">Ends at</span>
                  <span className="text-sm font-bold text-gray-600">
                    {new Date(listing.endsAt as Date).toDateString()}
                  </span>
                </div>
              </div>
              {auth.currentUser?.emailVerified ? (
                <Button
                  disabled={
                    compareAsc(
                      new Date().setHours(0, 0, 0, 0),
                      new Date(listing.endsAt),
                    ) >= 0
                  }
                  className="mt-6 w-full rounded-full bg-gray-950 p-6 text-sm font-semibold"
                >
                  {user?.bookingRequests.find(
                    (v: { listingID: string }) => v.listingID === listing._id,
                  ) ? (
                    <Link className="w-full" to="/bookings">
                      Check request status
                    </Link>
                  ) : (
                    <Link
                      className={`w-full ${
                        compareAsc(
                          new Date().setHours(0, 0, 0, 0),
                          new Date(listing.endsAt),
                        ) >= 0
                          ? "pointer-events-none"
                          : ""
                      } `}
                      to={`/listings/create-booking/${listing._id}`}
                    >
                      Continue
                    </Link>
                  )}
                </Button>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-6 w-full rounded-full bg-gray-950 p-6 text-sm font-semibold">
                      Continue
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
                      <AlertDialogCancel className="rounded-full text-sm font-medium">
                        Close
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          navigate(
                            `/users/show/${
                              auth.currentUser && auth.currentUser.uid
                            }`,
                          )
                        }
                        className="rounded-full bg-gray-950 text-sm font-medium text-white"
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

export default VisitListing;
