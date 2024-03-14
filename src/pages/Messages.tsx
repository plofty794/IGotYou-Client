import { axiosPrivateRoute } from "@/api/axiosRoute";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocketContextProvider } from "@/context/SocketContext";
import useChatMessage from "@/hooks/useChatMessage";
import useDeleteConversation from "@/hooks/useDeleteConversation";
import useGetConversation from "@/hooks/useGetConversation";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Messages() {
  const latestChatRef = useRef<HTMLDivElement | null>(null);
  const { conversationID } = useParams();
  const navigate = useNavigate();
  const chatMessage = useChatMessage();
  const { mutate } = useDeleteConversation();
  const queryClient = useQueryClient();
  const { socket } = useContext(SocketContextProvider);
  const { data, isPending } = useGetConversation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [participant, setParticipant] = useState<any[]>([]);
  const [content, setContent] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversation, setConversation] = useState<any[]>();

  useEffect(() => {
    data?.data.conversation.length &&
      data?.data.conversation?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v: { participants: any[] }) =>
          setParticipant(
            v.participants.filter(
              (u: { _id: string }) => u._id !== data.data.currentUserID,
            ),
          ),
      );
    setConversation(data?.data.conversation);
    data?.data.conversation.map((v: { messages: [] }) =>
      setMessages(v.messages),
    );
    setTimeout(
      () =>
        latestChatRef.current?.scrollIntoView({
          behavior: "instant",
        }),
      0,
    );
  }, [data?.data.conversation, data?.data.currentUserID]);

  useEffect(() => {
    if (chatMessage.isSuccess) {
      latestChatRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [chatMessage.isSuccess]);

  async function readMessage(messageId: string) {
    await axiosPrivateRoute.patch(
      `/api/users/current-user/conversations/read-message/${messageId}`,
      {
        read: true,
      },
    );

    queryClient.invalidateQueries({
      queryKey: ["conversation", messageId],
      refetchType: "all",
    });
    queryClient.invalidateQueries({
      queryKey: ["conversations"],
      refetchType: "all",
    });
    queryClient.invalidateQueries({
      queryKey: ["guest-notifications"],
      refetchType: "all",
    });
  }

  useEffect(() => {
    socket?.on("receive-message", () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationID],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    });
  }, [conversationID, queryClient, socket]);

  return (
    <div className="px-8 py-6">
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/users/visit/show/${participant[0]?._id}`}>
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={participant[0]?.photoUrl}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <span className="text-lg font-semibold">
                {participant[0]?.username}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="p-2" variant={"destructive"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="font-semibold text-gray-600">
                          This action cannot be undone. This will{" "}
                          <span className="font-bold text-red-600 underline">
                            permanently delete
                          </span>{" "}
                          this conversation from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            conversationID && mutate(conversationID);
                            setTimeout(() => {
                              navigate("/messages", { replace: true });
                              document.location.reload();
                            }, 600);
                          }}
                          className="rounded-full bg-gray-950"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator />
          <ScrollArea className="relative mt-2 h-[65vh] rounded-md border bg-[#F5F5F5] p-6">
            <div className="mx-auto flex w-max flex-col items-center justify-center gap-2">
              <Link to={`/users/visit/show/${participant[0]?._id}`}>
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    className="object-cover"
                    src={participant[0]?.photoUrl}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <span className="text-xl font-semibold">
                {participant[0]?.username}
              </span>
              <Link to={`/users/visit/show/${participant[0]?._id}`}>
                <Button className="rounded-full bg-zinc-900 text-xs">
                  View profile
                </Button>
              </Link>
            </div>
            <div className="mb-10 mt-4 flex h-max flex-col gap-2 p-4">
              {messages.map((v, i) =>
                v.senderID._id === data?.data.currentUserID ? (
                  <>
                    {messages.length == i + 1 ? (
                      <div
                        ref={latestChatRef}
                        className="ml-auto w-max rounded-full bg-blue-500 px-4 py-2"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <span
                                key={v._id}
                                className="text-sm font-semibold text-white"
                              >
                                {v.content}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(new Date(v.createdAt), "p")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <div className="ml-auto w-max rounded-full  bg-blue-500 px-4 py-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <span
                                key={v._id}
                                className="text-sm font-semibold text-white"
                              >
                                {v.content}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(new Date(v.createdAt), "p")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {messages.length == i + 1 ? (
                      <div
                        ref={latestChatRef}
                        className="mr-auto w-max rounded-full bg-[#E5E4E9] px-4 py-2"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <span
                                key={v._id}
                                className="text-sm font-semibold"
                              >
                                {v.content}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(new Date(v.createdAt), "p")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <div className="mr-auto w-max rounded-full bg-[#E5E4E9] px-4 py-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <span
                                key={v._id}
                                className="text-sm font-semibold"
                              >
                                {v.content}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{format(new Date(v.createdAt), "p")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </>
                ),
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContent("");
                chatMessage.mutate({
                  content,
                  receiverName: participant[0].username,
                });
              }}
            >
              <div className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 bg-[#F5F5F5] p-2">
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Message..."
                  onFocus={async () =>
                    conversation != null &&
                    !conversation[0]?.lastMessage.read &&
                    (await readMessage(conversation[0].lastMessage._id))
                  }
                  className="w-full rounded-full bg-white p-5 font-medium"
                  spellCheck="true"
                />
                <Button
                  disabled={!content}
                  className="rounded-full bg-gray-950 p-6 text-lg"
                >
                  Send
                </Button>
              </div>
            </form>
          </ScrollArea>
        </>
      )}
    </div>
  );
}

export default Messages;
