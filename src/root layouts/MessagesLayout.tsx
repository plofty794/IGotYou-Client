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
import { auth } from "@/firebase config/config";
import useCreateConversation from "@/hooks/useCreateConversation";
import useGetConversations from "@/hooks/useGetConversations";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { CheckIcon, CircleIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { ping } from "ldrs";
import Loader from "@/partials/loaders/Loader";
import useSearchUser from "@/hooks/useSearchUser";
import { useQueryClient } from "@tanstack/react-query";
import MessageDialogFilter from "@/partials/components/messages/MessageDialogFilter";

ping.register();

function MessagesLayout() {
  const { mutate, isPending } = useCreateConversation();
  const conversations = useGetConversations();
  const { conversationID } = useParams();
  const [receiverName, setReceiverName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const { data } = useSearchUser(receiverName);
  const queryClient = useQueryClient();

  useMemo(() => {
    setTimeout(async () => {
      if (receiverName) {
        setUserDetails(
          data?.data.userDetails.filter(
            (v: { username: string }) =>
              auth.currentUser?.displayName != v.username,
          ),
        );
      } else {
        setUserDetails([]);
      }
    }, 500);
  }, [receiverName, data?.data.userDetails]);

  useEffect(() => {
    document.title = "Messages - IGotYou";
  }, []);

  return (
    <>
      {conversations.isPending ? (
        <Loader />
      ) : (
        <>
          <main className="min-h-screen ">
            <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-28 py-5 shadow 2xl:rounded-b-lg">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={() => history.back()}
                      variant={"ghost"}
                      className="rounded-full"
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
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go back</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center justify-center gap-4">
                <UserDropDownButton />
              </div>
            </nav>
            <section className="flex w-full">
              <div className=" w-1/4 p-8">
                <div className="flex w-full items-center justify-between">
                  <span className="block text-2xl font-bold">Messages</span>
                  <MessageDialogFilter
                    queryClient={queryClient}
                    receiverName={receiverName}
                    setReceiverName={setReceiverName}
                    mutate={mutate}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                </div>
                {conversations.isPending ? (
                  <div className="mx-auto w-max p-10">
                    <l-ping size="40" speed="2" color="black"></l-ping>
                  </div>
                ) : (
                  <div className="flex w-full flex-col gap-3 py-6">
                    {conversations.data?.data.userConversations.length > 0 ? (
                      conversations.data?.data.userConversations.map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (v: {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          lastMessage: any;
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          participants: any[];
                          _id: string;
                        }) => (
                          <div className="rounded-md border bg-[#F5F5F5] p-2">
                            <NavLink
                              to={`/messages/conversation/${v._id}`}
                              key={v._id}
                              className="flex flex-col gap-2 "
                            >
                              {v.lastMessage != null ? (
                                <span className="mx-auto w-max text-xs font-semibold">
                                  {conversations.data.data.currentUserID ===
                                  v.lastMessage.senderID._id ? (
                                    <span className="flex items-center gap-1">
                                      <span className="w-32 max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
                                        You: {v.lastMessage.content}{" "}
                                      </span>
                                      <CircleIcon className="h-[0.4rem] w-[0.4rem] rounded-full bg-gray-400" />
                                      {formatDistanceToNow(
                                        new Date(v.lastMessage.createdAt),
                                        { addSuffix: true },
                                      )}
                                    </span>
                                  ) : (
                                    <div
                                      className={`flex items-center gap-1 ${
                                        v.lastMessage.read
                                          ? ""
                                          : "font-extrabold"
                                      }`}
                                    >
                                      <span className="w-32 max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
                                        {v.lastMessage.senderID.username}:{" "}
                                        {v.lastMessage.content}{" "}
                                      </span>
                                      <CircleIcon
                                        className={`h-[0.4rem] w-[0.4rem] rounded-full  ${
                                          v.lastMessage.read
                                            ? "bg-gray-400"
                                            : "bg-blue-600"
                                        }`}
                                      />
                                      {formatDistanceToNow(
                                        new Date(v.lastMessage.createdAt),
                                        { addSuffix: true },
                                      )}
                                    </div>
                                  )}
                                </span>
                              ) : (
                                <span className="mx-auto w-max text-xs font-semibold">
                                  You are connected with{" "}
                                </span>
                              )}
                              <span className="w-full text-center text-sm font-bold">
                                {
                                  v.participants.find(
                                    (u) =>
                                      u.username !==
                                      auth.currentUser?.displayName,
                                  ).username
                                }
                              </span>
                            </NavLink>
                          </div>
                        ),
                      )
                    ) : (
                      <span className="mx-auto mt-8 w-max font-medium text-gray-600">
                        No messages found.
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="w-3/4">
                {!conversationID && (
                  <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="h-16 w-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-2xl font-semibold">
                        Your messages
                      </span>
                      <span className="font-medium text-gray-600">
                        Send private messages to a user
                      </span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-full bg-gray-950">
                          Send message
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="gap-4">
                        <DialogHeader className="items-center">
                          <DialogTitle className="p-2 text-lg font-bold">
                            New message
                          </DialogTitle>
                          <div className="flex w-full items-center justify-center gap-2">
                            <Label
                              htmlFor="username"
                              className="text-sm font-semibold"
                            >
                              To:
                            </Label>
                            <Input
                              value={receiverName}
                              onChange={(e) => setReceiverName(e.target.value)}
                              autoComplete="off"
                              placeholder="Search username"
                              className="p-2 text-sm font-medium"
                              id="username"
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    disabled={!receiverName}
                                    onClick={() => setReceiverName("")}
                                    variant={"outline"}
                                    className="p-3"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="h-6 w-6"
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
                        <ScrollArea className="h-60 w-full p-4">
                          {!userDetails?.length ? (
                            <div className="w-max">
                              <span className="text-sm font-semibold text-gray-600">
                                No users found.
                              </span>
                            </div>
                          ) : (
                            userDetails.map((v) => (
                              <>
                                <Card
                                  onClick={() => setReceiverName(v.username)}
                                  className={`border-none shadow-none hover:cursor-pointer hover:bg-[#F5F5F5] ${
                                    receiverName === v.username
                                      ? "bg-[#F5F5F5]"
                                      : ""
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
                                            className="h-4 w-4"
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
                                      <CheckIcon className="h-5 w-5" />
                                    )}
                                  </CardHeader>
                                </Card>
                              </>
                            ))
                          )}
                        </ScrollArea>
                        <DialogFooter className="w-full">
                          <Button
                            onClick={() => mutate(receiverName)}
                            disabled={
                              !userDetails?.find(
                                (v) =>
                                  v.username.toLowerCase() ===
                                  receiverName.toLowerCase(),
                              ) || isPending
                            }
                            className="w-full rounded-full bg-gray-950 p-5"
                          >
                            Chat
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                {<Outlet />}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default MessagesLayout;
