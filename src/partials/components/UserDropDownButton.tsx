import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { auth } from "../../firebase config/config";
import useLogOutUser from "@/hooks/useLogout";
import useGetGuestNotifications from "@/hooks/useGetGuestNotifications";
import { useContext, useEffect } from "react";
import { SocketContextProvider } from "@/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";

export function UserDropDownButton() {
  const queryClient = useQueryClient();
  const { socket } = useContext(SocketContextProvider);
  const { data } = useGetGuestNotifications();
  const User = auth.currentUser;
  const logOutUser = useLogOutUser();

  useEffect(() => {
    socket?.on("receive-message", (conversationID) => {
      queryClient.invalidateQueries({
        queryKey: ["guest-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationID],
      });
    });

    socket?.on("booking-requestUpdate", () => {
      queryClient.invalidateQueries({
        queryKey: ["guest-notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-booking-requests"],
      });
    });
  }, [queryClient, socket]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-max w-max items-center justify-between gap-3 rounded-full border bg-white"
          variant="secondary"
        >
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="relative w-max">
            <img
              className="h-[30px] max-h-full w-[30px] max-w-full rounded-full object-cover"
              src={
                auth.currentUser?.photoURL ??
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
              }
              alt="user-avatar"
              loading="lazy"
            />
            {data?.data.guestNotifications.filter(
              (v: { read: boolean }) => !v.read,
            ).length > 0 && (
              <span className="absolute left-5 top-[-5px] h-4 w-4 rounded-full bg-[#FF385C] text-xs text-white outline outline-1 outline-white">
                {
                  data?.data.guestNotifications.filter(
                    (v: { read: boolean }) => !v.read,
                  ).length
                }
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-medium" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link
              to={`${
                auth.currentUser?.displayName
                  ? "/messages"
                  : `/users/show/${auth.currentUser?.uid}`
              }`}
              className="relative w-full"
            >
              Messages
              {data?.data.guestNotifications.filter(
                (v: { read: boolean; notificationType: string }) =>
                  !v.read && v.notificationType === "New-Message",
              ).length > 0 &&
                data?.data.guestNotifications.find(
                  (v: { notificationType: string }) =>
                    v.notificationType === "New-Message",
                ) && (
                  <span className="absolute h-[5px] w-[5px] rounded-full bg-[#FF385C]"></span>
                )}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link
              to={`${
                auth.currentUser?.displayName
                  ? "/users/wishlists"
                  : `/users/show/${auth.currentUser?.uid}`
              }`}
              className="w-full"
            >
              Wishlists
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!auth.currentUser?.emailVerified}
            className="p-4 font-semibold text-gray-600"
          >
            <Link to={"/bookings"} className="relative w-full">
              Bookings
              {data?.data.guestNotifications.filter(
                (v: { read: boolean; notificationType: string }) =>
                  v.read === false && v.notificationType !== "New-Message",
              ).length > 0 &&
                data?.data.guestNotifications.filter(
                  (v: { notificationType: string }) =>
                    v.notificationType === "Booking-Approved" ||
                    v.notificationType === "Booking-Declined",
                ) && (
                  <span className="absolute h-[5px] w-[5px] rounded-full bg-[#FF385C]"></span>
                )}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={!auth.currentUser?.emailVerified}
            className="p-4 font-semibold text-gray-600"
          >
            <Link to={"/hosting"} className="w-full" reloadDocument replace>
              Manage listings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link to={`/users/show/${User && User?.uid}`} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuItem className="p-4 font-semibold text-gray-600">
          <Link to={"/write-a-feedback"} className="w-full">
            Write a feedback
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuItem className="p-4 font-semibold text-gray-600">
          <span
            className="w-full cursor-pointer"
            onClick={async () => await logOutUser()}
          >
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropDownButton;
