import { Button } from "@/components/ui/button";
import HostingTabs from "@/partials/components/hosting/HostingTabs";
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Hosting() {
  const {
    userData: { user },
  } = useOutletContext<TUserData>();

  useEffect(() => {
    document.title = "Host Dashboard - IGotYou";
  }, []);

  return (
    <section className="p-20 flex flex-col gap-14">
      <h1 className="font-semibold text-3xl">Welcome back, {user.username}</h1>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <span className="text-xl font-medium">Your reservations</span>
          <Button className="font-semibold bg-gray-950 rounded-full">
            <Link to={"/hosting/reservations"}>All reservations</Link>
          </Button>
        </div>
        <HostingTabs />
      </div>
    </section>
  );
}

export default Hosting;

type TUserData = {
  userData: {
    user: THost;
  };
};

type TListingPhotos = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
};

type TListings = {
  availableAt: string;
  createdAt: string;
  endsAt: string;
  host: THost;
  listingPhotos: [TListingPhotos];
  price: number;
  serviceDescription: string;
  serviceType: string;
  updatedAt: string;
  _id: string;
};

type THost = {
  email: string;
  emailVerified: boolean;
  listings: TListings[];
  mobileVerified: boolean;
  photoUrl: null | string;
  providerId: string;
  reviews: [];
  subscriptionExpiresAt: string;
  subscriptionStatus: string;
  uid: string;
  userStatus: string;
  username: string;
  rating: number;
};
