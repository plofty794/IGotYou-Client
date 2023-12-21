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
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
        folder: "IGotYou-Listings",
        resourceType: "auto",
        multiple: true,
      },
      (_, result) => {
        if (result.event === "success") {
          setService((prev) => ({
            ...prev,
            listingPhotos: [
              ...prev.listingPhotos,
              {
                public_id: result.info.public_id,
                secure_url: result.info.secure_url,
                original_filename: result.info.original_filename,
                bytes: result.info.bytes,
                thumbnail_url: result.info.thumbnail_url,
                format: result.info.format,
              },
            ],
          }));
        }
      }
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget, setService]);

  return (
    <>
      {service.listingPhotos.length > 0 && (
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
        {service.listingPhotos.length > 0 ? (
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
                {service.listingPhotos.map((photo, i) => (
                  <>
                    <TableRow
                      className="text-xs text-zinc-500 font-medium hover:bg-zinc-100"
                      key={photo.public_id}
                    >
                      <TableCell key={i}>
                        <img
                          className="rounded max-h-full max-w-full object-contain"
                          src={photo.thumbnail_url}
                          alt="some image"
                          loading="lazy"
                        />
                      </TableCell>
                      <TableCell>{photo.original_filename}</TableCell>
                      <TableCell>
                        {(photo.bytes / 1000).toFixed(2)} kb
                      </TableCell>
                      <TableCell className="uppercase">
                        {photo.format}
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

type TParamsProps = {
  cloudName?: string;
  uploadPreset?: string;
  folder?: string;
  cropping?: boolean;
  resourceType?: string;
  multiple?: boolean;
};

interface CloudinaryImageUploadResponse {
  access_mode: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  id: string;
  original_filename: string;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

interface CloudinaryUploadWidget {
  open(): void;
  close(): void;
  destroy(): void;
  setFolder(folder: string): void;
  setUploadPreset(uploadPreset: string): void;
  setMultiple(multiple: boolean): void;
  setCropping(cropping: boolean): void;
  setResultCallback(
    callback: (
      error: Error | null,
      result: CloudinaryImageUploadResponse
    ) => void
  ): void;
}

type TResult = {
  event: string;
  info: CloudinaryImageUploadResponse;
};

type TFn = (err: unknown, res: TResult) => void;

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        { cloudName, uploadPreset, folder, cropping }: TParamsProps,
        fn: TFn
      ) => CloudinaryUploadWidget;
    };
  }
}
