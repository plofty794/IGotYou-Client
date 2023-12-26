import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileButtonGroup from "./ProfileButtonGroup";
import { Skeleton } from "@/components/ui/skeleton";
import PersonalInfoSheet from "./PersonalInfoSheet";
import { Button } from "@/components/ui/button";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { auth } from "@/firebase config/config";
import { lazy, Suspense, useEffect, useState } from "react";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { dotPulse } from "ldrs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import Loader from "@/partials/loaders/Loader";
dotPulse.register();

const Listings = lazy(() => import("./Listings"));

type TProps = {
  profileData: {
    email: string;
    username: string;
    userStatus: string;
    address: string;
    funFact: string;
    school: string;
    work: string;
    emailVerified: boolean;
    mobileVerified: boolean;
    identityVerified: boolean;
    mobilePhone: string;
    photoUrl: string;
    listings: TListings[];
  };
  activeListings: TListings[];
};

type TListings = {
  _id: string;
  serviceType: string[];
  serviceDescription: string;
  listingPhotos: [
    {
      public_id: string;
      secure_url: string;
      original_filename: string;
      _id: string;
    }
  ];
};

function ProfileContent({ profileData, activeListings }: TProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useVerifyEmail();
  const updateUserProfile = useUpdateUserProfile();
  const [photo, setPhoto] = useState("");
  const [cloudinaryWidget, setCloudinaryWidget] =
    useState<CloudinaryUploadWidget>();

  useEffect(() => {
    auth.currentUser?.emailVerified &&
      profileData.emailVerified == false &&
      mutate({ emailVerified: true });
  }, [mutate, profileData.emailVerified]);

  useEffect(() => {
    setPhoto(profileData?.photoUrl);
    if (updateUserProfile.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    }
  }, [profileData?.photoUrl, queryClient, updateUserProfile.isSuccess]);

  useEffect(() => {
    if (cloudinaryWidget) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
        folder: "IGotYou-Avatars",
        resourceType: "image",
        cropping: true,
      },
      async (_, res) => {
        if (res.event === "success") {
          updateUserProfile.mutate({ photoUrl: res.info.secure_url });
          setPhoto(res.info.secure_url);
          updateProfile(auth.currentUser!, { photoURL: res.info.secure_url });
        }
        return;
      }
    );
    widget && setCloudinaryWidget(widget);
  }, [cloudinaryWidget, updateUserProfile]);

  return (
    <>
      <section className="flex gap-16 my-14 max-lg:flex-col w-5/6 mx-auto">
        <div className="flex flex-col justify-between w-2/4 h-max gap-4 max-lg:w-full">
          <Card className="flex flex-col justify-center items-center w-full max-lg:w-full px-22 py-5 shadow-lg">
            <CardHeader className="p-4 relative">
              <Avatar className="w-[80px] h-[80px]">
                <AvatarImage
                  loading="lazy"
                  className="max-h-full max-w-full object-cover hover:scale-105 transition-all"
                  src={
                    auth.currentUser?.photoURL ??
                    photo ??
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                  }
                  alt={`${profileData?.username}'s avatar`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                onClick={() => cloudinaryWidget?.open()}
                type="button"
                className="px-[0.70rem] py-2 rounded-full border absolute z-10 mx-auto bottom-2 right-2 text-center bg-zinc-600 text-zinc-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </Button>
            </CardHeader>
            <CardFooter className="p-0 flex flex-col">
              <span className="text-2xl font-bold">
                {profileData?.username ?? (
                  <Skeleton className="h-4 w-[100px]" />
                )}
              </span>
              <span className="text-gray-600 text-sm font-bold">
                {profileData?.userStatus === "host" ? "Host" : "Guest"}
              </span>
            </CardFooter>
          </Card>
          <Card className="w-full max-lg:w-full shadow-lg">
            <CardHeader>
              <span className="text-xl font-semibold">
                {profileData?.username ? (
                  profileData?.username + "'s confirmed information"
                ) : (
                  <Skeleton className="h-4 w-[250px] mx-auto" />
                )}
              </span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {profileData.identityVerified ? (
                <div className="font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
                    Identity (verified)
                  </span>
                </div>
              ) : (
                <div className="font-medium">
                  <CrossCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#e94242] rounded-full"
                  />{" "}
                  <span className="text-gray-600  ml-2 text-sm font-semibold">
                    Identity (not verified)
                  </span>
                </div>
              )}
              {profileData?.emailVerified ? (
                <div className="font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
                    Email address (verified)
                  </span>
                </div>
              ) : (
                <div className="font-medium">
                  <CrossCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#e94242] rounded-full"
                  />{" "}
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
                    Email address (not verified)
                  </span>
                </div>
              )}
              {profileData?.mobileVerified ? (
                <div className="font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
                    Mobile phone (verified)
                  </span>
                </div>
              ) : (
                <div className="font-medium">
                  <CrossCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#e94242] rounded-full"
                  />{" "}
                  <span className="text-gray-600  ml-2 text-sm font-semibold">
                    Mobile phone (not verified)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full shadow-lg">
            <CardHeader className="text-gray-950 px-6 pt-6 pb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
              <p className="font-bold text-lg">
                {profileData?.emailVerified
                  ? "Personal info"
                  : "Verify your email to edit your personal info"}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Provide personal details and how we can reach you
              </p>
            </CardHeader>
            <CardContent>
              {profileData?.emailVerified ? (
                <PersonalInfoSheet />
              ) : isSuccess && auth.currentUser?.emailVerified == false ? (
                <Button
                  type="button"
                  className="ml-2 mt-2 text-sm  font-semibold bg-gray-950 rounded-full"
                  onClick={() => document.location.reload()}
                >
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </Button>
              ) : (
                <Button
                  onClick={async () =>
                    mutate({
                      emailVerified: auth.currentUser?.emailVerified,
                    })
                  }
                  className="mt-2 text-sm  font-semibold bg-gray-950 rounded-full"
                >
                  {isPending ? (
                    // Default values shown
                    <l-dot-pulse
                      size="30"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    "Verify email"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Card className="shadow-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-gray-950 text-4xl font-semibold">
                Your profile
              </CardTitle>
            </CardHeader>
            <div className="px-6 py-2">
              <span className="text-gray-600 text-base font-semibold">
                The information you share will be used across IGotYou to help
                other guests and hosts get to know you.
              </span>
            </div>
            <CardFooter className="mt-2 text-[#3c3b3b]">
              <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-2 ">
                <ProfileButtonGroup />
              </div>
            </CardFooter>
          </Card>
          {activeListings.length > 0 || profileData.listings.length > 0 ? (
            <Suspense fallback={<Loader />}>
              <Listings
                username={profileData?.username}
                listings={activeListings}
                listingsCount={profileData.listings.length}
              />
            </Suspense>
          ) : profileData.emailVerified ? (
            <>
              <Card className="w-full shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center font-semibold text-lg text-gray-600">
                    You have no listings to show
                  </CardTitle>
                </CardHeader>
                <CardContent className="mx-auto w-max">
                  <Button className="bg-gray-950 rounded-full">
                    <Link
                      to={`/become-a-host/${
                        auth.currentUser && auth.currentUser.uid
                      }`}
                    >
                      Create a listing
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="w-full shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center font-semibold text-lg text-gray-600">
                    You have no listings to show
                  </CardTitle>
                </CardHeader>
                <CardContent className="mx-auto w-max">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-gray-950 rounded-full">
                        Subscribe to create
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-1 font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="red"
                            className="w-7 h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                          You're email is not verified yet.
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription className="text-gray-600 font-medium text-sm">
                        To create a listing, users are required to have a
                        verified email. Attempting this action without a
                        verified email is useless.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                          Close
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfileContent;

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
