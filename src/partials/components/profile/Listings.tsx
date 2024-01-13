import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
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
  listings: TListings[];
  username: string;
  listingsCount: number;
};

type TListings = {
  _id: string;
  serviceType: string[];
  serviceDescription: string;
  listingAssets: [
    {
      public_id: string;
      secure_url: string;
      original_filename: string;
      _id: string;
    }
  ];
};

function Listings({ listings, username, listingsCount }: TListingProps) {
  console.log(listingsCount);

  return (
    <>
      <div className="w-full rounded-xl bg-white shadow-xl p-6 border">
        <div className="w-full flex justify-between items-center">
          <h2 className="mb-5 font-semibold text-xl text-[#222222]">
            {username}'s most recent listings
          </h2>
          {listingsCount > 0 && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"} className="rounded-full p-2">
                      <Link to={"/hosting-listings"} reloadDocument replace>
                        <ArchiveIcon className="stroke-2 w-5 h-5" />
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
        {listings.length > 0 ? (
          <div className="grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 ">
            {listings?.map((listing, idx) => (
              <div
                key={idx + idx}
                className="flex justify-center items-center flex-col gap-2"
              >
                <Swiper
                  key={idx}
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                >
                  {listing.listingAssets.map((photo) => (
                    <SwiperSlide key={photo.public_id}>
                      <img
                        key={photo._id}
                        loading="lazy"
                        className="rounded-lg max-h-full max-w-full w-full h-[250px] object-cover"
                        src={photo.secure_url}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="text-sm w-full h-full">
                  <p className="font-semibold">{listing.serviceType}</p>
                  <p className="font-medium text-gray-600">
                    {listing.serviceDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="w-full shadow-none border-0">
            <CardHeader>
              <CardTitle className="text-center font-semibold text-lg text-gray-600">
                You have no active listings
              </CardTitle>
            </CardHeader>
            <CardContent className="mx-auto w-max">
              <Button className="bg-gray-950 rounded-full">
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
