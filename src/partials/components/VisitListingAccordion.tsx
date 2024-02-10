import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { format } from "date-fns";

function VisitListingAccordion({ listing }: { listing: TListing }) {
  return (
    <CardFooter className="px-0">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>What is the type of this listing?</AccordionTrigger>
          <AccordionContent>
            The type of this listing is{" "}
            <span className="font-semibold underline">
              {listing.serviceType}
            </span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>See all reserved dates</AccordionTrigger>
          <AccordionContent>
            {listing.reservedDates!.length > 0 ? (
              <Card className="m-4 border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Reserved dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {listing.reservedDates?.map(
                    (date: {
                      bookingStartsAt: string;
                      bookingEndsAt: string;
                    }) => (
                      <p className="text-base font-bold">
                        {format(new Date(date.bookingStartsAt), "MMM dd")} -{" "}
                        {format(new Date(date.bookingEndsAt), "PP")}
                      </p>
                    ),
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="m-4 border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Reserved dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base font-bold">No reserved dates</p>
                </CardContent>
              </Card>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardFooter>
  );
}

export default VisitListingAccordion;
