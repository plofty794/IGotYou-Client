import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddToWishlist from "@/hooks/useUpdateWishlist";
import useGetWishlists from "@/hooks/useGetWishlists";
import { useMemo, useState } from "react";

function UpdateWishlist({ listingID }: { listingID: string }) {
  const wishlistsData = useGetWishlists();
  const { mutate } = useAddToWishlist();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlists, setWishlists] = useState<any[]>([]);

  useMemo(() => {
    setWishlists(wishlistsData.data?.data.wishlists ?? []);
  }, [wishlistsData.data?.data.wishlists]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`w-7 h-7 stroke-gray-500 hover:stroke-slate-600 cursor-pointer ${
              wishlists.length > 0 && wishlists.find((v) => v._id === listingID)
                ? "fill-red-600"
                : "fill-none"
            }`}
            onClick={() => mutate(listingID)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-950">
          <p>Save to wishlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UpdateWishlist;
