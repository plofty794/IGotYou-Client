import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { Link } from "react-router-dom";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function ListingsCarousel({ listings }: { listings: TListing[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {listings.map((v) => (
          <CarouselItem key={v._id} className="md:basis-1/2 lg:basis-1/3">
            <Link to={`/listings/show/${v._id}`}>
              <div className="flex flex-col items-center justify-center gap-2">
                {v.listingAssets[0].format === "mp4" ? (
                  <AdvancedImage
                    className="h-60 w-60 rounded-lg object-cover"
                    cldImg={cld
                      .image(v.listingAssets[0].public_id)
                      .setAssetType("video")
                      .format("auto:image")}
                  />
                ) : v.listingAssets[0].format === "mp3" ? (
                  <img
                    className="h-60 w-60 rounded-lg object-cover"
                    src={
                      "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                    }
                    alt="some image"
                    loading="lazy"
                  />
                ) : (
                  <AdvancedImage
                    cldImg={cld.image(v.listingAssets[0].public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                    className="h-60 w-60 rounded-lg object-cover"
                  />
                )}
                <div className="h-full w-full text-sm">
                  <p className="font-semibold">{v.serviceType}</p>
                  <div className="w-2/4 overflow-hidden text-ellipsis">
                    <span className=" w-max text-lg font-semibold">
                      {v.serviceTitle}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {listings.length > 3 && (
        <>
          <CarouselNext />
          <CarouselPrevious />
        </>
      )}
    </Carousel>
  );
}

export default ListingsCarousel;
