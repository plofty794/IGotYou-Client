import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

function WishlistDialog() {
  const [wishlist, setWishlist] = useState(false);

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
              wishlist ? "fill-red-600" : "fill-none"
            }`}
            onClick={() => setWishlist((prev) => !prev)}
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

export default WishlistDialog;
