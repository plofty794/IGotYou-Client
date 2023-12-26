import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HostingTabs from "@/partials/components/hosting/HostingTabs";
import { useEffect } from "react";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";

function Hosting() {
  const navigate = useNavigate();
  const {
    userData: { user },
  } = useOutletContext<TUserData>();

  useEffect(() => {
    document.title = "Host Dashboard - IGotYou";

    navigate("/hosting/current-reservations");
  }, [navigate]);

  return (
    <section className="p-16 flex flex-col gap-14">
      <h1 className="font-semibold text-3xl">Welcome back, {user.username}</h1>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <span className="text-xl font-medium">Your reservations</span>
          <Button className="font-semibold bg-gray-950 rounded-full">
            <Link to={"/hosting/reservations"}>All reservations</Link>
          </Button>
        </div>
        <HostingTabs />
        <Card className="mt-4 py-4 border-none shadow-none bg-[#F5F5F5]">
          {<Outlet />}
        </Card>
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
