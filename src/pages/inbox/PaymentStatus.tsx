import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUpdateNotification from "@/hooks/useUpdateNotification";
import { formatDistanceToNow } from "date-fns";
import { dotPulse } from "ldrs";
dotPulse.register();

function PaymentStatus({
  notification,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notification: any;
}) {
  const { mutate, isPending } = useUpdateNotification();

  return (
    <Card className="px-4" key={notification._id}>
      <CardHeader className="w-full flex-row items-start justify-between">
        <div className="flex gap-4 ">
          <Avatar>
            <AvatarImage
              className="object-cover max-w-full w-10 h-10"
              src={notification.fromAdmin.photoUrl}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="flex items-center gap font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              {notification.fromAdmin.username}
            </CardTitle>
            <CardDescription className="font-semibold">
              sent{" "}
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </CardDescription>
          </div>
        </div>
        {!notification.read ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="#0866FF"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-[#0866FF] rounded-full"
          >
            <path
              d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="green"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-sm text-gray-600">
            Subject:{" "}
            {String(notification.notificationType).split("-").join(" ")}
          </h1>
          <span className="font-bold text-sm text-gray-600">
            We hope this message finds you well. We wanted to inform you that
            your recent subscription payment has been successfully processed,
            and your account is now active. Thank you for choosing IGotYou!
          </span>
        </div>
        <CardFooter className="flex flex-col items-start gap-2 mt-2 p-0">
          <span className="text-sm font-semibold text-gray-600"></span>
          <div className="flex items-center justify-center gap-2 ml-auto">
            {notification.read ? (
              <span className="font-bold text-sm text-gray-600">
                Message has been read
              </span>
            ) : (
              <Button
                onClick={() => mutate(notification._id)}
                className="rounded-full bg-gray-950"
              >
                {isPending ? (
                  <l-dot-pulse
                    size="35"
                    speed="1.3"
                    color="white"
                  ></l-dot-pulse>
                ) : (
                  "Confirm"
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default PaymentStatus;
