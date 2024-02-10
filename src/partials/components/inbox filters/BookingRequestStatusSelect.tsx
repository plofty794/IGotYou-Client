import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch } from "react";

function BookingRequestStatusSelect({
  setBookingRequestStatus,
}: {
  setBookingRequestStatus: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={(value) => setBookingRequestStatus(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="declined">Declined</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default BookingRequestStatusSelect;
