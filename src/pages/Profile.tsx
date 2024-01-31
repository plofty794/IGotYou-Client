import { Suspense, lazy, useEffect } from "react";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
import PromptUsername from "@/partials/components/PromptUsername";
import { lineSpinner } from "ldrs";
import { auth } from "@/firebase config/config";
lineSpinner.register();

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent"),
);

function Profile() {
  const { data, status } = useGetCurrentUserProfile();

  console.log(auth.currentUser?.emailVerified);

  useEffect(() => {
    document.title = "Your Profile - IGotYou";
  }, []);

  return (
    <>
      {status === "pending" ? (
        <div className="flex min-h-[80vh] items-center justify-center">
          <l-line-spinner
            size="55"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : status === "success" ? (
        <Suspense fallback={<ProfileLoader />}>
          {data?.data?.user.username ? (
            <ProfileContent
              profileData={data?.data.user}
              recentListings={data.data.recentListings}
            />
          ) : (
            <PromptUsername />
          )}
        </Suspense>
      ) : (
        <></>
      )}
    </>
  );
}

export default Profile;
