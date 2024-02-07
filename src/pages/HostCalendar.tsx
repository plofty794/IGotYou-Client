import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChangeAvailability from "@/hooks/useChangeAvailability";
import useGetBlockedDates from "@/hooks/useGetBlockedDates";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

function HostCalendar() {
  const { data, isPending } = useGetBlockedDates();
  const { mutate } = useChangeAvailability();
  const [dates, setDates] = useState<Date[] | undefined>();

  useEffect(() => {
    document.title = "Host Calendar - IGotYou";
  }, []);

  const blockedDates: Date[] = useMemo(() => {
    return data?.data.blockedDates.map((date: string) => new Date(date));
  }, [data?.data.blockedDates]);

  const sortedDates = useMemo(() => {
    const _sortedDates = dates?.sort((a, b) => a.getTime() - b.getTime());
    return (
      _sortedDates?.map((date) => new Date(date.setHours(0, 0, 0, 0))) ?? []
    );
  }, [dates]);

  return (
    <div className="flex w-full justify-center gap-2 p-4">
      <ScrollArea className="h-[500px] w-full max-w-4xl">
        {isPending ? (
          "Loading"
        ) : (
          <Calendar
            initialFocus
            fromDate={new Date()}
            selected={dates}
            onSelect={setDates}
            styles={{
              nav_button_next: {
                width: "40px",
                height: "40px",
                outline: "2px solid black",
              },
              nav_button_previous: {
                width: "40px",
                height: "40px",
                outline: "2px solid black",
              },

              head_cell: {
                width: "100%",
                fontSize: "1.1rem",
                color: "black",
              },
              day: {
                width: "120px",
                height: "120px",
                margin: "1px",
                fontWeight: "bold",
              },
              table: {
                marginTop: "40px",
              },
            }}
            modifiers={{
              blockedDates,
              subscriptionExpiresAt: new Date(
                data?.data.subscriptionExpiresAt.subscriptionExpiresAt as Date,
              ),
            }}
            modifiersStyles={{
              selected: {
                color: "white",
                backgroundColor: "#222222",
              },
              blockedDates: {
                textDecoration: "line-through",
                fontWeight: "bold",
                color: "red",
              },
              today: {
                outline: "2px solid black",
              },
              subscriptionExpiresAt: {
                outline: "2px dashed #FF385C",
              },
            }}
            disabled={{
              before: new Date(),
              after: new Date(
                data?.data.subscriptionExpiresAt.subscriptionExpiresAt as Date,
              ),
            }}
            mode="multiple"
          />
        )}
      </ScrollArea>
      <div className="h-max w-2/4 max-w-lg">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Your calendar</h1>
          <div className="py-4">
            {!sortedDates.length ? (
              <p className="text-lg font-medium">
                Pick a date to change its availability
              </p>
            ) : sortedDates.length === 1 ? (
              <Badge variant={"secondary"} className="text-lg font-medium">
                {format(sortedDates[0], "MMM d")}
              </Badge>
            ) : (
              <Badge variant={"secondary"} className="text-lg font-medium">
                {format(sortedDates[0], "MMM d")} -{" "}
                {format(sortedDates[sortedDates.length - 1], "MMM d")}
              </Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Manage your availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Button
                  disabled={!sortedDates.length}
                  onClick={() => mutate({ sortedDates })}
                  className="bg-gray-950 p-6 text-lg"
                >
                  Change availability
                </Button>

                <Button
                  disabled={!sortedDates.length}
                  onClick={() => {
                    setDates([]);
                  }}
                  className="p-6 text-lg"
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HostCalendar;
