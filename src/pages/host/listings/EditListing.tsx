import { useParams } from "react-router-dom";

function EditListing() {
  const { listingID } = useParams();
  return <div>EditListing {listingID}</div>;
}

export default EditListing;
