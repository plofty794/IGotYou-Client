import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useRemoveAsset from "@/hooks/useRemoveAsset";
import useReportUser from "@/hooks/useReportUser";
import { TFileType } from "@/root layouts/BecomeAHostLayout";
import {
  CloudinaryUploadResult,
  CloudinaryUploadWidget,
} from "@/types/createUploadWidget";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useEffect, useState } from "react";
import { dotPulse } from "ldrs";
import { toast } from "sonner";
import { CheckCircledIcon } from "@radix-ui/react-icons";
dotPulse.register();

const REASONS = [
  "Harassment",
  "Unprofessional conduct",
  "Fake profiles or listings",
  "Repeated booking cancellations or no-shows",
  "Misrepresentation of services",
  "Abusive language or behavior",
];

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

function ReportUserDialog({
  username,
  reportedUser,
}: {
  username?: string;
  reportedUser?: string;
}) {
  const { mutate, isPending } = useReportUser();
  const removeEvidence = useRemoveAsset();
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState<TFileType | null>();
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
        folder: "IGotYou-Report_Evidence",
        resourceType: "image",
        clientAllowedFormats: ["image", "video"],
        sources: ["local"],
        multiple: true,
      },
      (_: unknown, result: CloudinaryUploadResult) => {
        if (result.event === "success") {
          setEvidence({
            bytes: result.info.bytes,
            format: result.info.format,
            original_filename: result.info.original_filename,
            public_id: result.info.public_id,
            resource_type: result.info.resource_type,
            secure_url: result.info.secure_url,
            thumbnail_url: result.info.thumbnail_url,
          } as TFileType);
          toast("Photo evidence has been uploaded!", {
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

  return (
    <Dialog modal={false} onOpenChange={(isOpen) => !isOpen && setReason("")}>
      <DialogTrigger asChild>
        <Button className="gap-2 rounded-full bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
          </svg>
          Report {username}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl gap-4">
        <div className="flex w-full gap-1">
          <div className="w-full">
            <DialogHeader>
              <DialogTitle className="mb-4 text-xl font-bold">
                Why are you reporting {username}?
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-72 pr-4">
              <RadioGroup onValueChange={(v) => setReason(v)}>
                {REASONS.map((reason, index) => (
                  <>
                    <div
                      key={index}
                      className="flex h-max w-full items-center justify-between py-2"
                    >
                      <Label
                        htmlFor={reason}
                        className="text-base font-semibold capitalize"
                      >
                        {reason}
                      </Label>
                      <RadioGroupItem
                        className="h-6 w-6"
                        value={reason}
                        id={reason}
                      />
                    </div>
                    <Separator />
                  </>
                ))}
              </RadioGroup>
            </ScrollArea>
          </div>
          <div className="w-full px-4 py-8">
            {evidence ? (
              <div className="relative h-72 rounded-xl border bg-gray-950">
                <a href={evidence.secure_url} target="_blank">
                  <AdvancedImage
                    cldImg={cld.image(evidence.public_id)}
                    plugins={[
                      lazyload(),
                      responsive({
                        steps: [800, 1000, 1400],
                      }),
                    ]}
                    className="mx-auto aspect-square h-full object-cover"
                  />
                </a>
                <Button
                  onClick={() => {
                    removeEvidence.mutate({ publicId: evidence.public_id });
                    setEvidence(null);
                    toast("Photo evidence has been removed!", {
                      icon: (
                        <CheckCircledIcon
                          color="#FFF"
                          className="inline-block rounded-full bg-[#39c152]"
                        />
                      ),
                    });
                  }}
                  className="absolute right-1 top-1 rounded-full border bg-white p-2 hover:bg-slate-200"
                >
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
              <>
                <DialogTitle className="mb-2 text-sm font-bold text-gray-600">
                  Upload photo evidence
                </DialogTitle>
                <Button
                  onClick={() => cloudinaryWidget?.open()}
                  variant={"ghost"}
                  className="h-full w-full gap-2 rounded-xl outline-dashed outline-2 outline-gray-400 hover:outline-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#FF385C"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  <p className="text-xs font-bold text-gray-600">
                    Click to open uploader
                  </p>
                </Button>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={!reason || !evidence || isPending}
                className="w-max gap-2 rounded-full bg-gray-950"
              >
                {isPending ? (
                  <l-dot-pulse
                    size="40"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                    </svg>
                    Report {username}
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold">
                  Are you sure you want to report {username}?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="font-semibold">
                This will prevent them from messaging you and close the door on
                any potential bookings they might make.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Close
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutate({ reportedUser, reason, evidence })}
                  className="rounded-full bg-red-600 hover:bg-red-500"
                >
                  Report
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportUserDialog;
