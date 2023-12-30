import { useParams } from "react-router-dom";

function RenewListing() {
  const { listingID } = useParams();
  return <div>RenewListing {listingID}</div>;
}

export default RenewListing;
