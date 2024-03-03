import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocketContextProvider } from "@/context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { pulsar } from "ldrs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleIcon } from "@radix-ui/react-icons";
import useGetHostNotifications from "@/hooks/useGetHostNotifications";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosPrivateRoute } from "@/api/axiosRoute";

pulsar.register();

function HostNotification() {
  const queryClient = useQueryClient();
  const hostNotifications = useGetHostNotifications();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [newNotifications, setNewNotifications] = useState<any[]>([]);
  const { socket } = useContext(SocketContextProvider);

  async function readHostBookingRequestNotification(notificationID: string) {
    await axiosPrivateRoute.patch(
      `/api/users/current-user/notifications/read-host-booking-request-notification/${notificationID}`,
      {
        read: true,
      },
    );
    queryClient.invalidateQueries({ queryKey: ["host-booking-requests"] });
    queryClient.invalidateQueries({ queryKey: ["host-notifications"] });
  }

  useEffect(() => {
    setNotifications(hostNotifications.data?.data.hostNotifications);
    setNewNotifications(
      hostNotifications.data?.data.hostNotifications?.filter(
        (v: { read: boolean }) => !v.read,
      ),
    );
  }, [hostNotifications.data?.data.hostNotifications]);

  useEffect(() => {
    socket?.on("send-booking-request-hostNotification", () => {
      queryClient.invalidateQueries({
        queryKey: ["host-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["host-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-request"],
        exact: false,
      });
    });

    socket?.on("request-service-cancellation-hostNotification", () => {
      queryClient.invalidateQueries({
        queryKey: ["host-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["host-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-request"],
        exact: false,
      });
    });

    socket?.on("send-booking-cancelled-hostNotification", () => {
      queryClient.invalidateQueries({
        queryKey: ["host-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["host-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-request"],
        exact: false,
      });
    });
  }, [queryClient, socket]);

  return (
    <>
      {hostNotifications.isPending ? (
        <l-pulsar size="10" speed="1" color="gray"></l-pulsar>
      ) : (
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    onClick={() => setNewNotifications([])}
                    className="rounded-full p-2"
                  >
                    <span className="relative cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                      {newNotifications?.length > 0 && (
                        <span className="absolute top-[-5px] h-4 w-4 rounded-full bg-red-500 text-xs text-white">
                          {newNotifications.length}
                        </span>
                      )}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
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
          <DropdownMenuContent align="end" className="w-80 rounded-lg p-0">
            <div className="flex flex-col">
              <span className="p-4 text-lg font-bold">
                Booking Notifications
              </span>
              {notifications?.length < 1 && (
                <>
                  <span className="m-2 mx-auto w-max p-4 text-sm font-bold text-gray-600">
                    No notifications
                  </span>
                </>
              )}
            </div>
            {notifications?.length > 0 && (
              <>
                <Separator />
                <ScrollArea className="h-60">
                  <div className="flex flex-col items-center">
                    {notifications?.map((v) => (
                      <>
                        <DropdownMenuItem className="w-full p-0">
                          <Link
                            onClick={() =>
                              readHostBookingRequestNotification(v._id)
                            }
                            key={v._id}
                            to={`/hosting-inbox/booking-request/${v.data._id}`}
                            className="w-full p-4 hover:bg-[#F5F5F5]"
                          >
                            <div className="flex w-full items-center gap-2">
                              <div className="w-full">
                                <p className="text-xs font-bold text-gray-600">
                                  {v.senderID.username} has sent you a{" "}
                                  {(v.notificationType as string)
                                    .split("-")
                                    .join(" ")}{" "}
                                </p>
                                <span className="text-xs font-bold text-red-600">
                                  {formatDistanceToNow(new Date(v.createdAt), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>
                              {!v.read && (
                                <CircleIcon
                                  height={10}
                                  width={10}
                                  color="blue"
                                  className="h-max w-max rounded-full bg-blue-600 fill-blue-600 p-0"
                                />
                              )}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default HostNotification;
