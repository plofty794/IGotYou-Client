import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetWishlists from "@/hooks/useGetWishlists";
import useUpdateWishlist from "@/hooks/useUpdateWishlist";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function Wishlists() {
  const { data, isPending } = useGetWishlists();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlists, setWishlists] = useState<any[]>([]);
  const { mutate } = useUpdateWishlist();

  useMemo(() => {
    setWishlists(data?.data.wishlists);
  }, [data?.data.wishlists]);

  useEffect(() => {
    document.title = "Wishlists - IGotYou";
  }, []);

  return (
    <section className="flex flex-col gap-6 px-24 py-12">
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-semibold">Wishlists</h1>
            <Badge className="h-max w-max">count: {wishlists?.length}</Badge>
          </div>
          {wishlists?.length > 0 ? (
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {wishlists?.map((v) => (
                <div className="flex flex-col gap-2">
                  <Card className="relative h-72 w-72 overflow-hidden p-0">
                    <Link key={v._id} to={`/listings/show/${v._id}`}>
                      <AdvancedImage
                        cldImg={cld.image(v.listingAssets[0].public_id)}
                        plugins={[
                          lazyload(),
                          responsive({
                            steps: [800, 1000, 1400],
                          }),
                        ]}
                        className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                    <Button
                      onClick={() => mutate(v._id)}
                      className="absolute left-1 top-1 rounded-full border bg-white p-2 hover:bg-slate-200"
                    >
                      <Cross2Icon
                        className="z-10 h-5 w-5"
                        strokeWidth={1.5}
                        color="black"
                      />
                    </Button>
                  </Card>
                  <div className="flex flex-col">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-lg font-semibold">
                        {v.serviceTitle}
                      </span>
                      <Badge className="text-gray-600" variant={"outline"}>
                        Host {v.host.username}
                      </Badge>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {v.serviceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-semibold">
                {" "}
                Create your first wishlist
              </span>
              <span className="text-lg font-semibold text-gray-600">
                As you search, click the heart icon to save your favorite
                listings and services to a wishlist.
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Wishlists;
