import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/firebase config/config";
import { Link } from "react-router-dom";

function HostingDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border border-slate-300 rounded-full p-1">
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
          <DropdownMenuItem className="p-4">Profile</DropdownMenuItem>
          <DropdownMenuItem className="p-4">Account</DropdownMenuItem>
          <DropdownMenuItem className="p-4">
            <Link className="w-full" to={"/"} replace reloadDocument>
              Switch to Guest
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuItem className="p-4">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HostingDropdownMenu;
