import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SubscriptionWelcome() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <div
      className={`${
        isFadingIn ? "opacity-0" : "opacity-100"
      } transition-opacity w-full flex lg:flex-row max-md:flex-col items-center justify-evenly gap-8 pb-16 px-12`}
    >
      <div className="w-full text-center text-5xl font-semibold text-[#222222]">
        <h1>Welcome to IGotYou Subscription</h1>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-max mx-auto">
          <Label className="text-lg font-semibold">
            To pay online, please consider every steps on the payment process.
          </Label>
        </div>
        <Accordion type="single" collapsible className="w-full flex flex-col">
          <AccordionItem value="item-1">
            <AccordionTrigger>Step 1 - Subscription Payment</AccordionTrigger>
            <AccordionContent>
              You will be prompted how much our monthly subscription costs. You
              can go back if you don't want to continue.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Step 2 - Send your payment through our GCash account.
            </AccordionTrigger>
            <AccordionContent>
              Our GCash number will be shown. You can send your payment through
              Express Send or through scanning our QR code.
              <div className="mt-4 text-[#5551FF] font-medium">
                <Link
                  className="text-xs hover:underline underline-offset-2"
                  to={"https://www.gcash.com/"}
                  target="_blank"
                >
                  What is GCash?
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Step 3 - Confirm your payment</AccordionTrigger>
            <AccordionContent>
              Once you've sent your payment you'll need to upload a screenshot
              of your payment transaction for checking. This process will ensure
              that you've sent the right amount and also verifies if the Ref no.
              transaction has been made by you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Step 4 - Complete your subscription
            </AccordionTrigger>
            <AccordionContent>
              Once your payment is confirmed, your subscription will be
              processed (5-10 minutes). You will receive a confirmation email
              with your subscription details.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SubscriptionWelcome;
