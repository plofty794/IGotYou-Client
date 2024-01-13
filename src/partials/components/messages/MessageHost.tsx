import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useSendMessageToHost from "@/hooks/useSendMessageToHost";
import { useState } from "react";

function MessageHost({ listing }: { listing: TListing }) {
  const [content, setContent] = useState("");
  const { mutate, isPending } = useSendMessageToHost();

  function sendMessageToHost() {
    mutate({ content, hostID: listing.host._id });
    setContent("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded-full border-black p-6">
          Contact Host
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Still have questions? Message the Host
          </DialogTitle>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm font-medium"
          spellCheck="true"
        />
        <DialogFooter>
          <Button
            disabled={!content || isPending}
            onClick={sendMessageToHost}
            variant={"outline"}
            className="rounded-full border-black p-5"
          >
            Send message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type TListing = {
  availableAt: string;
  cancellationPolicy: string;
  createdAt: string;
  endsAt: string;
  host: {
    _id: string;
    username: string;
    photoUrl: string;
    rating: [];
    subscriptionExpiresAt: string;
  };
  listingAssets: [];
  price: number;
  reservedDates: [];
  serviceDescription: string;
  serviceLocation: string;
  serviceType: string;
  status: string;
  updatedAt: string;
  _id: string;
};

export default MessageHost;
