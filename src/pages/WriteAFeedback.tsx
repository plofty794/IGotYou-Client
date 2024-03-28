import { useDocumentTitle } from "usehooks-ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import feedbackIcon from "../assets/feedback.json";
import useSendFeedback from "@/hooks/useSendFeedback";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function WriteAFeedback() {
  const [feedback, setFeedback] = useState("");
  const { mutate, isError, isSuccess, isPending } = useSendFeedback();

  useDocumentTitle("Write A Feedback - IGotYou");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Feedback has been sent.");
    } else if (isError) {
      toast.warning("You've already sent a feedback.");
    }
  }, [isError, isSuccess]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Lottie loop={true} animationData={feedbackIcon} className="h-32 w-32" />
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Write a feedback</CardTitle>
          <CardDescription className="text-lg font-semibold text-gray-600">
            Got an idea, suggestion or general feedback? Share it here!
          </CardDescription>
          <CardDescription className="font-semibold">
            Note that we cannot respond to the comments you submit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            autoFocus
            autoCorrect="true"
          />
        </CardContent>
        <CardFooter className="flex w-full justify-end gap-4">
          <Button
            onClick={() => history.back()}
            variant={"outline"}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button
            disabled={!feedback || isPending}
            onClick={() => mutate(feedback)}
            className="rounded-full bg-green-500 hover:bg-green-600"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default WriteAFeedback;
