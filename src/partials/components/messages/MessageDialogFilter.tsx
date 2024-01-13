import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon } from "@radix-ui/react-icons";
import { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type TProps = {
  queryClient: QueryClient;
  setReceiverName: React.Dispatch<React.SetStateAction<string>>;
  receiverName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userDetails: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserDetails: React.Dispatch<React.SetStateAction<any[]>>;
};
function MessageDialogFilter({
  queryClient,
  receiverName,
  setReceiverName,
  mutate,
  userDetails,
  setUserDetails,
}: TProps) {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          queryClient.removeQueries({
            queryKey: ["search-user"],
            type: "inactive",
          });
        }
      }}
    >
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </TooltipTrigger>
            <TooltipContent>
              <p>New message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader className="items-center">
          <DialogTitle className="p-2 text-lg font-bold">
            New message
          </DialogTitle>
          <div className="flex w-full items-center justify-center gap-2">
            <Label htmlFor="username" className="font-semibold text-sm">
              To:
            </Label>
            <Input
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              autoComplete="off"
              placeholder="Search username"
              className="text-sm font-medium p-2"
              id="username"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={!receiverName}
                    onClick={() => {
                      setReceiverName("");
                      setUserDetails([]);
                    }}
                    variant={"outline"}
                    className="p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogHeader>
        <ScrollArea className="bg-[#F5F5F5] w-full h-60 p-4">
          {!userDetails?.length ? (
            <div className="w-max">
              <span className="text-sm font-semibold text-gray-600">
                No users found.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {userDetails.map((v) => (
                <Card
                  onClick={() => setReceiverName(v.username)}
                  className={`hover:cursor-pointer shadow-none ${
                    receiverName === v.username ? "border" : ""
                  }`}
                  key={v._id}
                >
                  <CardHeader className="flex-row items-center justify-between gap-2 p-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          className="object-cover"
                          src={` ${
                            v.photoUrl ??
                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                          } `}
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">
                          {v.username}
                        </span>
                        <div className="flex items-center justify-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                            />
                          </svg>
                          <span className="text-xs font-medium ">
                            {v.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    {receiverName === v.username && (
                      <CheckIcon className="w-5 h-5" />
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
        <DialogFooter className="w-full">
          <Button
            onClick={() => {
              mutate(receiverName);
              setReceiverName("");
              setUserDetails([]);
            }}
            disabled={
              userDetails?.find(
                (v) => v.username.toLowerCase() === receiverName.toLowerCase()
              ) == null
            }
            className="w-full bg-gray-950 rounded-full p-5"
          >
            Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MessageDialogFilter;
