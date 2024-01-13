import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TFileType as TListingAssets } from "@/root layouts/BecomeAHostLayout";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function ListingAssets({ listingAssets }: { listingAssets: TListingAssets[] }) {
  return (
    <ScrollArea className="w-[95%] whitespace-nowrap">
      <div className="flex w-full items-center gap-2 pb-4">
        {listingAssets?.map((asset) =>
          asset.resource_type === "video" ? (
            <span
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  block: "center",
                  inline: "center",
                  behavior: "smooth",
                });
              }}
              className="h-52 w-52 rounded-xl border"
              key={asset.public_id}
            >
              <AdvancedImage
                className="mx-auto h-full w-full cursor-pointer rounded-xl object-cover"
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
            </span>
          ) : (
            <span
              key={asset._id}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  block: "center",
                  inline: "center",
                  behavior: "smooth",
                });
              }}
              className="h-52 w-52 rounded-xl border hover:cursor-pointer"
            >
              <AdvancedImage
                cldImg={cld.image(asset.public_id)}
                plugins={[
                  lazyload(),
                  responsive({
                    steps: [800, 1000, 1400],
                  }),
                ]}
                className="mx-auto h-full w-full rounded-lg border object-cover"
              />
            </span>
          ),
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ListingAssets;
