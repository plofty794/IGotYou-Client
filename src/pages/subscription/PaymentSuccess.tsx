import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import success from "../../assets/success.json";
import Lottie from "lottie-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function PaymentSuccessful() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <div
      className={`${
        isFadingIn ? "opacity-0" : "opacity-100"
      } transition-opacity py-12 px-24`}
    >
      <Card className="w-full mx-auto flex flex-col items-center justify-center shadow-none border-0">
        <CardHeader>
          <Lottie animationData={success} className="w-2/3 h-[130px] mx-auto" />
          <CardDescription className="text-center text-4xl font-bold text-[#3ABC5E]">
            Payment Successful!
          </CardDescription>
        </CardHeader>
        <CardContent className="w-2/3 px-12 text-center">
          <span className="text-lg font-bold text-gray-600">
            Thank you for your subscription payment. We are processing your
            payment and it will be activated within 3-5 minutes.
          </span>
        </CardContent>
        <Alert className="w-max text-center border-0">
          <AlertTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </AlertTitle>
          <AlertDescription className="text-sm font-semibold text-gray-600">
            In the meantime, you can continue browsing our website.
            <br /> Once your subscription payment has been checked, you will
            receive an email.
            <span className="block mt-1 font-bold text-sm text-amber-600 underline underline-offset-2">
              Note: Check your spam if you haven't receive any emails from your
              inbox.
            </span>
          </AlertDescription>
        </Alert>
      </Card>
    </div>
  );
}

export default PaymentSuccessful;
