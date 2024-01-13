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
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { CloudinaryUploadWidget } from "@/types/createUploadWidget";

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_, result) => {
        if (result.event === "success") {
          console.log(result.info);
          setService((prev) => ({
            ...prev,
            listingAssets: [
              ...prev.listingAssets,
              {
                public_id: result.info.public_id,
                secure_url: result.info.secure_url,
                original_filename: result.info.original_filename,
                bytes: result.info.bytes,
                thumbnail_url: result.info.thumbnail_url,
                format: result.info.format,
                resource_type: result.info.resource_type,
              },
            ],
          }));
        }
      }
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
          className="font-semibold text-lg mb-2"
          onClick={() => cloudinaryWidget?.open()}
        >
          <MdOutlineAddAPhoto />
        </Button>
      )}
      <section className="profile-sheet scrollbar-none overflow-auto w-[600px] h-[250px] rounded border-dashed border-2 border-zinc-400 hover:border-zinc-500">
        {service.listingAssets.length > 0 ? (
          <>
            <Table>
              <TableHeader className="bg-gray-200">
                <TableRow className="uppercase">
                  <TableHead className="font-semibold">Preview</TableHead>
                  <TableHead className="font-semibold w-[220px]">
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
                      className="text-xs text-zinc-500 font-medium hover:bg-zinc-100"
                      key={asset.public_id}
                    >
                      <TableCell key={i}>
                        <img
                          className="rounded max-h-full max-w-full object-contain"
                          src={asset.thumbnail_url}
                          alt="some image"
                          loading="lazy"
                        />
                      </TableCell>
                      <TableCell>{asset.original_filename}</TableCell>
                      <TableCell>
                        {(asset.bytes / 1000).toFixed(2)} kb
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
              className="shadow-none text-4xl text-rose-400 bg-zinc-100 hover:bg-zinc-100 hover:text-rose-500 flex flex-col items-center justify-center w-full h-full"
              type="button"
              onClick={() => cloudinaryWidget?.open()}
            >
              <LiaCloudUploadAltSolid />
              <span className="text-base font-semibold text-gray-600 w-[195px]">
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
