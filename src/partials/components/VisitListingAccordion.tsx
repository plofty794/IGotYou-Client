import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardFooter } from "@/components/ui/card";
import { TListing } from "@/root layouts/BecomeAHostLayout";

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
          <AccordionTrigger>
            See when this listing is already filled.
          </AccordionTrigger>
          <AccordionContent>
            {listing.reservedDates!.length > 0
              ? "Has reservations"
              : "This listing is clear for reservations."}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardFooter>
  );
}

export default VisitListingAccordion;
