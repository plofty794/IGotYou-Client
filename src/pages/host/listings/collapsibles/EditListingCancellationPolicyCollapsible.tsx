import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

function EditListingCancellationPolicy({
  cancellationPolicy,
}: {
  cancellationPolicy: string;
}) {
  const [
    editListingCancellationPolicyPressed,
    setEditListingCancellationPolicyPressed,
  ] = useState(false);
  const [newCancellationPolicy, setNewCancellationPolicy] = useState("");

  useEffect(() => {
    if (!editListingCancellationPolicyPressed) {
      setNewCancellationPolicy("");
    }
  }, [editListingCancellationPolicyPressed]);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex w-4/5 flex-col gap-2 ">
          {editListingCancellationPolicyPressed ? (
            <>
              <Label className="text-base font-semibold">
                Change this listings cancellation policy
              </Label>
              <Select onValueChange={(v) => setNewCancellationPolicy(v)}>
                <SelectTrigger className="mt-2 w-1/4 font-semibold">
                  <SelectValue placeholder="Select a cancellation policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="font-semibold" value="Flexible">
                    Flexible
                  </SelectItem>
                  <SelectItem className="font-semibold" value="Moderate">
                    Moderate
                  </SelectItem>
                  <SelectItem className="font-semibold" value="Strict">
                    Strict
                  </SelectItem>
                  <SelectItem className="font-semibold" value="Non-refundable">
                    Non-refundable
                  </SelectItem>
                </SelectContent>
              </Select>
              {newCancellationPolicy && (
                <Card className="my-2 w-max max-w-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      What is a{" "}
                      <span className="underline underline-offset-2">
                        {newCancellationPolicy}
                      </span>{" "}
                      cancellation policy?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {newCancellationPolicy === "Flexible" && (
                      <p className="text-base font-semibold">
                        Full refund 1 day prior to service.
                      </p>
                    )}
                    {newCancellationPolicy === "Moderate" && (
                      <>
                        <p className="text-base font-semibold">
                          Full refund at least 3 days prior to service.
                        </p>
                      </>
                    )}
                    {newCancellationPolicy === "Strict" && (
                      <>
                        <p className="text-sm font-semibold">
                          Full refund for cancellations made if the service date
                          is at least 5 days away. 50% refund for cancellations
                          made at least 3 days before service. No refunds for
                          cancellations made within 3 days before service.
                        </p>
                      </>
                    )}
                    {newCancellationPolicy === "Non-refundable" && (
                      <>
                        <p className="text-sm font-semibold">
                          Guests pay 10% less, but you keep your payout no
                          matter when they cancel.
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
              <Button
                disabled={!newCancellationPolicy}
                className="w-max rounded-full bg-gray-950"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold">Cancellation policy</h3>
              <p className="text-sm font-semibold text-gray-600">
                {cancellationPolicy}
              </p>
            </>
          )}
        </div>
        <Toggle
          onPressedChange={(v) => setEditListingCancellationPolicyPressed(v)}
          className="flex items-center justify-center gap-2 rounded-full p-4"
        >
          <p className="text-base font-bold underline"> Edit</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Toggle>
      </div>
    </>
  );
}

export default EditListingCancellationPolicy;
