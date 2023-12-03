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
import { FormEvent, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TData>>(["profile", id]);

  function handleAddressSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address)
      return setErrorMessage(
        "Invalid zip code (eg. 4010 for Pila, 4010 Laguna, Philippines)"
      );
    mutate({ address });
    setErrorMessage("");
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`hover:bg-[#e9e9e9] w-full border font-medium ${
          data?.data?.user.address ? "text-xs" : "text-sm"
        }
           shadow-md flex justify-start items-center pl-4 pr-6 py-8 rounded`}
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
            <p className="text-sm font-medium mb-2">
              {data?.data?.user.address}
            </p>
            <div className="flex gap-2 items-center pt-2">
              <Button
                onClick={() => {
                  setAddress("");
                  mutate({ address: "" });
                }}
                className="bg-[#222222] text-white font-medium rounded-full"
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
              Your Municipality/City's zip code
            </Label>
            <GeoapifyContext apiKey={GEOAPIFY_KEY}>
              <div className="geo mb-1">
                <GeoapifyGeocoderAutocomplete
                  type="postcode"
                  filterByCountryCode={["ph"]}
                  placeSelect={(value) => console.log(value)}
                  allowNonVerifiedHouseNumber={false}
                  skipIcons={true}
                  placeholder="Enter zip code"
                  postprocessHook={(value) => {
                    setAddress(
                      `${
                        value.properties.formatted
                      }, ${value.properties.country_code.toUpperCase()}`
                    );
                    return value.properties.formatted;
                  }}
                />
              </div>
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </GeoapifyContext>
            <div className="flex gap-2 items-center pt-2">
              <Button
                className="bg-[#222222] text-white font-medium rounded-full"
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
