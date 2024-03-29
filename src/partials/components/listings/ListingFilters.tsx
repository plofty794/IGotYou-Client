import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ReloadIcon } from "@radix-ui/react-icons";
import { TListings } from "./ListingsTable";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";

function ListingFilters({ table }: { table: Table<TListings> }) {
  const queryClient = useQueryClient();
  const [cancellationPolicyFilter, setCancellationPolicyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  return (
    <>
      <div className="flex items-center gap-4 py-4">
        <div className="relative w-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="absolute left-2 top-2 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <Input
            value={
              (table.getColumn("serviceTitle")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("serviceTitle")
                ?.setFilterValue(event.target.value)
            }
            placeholder="Search listing name..."
            className="rounded-full pl-9 font-medium"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full font-medium">
              Cancellation policy <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={cancellationPolicyFilter === "Flexible"}
              onClick={() => {
                setCancellationPolicyFilter("Flexible");
                table
                  .getColumn("cancellationPolicy")
                  ?.setFilterValue("flexible");
              }}
              className="capitalize"
            >
              Flexible
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={cancellationPolicyFilter === "Moderate"}
              onClick={() => {
                setCancellationPolicyFilter("Moderate");
                table
                  .getColumn("cancellationPolicy")
                  ?.setFilterValue("moderate");
              }}
              className="capitalize"
            >
              Moderate
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={cancellationPolicyFilter === "Strict"}
              onClick={() => {
                setCancellationPolicyFilter("Strict");
                table.getColumn("cancellationPolicy")?.setFilterValue("strict");
              }}
              className="capitalize"
            >
              Strict
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={cancellationPolicyFilter === "Non-refundable"}
              onClick={() => {
                setCancellationPolicyFilter("Non-refundable");
                table
                  .getColumn("cancellationPolicy")
                  ?.setFilterValue("Non-refundable");
              }}
              className="capitalize"
            >
              Non-refundable
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full font-medium">
              Status <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={statusFilter === "Active"}
              onClick={() => {
                setStatusFilter("Active");
                table.getColumn("status")?.setFilterValue("Active");
              }}
              className="capitalize"
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter === "Ended"}
              onClick={() => {
                setStatusFilter("Ended");
                table.getColumn("status")?.setFilterValue("Ended");
              }}
              className="capitalize"
            >
              Ended
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter === "Inactive"}
              onClick={() => {
                setStatusFilter("Inactive");
                table.getColumn("status")?.setFilterValue("Inactive");
              }}
              className="capitalize"
            >
              Inactive
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter === "Disabled"}
              onClick={() => {
                setStatusFilter("Disabled");
                table.getColumn("status")?.setFilterValue("Disabled");
              }}
              className="capitalize"
            >
              Disabled
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={"outline"}
          className="flex items-center gap-2 rounded-full"
          onClick={() => {
            setCancellationPolicyFilter("");
            setStatusFilter("");
            table.reset();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span className="font-medium">Reset</span>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-full"
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["host-listings"] })
                }
                variant={"outline"}
              >
                <ReloadIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reload</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

export default ListingFilters;
