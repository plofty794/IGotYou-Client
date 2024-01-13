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
    document.title = location.pathname.includes("edit")
      ? "Edit Listing - IGotYou"
      : "Host Listings - IGotYou";
  }, [location.pathname]);

  return (
    <div className="w-full p-8">
      <div className="flex w-full items-center justify-between">
        {listingID != null && location.pathname.includes("edit") ? (
          <span className="text-2xl font-bold ">Edit listing</span>
        ) : (
          <span className="text-xl font-bold ">
            # of listings:{" "}
            {data?.pages.flatMap((page) => page.data.hostListings).length}
          </span>
        )}

        <Button variant={"outline"} className="border-black py-5 font-medium">
          <Link
            to={`/become-a-host/${auth.currentUser?.uid}`}
            replace
            className="flex w-full items-center justify-center gap-2 "
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
