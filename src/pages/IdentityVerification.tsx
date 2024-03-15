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
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
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
import { CloudinaryUploadWidget } from "@/types/createUploadWidget";
import { toast } from "sonner";

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
        folder: "IGotYou-GovernmentID",
        resourceType: "image",
        multiple: false,
        cropping: false,
        sources: ["local"],
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_, res) => {
        if (res.event === "success") {
          setIdentityPhoto({
            public_id: res.info.public_id,
            secure_url: res.info.secure_url,
          });
          toast("Identity photo has been uploaded!", {
            dismissible: true,
            duration: 1000,
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
        <div className="flex min-h-[70vh] items-center justify-center p-2">
          <Card className="flex w-3/5 flex-col justify-center border-none p-4 shadow-none">
            <CardHeader className="mx-auto w-max p-0">
              <Lottie
                animationData={PoliteChicky}
                className="mx-auto h-[220px] w-full"
              />
            </CardHeader>
            <CardDescription className="px-6 pb-4 text-2xl font-bold text-gray-950">
              Hello {data.data.user.username}!
            </CardDescription>
            <CardContent className="flex flex-col gap-2 pb-4 text-base font-semibold text-gray-600">
              <span>
                We wanted to inform you that your identity verification status
                is{" "}
                <span className="font-bold text-amber-600">
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

            <Button className="mb-2 ml-auto mr-4 w-max rounded-full bg-gray-950 p-6 text-base font-semibold text-white">
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
          } mt-12 flex h-[70vh] flex-col items-center justify-center gap-4 transition-opacity`}
        >
          <div className="flex w-3/6 flex-col items-center justify-center gap-2">
            <div className="flex flex-col gap-4 p-2 text-center">
              <h1 className="text-4xl font-semibold ">Identity Verification</h1>
              <p className="text-lg font-semibold text-gray-600">
                Upload a scanned copy or clear photo of your government-issued
                ID through a secure document upload interface.{" "}
                <span className="mt-1 block text-sm font-bold text-amber-600">
                  Note: Make sure that the credentials in the photo are not
                  blurry.
                </span>
              </p>
            </div>
            <div className="relative w-3/4 overflow-hidden rounded-lg border border-dashed border-zinc-600">
              {identityPhoto.secure_url && (
                <CrossCircledIcon
                  color="#FFF"
                  onClick={() => {
                    mutate({
                      publicId: identityPhoto.public_id,
                    });
                    setIdentityPhoto({
                      public_id: "",
                      secure_url: "",
                    });
                    toast("Identity photo has been removed!", {
                      icon: (
                        <CheckCircledIcon
                          color="#FFF"
                          className="inline-block rounded-full bg-[#39c152]"
                        />
                      ),
                    });
                  }}
                  className="absolute right-0 m-1 h-[25px] w-[25px] cursor-pointer rounded-full shadow-lg transition-transform hover:scale-110"
                />
              )}
              {identityPhoto?.secure_url ? (
                <div className="mx-auto h-60 bg-black">
                  <a
                    href={identityPhoto.secure_url}
                    target="_blank"
                    className="cursor-zoom-in"
                  >
                    <img
                      src={identityPhoto.secure_url}
                      className="mx-auto h-full object-contain transition-transform hover:scale-105"
                      alt="proof_of_payment"
                      loading="lazy"
                    />
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 p-16">
                  <span className="text-center text-sm font-semibold text-gray-600">
                    Your photo will be shown here
                  </span>
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
                    identityPhoto.secure_url,
                  )
                }
                disabled={sendIdentityVerificationRequest.isPending}
                type="button"
                className="rounded-full bg-gray-950 p-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-7 w-7"
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
                className="flex gap-2 rounded-full bg-gray-950 font-medium"
                size={"lg"}
              >
                <span className="text-sm font-semibold">Upload</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
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
                      className="h-6 w-6"
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
                        <div className="flex flex-col gap-2 text-sm">
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
                        <div className="flex flex-col gap-2 text-sm">
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
                        <div className="flex flex-col gap-2 text-sm">
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
                        <div className="flex flex-col gap-2 text-sm">
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
                <div className="m-2 ml-auto flex w-max items-center justify-center gap-2 p-2">
                  <Button
                    onClick={() => setIsAgreed(true)}
                    className="w-max rounded-full bg-gray-950 font-medium"
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
