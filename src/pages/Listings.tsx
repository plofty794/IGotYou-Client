import { Button } from "@/components/ui/button";
import { auth } from "@/firebase config/config";
import useGetHostListings from "@/hooks/useGetHostListings";
import ListingsTable, {
  TListings,
} from "@/partials/components/listings/ListingsTable";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

function Listings() {
  const { data, isPending } = useGetHostListings();
  const { listingID } = useParams();
  const location = useLocation();

  useEffect(() => {
    document.title = `${
      listingID != null && location.pathname.includes("renew")
        ? "Renew Listing"
        : listingID != null && location.pathname.includes("edit")
        ? "Edit listing"
        : "Host Listings"
    } - IGotYou`;
  }, [listingID, location.pathname]);

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center w-full">
        {listingID != null && location.pathname.includes("renew") ? (
          <span className="text-2xl font-bold ">Renew listing</span>
        ) : listingID != null && location.pathname.includes("edit") ? (
          <span className="text-2xl font-bold ">Edit listing</span>
        ) : (
          <span className="text-xl font-bold ">
            # of listings:{" "}
            {data?.pages.flatMap((page) => page.data.hostListings).length}
          </span>
        )}

        <Button variant={"outline"} className="py-5 font-medium border-black">
          <Link
            to={`/become-a-host/${auth.currentUser?.uid}`}
            replace
            className="w-full flex items-center justify-center gap-2 "
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create listing
          </Link>
        </Button>
      </div>

      {isPending ? (
        "Loading..."
      ) : listingID ? (
        <Outlet />
      ) : (
        <ListingsTable
          data={
            data?.pages.flatMap((page) => page.data.hostListings) as TListings[]
          }
        />
      )}
    </div>
  );
}

export default Listings;
