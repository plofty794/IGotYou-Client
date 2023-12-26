import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format, parseISO } from "date-fns";
import pickADate from "../../assets/pick-a-date.json";
import Lottie from "lottie-react";
import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/firebase config/config";
import { AxiosResponse } from "axios";
import { TListing } from "@/root layouts/BecomeAHostLayout";

type TSetServiceProps = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ListingDate() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<AxiosResponse>([
    "profile",
    auth.currentUser && auth.currentUser.uid,
  ]);
  const { setService } = useOutletContext<TSetServiceProps>();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setHours(0, 0, 0, 0)),
    to: addDays(new Date().setHours(0, 0, 0, 0), 10),
  });
  const [isFadingIn, setIsFadingIn] = useState(true);

  useMemo(() => {
    setService((prev) => ({
      ...prev,
      date: { from: date?.from, to: date?.to },
    }));
  }, [date, setService]);

  useEffect(() => {
    document.title = "Listing Price - IGotYou";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <ScrollArea
      className={`w-full h-[450px] rounded-md border transition-opacity ${
        isFadingIn ? "opacity-0" : "opacity-100"
      }`}
    >
      <section className="h-[400px] flex flex-col items-center justify-center gap-4">
        <Lottie loop={false} animationData={pickADate} className="w-52 h-52" />
        <span className="text-center w-3/4 font-bold text-5xl">
          It's time to set the availability dates for your fantastic listing.
        </span>
        <span className="text-gray-600 text-center w-2/4 font-semibold text-lg">
          Choose the start and end dates for when your listing will be
          available.
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className="w-[260px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd y")} -{" "}
                    {format(date.to, "LLL dd y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              disabled={{
                before: new Date(),
                after: parseISO(userData?.data.user.subscriptionExpiresAt),
              }}
              fromYear={new Date().getFullYear()}
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </section>
    </ScrollArea>
  );
}

export default ListingDate;
