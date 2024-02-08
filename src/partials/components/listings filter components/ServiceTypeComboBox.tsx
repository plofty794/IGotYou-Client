import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
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
import { Dispatch, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ServiceTypes = [
  "Digital Audio Services",
  "Digital Video Services",
  "Graphic Design and Visual Arts",
  "Photography Services",
  "Animation and 3D Modeling",
  "Live Events and Concerts",
  "Digital Advertising and Marketing",
];

function ServiceTypeComboBox({
  serviceType,
  setServiceType,
}: {
  serviceType: string;
  setServiceType: Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between p-6 text-base font-medium"
        >
          {serviceType
            ? ServiceTypes.find(
                (type) => type.toLowerCase() === serviceType.toLowerCase(),
              )
            : "Select service type"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-max w-full p-0">
        <Command>
          <CommandInput placeholder="Search type..." className="h-9 p-6 pl-0" />
          <CommandEmpty>No service found.</CommandEmpty>
          <ScrollArea className="h-60">
            <CommandGroup>
              {ServiceTypes.map((type, i) => (
                <CommandItem
                  key={i}
                  value={type}
                  onSelect={(currentValue) => {
                    setServiceType(
                      currentValue === serviceType ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  {type}
                  <CheckIcon
                    className={`
                    ml-auto h-8 w-8
                   ${serviceType === type ? "opacity-100" : "opacity-0"}
                  `}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ServiceTypeComboBox;
