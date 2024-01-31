import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TUser } from "@/pages/Home";

function UserDetailsAccordion({ user }: { user?: TUser }) {
  return (
    <div className="flex gap-4 py-6 max-xl:mx-auto max-xl:w-2/4 max-xl:flex-col">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {user?.username}'s educational attainment
          </AccordionTrigger>
          <AccordionContent className="capitalize">
            {user?.educationalAttainment ?? "N/A"}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Where does {user?.username} live?</AccordionTrigger>
          <AccordionContent className="capitalize">
            {user?.address ?? "N/A"}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What is {user?.username}
            's' work?
          </AccordionTrigger>
          <AccordionContent className="capitalize">
            {user?.work ?? "N/A"}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Fun fact about {user?.username}</AccordionTrigger>
          <AccordionContent className="capitalize">
            {user?.funFact ?? "N/A"}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default UserDetailsAccordion;
