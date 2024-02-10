import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import noListing from "../assets/no-listings.json";
import { InfiniteData } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { formatValue } from "react-currency-input-field";
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
import UpdateWishlist from "@/partials/components/UpdateWishlist";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { formatDistance } from "date-fns";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import ListingsNavigation from "@/partials/components/ListingsNavigation";
import { TRating } from "./HostReviews";

type TOutletContext = {
  listings: InfiniteData<AxiosResponse<TListings>>;
  uid: string;
};

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function Home() {
  const { listings, uid } = useOutletContext<TOutletContext>();

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
                <DialogTitle className="text-base font-semibold">
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
            <div className="m-2 ml-auto flex w-max items-center justify-center gap-2 p-2">
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
      <section className="mt-2 px-8">
        <ListingsNavigation />
        {listings.pages[0].data.listings.length > 0 ? (
          <>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {listings.pages.map((page) =>
                page.data.listings.map((v, i) => (
                  <Card
                    key={v._id}
                    className="w-full overflow-hidden border-none shadow-none"
                  >
                    <CardHeader className="flex flex-col gap-1 p-0">
                      <Link
                        to={`${
                          uid === v.host.uid
                            ? `/hosting-listings/edit/${v._id}`
                            : `/listings/show/${v._id}`
                        } `}
                        className="mt-2"
                        reloadDocument={uid === v.host.uid}
                        replace
                      >
                        <Swiper
                          className="rounded-xl"
                          key={i}
                          spaceBetween={10}
                          cssMode={true}
                          navigation={{
                            enabled: true,
                          }}
                          pagination={true}
                          mousewheel={true}
                          modules={[Navigation, Pagination, Mousewheel]}
                        >
                          {v.listingAssets?.map((asset) =>
                            asset.format === "mp4" ? (
                              <SwiperSlide
                                className="h-72 rounded-xl"
                                key={asset.public_id}
                              >
                                <AdvancedImage
                                  className="mx-auto h-72 w-full rounded-xl object-cover"
                                  cldImg={cld
                                    .image(asset.public_id)
                                    .setAssetType("video")
                                    .format("auto:image")}
                                />
                              </SwiperSlide>
                            ) : asset.format === "mp3" ? (
                              <SwiperSlide key={asset.public_id}>
                                <img
                                  className="mx-auto h-72 w-full rounded-lg border object-cover"
                                  src={
                                    "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                                  }
                                  alt="some image"
                                  loading="lazy"
                                />
                              </SwiperSlide>
                            ) : (
                              <SwiperSlide key={asset.public_id}>
                                <AdvancedImage
                                  key={asset._id}
                                  cldImg={cld.image(asset.public_id)}
                                  plugins={[
                                    lazyload(),
                                    responsive({
                                      steps: [800, 1000, 1400],
                                    }),
                                  ]}
                                  className="mx-auto h-72 w-full rounded-lg border object-cover"
                                />
                              </SwiperSlide>
                            ),
                          )}
                        </Swiper>
                      </Link>
                    </CardHeader>
                    <CardContent className="mt-2 flex justify-between p-0">
                      <div className="flex flex-col">
                        <span className="text-base font-semibold">
                          {v.serviceTitle}
                        </span>
                        <span className="text-sm font-semibold text-gray-600">
                          {v.host.username}
                        </span>

                        <div className="w-full">
                          <span className="text-sm font-semibold text-gray-600">
                            Ends in{" "}
                            {formatDistance(
                              new Date().setHours(0, 0, 0, 0),
                              new Date(v.endsAt),
                            )}
                          </span>
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <span className="font-semibold">
                            {formatValue({
                              value: v.price.toString(),
                              intlConfig: {
                                locale: "ph-PH",
                                currency: "PHP",
                              },
                            })}{" "}
                            <span className="text-sm font-semibold">
                              service
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="mb-2 flex items-center justify-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs font-bold">
                            {v.host.rating.length > 0
                              ? (
                                  v.host.rating
                                    .map((v: TRating) => v.guestRating)
                                    .reduce((acc, curr) => acc + curr, 0) /
                                  v.host.rating.length
                                ).toFixed(1)
                              : "No rating"}
                          </span>
                        </div>
                        {v.host.uid !== auth.currentUser?.uid && (
                          <>
                            <UpdateWishlist listingID={v._id} />
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )),
              )}
            </div>
          </>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center">
            <Lottie
              loop={false}
              animationData={noListing}
              className="h-64 w-64"
            />
            <span className="text-xl font-bold text-gray-600">
              No listings to show
            </span>
          </div>
        )}
      </section>
    </>
  );
}

type TListingAssets = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
  resource_type: string;
  thumbnail_url: string;
  format: string;
};

type TListings = {
  listings: [
    {
      availableAt: string;
      createdAt: string;
      endsAt: string;
      host: TUser;
      listingAssets: [TListingAssets];
      price: number;
      serviceDescription?: string;
      serviceType: string;
      serviceTitle: string;
      updatedAt: string;
      _id: string;
    },
  ];
};

export type TUser = {
  _id: string;
  email: string;
  emailVerified: boolean;
  listings: TListing[];
  mobileVerified: boolean;
  identityVerified: boolean;
  photoUrl: null | string;
  providerId: string;
  subscriptionExpiresAt: Date;
  subscriptionStatus: string;
  uid: string;
  userStatus: string;
  username: string;
  rating: [];
  educationalAttainment: string;
  address: string;
  work: string;
  funFact: string;
};

export default Home;
