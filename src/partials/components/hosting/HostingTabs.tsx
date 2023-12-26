import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function HostingTabs() {
  return (
    <div className="w-2/4 flex items-center justify-between py-2">
      <NavLink to={"current-reservations"}>
        <Button variant={"outline"} className="rounded-full font-medium">
          Current reservations
        </Button>
      </NavLink>
      <NavLink to={"upcoming-reservations"}>
        <Button variant={"outline"} className="rounded-full font-medium">
          Upcoming reservations
        </Button>
      </NavLink>
      <NavLink to={"previous-reservations"}>
        <Button variant={"outline"} className="rounded-full font-medium">
          Previous reservations
        </Button>
      </NavLink>
    </div>
  );
}

export default HostingTabs;
