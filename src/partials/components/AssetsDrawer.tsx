import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AdvancedImage,
  AdvancedVideo,
  lazyload,
  responsive,
} from "@cloudinary/react";
import { fadeIn, fadeOut } from "@cloudinary/url-gen/actions/effect";
import { Cloudinary } from "@cloudinary/url-gen/index";
import UpdateWishlist from "./UpdateWishlist";
import { useState } from "react";
import { TListing } from "@/root layouts/BecomeAHostLayout";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function AssetsDrawer({ listing }: { listing: TListing }) {
  const [viewListing, setViewListing] = useState("");

  return (
    <Drawer onClose={() => setViewListing("")}>
      <DrawerTrigger>
        <div className="mt-4 grid h-80 grid-cols-2 gap-1 overflow-hidden rounded-xl">
          {listing.listingAssets[0].resource_type === "video" ? (
            <AdvancedImage
              className="object-cover"
              cldImg={cld
                .image(listing.listingAssets[0].public_id)
                .setAssetType("video")
                .format("auto:image")}
              plugins={[
                lazyload(),
                responsive({
                  steps: [800, 1000, 1400],
                }),
              ]}
            />
          ) : (
            <AdvancedImage
              className="object-cover"
              cldImg={cld.image(listing.listingAssets[0].public_id)}
              plugins={[
                lazyload(),
                responsive({
                  steps: [800, 1000, 1400],
                }),
              ]}
            />
          )}
          <div className="grid h-full grid-cols-2 gap-1">
            {listing.listingAssets.map(
              (asset: TListingAsset, i: number) =>
                i != 0 &&
                (asset.resource_type === "video" ? (
                  <AdvancedImage
                    key={asset._id}
                    className="h-40 w-full object-cover"
                    cldImg={cld
                      .image(asset.public_id)
                      .setAssetType("video")
                      .format("auto:image")}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                ) : (
                  <AdvancedImage
                    className="h-40 w-full object-cover"
                    cldImg={cld.image(asset.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                )),
            )}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <ScrollArea className="h-screen">
          <DrawerHeader className="flex w-full justify-between">
            <DrawerTitle className="text-3xl font-bold">
              {listing.serviceTitle}'s Assets
            </DrawerTitle>
            <div className="flex items-center justify-center gap-2 p-2">
              <p className="text-base font-semibold underline">Save</p>
              <UpdateWishlist listingID={listing._id as string} />
            </div>
          </DrawerHeader>
          <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
            {listing.listingAssets.map((asset: TListingAsset) =>
              asset.resource_type === "video" ? (
                <div
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setViewListing(asset.public_id);
                  }}
                  className={`relative h-4/6 w-4/5 cursor-pointer ${
                    asset.public_id === viewListing ? "rounded-2xl outline" : ""
                  }`}
                >
                  <AdvancedImage
                    className="relative -z-10 mx-auto h-full w-full rounded-2xl border object-contain shadow-lg"
                    cldImg={cld
                      .image(asset.public_id)
                      .setAssetType("video")
                      .format("auto:image")}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                  <AdvancedVideo
                    className="absolute left-[50%] top-0 z-0 h-full w-max translate-x-[-50%] rounded-2xl border object-contain opacity-0 shadow-lg hover:z-10 hover:opacity-100"
                    muted
                    onMouseOver={(e) => {
                      e.currentTarget.play();
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                    }}
                    loop
                    cldVid={cld
                      .video(asset.public_id)
                      .effect(fadeIn().duration(1000))
                      .effect(fadeOut().duration(2000))}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                    poster={cld
                      .image(asset.public_id)
                      .setAssetType("video")
                      .format("auto:image")
                      .toURL()}
                  />
                </div>
              ) : (
                <span
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setViewListing(asset.public_id);
                  }}
                  className={`max-w-4xl cursor-pointer ${
                    asset.public_id === viewListing ? "rounded-2xl outline" : ""
                  }`}
                >
                  <AdvancedImage
                    className="rounded-2xl border object-cover shadow-xl"
                    cldImg={cld.image(asset.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                </span>
              ),
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

type TListingAsset = {
  secure_url: string;
  public_id: string;
  _id: string;
  original_filename: string;
  resource_type: string;
  thumbnail_url: string;
};

export default AssetsDrawer;
