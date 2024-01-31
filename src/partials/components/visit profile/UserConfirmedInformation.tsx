import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TUser } from "@/pages/Home";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

function UserConfirmedInformation({ user }: { user?: TUser }) {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <span className="text-xl font-semibold">
          {user?.username ? (
            user?.username + "'s confirmed information"
          ) : (
            <Skeleton className="mx-auto h-4 w-[250px]" />
          )}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {user?.identityVerified ? (
          <div className="font-medium">
            <CheckCircledIcon
              color="#FFF"
              width={22}
              height={22}
              className="inline-block rounded-full bg-[#39c152]"
            />{" "}
            <span className="ml-2 text-sm font-semibold text-gray-600">
              Identity (verified)
            </span>
          </div>
        ) : (
          <div className="font-medium">
            <CrossCircledIcon
              color="#FFF"
              width={22}
              height={22}
              className="inline-block rounded-full bg-[#e94242]"
            />{" "}
            <span className="ml-2  text-sm font-semibold text-gray-600">
              Identity (not verified)
            </span>
          </div>
        )}
        {user?.emailVerified ? (
          <div className="font-medium">
            <CheckCircledIcon
              color="#FFF"
              width={22}
              height={22}
              className="inline-block rounded-full bg-[#39c152]"
            />{" "}
            <span className="ml-2 text-sm font-semibold text-gray-600">
              Email address (verified)
            </span>
          </div>
        ) : (
          <div className="font-medium">
            <CrossCircledIcon
              color="#FFF"
              width={22}
              height={22}
              className="inline-block rounded-full bg-[#e94242]"
            />{" "}
            <span className="ml-2 text-sm font-semibold text-gray-600">
              Email address (not verified)
            </span>
          </div>
        )}
        {user?.mobileVerified ? (
          <div className="font-medium">
            <CheckCircledIcon
              color="#FFF"
              width={22}
              height={22}
              className="inline-block rounded-full bg-[#39c152]"
            />{" "}
            <span className="ml-2 text-sm font-semibold text-gray-600">
              Mobile phone (verified)
            </span>
          </div>
        ) : (
          <div className="font-medium">
            <CrossCircledIcon
              color="#FFF"
              width={22}
              height={22}
              className="inline-block rounded-full bg-[#e94242]"
            />{" "}
            <span className="ml-2  text-sm font-semibold text-gray-600">
              Mobile phone (not verified)
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserConfirmedInformation;
