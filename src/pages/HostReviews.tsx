import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import useGetHostReviews from "@/hooks/useGetHostReviews";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function HostReviews() {
  const { data, isPending } = useGetHostReviews();

  useEffect(() => {
    document.title = "Reviews - IGotYou";
  }, []);

  return (
    <div className="flex justify-center gap-4 p-12">
      <div className="flex w-[600px] flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Reviews</h1>
        {/* <div className="relative w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute left-1 top-2 h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>

          <Input
            placeholder="Search reviews"
            className="w-full rounded-full pl-8"
          />
        </div> */}
        {isPending ? (
          "Loading..."
        ) : !data?.pages.flatMap(
            (page) => page.data.hostRatings?.map((v: TRating) => v),
          ).length ? (
          <Card className="mt-8 flex w-full flex-col items-center justify-center gap-4 border p-8 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#F9D2DF"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#E31C5F"
              className="h-14 w-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold">
                Your first review will show up here
              </p>
              <p className="text-sm font-medium">
                We’ll let you know when guests leave feedback.
              </p>
            </div>
          </Card>
        ) : (
          <>
            {data?.pages.flatMap(
              (page) =>
                page.data.hostRatings?.map((v: TRating) => (
                  <Card
                    key={v._id}
                    className="mt-8 flex w-full items-center justify-between border shadow-lg"
                  >
                    <CardHeader className="flex flex-row items-center justify-center gap-4">
                      <Link to={`/users/visit/show/${v.guestID._id}`}>
                        {" "}
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={v.guestID.photoUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex flex-col gap-1">
                        <Link
                          to={`/hosting-listings/edit/${v.reservationID.listingID._id}`}
                        >
                          <p className="font-bold hover:underline">
                            {v.reservationID.listingID.serviceTitle}
                          </p>
                        </Link>
                        <div className="flex items-center justify-start gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-sm font-semibold">
                            {v.guestRating}
                          </p>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                          </svg>

                          <p className="text-sm font-semibold">
                            {v.guestFeedback}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <Link to={`/reservation-details/${v.reservationID._id}`}>
                      <Button size={"sm"} className="mr-6 bg-gray-950">
                        View reservation
                      </Button>
                    </Link>
                  </Card>
                )),
            )}
          </>
        )}
      </div>
    </div>
  );
}

export type TRating = {
  _id: string;
  guestID: { _id: string; photoUrl: string; username: string };
  hostID: { _id: string; photoUrl: string; username: string };
  reservationID: {
    _id: string;
    listingID: { _id: string; serviceTitle: string };
  };
  guestRating: number;
  hostRating: number;
  guestFeedback: string;
  hostFeedback: string;
};

export default HostReviews;
