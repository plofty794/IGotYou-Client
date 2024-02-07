import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import useEditListing from "@/hooks/useEditListing";

function EditListingDates({
  availableAt,
  endsAt,
  subscriptionExpiresAt,
}: {
  availableAt?: string;
  endsAt?: string;
  subscriptionExpiresAt?: string;
}) {
  const [editListingServiceDatesPressed, setEditListingServiceDatesPressed] =
    useState(false);
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(availableAt!),
    to: new Date(endsAt!),
  });
  const { mutate } = useEditListing();

  useEffect(() => {
    if (!editListingServiceDatesPressed) {
      setDates({
        from: new Date(availableAt!),
        to: new Date(endsAt!),
      });
    }
  }, [availableAt, editListingServiceDatesPressed, endsAt]);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex w-full flex-col gap-2 ">
          {editListingServiceDatesPressed ? (
            <>
              <Label className="text-base font-semibold">
                Change service dates
              </Label>
              <Calendar
                styles={{
                  nav_button_next: {
                    width: "40px",
                    height: "40px",
                  },
                  nav_button_previous: {
                    width: "40px",
                    height: "40px",
                  },

                  head_cell: {
                    width: "100%",
                    fontSize: "1.1rem",
                    color: "black",
                  },
                  day: {
                    width: "60px",
                    height: "60px",
                    margin: "1px",
                    fontWeight: "bold",
                  },
                  table: {
                    marginTop: "40px",
                  },
                }}
                initialFocus
                numberOfMonths={2}
                className="mx-auto w-max"
                modifiers={{
                  subscriptionExpiresAt: new Date(subscriptionExpiresAt!),
                }}
                modifiersStyles={{
                  selected: {
                    color: "white",
                    backgroundColor: "#222222",
                  },

                  today: {
                    outline: "2px dashed black",
                  },
                  subscriptionExpiresAt: {
                    outline: "2px dashed #FF385C",
                  },
                }}
                fromDate={new Date()}
                disabled={{
                  after: new Date(subscriptionExpiresAt!),
                }}
                mode="range"
                selected={dates}
                onSelect={setDates}
              />
              <Button
                onClick={() =>
                  mutate({
                    availableAt: String(dates?.from),
                    endsAt: String(dates?.to),
                  })
                }
                disabled={dates?.from == null || dates?.to == null}
                className="w-max bg-gray-950"
                size={"lg"}
              >
                Save changes
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold">Service dates</h3>
              <p className="text-sm font-semibold text-gray-600">
                {format(new Date(availableAt!), "MMM d")} -{" "}
                {format(new Date(endsAt!), "PP")}
              </p>
            </>
          )}
        </div>
        <Toggle
          onPressedChange={(v) => setEditListingServiceDatesPressed(v)}
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

export default EditListingDates;
