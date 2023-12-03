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

type TListingProps = {
  listings: TListings[];
  username: string;
  listingsCount: number;
};

type TListings = {
  _id: string;
  serviceType: string[];
  serviceDescription: string;
  listingPhotos: [
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
            {username}'s services
          </h2>
          {listingsCount > 0 && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link to={"/hosting/listings"}>
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
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View listing archive</p>
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
                  {listing.listingPhotos.map((photo) => (
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
