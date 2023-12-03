import BookingRequestCard from "./BookingRequestCard";

function BookingRequests({
  notification,
  socket,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notification: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any;
}) {
  return <BookingRequestCard notification={notification} socket={socket} />;
}

export default BookingRequests;
