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
import { formatValue } from "react-currency-input-field";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import ListingFilters from "./ListingFilters";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import DeleteListingDialog from "./partials/DeleteListingDialog";
import RenewListingDialog from "./partials/RenewListingDialog";
import DisableListingDialog from "./partials/DisableListingDialog";
import { differenceInDays } from "date-fns";
import EnableListing from "./partials/EnableListing";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dop5kqpod",
  },
});

const columns: ColumnDef<TListings>[] = [
  {
    header: "Name",
    accessorKey: "serviceTitle",
    cell: (props) => (
      <p className="w-max font-semibold">{props.getValue() as string}</p>
    ),
  },
  {
    id: "listingAssets",
    cell: ({ row }) => (
      <div className="w-22">
        {row.original.listingAssets[0]?.resource_type === "video" ? (
          <AdvancedImage
            className="h-10 w-full rounded-md object-cover shadow"
            cldImg={cld
              .image(row.original.listingAssets[0]?.public_id)
              .setAssetType("video")
              .format("auto:image")}
            plugins={[
              lazyload(),
              responsive({
                steps: [800, 1000, 1400],
              }),
            ]}
          />
        ) : (
          <AdvancedImage
            cldImg={cld.image(row.original.listingAssets[0]?.public_id)}
            plugins={[
              lazyload(),
              responsive({
                steps: [800, 1000, 1400],
              }),
            ]}
            className="h-10 w-full rounded-md object-cover shadow"
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "serviceType",
    header: "Type",
    cell: (props) => (
      <ScrollArea className="w-28">
        <p className="w-max py-2 text-xs font-semibold">
          {props.getValue() as string}
        </p>
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
      <p className="text-center text-sm font-semibold">
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
        <p className="w-max text-xs font-semibold">
          {props.getValue() as string}
        </p>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
  },
  {
    accessorKey: "availableAt",
    header: "Available at",
    cell: (props) => (
      <p className="text-xs font-semibold">
        {new Date(props.getValue() as string).toDateString()}
      </p>
    ),
  },
  {
    accessorKey: "endsAt",
    header: "Ends at",
    cell: (props) => (
      <p className="text-xs font-semibold">
        {new Date(props.getValue() as string).toDateString()}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (props) => (
      <p className="text-xs font-semibold">
        {new Date(props.getValue() as string).toDateString()}
      </p>
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="p-2 font-medium"
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
          row.original.status === "Active" ? "default" : "destructive"
        }`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-0 py-1" align="end">
            {row.original.status === "Ended" ? (
              <RenewListingDialog
                listingDuration={differenceInDays(
                  new Date(row.original.endsAt),
                  new Date(row.original.availableAt),
                )}
                listingID={row.original._id}
              />
            ) : row.original.status === "Active" ? (
              <DisableListingDialog
                listingID={row.original._id}
                serviceDescription={row.original.serviceDescription}
              />
            ) : (
              <EnableListing listingID={row.original._id} />
            )}

            <DropdownMenuItem className="p-0">
              <Button
                variant={"ghost"}
                className="w-full p-2 text-sm font-semibold text-gray-600"
              >
                <Link replace to={`/hosting-listings/edit/${row.original._id}`}>
                  Edit listing
                </Link>
              </Button>
            </DropdownMenuItem>
            <DeleteListingDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
                            header.getContext(),
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
                        cell.getContext(),
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
  listingAssets: [TListingAssets];
  listingPhotos: [TListingAssets];
  price: number;
  serviceDescription: string;
  serviceType: string;
  cancellationPolicy: string;
  serviceLocation: string;
  updatedAt: string;
  _id: string;
  status: string;
};

type TListingAssets = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
  thumbnail_url: string;
  resource_type: string;
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
