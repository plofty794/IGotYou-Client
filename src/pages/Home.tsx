import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import noListing from "../assets/no-listings.json";
import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { formatValue } from "react-currency-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/firebase config/config";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TOutletContext = {
  listings: InfiniteData<AxiosResponse<TListings>>;
  uid: string;
};

function Home() {
  const { listings, uid } = useOutletContext<TOutletContext>();
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    document.title = "IGotYou";
  }, []);

  return (
    <>
      {!auth.currentUser?.emailVerified && (
        <Dialog
          defaultOpen={
            sessionStorage.getItem("checked") === "true" ? false : true
          }
        >
          <DialogContent className="p-0">
            <DialogHeader className="p-4">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon
                  color="orange"
                  width={25}
                  height={25}
                />
                <DialogTitle className="font-semibold text-base">
                  Some features are disabled!
                </DialogTitle>
              </div>
            </DialogHeader>
            <Separator />
            <DialogFooter>
              <div className="px-6 py-4">
                <div className="flex flex-col justify-center gap-2">
                  <span className="text-sm ">
                    We trust you are doing well. To bolster the{" "}
                    <span className="font-bold text-red-500 underline underline-offset-2">
                      security
                    </span>{" "}
                    and{" "}
                    <span className="font-bold text-red-500 underline underline-offset-2">
                      reliability
                    </span>{" "}
                    of our platform, we seek your cooperation in verifying your
                    email address. This verification is essential before you can{" "}
                    <span className="font-bold text-red-500 underline underline-offset-2">
                      access certain features
                    </span>{" "}
                    on our website.
                  </span>
                  <span className="text-sm  ">
                    We appreciate your collaboration in maintaining the security
                    and trustworthiness of our platform. Anticipating your
                    verified email and the opportunity to see your contributions
                    soon!
                  </span>
                </div>
              </div>
            </DialogFooter>
            <Separator />
            <div className="m-2 p-2 flex items-center justify-center gap-2 w-max ml-auto">
              <Label htmlFor="checkbox" className="text-xs font-medium">
                Don't show this again
              </Label>
              <Checkbox
                className="rounded-full"
                onCheckedChange={(checked) =>
                  sessionStorage.setItem("checked", JSON.stringify(checked))
                }
                id="checkbox"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
      <section className="px-8 mt-2">
        {listings.pages[0].data.listings.length > 0 ? (
          <>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
              {listings.pages.map((page) =>
                page.data.listings.map((v, i) => (
                  <Card
                    key={v._id}
                    className="border-none shadow-none overflow-hidden w-full"
                  >
                    <Link
                      to={`${
                        uid === v.host.uid
                          ? `/users/show/${v.host.uid}`
                          : `/booking/show/${v._id}`
                      } `}
                    >
                      <CardHeader className="p-0 flex flex-col gap-1">
                        <Swiper
                          key={i}
                          spaceBetween={10}
                          cssMode={true}
                          navigation={{
                            enabled: true,
                          }}
                          pagination={true}
                          mousewheel={true}
                          keyboard={true}
                          modules={[
                            Navigation,
                            Pagination,
                            Mousewheel,
                            Keyboard,
                          ]}
                        >
                          {v.listingPhotos.map((photo) => (
                            <SwiperSlide key={photo.public_id}>
                              <img
                                key={photo._id}
                                loading="lazy"
                                className="rounded-lg max-h-full max-w-full h-72 w-full mx-auto object-cover"
                                src={photo.secure_url}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </CardHeader>
                    </Link>
                    <CardContent className="mt-2 px-1 flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="font-semibold">{v.serviceType}</span>
                        <span className="text-sm font-medium text-gray-600">
                          {v.host.username}
                        </span>

                        <div className="text-sm w-full">
                          <span className="text-gray-600">Ends at</span>
                          <span className="text-gray-600">
                            {" "}
                            {new Date(v.endsAt).toDateString()}
                          </span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <span className="mt-1 font-semibold">
                            {formatValue({
                              value: v.price.toString(),
                              intlConfig: {
                                locale: "ph-PH",
                                currency: "PHP",
                              },
                            })}{" "}
                            <span className="text-sm font-normal">service</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end  gap-10">
                        <div className="flex items-center justify-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-semibold text-sm">
                            {v.host.rating.length > 0
                              ? v.host.rating.length
                              : "No rating"}
                          </span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                className={`w-7 h-7 stroke-gray-500 hover:stroke-slate-600 cursor-pointer ${
                                  wishlist ? "fill-red-600" : "fill-none"
                                }`}
                                onClick={() => setWishlist((prev) => !prev)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-950">
                              <p>Save to wishlist</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center">
            <Lottie
              loop={false}
              animationData={noListing}
              className="w-64 h-64"
            />
            <span className="text-gray-600 font-bold text-xl">
              No listings to show
            </span>
          </div>
        )}
      </section>
    </>
  );
}

type TListingPhotos = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
};

type TListings = {
  listings: [
    {
      availableAt: string;
      createdAt: string;
      endsAt: string;
      host: THost;
      listingPhotos: [TListingPhotos];
      price: number;
      serviceDescription: string;
      serviceType: string;
      updatedAt: string;
      _id: string;
    }
  ];
};

type THost = {
  email: string;
  emailVerified: boolean;
  listings: string[];
  mobileVerified: boolean;
  photoUrl: null | string;
  providerId: string;
  subscriptionExpiresAt: string;
  subscriptionStatus: string;
  uid: string;
  userStatus: string;
  username: string;
  rating: [];
};

export default Home;
