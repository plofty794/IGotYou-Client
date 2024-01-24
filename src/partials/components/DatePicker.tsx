import { Calendar } from "@/components/ui/calendar";
import { compareAsc } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type TProps = {
  availableAt: string;
  endsAt: string;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
};

function DatePicker({ availableAt, endsAt, date, setDate }: TProps) {
  return (
    <Calendar
      className="mx-auto w-max p-0"
      initialFocus
      fromYear={2023}
      fromMonth={new Date()}
      modifiersStyles={{
        range_start: {
          color: "white",
        },
        selected: {
          backgroundColor: "#222222",
        },
        range_middle: {
          backgroundColor: "gainsboro",
        },
      }}
      disableNavigation
      disabled={{
        before:
          compareAsc(new Date().setHours(0, 0, 0, 0), new Date(availableAt)) > 0
            ? new Date(new Date().setHours(0, 0, 0, 0))
            : new Date(availableAt),
        after: new Date(endsAt),
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
