import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import useRemoveAsset from "@/hooks/useRemoveAsset";
import useSendIdentityVerificationRequest from "@/hooks/useSendIdentityVerificationRequest";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PoliteChicky from "../assets/Polite Chicky.json";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type TIdentityPhoto = {
  public_id: string;
  secure_url: string;
};

function IdentityVerification() {
  const [isAgreed, setIsAgreed] = useState(false);
  const { data } = useGetCurrentUserProfile();
  const [isFadingIn, setIsFadingIn] = useState(true);
  const { mutate } = useRemoveAsset();
  const sendIdentityVerificationRequest = useSendIdentityVerificationRequest();
  const [identityPhoto, setIdentityPhoto] = useState<TIdentityPhoto>({
    public_id: "",
    secure_url: "",
  });
  const [cloudinaryWidget, setCloudinaryWidget] =
    useState<CloudinaryUploadWidget>();

  useEffect(() => {
    if (cloudinaryWidget) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
        folder: "IGotYou-GovernmentID",
        resourceType: "image",
        multiple: false,
        cropping: false,
      },
      (_, res) => {
        if (res.event === "success") {
          setIdentityPhoto({
            public_id: res.info.public_id,
            secure_url: res.info.secure_url,
          });
        }
      }
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget]);

  useEffect(() => {
    document.title = "Identity Verification - IGotYou";

    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <>
      {data?.data.user.identityVerified &&
        data?.data.user.identityVerificationStatus === "success" && (
          <Navigate to={"/"} replace />
        )}
      {data?.data.user.identityVerificationStatus === "pending" ? (
        <div className="min-h-[70vh] flex items-center justify-center p-2">
          <Card className="w-3/5 p-4 flex flex-col justify-center shadow-none border-none">
            <CardHeader className="p-0 w-max mx-auto">
              <Lottie
                animationData={PoliteChicky}
                className="w-full h-[220px] mx-auto"
              />
            </CardHeader>
            <CardDescription className="px-6 pb-4 text-2xl font-bold text-gray-950">
              Hello {data.data.user.username}!
            </CardDescription>
            <CardContent className="flex flex-col gap-2 pb-4 text-base text-gray-600 font-semibold">
              <span>
                We wanted to inform you that your identity verification status
                is{" "}
                <span className="text-amber-600 font-bold">
                  currently pending
                </span>
                . Our team is working diligently to process verification of your
                identity, and we appreciate your patience.
              </span>
              <span>
                We're here to help you with any concerns or inquiries you may
                have. We look forward to providing you with the best service
                once your subscription is fully processed.
              </span>
            </CardContent>

            <Button className="ml-auto w-max p-6 font-semibold text-base rounded-full bg-gray-950 text-white mb-2 mr-4">
              <Link to={"/"} replace>
                {" "}
                Go back
              </Link>
            </Button>
          </Card>
        </div>
      ) : (
        <div
          className={`${
            isFadingIn ? "opacity-0" : "opacity-100"
          } transition-opacity flex flex-col justify-center items-center h-[70vh] mt-12 gap-4`}
        >
          <div className="w-3/6 flex flex-col items-center justify-center gap-2">
            <div className="text-center flex flex-col gap-4 p-2">
              <h1 className="text-4xl font-semibold ">Identity Verification</h1>
              <p className="text-lg font-semibold text-gray-600">
                Upload a scanned copy or clear photo of your government-issued
                ID through a secure document upload interface.{" "}
                <span className="text-sm mt-1 block font-bold text-amber-600">
                  Note: Make sure that the credentials in the photo are not
                  blurry.
                </span>
              </p>
            </div>
            <div className="overflow-hidden w-3/4 rounded-lg border-dashed border border-zinc-600">
              {identityPhoto?.secure_url ? (
                <div className="relative bg-[#222222d6] h-60">
                  <CrossCircledIcon
                    onClick={() => {
                      mutate({
                        publicId: identityPhoto.public_id,
                      });
                      setIdentityPhoto({
                        public_id: "",
                        secure_url: "",
                      });
                    }}
                    className="absolute right-0 w-[25px] h-[25px] text-zinc-300 hover:text-zinc-100 m-1 cursor-pointer"
                  />
                  <img
                    src={identityPhoto.secure_url}
                    className="mx-auto aspect-square object-cover h-full hover:scale-110 transition-transform"
                    alt="proof_of_payment"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="p-16 flex flex-col items-center justify-center gap-2">
                  <span className="text-center text-sm font-semibold text-gray-600">
                    Your photo will be shown here
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            {identityPhoto?.secure_url ? (
              <Button
                onClick={() =>
                  sendIdentityVerificationRequest.mutate(
                    identityPhoto.secure_url
                  )
                }
                disabled={sendIdentityVerificationRequest.isPending}
                type="button"
                className="bg-gray-950 rounded-full p-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            ) : (
              <Button
                type="button"
                disabled={identityPhoto?.public_id !== "" || !isAgreed}
                onClick={() => cloudinaryWidget?.open()}
                className="bg-gray-950 rounded-full font-medium flex gap-2"
                size={"lg"}
              >
                <span className="text-sm font-semibold">Upload</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </Button>
            )}
          </div>
          {!isAgreed && (
            <Dialog defaultOpen={!isAgreed}>
              <DialogTrigger asChild>
                <Button variant={"link"} type="button">
                  <span className="text-xs font-bold">
                    View Terms and Agreements for Identity Verification
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0">
                <DialogHeader className="p-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="blue"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    <DialogTitle className="font-semibold">
                      Identity Verification Terms and Agreements
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <Separator />
                <DialogFooter>
                  <ScrollArea className="h-72">
                    <div className="px-6 py-4">
                      <div className="flex flex-col justify-between gap-2">
                        <div className="text-sm flex flex-col gap-2">
                          <span className="font-bold">
                            1. Acceptance of Terms
                          </span>
                          <span>
                            By subscribing to IGotYou, you agree to the terms
                            and conditions outlined in this document. These
                            terms govern your use of our services and the
                            collection of personal information.
                          </span>
                        </div>
                        <div className="text-sm flex flex-col gap-2">
                          <span className="font-bold">
                            2. Collection of Information
                          </span>
                          <span>
                            As part of the identity verification process, you
                            may be required to submit a scanned copy or a clear
                            photo of your government issued ID, including your
                            name, ID validity, address, and your picture.
                          </span>
                        </div>
                        <div className="text-sm flex flex-col gap-2">
                          <span className="font-bold">
                            3. Use of Information
                          </span>
                          <span>
                            We will use the collected information for the
                            purpose of verifying your identity. Your information
                            will be treated with the utmost confidentiality and
                            will not be shared with third parties unless
                            required by law.
                          </span>
                        </div>
                        <div className="text-sm flex flex-col gap-2">
                          <span className="font-bold">
                            4. Security Measures
                          </span>
                          <span>
                            We employ reasonable security measures to protect
                            your personal information from unauthorized access,
                            disclosure, alteration, and destruction. However, no
                            method of transmission over the internet or
                            electronic storage is completely secure, and we
                            cannot guarantee absolute security.
                          </span>
                        </div>
                        <span className="text-sm">
                          By acknowledging to our services, you acknowledge that
                          you have read, understood, and agreed to these terms
                          and conditions.
                        </span>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogFooter>
                <Separator />
                <div className="m-2 p-2 flex items-center justify-center gap-2 w-max ml-auto">
                  <Button
                    onClick={() => setIsAgreed(true)}
                    className="rounded-full font-medium w-max bg-gray-950"
                  >
                    Agree
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
}

export default IdentityVerification;

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

type TParamsProps = {
  cloudName?: string;
  uploadPreset?: string;
  folder?: string;
  cropping?: boolean;
  resourceType?: string;
  multiple?: boolean;
};
