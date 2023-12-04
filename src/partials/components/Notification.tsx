import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocketContextProvider } from "@/context/SocketContext";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import useGetNotifications from "@/hooks/useGetNotifications";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { pulsar } from "ldrs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleIcon } from "@radix-ui/react-icons";
pulsar.register();

function Notification() {
  const userNotifications = useGetNotifications();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [newNotifications, setNewNotifications] = useState<any[]>([]);
  const { socket } = useContext(SocketContextProvider);

  useEffect(() => {
    setNotifications(userNotifications.data?.data.notifications);
    setNewNotifications(
      userNotifications.data?.data.notifications.filter(
        (v: { read: boolean }) => !v.read
      )
    );
  }, [
    userNotifications.data?.data.notification,
    userNotifications.data?.data.notifications,
  ]);

  console.log(notifications);

  useMemo(() => {
    socket?.on("pong", (data) => {
      setNotifications((prev) => [data.notifications, ...prev]);
      setNewNotifications((prev) => [
        data.notifications?.filter((v: { read: boolean }) => !v.read),
        ...prev,
      ]);
    });
    socket?.on("res", (data) => console.log(data));
  }, [socket]);

  return (
    <>
      {userNotifications.isPending ? (
        <l-pulsar size="10" speed="1" color="gray"></l-pulsar>
      ) : (
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger onClick={() => setNewNotifications([])}>
                  <span className="relative cursor-pointer">
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
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                    {newNotifications?.length > 0 && (
                      <span className="absolute top-[-5px] text-xs rounded-full text-white w-4 h-4 bg-red-500">
                        {newNotifications.length}
                      </span>
                    )}
                  </span>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                {newNotifications?.length < 1
                  ? "No notification"
                  : newNotifications?.length > 1
                  ? `${newNotifications?.length} unread notifications`
                  : `${newNotifications?.length} unread notification`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent align="center" className="p-0 w-80">
            <div className="flex flex-col gap-2 p-4">
              <span className="text-xl font-extrabold text-gray-600">
                Notifications
              </span>
              {notifications?.length < 1 && (
                <>
                  <span className="m-2 mx-auto w-max text-xs font-bold text-gray-600">
                    No notifications
                  </span>
                </>
              )}
            </div>
            {notifications?.length > 0 && (
              <>
                <Separator />
                <ScrollArea className="min-h-72 h-max">
                  <div className="flex flex-col items-center p-1">
                    {notifications?.map((v) => (
                      <>
                        <Link
                          key={v._id}
                          to={"/hosting-inbox"}
                          className="hover:bg-[#F5F5F5] p-3"
                        >
                          <div className="w-full flex items-center gap-2">
                            <Avatar>
                              <AvatarImage
                                className="object-contain max-w-full"
                                src={
                                  v.fromAdmin != undefined
                                    ? v.fromAdmin.photoUrl
                                    : v.fromUserID.photoUrl
                                }
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="w-full">
                              <p className="text-gray-600 text-xs font-bold">
                                {v.fromAdmin != null
                                  ? v.fromAdmin.username
                                  : v.fromUserID.username}{" "}
                                has sent you a{" "}
                                {(v.notificationType as string)
                                  .split("-")
                                  .join(" ")}{" "}
                              </p>
                              <span className="text-xs font-bold text-rose-600">
                                {formatDistanceToNow(
                                  new Date(v.createdAt as string),
                                  { addSuffix: true }
                                )}
                              </span>
                            </div>
                            {!v.read && (
                              <CircleIcon
                                height={10}
                                width={10}
                                color="blue"
                                className="fill-blue-600 bg-blue-600 rounded-full p-0 h-max w-max"
                              />
                            )}
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}

export default Notification;
