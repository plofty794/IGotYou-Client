import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TFileType, TListing } from "@/root layouts/BecomeAHostLayout";
import {
  CloudinaryUploadWidget,
  CloudinaryUploadResult,
} from "@/types/createUploadWidget";
import { toast } from "sonner";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type TSetServiceProps = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceUploader() {
  const { setService, service } = useOutletContext<TSetServiceProps>();
  const [cloudinaryWidget, setCloudinaryWidget] =
    useState<CloudinaryUploadWidget>();

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
          setService((prev) => ({
            ...prev,
            listingAssets: [
              ...prev.listingAssets,
              {
                bytes: result.info.bytes,
                format: result.info.format,
                original_filename: result.info.original_filename,
                public_id: result.info.public_id,
                resource_type: result.info.resource_type,
                secure_url: result.info.secure_url,
                thumbnail_url: result.info.thumbnail_url,
              } as TFileType,
            ],
          }));
          toast("Asset has been uploaded!", {
            icon: (
              <CheckCircledIcon
                color="#FFF"
                className="inline-block rounded-full bg-[#39c152]"
              />
            ),
          });
        }
      },
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget, setService]);

  return (
    <>
      {service.listingAssets.length > 0 && (
        <Button
          type="button"
          variant={"outline"}
          className="mb-2 gap-2"
          onClick={() => cloudinaryWidget?.open()}
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
      )}
      <section className="profile-sheet h-[250px] w-[600px] overflow-auto rounded border-2 border-dashed border-zinc-400 scrollbar-none hover:border-zinc-500">
        {service.listingAssets.length > 0 ? (
          <>
            <Table>
              <TableHeader className="bg-gray-200">
                <TableRow className="uppercase">
                  <TableHead className="font-semibold">Preview</TableHead>
                  <TableHead className="w-[220px] font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold">Size</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {service.listingAssets.map((asset, i) => (
                  <>
                    {asset.format === "mp3" ? (
                      <TableRow
                        className="text-xs font-medium text-zinc-500 hover:bg-zinc-100"
                        key={asset.public_id}
                      >
                        <TableCell key={i}>
                          <img
                            className="h-[51px] max-h-full w-[90px] max-w-full rounded object-contain shadow-md"
                            src={
                              "https://png.pngtree.com/png-clipart/20230303/ourmid/pngtree-vinyl-records-png-image_6629914.png"
                            }
                            alt="some image"
                            loading="lazy"
                          />
                        </TableCell>
                        <TableCell>{asset.original_filename}</TableCell>
                        <TableCell>
                          {(asset.bytes! / 1000).toFixed(2)} kb
                        </TableCell>
                        <TableCell className="uppercase">
                          {asset.format}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow
                        className="text-xs font-medium text-zinc-500 hover:bg-zinc-100"
                        key={asset.public_id}
                      >
                        <TableCell key={i}>
                          <img
                            className="max-h-full max-w-full rounded object-contain"
                            src={asset.thumbnail_url}
                            alt="some image"
                            loading="lazy"
                          />
                        </TableCell>
                        <TableCell>{asset.original_filename}</TableCell>
                        <TableCell>
                          {(asset.bytes! / 1000).toFixed(2)} kb
                        </TableCell>
                        <TableCell className="uppercase">
                          {asset.format}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <Button
              className="flex h-full w-full flex-col items-center justify-center bg-zinc-100 text-4xl text-rose-400 shadow-none hover:bg-zinc-100 hover:text-rose-500"
              type="button"
              onClick={() => cloudinaryWidget?.open()}
            >
              <LiaCloudUploadAltSolid />
              <span className="w-[195px] text-base font-semibold text-gray-600">
                Click to upload your works
              </span>
            </Button>
          </>
        )}
      </section>
    </>
  );
}

export default ServiceUploader;
