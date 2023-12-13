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
import useDeleteConversation from "@/hooks/useDeleteConversation";
import useGetConversation from "@/hooks/useGetConversation";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TMessage = {
  content: string;
  conversationID: string;
  senderID: string;
  receiverName: string;
};

function Messages() {
  const navigate = useNavigate();
  const { mutate } = useDeleteConversation();
  const { conversationId } = useParams();
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

  useMemo(() => {
    data?.data.conversation.length &&
      data?.data.conversation?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v: { participants: any[] }) =>
          setParticipant(
            v.participants.filter(
              (u: { _id: string }) => u._id !== data.data.currentUserID
            )
          )
      );
    setConversation(data?.data.conversation);
    data?.data.conversation.map((v: { messages: [] }) =>
      setMessages(v.messages)
    );
  }, [data?.data.conversation, data?.data.currentUserID]);

  useMemo(() => {
    socket?.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data.conversation]);
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    });
  }, [conversationId, queryClient, socket]);

  function sendMessage({
    content,
    conversationID,
    senderID,
    receiverName,
  }: TMessage) {
    socket?.emit("chat-message", {
      content,
      conversationID,
      senderID,
      receiverName,
    });
    setMessages((prev) => [
      ...prev,
      {
        content,
        conversation,
        senderID: { _id: senderID },
        createdAt: Date.now(),
      },
    ]);
    setContent("");
  }

  return (
    <div className="px-8 py-6">
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={participant[0]?.photoUrl}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-lg">
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
                          className="w-6 h-6"
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
                        <AlertDialogDescription className="font-medium">
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
                            conversationId && mutate(conversationId);
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
          <ScrollArea className="relative mt-2 h-[65vh] bg-[#F5F5F5] rounded-md border p-6">
            <div className="flex flex-col items-center justify-center gap-2 w-max mx-auto">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  className="object-cover"
                  src={participant[0]?.photoUrl}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-xl">
                {participant[0]?.username}
              </span>
              <Button className="bg-zinc-900 rounded-full text-xs">
                View profile
              </Button>
            </div>
            <div className="flex flex-col gap-2 mt-4 mb-10 p-4 h-max">
              {messages.map((v) =>
                v.senderID._id === data?.data.currentUserID ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="ml-auto rounded-full w-max bg-zinc-700 px-4 py-2">
                        {" "}
                        <span
                          key={v._id}
                          className="text-white font-medium text-sm"
                        >
                          {v.content}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(new Date(v.createdAt), "p")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="mr-auto rounded-full w-max bg-zinc-700 px-4 py-2">
                        {" "}
                        <span
                          key={v._id}
                          className="text-white font-medium text-sm"
                        >
                          {v.content}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(new Date(v.createdAt), "p")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                queryClient.invalidateQueries({
                  queryKey: ["conversations"],
                });
                queryClient.invalidateQueries({
                  queryKey: ["conversation", conversationId],
                });
                sendMessage({
                  content,
                  conversationID: conversation && conversation[0]?._id,
                  senderID: data?.data.currentUserID,
                  receiverName: participant[0].username,
                });
              }}
            >
              <div className="bg-[#F5F5F5] flex justify-between items-center gap-2 p-2 absolute left-0 bottom-0 w-full">
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Message..."
                  autoFocus
                  className="bg-white p-5 font-medium rounded-full w-full"
                />
                <Button
                  disabled={!content}
                  className="text-lg p-6 bg-gray-950 rounded-full"
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
