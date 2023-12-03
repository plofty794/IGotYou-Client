/* eslint-disable @typescript-eslint/no-explicit-any */

import { SocketContextProvider } from "@/context/SocketContext";
import useGetMessages from "@/hooks/useGetMessages";
import { useContext, useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase config/config";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

function Messages() {
  const queryClient = useQueryClient();
  const { data } = useGetMessages();
  const { socket } = useContext(SocketContextProvider);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Messages - IGotYou";
  }, []);

  function sendChatMessage(message: string, receiverName: string) {
    socket?.emit("chat-message", {
      message,
      receiverName,
      senderName: auth.currentUser?.displayName,
    });
    setMessage("");
    queryClient.invalidateQueries({
      queryKey: ["messages", auth.currentUser?.uid],
    });
  }

  useMemo(() => {
    socket?.on("receive-message", (data) => console.log(data.message));
  }, [socket]);

  return (
    <section className="w-full">
      <h1 className="font-bold text-3xl ml-6 mt-4 w-max">Messages</h1>
      {data?.pages.map((page) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        page.data.messages.map((v) => (
          <Tabs
            key={v._id}
            defaultValue="account"
            className="flex gap-2 w-full p-6 max-lg:flex-col"
          >
            <ScrollArea className="h-max w-1/3 max-lg:w-full">
              <TabsList className="w-full h-max flex-col">
                {page.data.currentUserID === v.senderID._id ? (
                  <TabsTrigger
                    className="w-full"
                    key={v._id}
                    value={v.senderID.username}
                  >
                    <div className="flex items-center gap-2 w-full h-max p-2">
                      <Avatar className=" h-12 w-12">
                        <AvatarImage
                          className="object-cover"
                          src={
                            v.receiverID.photoUrl ??
                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                          }
                        />
                      </Avatar>
                      <div className="flex items-start flex-col">
                        <span className="font-bold text-sm">
                          {v.receiverID.username}
                        </span>
                        <span className="font-bold text-xs text-gray-600">
                          last interaction{" "}
                          {formatDistanceToNow(
                            new Date(v.replies[v.replies.length - 1].createdAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                  </TabsTrigger>
                ) : (
                  <TabsTrigger
                    className="w-full"
                    key={v._id}
                    value={v.receiverID.username}
                  >
                    <div className="flex items-center gap-2 w-full h-max p-2">
                      <Avatar className=" h-12 w-12">
                        <AvatarImage
                          className="object-cover"
                          src={
                            v.senderID.photoUrl ??
                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                          }
                        />
                      </Avatar>
                      <div className="flex items-start flex-col">
                        <span className="font-bold text-sm">
                          {v.receiverID.username}
                        </span>
                        <span className="font-bold text-xs text-gray-600">
                          last interaction{" "}
                          {formatDistanceToNow(
                            new Date(v.replies[v.replies.length - 1].createdAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                  </TabsTrigger>
                )}
              </TabsList>
            </ScrollArea>
            <TabsContent
              className="m-0 w-full h-[60vh]"
              value={
                page.data.currentUserID === v.senderID._id
                  ? v.senderID.username
                  : v.receiverID.username
              }
            >
              <Card className="relative h-full">
                <ScrollArea className="h-5/6">
                  <CardContent className="w-full pt-4">
                    {page.data.currentUserID === v.senderID._id ? (
                      <>
                        <div className="w-max ml-auto border shadow-md rounded-full p-4 flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              className="object-cover"
                              src={
                                v.senderID.photoUrl ??
                                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                              }
                            />
                          </Avatar>
                          <span className="font-bold "> {v.content} </span>
                        </div>
                        {v.replies.length > 0 &&
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          v.replies.map((reply) =>
                            reply.senderID === page.data.currentUserID ? (
                              <div
                                key={reply._id}
                                className="w-max ml-auto border shadow-md rounded-full p-4 flex items-center gap-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      v.senderID.photoUrl ??
                                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                                    }
                                  />
                                </Avatar>
                                <span className="font-bold">
                                  {" "}
                                  {reply.content}{" "}
                                </span>
                              </div>
                            ) : (
                              <div
                                key={reply._id}
                                className="bg-[#00B6AC] w-max mr-auto border shadow-md rounded-full p-4 flex items-center gap-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      v.receiverID.photoUrl ??
                                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                                    }
                                  />
                                </Avatar>
                                <span className="font-bold text-white">
                                  {" "}
                                  {reply.content}{" "}
                                </span>
                              </div>
                            )
                          )}
                      </>
                    ) : (
                      <>
                        <div className="bg-[#00B6AC] w-max mr-auto border shadow-md rounded-full p-4 flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={
                                v.senderID.photoUrl ??
                                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                              }
                            />
                          </Avatar>
                          <span className="font-bold text-white">
                            {" "}
                            {v.content}{" "}
                          </span>
                        </div>
                        {v.replies.length > 0 &&
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          v.replies.map((reply) =>
                            reply.senderID === v.receiverID._id ? (
                              <div
                                key={reply._id}
                                className=" w-max ml-auto border shadow-md rounded-full p-4 flex items-center gap-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      v.receiverID.photoUrl ??
                                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                                    }
                                  />
                                </Avatar>
                                <span className="font-bold ">
                                  {" "}
                                  {reply.content}{" "}
                                </span>
                              </div>
                            ) : (
                              <div
                                key={reply._id}
                                className="bg-[#00B6AC] w-max mr-auto border shadow-md rounded-full p-4 flex items-center gap-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={
                                      v.senderID.photoUrl ??
                                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                                    }
                                  />
                                </Avatar>
                                <span className="font-bold text-white text-xs">
                                  {" "}
                                  {reply.content}{" "}
                                </span>
                              </div>
                            )
                          )}
                      </>
                    )}
                  </CardContent>
                </ScrollArea>
                <CardFooter className="gap-2 p-2 bg-zinc-200 absolute bottom-0 w-full">
                  <Textarea
                    autoFocus
                    className="min-h-[40px] text-sm font-semibold py-2 bg-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    disabled={!message.length}
                    onClick={() => sendChatMessage(message, v.receiverName)}
                    size={"lg"}
                    className="bg-gray-950 rounded-full p-6 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="black"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ))
      )}
    </section>
  );
}

export default Messages;
