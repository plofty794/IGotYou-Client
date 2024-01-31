import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/firebase config/config";
import { ArchiveIcon } from "@radix-ui/react-icons";

type TListingProps = {
  recentListings: TListings[];
  listingsCount: number;
};

type TListings = {
  _id: string;
  serviceType: string[];
  serviceTitle: string;
  serviceDescription?: string;
  listingAssets: [
    {
      public_id: string;
      secure_url: string;
      original_filename: string;
      _id: string;
    },
  ];
};

function Listings({ recentListings, listingsCount }: TListingProps) {
  console.log(recentListings);

  return (
    <>
      <div className="w-full rounded-xl border bg-white p-6 shadow-xl">
        <div className="flex w-full items-center justify-between">
          <h2 className="mb-4 text-xl font-bold">Most recent listings</h2>
          {listingsCount > 0 && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"} className="rounded-full p-2">
                      <Link to={"/hosting-listings"} reloadDocument replace>
                        <ArchiveIcon className="h-5 w-5 stroke-2" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View listings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
        {recentListings?.length > 0 ? (
          <div className="grid items-center justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {recentListings?.map((listing, idx) => (
              <div
                key={idx + idx}
                className="flex flex-col items-center justify-center gap-2"
              >
                <Swiper
                  key={idx}
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  modules={[Navigation, Pagination, Mousewheel]}
                >
                  {listing.listingAssets.map((asset) => (
                    <SwiperSlide key={asset.public_id}>
                      <img
                        key={asset._id}
                        loading="lazy"
                        className="h-[250px] max-h-full w-full max-w-full rounded-lg object-cover"
                        src={asset.secure_url}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="h-full w-full text-sm">
                  <p className="font-semibold">{listing.serviceType}</p>
                  <p className="font-medium text-gray-600">
                    {listing.serviceTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="w-full border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-lg font-semibold text-gray-600">
                You have no active listings
              </CardTitle>
            </CardHeader>
            <CardContent className="mx-auto w-max">
              <Button className="rounded-full bg-gray-950">
                <Link
                  to={`/become-a-host/${
                    auth.currentUser && auth.currentUser.uid
                  }`}
                >
                  Create a listing
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export default Listings;
