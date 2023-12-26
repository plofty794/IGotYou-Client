import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { compareAsc, compareDesc } from "date-fns";
import { formatValue } from "react-currency-input-field";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import ListingFilters from "./ListingFilters";
import { Badge } from "@/components/ui/badge";

const columns: ColumnDef<TListings>[] = [
  {
    header: "Name",
    accessorKey: "serviceDescription",
    cell: (props) => (
      <p className="font-semibold w-max">{props.getValue() as string}</p>
    ),
  },
  {
    header: "",
    accessorKey: "listingPhotos",
    cell: (props) => (
      <div className="w-22">
        <img
          className="h-10 w-full object-cover rounded-md"
          src={`${(props.getValue() as TListingPhotos[])[0].secure_url}`}
        />
      </div>
    ),
  },
  {
    accessorKey: "serviceType",
    header: "Type",
    cell: (props) => (
      <ScrollArea className="w-28">
        <p className="font-semibold w-max py-2">{props.getValue() as string}</p>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => (
      <p>
        {formatValue({
          value: String(props.getValue()),
          intlConfig: {
            locale: "PH-ph",
            currency: "php",
          },
        })}
      </p>
    ),
  },
  {
    accessorKey: "serviceLocation",
    header: "Location",
    cell: (props) => (
      <ScrollArea className="w-36 py-2">
        <p className="font-semibold w-max">{props.getValue() as string}</p>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
  },
  {
    accessorKey: "availableAt",
    header: "Available at",
    cell: (props) => (
      <p>{new Date(props.getValue() as string).toDateString()}</p>
    ),
  },
  {
    accessorKey: "endsAt",
    header: "Ends at",
    cell: (props) => (
      <p>{new Date(props.getValue() as string).toDateString()}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (props) => (
      <p>{new Date(props.getValue() as string).toDateString()}</p>
    ),
  },
  {
    accessorKey: "cancellationPolicy",
    header: "Cancellation policy",
    cell: (props) => (
      <p
        className={`font-bold ${
          props.getValue() === "Flexible"
            ? "text-green-600"
            : props.getValue() === "Moderate"
            ? "text-amber-600"
            : "text-red-600"
        }`}
      >
        {props.getValue() as string}
      </p>
    ),
  },
  {
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          className="font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant={`${
          compareAsc(new Date(row.original.endsAt), new Date()) >= 0 &&
          compareDesc(new Date(row.original.availableAt), new Date()) >= 0
            ? "default"
            : "destructive"
        }`}
      >
        {compareAsc(new Date(row.original.endsAt), new Date()) >= 0 &&
        compareDesc(new Date(row.original.availableAt), new Date()) >= 0
          ? "Active"
          : "Inactive"}
      </Badge>
    ),
    accessorFn: (row) =>
      compareAsc(new Date(row.endsAt), new Date()) >= 0 &&
      compareDesc(new Date(row.availableAt), new Date()) >= 0
        ? "Active"
        : "Inactive",
  },
];

function ListingsTable({ data }: { data: TListings[] }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <ListingFilters table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ListingsTable;

export type TListings = {
  availableAt: string;
  createdAt: string;
  endsAt: string;
  host: THost;
  listingPhotos: [TListingPhotos];
  price: number;
  serviceDescription: string;
  serviceType: string;
  cancellationPolicy: string;
  serviceLocation: string;
  updatedAt: string;
  _id: string;
};

type TListingPhotos = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
};

type THost = {
  email: string;
  emailVerified: boolean;
  listings: string[];
  mobileVerified: boolean;
  photoUrl: null | string;
  providerId: string;
  subscriptionExpiresAt: string;
  subscriptionStatus: string;
  uid: string;
  userStatus: string;
  username: string;
  rating: [];
};
