import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TRating } from "@/pages/HostReviews";
import { Link, useParams } from "react-router-dom";

function RatingsCarousel({ rating }: { rating?: TRating[] }) {
  const { userID } = useParams();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {rating?.map((v) => (
          <>
            {v.guestID._id != userID ? (
              <CarouselItem key={v._id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="aspect-video p-4">
                      <p className="text-sm font-semibold">
                        "{v.guestFeedback}"
                      </p>
                    </CardContent>
                    <div className="flex w-max items-center justify-center gap-1 p-4">
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
                      {v.guestRating}
                    </div>
                    <CardFooter className="gap-2">
                      <Link to={`/users/visit/show/${v.guestID._id}`}>
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={v.guestID.photoUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                      <p className="text-sm font-bold">{v.hostID.username}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ) : v.hostID._id != userID ? (
              <CarouselItem key={v._id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="aspect-video p-4">
                      <p className="text-sm font-semibold">
                        "{v.hostFeedback}"
                      </p>
                    </CardContent>
                    <div className="flex w-max items-center justify-center gap-1 p-4">
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
                      {v.hostRating}
                    </div>
                    <CardFooter className="gap-2">
                      <Link to={`/users/visit/show/${v.hostID._id}`}>
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={v.hostID.photoUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                      <p className="text-sm font-bold">{v.hostID.username}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ) : (
              ""
            )}
          </>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default RatingsCarousel;
