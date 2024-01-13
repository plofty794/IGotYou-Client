import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useVisitListing from "@/hooks/useVisitListing";
import { TFileType, TListing } from "@/root layouts/BecomeAHostLayout";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import EditListingTitleCollapsible from "./collapsibles/EditListingTitleCollapsible";
import EditListingDescriptionCollapsible from "./collapsibles/EditListingDescriptionCollapsible";
import ListingAssets from "./ListingAssets";
import EditListingLocationCollapsible from "./collapsibles/EditListingLocationCollapsible";
import EditListingPriceCollapsible from "./collapsibles/EditListingPriceCollapsible";

type Listing = {
  listing: TListing;
};

function EditListing() {
  const {
    data,
    isPending,
  }: UseQueryResult<AxiosResponse<Listing>, Error> = useVisitListing();

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <div className="flex w-full flex-col gap-4">
          <div className="p-4 pt-6">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-semibold">
                {data?.data.listing.serviceTitle}'s Assets
              </h2>
              <Button
                variant={"ghost"}
                className="flex items-center justify-center gap-2 rounded-full text-base underline"
              >
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
            <ListingAssets
              listingAssets={data?.data.listing.listingAssets as TFileType[]}
            />
          </div>
          <div className="p-4">
            <Card className="p-6 shadow-lg">
              <CardHeader className="p-0">
                <div className="w-full pb-4">
                  <h2 className="text-xl font-semibold">Listing details</h2>
                </div>
              </CardHeader>
              <div className="flex w-full flex-col gap-4">
                <EditListingTitleCollapsible
                  serviceTitle={data?.data.listing.serviceTitle as string}
                />
                <Separator />
                <EditListingDescriptionCollapsible
                  serviceDescription={
                    data?.data.listing.serviceDescription as string
                  }
                />
                <Separator />
                <EditListingLocationCollapsible
                  serviceLocation={data?.data.listing.serviceLocation as string}
                />
                <Separator />
                <EditListingPriceCollapsible
                  price={data?.data.listing.price as number}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default EditListing;
