import { Suspense, lazy, useEffect } from "react";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
import PromptUsername from "@/partials/components/PromptUsername";
import { lineSpinner } from "ldrs";
lineSpinner.register();

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent")
);

function Profile() {
  const { data, status } = useGetCurrentUserProfile();

  useEffect(() => {
    document.title = "IGotYou - Profile";
  }, []);

  return (
    <>
      {status === "pending" ? (
        <div className="min-h-[80vh] flex items-center justify-center">
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
              activeListings={data.data.activeListings}
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
