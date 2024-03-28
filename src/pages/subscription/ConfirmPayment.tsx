import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import useRemoveAsset from "@/hooks/useRemoveAsset";
import { TStatePaymentPhoto } from "../../root layouts/SubscriptionLayout";
import { CloudinaryUploadWidget } from "@/types/createUploadWidget";
import { toast } from "sonner";

function ConfirmPayment() {
  const [isFadingIn, setIsFadingIn] = useState(true);
  const { mutate } = useRemoveAsset();
  const { paymentProof, setPaymentProof } =
    useOutletContext<TStatePaymentPhoto>();
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
        folder: "IGotYou-Subscriptions",
        resourceType: "image",
        clientAllowedFormats: ["image"],
        multiple: false,
        cropping: false,
        sources: ["local"],
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_, res) => {
        if (res.event === "success") {
          setPaymentProof({
            public_id: res.info.public_id,
            secure_url: res.info.secure_url,
          });
          toast("Payment photo has been uploaded!", {
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
  }, [cloudinaryWidget, setPaymentProof]);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <>
      <div
        className={`${
          isFadingIn ? "opacity-0" : "opacity-100"
        } flex h-full items-center justify-center gap-12 transition-opacity`}
      >
        <div className="flex w-2/4 flex-col items-center justify-center gap-2 p-8">
          <div className="flex flex-col gap-4 p-2 text-center">
            <h1 className="text-4xl font-semibold ">Confirm your payment</h1>
            <p className="text-lg font-semibold text-gray-600">
              Take a screenshot or download the photo of the proof of payment
              from GCash containing the amount and the Ref no. and upload it
              here.{" "}
              <span className="mt-1 block text-sm font-bold text-amber-600">
                Note: Make sure you include the Ref no. on the screenshot
              </span>
            </p>
          </div>
          <div className="relative w-3/4 overflow-hidden rounded-lg border border-dashed border-zinc-600">
            {paymentProof?.secure_url && (
              <CrossCircledIcon
                color="#FFF"
                onClick={() => {
                  mutate({
                    publicId: paymentProof?.public_id,
                  });
                  setPaymentProof({
                    public_id: "",
                    secure_url: "",
                  });
                  toast("Payment photo has been removed!", {
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
            {paymentProof?.secure_url ? (
              <div className="mx-auto h-60 bg-black">
                <a
                  href={paymentProof.secure_url}
                  target="_blank"
                  className="cursor-zoom-in"
                >
                  <img
                    src={paymentProof.secure_url}
                    className="mx-auto h-full object-contain transition-transform hover:scale-105"
                    alt="proof_of_payment"
                    loading="lazy"
                  />
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 p-12">
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
          <Button
            disabled={!!paymentProof?.public_id}
            type="button"
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
        </div>
      </div>
    </>
  );
}

export default ConfirmPayment;
