import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { formatValue } from "react-currency-input-field";
import { Link } from "react-router-dom";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import noListing from "../../assets/no-listings.json";
import useGetListingsPerCategory from "@/hooks/useGetListingsPerCategory";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { auth } from "@/firebase config/config";
import { TCategories } from "./DigitalAudioServices";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UpdateWishlist from "@/partials/components/UpdateWishlist";
import { formatDistance } from "date-fns";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import ListingsNavigation from "@/partials/components/ListingsNavigation";

const uid = auth.currentUser?.uid;

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function DigitalVideoServices() {
  const { data, isPending } = useGetListingsPerCategory<TCategories>(
    "Digital Video Services",
  );

  useEffect(() => {
    document.title = "Digital Video Services - IGotYou";
  }, []);

  return (
    <>
      {isPending ? (
        <ListingsLoader />
      ) : (
        <section className="mt-2 px-8">
          <ListingsNavigation />
          <>
            {data?.pages[0]?.data.categorizedListings.length > 0 ? (
              <>
                <div className="grid grid-cols-4 gap-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {data?.pages.map(
                    (page) =>
                      page?.data.categorizedListings.map(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (v, i) =>
                          v.serviceType === "Digital Video Services" && (
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
                                    modules={[
                                      Navigation,
                                      Pagination,
                                      Mousewheel,
                                    ]}
                                  >
                                    {v.listingAssets?.map(
                                      (asset: TListingAssets) =>
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
                                              cldImg={cld.image(
                                                asset.public_id,
                                              )}
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
                                    <span className="text-xs font-semibold">
                                      {v.host.rating.length > 0
                                        ? v.host.rating.length
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
                          ),
                      ),
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
          </>
        </section>
      )}
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

export default DigitalVideoServices;
