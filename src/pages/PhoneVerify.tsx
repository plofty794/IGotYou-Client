import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import OtpInput from "react-otp-input";
import { Label } from "@radix-ui/react-label";
import { auth } from "@/firebase config/config";
import messageSent from "../assets/messageSent.json";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  linkWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { dotPulse } from "ldrs";
dotPulse.register();
import sendingMessage from "@/assets/sendingMessage.json";
import Lottie from "lottie-react";
import { useToast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";

type TLoaderData = {
  user: {
    mobilePhone: string;
  };
};

function VerifyPhone() {
  const { toast } = useToast();
  const { id } = useParams();
  const { mutate } = useUpdateUserProfile();
  const { data } = useLoaderData() as UseQueryResult<TLoaderData>;
  const mobilePhone = data?.user.mobilePhone;
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null,
  );
  const [OTP, setOTP] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = "Verify Phone - IGotYou";
    const Timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(Timeout);
  }, []);

  async function sendOTP() {
    try {
      const reCaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});

      const confirm = await linkWithPhoneNumber(
        auth.currentUser!,
        mobilePhone!,
        reCaptcha,
      );
      setConfirmation(confirm);
    } catch (error) {
      setConfirmation(null);
      console.error(error);
    }
  }

  async function verifyOTP() {
    try {
      await confirmation?.confirm(OTP);
      mutate({ mobileVerified: true });
      toast({
        title: "Success! 🎉",
        description: "Your phone number has been verified.",
        className: "bg-white",
      });
      setTimeout(() => {
        history.back();
      }, 1000);
    } catch (err) {
      const error = err as FirebaseError;
      const message = (
        error.code.split("/")[1].slice(0, 1).toUpperCase() +
        error.code.split("/")[1].slice(1)
      )
        .split("-")
        .join(" ");
      toast({
        title: "Oops! An error occurred.",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {isLoaded ? (
        <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#F2F2F2]">
          <Button className="mx-auto rounded-full bg-gray-950 font-medium ">
            <Link to={`/users/show/${id}`}>Go back</Link>
          </Button>
          {!confirmation ? (
            <Card className="w-2/5">
              <CardHeader className="items-center justify-center p-0">
                <CardHeader className="p-0">
                  <Lottie
                    className="h-32 w-32"
                    animationData={sendingMessage}
                  />
                </CardHeader>
              </CardHeader>
              <CardContent className="space-y-2 pb-2">
                <div className="space-y-1 text-center">
                  <Label
                    className="text-2xl font-semibold"
                    htmlFor="mobilePhone"
                  >
                    Mobile phone
                  </Label>
                  <p
                    id="mobilePhone"
                    className="text-lg font-semibold text-gray-600"
                  >
                    {mobilePhone}
                  </p>
                </div>
                <div id="recaptcha-container" className="mx-auto w-max"></div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={sendOTP}
                  className="mx-auto rounded-full bg-gray-950 p-6 text-xl font-medium"
                >
                  Send OTP
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="w-2/5">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  Enter the OTP sent to your mobile phone here. Click Verify
                  when you're done.
                </CardTitle>
                <Lottie
                  className="mx-auto h-[100px] w-[100px]"
                  animationData={messageSent}
                />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-1">
                  <OtpInput
                    inputStyle={
                      "text-3xl mr-2 outline-none border-b-black border-b"
                    }
                    value={OTP}
                    onChange={setOTP}
                    numInputs={6}
                    renderSeparator={<span> </span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={verifyOTP}
                  size={"lg"}
                  className="mx-auto rounded-full bg-gray-950"
                >
                  Verify OTP
                </Button>
              </CardFooter>
            </Card>
          )}
        </main>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <l-dot-pulse size="44" speed="1.3" color="black"></l-dot-pulse>
        </div>
      )}
    </>
  );
}

export default VerifyPhone;

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}
