import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { Link } from "react-router-dom";

function ListingsCarousel({ listings }: { listings: TListing[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {listings.map((v) => (
          <CarouselItem key={v._id} className="md:basis-1/2 lg:basis-1/3">
            <Link to={`/listings/show/${v._id}`}>
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  loading="lazy"
                  className="h-60 w-60 rounded-lg object-cover"
                  src={v.listingAssets[0].secure_url}
                />

                <div className="h-full w-full text-sm">
                  <p className="font-semibold">{v.serviceType}</p>
                  <p className="font-medium text-gray-600">{v.serviceTitle}</p>
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
