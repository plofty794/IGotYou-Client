import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useVisitProfile from "@/hooks/useVisitProfile";
import UserDetailsAccordion from "@/partials/components/visit profile/UserDetailsAccordion";
import Loader from "@/partials/loaders/Loader";
import { formatDistanceToNow, subDays } from "date-fns";
import { useEffect } from "react";
import { TUser } from "./Home";
import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import UserConfirmedInformation from "@/partials/components/visit profile/UserConfirmedInformation";
import { Button } from "@/components/ui/button";
import RatingsCarousel from "@/partials/components/visit profile/RatingsCarousel";
import ListingsCarousel from "@/partials/components/visit profile/ListingsCarousel";
import BlockUserDialog from "@/partials/components/visit profile/BlockUserDialog";
import UnblockUser from "@/partials/components/visit profile/UnblockUser";
import { Navigate } from "react-router-dom";
import { TRating } from "./HostReviews";

function VisitProfile() {
  const { data, isPending, isError } = useVisitProfile() as UseQueryResult<
    AxiosResponse<{ user: TUser; isBlocker: boolean; userRating: TRating[] }>
  >;

  useEffect(() => {
    document.title = "Visit Profile - IGotYou";
    scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {isError && <Navigate to={"/page-unavailable"} />}
      {isPending ? (
        <Loader />
      ) : (
        <>
          <section className="flex flex-col px-24 py-12 max-xl:items-center">
            <div className="flex w-full gap-16 max-xl:flex-col">
              <div className="flex w-max flex-col gap-8">
                <Card className="flex h-max w-[400px] justify-center shadow-2xl max-xl:mx-auto">
                  <CardHeader className="flex w-full flex-col items-center justify-center gap-1 px-8">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        loading="lazy"
                        className="max-h-full max-w-full object-cover"
                        src={
                          data?.data.user.photoUrl ??
                          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle className="w-max max-w-md text-center">
                      <span className="text-2xl font-bold">
                        {data?.data.user.username}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <div className="flex h-full w-full flex-col justify-center gap-2 p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="text-base font-bold capitalize ">
                          {data?.data.user.userStatus}
                        </span>
                        <span className="text-xs font-bold text-gray-600">
                          status
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 text-base font-bold capitalize ">
                          {!data?.data.user.rating.length
                            ? "No ratings"
                            : data?.data.user.rating.length}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-xs font-bold text-gray-600">
                          rating
                        </span>
                      </div>
                    </div>
                    {data?.data.user.userStatus === "host" && (
                      <>
                        <Separator />
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <span className="text-base font-bold capitalize ">
                              {formatDistanceToNow(
                                subDays(
                                  new Date(
                                    data?.data.user
                                      .subscriptionExpiresAt as Date,
                                  ),
                                  30,
                                ),
                              )}
                            </span>
                            <span className="text-xs font-bold text-gray-600">
                              of hosting
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
                <UserConfirmedInformation user={data?.data.user} />
                <div className="flex justify-between gap-1">
                  <Button
                    variant={"outline"}
                    className="w-max gap-2 rounded-full "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                    </svg>
                    Report {data?.data.user.username}
                  </Button>
                  {data?.data.isBlocker ? (
                    <UnblockUser
                      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                      blockedID={data?.data.user._id!}
                      username={data.data.user.username}
                    />
                  ) : (
                    <BlockUserDialog
                      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                      blockedID={data?.data.user._id!}
                      username={data?.data.user.username}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <Card className="border-0 bg-inherit shadow-none">
                  <CardHeader className="p-0 text-4xl font-semibold max-xl:mx-auto max-xl:w-2/4">
                    <CardTitle>
                      <h2>About {data?.data.user.username}</h2>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <UserDetailsAccordion user={data?.data.user} />
                  </CardContent>
                  <CardContent className="p-0">
                    <CardHeader className="p-0 text-2xl font-semibold max-xl:mx-auto max-xl:w-2/4">
                      <CardTitle>
                        <h2>{data?.data.user.username}'s ratings</h2>
                      </CardTitle>
                    </CardHeader>
                    <div className="flex w-full items-center justify-center px-8 py-6">
                      {!data?.data.userRating.length ? (
                        <CardHeader>
                          <CardTitle className="text-center text-xl font-bold text-gray-600">
                            No ratings yet.
                          </CardTitle>
                        </CardHeader>
                      ) : (
                        <RatingsCarousel rating={data?.data.userRating} />
                      )}
                    </div>
                  </CardContent>
                  <Separator />
                </Card>
                <CardHeader className="p-0 text-2xl font-semibold max-xl:mx-auto max-xl:w-2/4">
                  <CardTitle>
                    <h2>{data?.data.user.username}'s listings</h2>
                  </CardTitle>
                  <div className="flex w-full justify-center p-4">
                    {!data?.data.user.listings.length ? (
                      <CardHeader>
                        <CardTitle className="text-center text-xl font-bold text-gray-600">
                          No listings yet.
                        </CardTitle>
                      </CardHeader>
                    ) : (
                      <ListingsCarousel listings={data.data.user.listings} />
                    )}
                  </div>
                </CardHeader>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default VisitProfile;
