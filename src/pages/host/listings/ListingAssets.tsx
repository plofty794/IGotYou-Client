import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TFileType as TListingAssets } from "@/root layouts/BecomeAHostLayout";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import imgUrl from "/audio_image.png";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function ListingAssets({ listingAssets }: { listingAssets: TListingAssets[] }) {
  return (
    <>
      {listingAssets.length > 5 ? (
        <ScrollArea className="w-[95%] whitespace-nowrap">
          <div className="flex w-full items-center gap-2 pb-4">
            {listingAssets?.map((asset) =>
              asset.format === "mp4" ? (
                <span
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      block: "end",
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
              ) : asset.format === "mp3" ? (
                <span
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      block: "end",
                      behavior: "smooth",
                    });
                  }}
                  className="h-52 w-52 rounded-xl border"
                  key={asset.public_id}
                >
                  <img
                    className="mx-auto h-full w-full rounded-lg border object-cover"
                    src={imgUrl}
                    alt="some image"
                    loading="lazy"
                  />
                </span>
              ) : (
                <span
                  key={asset._id}
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      block: "end",
                      behavior: "smooth",
                    });
                  }}
                  className="h-52 w-52 cursor-pointer rounded-xl border"
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
      ) : (
        <div className="flex w-full items-center gap-2 pb-4">
          {listingAssets?.map((asset) =>
            asset.format === "mp4" ? (
              <span
                className="h-52 w-full rounded-xl border"
                key={asset.public_id}
              >
                <AdvancedImage
                  className="mx-auto h-full w-full rounded-xl object-cover"
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
            ) : asset.format === "mp3" ? (
              <span
                onClick={(e) => {
                  e.currentTarget.scrollIntoView({
                    block: "end",
                    behavior: "smooth",
                  });
                }}
                className="h-52 w-full rounded-xl border"
                key={asset.public_id}
              >
                <img
                  className="mx-auto h-full w-full rounded-xl object-cover"
                  src={imgUrl}
                  alt="some image"
                  loading="lazy"
                />
              </span>
            ) : (
              <span key={asset._id} className="h-52 w-full rounded-xl border">
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
      )}
    </>
  );
}

export default ListingAssets;
