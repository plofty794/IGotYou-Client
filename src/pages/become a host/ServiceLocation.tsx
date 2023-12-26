import { ScrollArea } from "@/components/ui/scroll-area";
import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceLocation() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Service location";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-28 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-2 text-center w-2/4">
            <h1 className="text-4xl font-semibold">
              Where's your place located?
            </h1>
            <span className="text-lg font-medium text-gray-600">
              Your address is only shared with guests after they’ve made a
              reservation.
            </span>
          </div>
          <GeoapifyContext apiKey={GEOAPIFY_KEY}>
            <div className="geo service-location mb-1 w-2/5">
              <GeoapifyGeocoderAutocomplete
                addDetails
                limit={10}
                filterByCountryCode={["ph"]}
                debounceDelay={300}
                value={service.serviceLocation}
                allowNonVerifiedHouseNumber={false}
                skipIcons={true}
                postprocessHook={(value) => {
                  setService((prev) => ({
                    ...prev,
                    serviceLocation: value.properties.formatted,
                  }));
                  return value.properties.formatted;
                }}
              />
            </div>
          </GeoapifyContext>
        </section>
      </ScrollArea>
    </>
  );
}

export default ServiceLocation;
