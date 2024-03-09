import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import ErrorMessage from "../../ErrorMessage";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { useQueryClient, QueryState } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type TData = {
  user: {
    email?: string;
    username?: string;
    userStatus?: string;
    work?: string;
    address?: string;
    funFact?: string;
    school?: string;
  };
};
function Address() {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfile();
  const [address, setAddress] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TData>>(["profile", id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setCurrentLocation(pos.coords),
    );
  }, []);

  function handleAddressSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address)
      return setErrorMessage(
        "Invalid address (eg. 4010 for Pila, 4010 Laguna, Philippines)",
      );
    mutate({ address });
    setErrorMessage("");
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full border font-medium hover:bg-[#e9e9e9] ${
          data?.data?.user.address ? "text-xs" : "text-sm"
        }
           flex items-center justify-start rounded py-8 pl-4 pr-6 shadow-md`}
      >
        <span className="mr-2">
          <HomeIcon color="black" width={25} height={25} />
        </span>
        <p className="text-gray-600">
          {data?.data?.user.address
            ? `Where I live: ${data?.data?.user.address}`
            : "Where I live"}
        </p>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#222222]">
            {data?.data?.user.address
              ? "Current address"
              : "Where do you live?"}
          </DialogTitle>
        </DialogHeader>
        {data?.data?.user.address ? (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">
              {data?.data?.user.address}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => {
                  setAddress("");
                  mutate({ address: "" });
                }}
                className="rounded-full bg-[#222222] font-medium text-white"
                size={"lg"}
                variant={"secondary"}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAddressSubmit} className="mt-4">
            <Label className="text-sm font-medium" htmlFor="address">
              Your current address
            </Label>
            <GeoapifyContext apiKey={GEOAPIFY_KEY}>
              <div className="geo mb-1">
                <GeoapifyGeocoderAutocomplete
                  biasByProximity={{
                    lat: currentLocation?.latitude ?? 0,
                    lon: currentLocation?.longitude ?? 0,
                  }}
                  limit={5}
                  filterByCountryCode={["ph"]}
                  allowNonVerifiedHouseNumber={false}
                  skipIcons={true}
                  addDetails
                  allowNonVerifiedStreet={false}
                  postprocessHook={(value) => {
                    setAddress(
                      `${
                        value.properties.formatted
                      }, ${value.properties.country_code.toUpperCase()}`,
                    );
                    return value.properties.formatted;
                  }}
                />
              </div>
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </GeoapifyContext>
            <div className="flex items-center gap-2 pt-2">
              <Button
                className="rounded-full bg-[#222222] font-medium text-white"
                size={"lg"}
                variant={"secondary"}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Address;
