import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { formatValue } from "react-currency-input-field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

type TReservations = {
  _id: string;
  bookingEndsAt: string;
  bookingStartsAt: string;
  createdAt: string;
  guestID: {
    _id: string;
    email: string;
    username: string;
    mobilePhone: string;
  };
  hostID: string;
  listingID: {
    _id: string;
    serviceType: string;
    serviceTitle: string;
  };
  paymentAmount: number;
  paymentStatus: "pending" | "fully-paid" | "partially-paid" | "refunded";
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
};

const columns: ColumnDef<TReservations>[] = [
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
        className={`rounded-full font-bold uppercase ${
          row.original.status === "scheduled"
            ? "text-blue-600"
            : row.original.status === "ongoing"
              ? "text-yellow-600"
              : row.original.status === "completed"
                ? "text-green-600"
                : "text-red-600"
        }`}
        variant={"outline"}
      >
        {row.original.status}
      </Badge>
    ),
    filterFn: (row, _, filterValue: string) =>
      row.original.status === filterValue,
  },

  {
    header: "Guest",
    cell: ({ row }) => (
      <p className="text-xs font-bold">{row.original.guestID.username}</p>
    ),
  },
  {
    header: "Requested dates",
    cell: ({ row }) => (
      <p className="text-xs font-bold">
        {format(new Date(row.original.bookingStartsAt), " MMM d")} -{" "}
        {format(new Date(row.original.bookingEndsAt), "PP")}
      </p>
    ),
  },
  {
    header: "Booked",
    cell: ({ row }) => (
      <p className="text-xs font-bold">
        {format(new Date(row.original.createdAt), "PP")}
      </p>
    ),
  },
  {
    header: "Listing",
    cell: ({ row }) => (
      <p className="text-xs font-bold">{row.original.listingID.serviceTitle}</p>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      return (
        <Button
          className="p-2 font-medium"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        className={`rounded-full font-bold uppercase ${
          row.original.paymentStatus === "partially-paid"
            ? "text-blue-600"
            : row.original.paymentStatus === "pending"
              ? "text-yellow-600"
              : row.original.paymentStatus === "fully-paid"
                ? "text-green-600"
                : "text-rose-600"
        }`}
        variant={"outline"}
      >
        {row.original.paymentStatus}
      </Badge>
    ),
    filterFn: (row, _, filterValue: string) =>
      row.original.paymentStatus === filterValue,
  },
  {
    header: "Amount",
    cell: ({ row }) => (
      <p className="text-xs font-bold">
        {formatValue({
          value: row.original.paymentAmount.toString(),
          intlConfig: {
            locale: "ph",
            currency: "php",
          },
        })}
      </p>
    ),
  },
  {
    id: "Details",
    cell: ({ row }) => (
      <Button size={"sm"} className="bg-gray-950">
        <Link to={`/reservation-details/${row.original._id}`}>Details</Link>
      </Button>
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
            {row.original.guestID.mobilePhone && (
              <DropdownMenuItem className="px-0">
                <Button
                  variant={"ghost"}
                  className="w-full justify-start text-sm font-semibold text-gray-600"
                >
                  Call {row.original.guestID.mobilePhone}
                </Button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="px-0">
              <Button
                variant={"ghost"}
                className="w-full justify-start text-sm font-semibold text-gray-600"
              >
                <Link to={"/messages"}>
                  Message {row.original.guestID.username}
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-0">
              <Button
                variant={"ghost"}
                className="w-full justify-start gap-4 text-sm font-semibold text-gray-600"
              >
                <Link
                  to={"https://mail.google.com/mail/u/0/#inbox?compose=new"}
                  target="_blank"
                >
                  Email {row.original.guestID.username}
                </Link>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span
                        onClick={async () =>
                          await copyToClipboard(row.original.guestID.email)
                        }
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
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                          />
                        </svg>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-0">
              <Button
                variant={"ghost"}
                className="w-full justify-start text-red-600 hover:text-red-500"
              >
                Cancel service
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

async function copyToClipboard(email: string) {
  try {
    await navigator.clipboard.writeText(email);
    toast({
      description: "Email copied to clipboard!",
      className: "bg-white",
    });
  } catch (error) {
    toast({
      description: (error as Error).message as string,
      variant: "destructive",
    });
  }
}

function ReservationsTable({ data }: { data: TReservations[] }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
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

export default ReservationsTable;
