import { useEffect, useState } from "react";
import sendMoney from "../../assets/send-money.json";
import Lottie from "lottie-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

function SubscriptionPayment() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const Timeout = setTimeout(() => setIsFadingIn(false), 800);
    return () => clearTimeout(Timeout);
  }, []);

  return (
    <div
      className={`${
        isFadingIn ? "opacity-0" : "opacity-100"
      } transition-opacity w-full flex items-center justify-evenly p-8`}
    >
      <Lottie
        animationData={sendMoney}
        className="w-[420px] h-[420px] max-w-full"
      />
      <Card className="w-2/4 border-0 shadow-none">
        <CardHeader className="text-center w-full">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-semibold">
              Send your payment to{" "}
            </span>
            <img
              className="w-[50px] h-[50px] max-w-full max-h-full block object-cover"
              loading="lazy"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetcash.ph%2Fwp-content%2Fuploads%2F2021%2F01%2FTransparent-1280-x-720.png&f=1&nofb=1&ipt=33a2060d0cc021ca3c2c7219f24a31fb9d179ffd57aace81159c48c11a8adc41&ipo=images"
              alt=""
            />
          </div>
          <CardDescription className="text-lg text-gray-600 font-semibold">
            You can send your payment through Express Send or through scanning
            our QR code via GCash.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center max-md:flex-col gap-6">
            <div className="shadow border rounded-lg overflow-hidden">
              <img
                src="/QRCode.jpg"
                className="w-[150px] h-[150px] max-w-full max-h-full block object-cover"
              />
            </div>
            <span className="text-sm font-semibold">OR</span>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <PaperPlaneIcon width={25} height={25} color="#005FE7" />
                <span className="text-xl font-semibold">+639079251189</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SubscriptionPayment;
