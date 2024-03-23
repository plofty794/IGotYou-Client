import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SocketContextProvider } from "@/context/SocketContext";
import { auth } from "@/firebase config/config";
import useGetGuestNotifications from "@/hooks/useGetGuestNotifications";
import useLogOutUser from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

function HostingDropdownMenu() {
  const { data } = useGetGuestNotifications();
  const queryClient = useQueryClient();
  const { socket } = useContext(SocketContextProvider);
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
  }, [queryClient, socket]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full border border-slate-300 p-1">
          <AvatarImage
            className="cursor-pointer rounded-full object-cover"
            src={
              auth.currentUser?.photoURL ??
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-medium" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link
              to={`/users/show/${auth.currentUser && auth.currentUser?.uid}`}
              className="w-full"
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link to={"/hosting-subscription"} className="w-full">
              Subscription
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link to={"/messages"} className="relative w-full">
              Messages
              {data?.data.guestNotifications.find(
                (v: string) => v === "New-Message",
              ) && (
                <span className="absolute h-[5px] w-[5px] rounded-full bg-[#FF385C]"></span>
              )}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-4 font-semibold text-gray-600">
            <Link className="w-full" to={"/"} replace>
              Switch to Guest
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
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

export default HostingDropdownMenu;
