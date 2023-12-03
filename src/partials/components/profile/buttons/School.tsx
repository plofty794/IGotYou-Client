import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { GEOAPIFY_KEY } from "@/constants/API_Keys";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { QueryState, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import ErrorMessage from "../../ErrorMessage";
import { useParams } from "react-router-dom";

type TData = {
  user: {
    email: string;
    username: string;
    userStatus: string;
    work?: string;
    address?: string;
    funFact?: string;
    school: string;
  };
};
function School() {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfile();
  const [school, setSchool] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TData>>(["profile", id]);

  function handleSchoolSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!school) {
      setSchool("");
      return setErrorMessage("Invalid school name");
    }
    if (
      !school.includes("University") &&
      !school.includes("College") &&
      !school.includes("School")
    ) {
      setSchool("");
      return setErrorMessage("Enter a School/University/College");
    }
    mutate({ school });
    setErrorMessage("");
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`hover:bg-[#e9e9e9] border w-full font-medium ${
          data?.data?.user.school ? "text-xs" : "text-sm"
        }
           shadow-md flex justify-start items-center pl-4 pr-6 py-8 rounded`}
      >
        <span className="mr-2">
          <Pencil2Icon color="black" width={25} height={25} />
        </span>
        <p className="text-zinc-500">
          {data?.data?.user.school
            ? `Where I go to school: ${data?.data?.user.school}`
            : "Where I you go to school"}
        </p>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#222222]">
            {data?.data?.user.school
              ? "Current school"
              : "Where do you go to school?"}
          </DialogTitle>
        </DialogHeader>
        {data?.data?.user.school ? (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">
              {data?.data?.user.school}
            </p>
            <div className="flex gap-2 items-center pt-2">
              <Button
                onClick={() => {
                  setSchool("");
                  mutate({ school: "" });
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
          <form onSubmit={handleSchoolSubmit} className="mt-4">
            <Label className="text-sm font-medium" htmlFor="school">
              Your current school
            </Label>
            <GeoapifyContext apiKey={GEOAPIFY_KEY}>
              <div className="geo mb-1">
                <GeoapifyGeocoderAutocomplete
                  filterByCountryCode={["ph"]}
                  allowNonVerifiedHouseNumber={false}
                  skipIcons={true}
                  placeholder="Enter school name"
                  postprocessHook={(value) => {
                    setSchool(
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

export default School;
