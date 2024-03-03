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
import { TFileType, TListing } from "@/root layouts/BecomeAHostLayout";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Badge } from "@/components/ui/badge";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function AssetsDrawer({ listing }: { listing: TListing }) {
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <div className="mt-4 grid h-72 grid-cols-2 gap-1 overflow-hidden rounded-xl border shadow-xl">
          {listing.listingAssets[0].format === "mp4" ? (
            <AdvancedImage
              className="h-full w-full object-cover"
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
          ) : listing.listingAssets[0].format === "mp3" ? (
            <img
              className="h-full w-full object-cover"
              src={
                "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
              }
              alt="some image"
              loading="lazy"
            />
          ) : (
            <AdvancedImage
              className="h-72 w-full object-cover"
              cldImg={cld.image(listing.listingAssets[0].public_id)}
              plugins={[
                lazyload(),
                responsive({
                  steps: [800, 1000, 1400],
                }),
              ]}
            />
          )}
          <div className="grid h-72 grid-cols-2 gap-1">
            {listing.listingAssets.map(
              (asset: TFileType, i: number) =>
                i != 0 &&
                (asset.format === "mp4" ? (
                  <AdvancedImage
                    key={asset._id}
                    className="h-40 max-h-max w-full object-cover"
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
                ) : asset.format === "mp3" ? (
                  <img
                    className="h-40 max-h-max w-96 object-cover"
                    src={
                      "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                    }
                    alt="some image"
                    loading="lazy"
                  />
                ) : (
                  <AdvancedImage
                    className="h-40 max-h-max w-full object-cover"
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
            {listing.listingAssets.map((asset: TFileType) =>
              asset.format === "mp4" ? (
                <div className="relative h-4/6 w-4/5">
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
              ) : asset.format === "mp3" ? (
                <span className="max-w-[340px]">
                  <img
                    className="rounded-2xl border object-cover shadow-xl"
                    src={
                      "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                    }
                    alt="some image"
                    loading="lazy"
                  />
                  <AudioPlayer
                    className="w-full rounded-2xl border shadow-xl"
                    header={
                      <Badge className="w-max max-w-full">
                        <p className="truncate">{asset.original_filename}</p>
                      </Badge>
                    }
                    src={asset.secure_url}
                    preload="auto"
                  />
                </span>
              ) : (
                <span className="max-w-4xl">
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

export default AssetsDrawer;
