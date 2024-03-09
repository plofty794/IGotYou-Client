import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QueryState, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

type TData = {
  user: {
    email: string;
    username: string;
    userStatus: string;
    work?: string;
    address?: string;
    funFact?: string;
    educationalAttainment: string;
  };
};
const educationalAttainments = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional License",
  "No Formal Education",
];

function EducationalAttainment() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfile();
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TData>>(["profile", id]);

  function handleSchoolSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate({ educationalAttainment: value });
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`border font-medium hover:bg-[#e9e9e9] ${
          data?.data?.user.educationalAttainment ? "text-xs" : "text-sm"
        }
          flex items-center rounded py-8 pl-4 pr-6 shadow-md`}
      >
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
        </span>
        <p className="capitalize text-gray-600">
          {data?.data?.user.educationalAttainment
            ? `Educational attainment: ${data?.data?.user.educationalAttainment}`
            : "Educational attainment"}
        </p>
      </DialogTrigger>
      <DialogContent className="gap-2 p-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {data?.data?.user.educationalAttainment
              ? "Your highest educational attainment"
              : "What is your highest level of education completed?"}
          </DialogTitle>
        </DialogHeader>
        {data?.data?.user.educationalAttainment ? (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold capitalize underline">
              {data?.data?.user.educationalAttainment}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => {
                  setValue("");
                  mutate({ educationalAttainment: "" });
                }}
                className="rounded-full bg-gray-950 font-medium"
                size={"lg"}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSchoolSubmit} className="flex flex-col">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full gap-2 font-medium"
                >
                  {value
                    ? educationalAttainments.find(
                        (attainment) =>
                          attainment.toLowerCase() === value.toLowerCase(),
                      )
                    : "Select attainment"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Search attainment..."
                    className="h-9"
                  />
                  <CommandEmpty>No attainment found.</CommandEmpty>
                  <CommandGroup>
                    {educationalAttainments.map((attainment) => (
                      <CommandItem
                        key={attainment}
                        value={attainment}
                        onSelect={(currentValue) => {
                          setValue(
                            currentValue.toLowerCase() === value.toLowerCase()
                              ? ""
                              : currentValue,
                          );
                          setOpen(false);
                        }}
                      >
                        {attainment}
                        <CheckIcon
                          className={` ml-auto h-4 w-4
                   ${
                     value.toLowerCase() === attainment.toLowerCase()
                       ? "opacity-100"
                       : "opacity-0"
                   }`}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-2 pt-2">
              <Button
                disabled={!value}
                className="rounded-full bg-gray-950 font-medium"
                size={"lg"}
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

export default EducationalAttainment;
