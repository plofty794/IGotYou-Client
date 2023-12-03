import Lottie from "lottie-react";
import pending from "../../assets/pending.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type TUser = {
  user: {
    _id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    hostStatus: boolean;
    photoUrl: string | null;
    mobileVerified: boolean;
    listings: [] | null;
    uid: string;
    reviews: [] | null;
    work: string;
    subscriptionStatus: string;
  };
};

function Pending({ user }: TUser) {
  return (
    <div className="bg-[#F5F5F5] min-h-screen flex items-center justify-center">
      <Card className="w-2/4 p-4 flex flex-col justify-center shadow-lg border">
        <CardHeader className="p-0 w-max mx-auto">
          <Lottie
            animationData={pending}
            className="w-full h-[220px] mx-auto"
          />
        </CardHeader>
        <CardDescription className="px-6 pb-4 text-2xl font-bold text-gray-950">
          Hello {user.username}!
        </CardDescription>
        <CardContent className="flex flex-col gap-2 pb-4 text-base text-gray-600 font-semibold">
          <span>
            We wanted to inform you that your subscription status is{" "}
            <span className="text-amber-600 font-bold">currently pending</span>.
            Our team is working diligently to process your subscription, and we
            appreciate your patience.
          </span>
          <span>
            We're here to help you with any concerns or inquiries you may have.
            Thank you for choosing IGotYou as your subscription provider. We
            look forward to providing you with the best service once your
            subscription is fully processed.
          </span>
        </CardContent>

        <Button className="ml-auto w-max p-6 font-semibold text-base rounded-full bg-gray-950 text-white mb-2 mr-4">
          <Link to={"/"} replace>
            {" "}
            Go back
          </Link>
        </Button>
      </Card>
    </div>
  );
}

export default Pending;
