import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

function EditListingDescriptionCollapsible({
  serviceDescription,
}: {
  serviceDescription: string;
}) {
  const [editListingDescriptionPressed, setEditListingDescriptionPressed] =
    useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!editListingDescriptionPressed) {
      setDescription("");
    }
  }, [editListingDescriptionPressed]);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex w-4/5 flex-col gap-2">
          {editListingDescriptionPressed ? (
            <>
              <Label className="text-base font-semibold">
                Edit description
              </Label>
              <div className="flex w-3/4 items-end gap-2">
                <Input
                  autoFocus
                  spellCheck="true"
                  placeholder="Add a creative description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-none border-x-0 border-b border-t-0 border-b-black p-0 text-sm font-medium shadow-none focus-visible:border-b-2 focus-visible:ring-0"
                />
                <Badge
                  variant={
                    !description || description.length > 30
                      ? "destructive"
                      : "default"
                  }
                  className="h-max w-full max-w-max"
                >
                  {!description
                    ? "Description is required"
                    : description.length > 30
                      ? "Description can't exceed to 30 characters"
                      : String(description?.length ?? 0) + "/30"}
                </Badge>
              </div>
              <Button
                disabled={
                  !description ||
                  description.length > 30 ||
                  description.length < 10
                }
                className="w-max rounded-full bg-gray-950"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold">Listing description</h3>
              <p className="text-sm font-semibold text-gray-600">
                {serviceDescription ?? "Describe your listing"}
              </p>
            </>
          )}
        </div>
        <Toggle
          onPressedChange={(v) => setEditListingDescriptionPressed(v)}
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

export default EditListingDescriptionCollapsible;
