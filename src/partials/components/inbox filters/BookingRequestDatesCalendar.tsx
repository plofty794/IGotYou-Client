import { Dispatch } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function BookingRequestDatesCalendar({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
  return (
    <Popover>
      <PopoverTrigger className="w-full p-6" asChild>
        <Button
          id="date"
          variant={"outline"}
          className={`
              w-full justify-center font-medium ${
                !date && "text-muted-foreground"
              }
              
            `}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          fromYear={2024}
        />
      </PopoverContent>
    </Popover>
  );
}

export default BookingRequestDatesCalendar;
