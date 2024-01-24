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
import { MdOutlineAddAPhoto } from "react-icons/md";
import { TFileType, TListing } from "@/root layouts/BecomeAHostLayout";
import {
  CloudinaryUploadWidget,
  CloudinaryUploadResult,
} from "@/types/createUploadWidget";

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
        }
      },
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget, setService]);

  console.log(service.listingAssets);

  return (
    <>
      {service.listingAssets.length > 0 && (
        <Button
          type="button"
          variant={"outline"}
          className="mb-2 text-lg font-semibold"
          onClick={() => cloudinaryWidget?.open()}
        >
          <MdOutlineAddAPhoto />
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
