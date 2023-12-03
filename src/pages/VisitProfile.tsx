import { axiosPrivateRoute } from "@/api/axiosRoute";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/firebase config/config";
import Loader from "@/partials/loaders/Loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

function VisitProfile() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () =>
      await axiosPrivateRoute.get(`/api/users/profile/visit/${id}`),
  });

  useEffect(() => {
    document.title = "Visit Profile - IGotYou";
  }, []);

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <>
          {id === auth.currentUser?.uid && (
            <Navigate to={`/users/show/${id}`} replace />
          )}
          <section className="flex px-24 py-12 gap-16 w-full">
            <Card className="flex justify-evenly items-center w-[342px] px-22 py-5 shadow-2xl">
              <CardHeader className="p-0 flex flex-col items-center justify-center gap-1">
                <Avatar className="w-[110px] h-[110px]">
                  <AvatarImage
                    loading="lazy"
                    className="max-h-full max-w-full object-cover"
                    src={
                      data?.data.user.photoUrl ??
                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="flex flex-col items-center justify-center font-medium text-sm">
                  <span className="text-xl font-semibold">
                    {data?.data.user.username}
                  </span>
                  <span>{data?.data.user.hostStatus && "Host"}</span>
                </CardTitle>
              </CardHeader>
              <CardFooter className="p-0 flex flex-col">
                <span className="text-[#222222] text-2xl font-semibold">
                  Info
                </span>
                <span className="text-zinc-500 text-sm font-semibold">
                  {/* {profileData?.hostStatus ? "Host" : "Guest"} */}
                </span>
              </CardFooter>
            </Card>
            <div className="w-max flex flex-col gap-4">
              <Card className="bg-inherit shadow-none border-0">
                <CardHeader className="text-[#222222] text-3xl font-semibold py-0">
                  <h2>About {data?.data.user.username}</h2>
                </CardHeader>
                <div className="text-zinc-500 font-medium px-6 py-2">
                  {!data?.data.user.work &&
                  !data?.data.user.school &&
                  !data?.data.user.funFact &&
                  !data?.data.user.address ? (
                    `Hello there! It looks like ${data?.data.user.username} haven't provided any about information yet.`
                  ) : (
                    <>
                      <div className="text-sm">
                        <div className="flex gap-4">
                          <h2>School: {data?.data.user.school}</h2>
                          <h2>Address: {data?.data.user.address}</h2>
                        </div>
                        <div className="flex">
                          <h2>Work: {data?.data.user.work}</h2>
                          <h2>Fun fact: {data?.data.user.funFact}</h2>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <CardFooter className="mt-2 text-[#3c3b3b]">
                  <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-2 "></div>
                </CardFooter>
              </Card>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default VisitProfile;
