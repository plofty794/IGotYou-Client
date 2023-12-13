import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type TProps = {
  listingEndsAt: string;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromDateString?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toDateString?: any[];
};

function DatePicker({ listingEndsAt, date, setDate }: TProps) {
  return (
    <Calendar
      className="w-max mx-auto p-0"
      initialFocus
      fromYear={2023}
      fromMonth={new Date()}
      disabled={{
        before: new Date(),
        after: new Date(listingEndsAt),
      }}
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
    />
  );
}

export default DatePicker;
