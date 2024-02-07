import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ScrollArea } from "@/components/ui/scroll-area";
import useEditListing from "@/hooks/useEditListing";
import { TFileType } from "@/root layouts/BecomeAHostLayout";
import {
  CloudinaryUploadResult,
  CloudinaryUploadWidget,
} from "@/types/createUploadWidget";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useEffect, useState } from "react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function EditListingPhotosDialog({
  listingsAssets,
}: {
  listingsAssets?: TFileType[];
}) {
  const [listingsAssetsCopy, setListingsAssetsCopy] = useState(listingsAssets);
  const [cloudinaryWidget, setCloudinaryWidget] =
    useState<CloudinaryUploadWidget>();
  const { mutate } = useEditListing();

  useEffect(() => {
    if (cloudinaryWidget) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
        folder: "IGotYou-Listings",
        resourceType: "auto",
        multiple: true,
      },
      (_: unknown, result: CloudinaryUploadResult) => {
        if (result.event === "success") {
          setListingsAssetsCopy((prev) => [
            ...prev!,
            {
              public_id: result.info.public_id,
              secure_url: result.info.secure_url,
              original_filename: result.info.original_filename,
              bytes: result.info.bytes,
              thumbnail_url: result.info.thumbnail_url,
              resource_type: result.info.resource_type,
              format: result.info.format,
            },
          ]);
        }
      },
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget]);

  return (
    <Drawer
      onOpenChange={(open) => {
        !open && setListingsAssetsCopy(listingsAssets);
      }}
      modal={false}
    >
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className="gap-2 rounded-full text-base font-bold underline"
        >
          Edit{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="gap-4">
        <DrawerHeader className="mb-4 flex items-center justify-between">
          <DrawerTitle className="text-2xl font-bold">All assets</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerHeader>
        <ScrollArea className="h-64 rounded-lg shadow-inner">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
            {listingsAssetsCopy?.map((asset) =>
              asset.resource_type === "video" ? (
                <div
                  onClick={() =>
                    setListingsAssetsCopy(
                      (prev) => prev?.filter((v) => v !== asset),
                    )
                  }
                  className="relative"
                >
                  <AdvancedImage
                    className="h-48 w-48 rounded-2xl border object-contain shadow-md"
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
                  <Button className="absolute right-1 top-1 rounded-full border bg-white p-2 hover:bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#222222"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() =>
                    setListingsAssetsCopy(
                      (prev) => prev?.filter((v) => v !== asset),
                    )
                  }
                  className="relative"
                >
                  <AdvancedImage
                    className="h-48 w-48 rounded-2xl border object-contain shadow-md"
                    cldImg={cld.image(asset.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                  />
                  <Button className="absolute right-1 top-1 rounded-full border bg-white p-2 hover:bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#222222"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              ),
            )}
          </div>
        </ScrollArea>
        <DrawerFooter>
          <Button
            onClick={() => cloudinaryWidget?.open()}
            className="gap-2"
            type="button"
            variant={"outline"}
          >
            Add more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
          </Button>
          <Button
            disabled={listingsAssetsCopy!.length < 5}
            onClick={() =>
              mutate({
                listingAssets: listingsAssetsCopy,
              })
            }
            className="bg-gray-950"
          >
            Save changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditListingPhotosDialog;
