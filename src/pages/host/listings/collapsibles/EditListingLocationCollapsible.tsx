import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { useEffect, useState } from "react";
function EditListingLocationCollapsible({
  serviceLocation,
}: {
  serviceLocation: string;
}) {
  const [editListingLocationPressed, setEditListingLocationPressed] =
    useState(false);
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>
      setCurrentLocation(pos.coords),
    );
  }, []);

  useEffect(() => {
    if (!editListingLocationPressed) {
      setLocation("");
    }
  }, [editListingLocationPressed]);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex w-2/5 flex-col gap-2">
          {editListingLocationPressed ? (
            <>
              <Label className="text-base font-semibold">Edit location</Label>
              <div className="flex w-full items-end gap-2">
                <GeoapifyContext apiKey={GEOAPIFY_KEY}>
                  <div className="geo service-location mb-1 w-full">
                    <GeoapifyGeocoderAutocomplete
                      addDetails
                      limit={5}
                      filterByCountryCode={["ph"]}
                      debounceDelay={300}
                      biasByProximity={{
                        lat: currentLocation?.latitude ?? 0,
                        lon: currentLocation?.longitude ?? 0,
                      }}
                      value={serviceLocation}
                      allowNonVerifiedHouseNumber={false}
                      skipIcons={true}
                      postprocessHook={(value) => {
                        setLocation(value.properties.formatted);
                        return value.properties.formatted;
                      }}
                      skipSelectionOnArrowKey
                    />
                  </div>
                </GeoapifyContext>
              </div>
              <Button
                disabled={!location}
                className="w-max rounded-full bg-gray-950"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold">Listing location</h3>
              <p className="text-sm font-semibold text-gray-600">
                {serviceLocation ?? "Describe your listing"}
              </p>
            </>
          )}
        </div>
        <Toggle
          onPressedChange={(v) => setEditListingLocationPressed(v)}
          className="flex items-center justify-center gap-2 rounded-full p-4"
        >
          <p className="text-base font-bold underline"> Edit</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Toggle>
      </div>
    </>
  );
}

export default EditListingLocationCollapsible;
