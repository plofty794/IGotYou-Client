import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetNotifications from "@/hooks/useGetNotifications";
import { useContext, useEffect, useMemo, useState } from "react";
import AllInbox from "./inbox/AllInbox";
import BookingRequests from "./inbox/BookingRequests";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import Lottie from "lottie-react";
import empty from "../assets/no-listings.json";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  ComposeMessageSchema,
  ZodComposeMessageSchema,
} from "@/zod/composeMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { auth } from "@/firebase config/config";
import { SocketContextProvider } from "@/context/SocketContext";

function Inbox() {
  const { socket } = useContext(SocketContextProvider);
  const [receiverName, setReceiverName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const { data, isPending } = useGetNotifications();
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<ComposeMessageSchema>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(ZodComposeMessageSchema),
  });

  function handleSearchUsername(data: ComposeMessageSchema) {
    if (!receiverName) return;
    socket?.emit("chat-message", {
      message: data.message,
      receiverName,
      senderName: auth.currentUser?.displayName,
    });
  }

  useMemo(() => {
    setTimeout(async () => {
      if (!receiverName) {
        return setUserDetails([]);
      }
      const res = await axiosPrivateRoute.get(
        `/api/users/search/${receiverName}`
      );
      setUserDetails(res.data.userDetails);
    }, 500);
  }, [setUserDetails, receiverName]);

  useEffect(() => {
    document.title = "Host Inbox - IGotYou";
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex gap-4">
          <div className="flex justify-between w-1/4 bg-slate h-max">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center justify-center bg-white gap-4 p-7 rounded-full border text-black hover:bg-white hover:shadow-lg">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Compose
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form
                  onSubmit={handleSubmit(handleSearchUsername)}
                  className="flex flex-col gap-2"
                  method="get"
                >
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                      New Message
                    </DialogTitle>
                    <div className="flex flex-col items-center justify-center gap-2 w-full">
                      <div className="flex items-center justify-center gap-2 w-full">
                        <Label
                          htmlFor="to"
                          className="text-sm font-semibold text-gray-600"
                        >
                          To:{" "}
                        </Label>
                        <div className="w-max mr-auto">
                          <Input
                            value={receiverName}
                            onChange={(e) => setReceiverName(e.target.value)}
                            id="to"
                            placeholder="Username"
                            autoFocus
                            className="p-2 text-sm focus-visible:ring-0 focus-visible:border-none border-none outline-none shadow-none font-semibold"
                          />
                        </div>
                        {userDetails.length > 0 && (
                          <Select onValueChange={(e) => setReceiverName(e)}>
                            <SelectTrigger className="text-xs font-semibold">
                              Show suggestions
                            </SelectTrigger>
                            <SelectContent className="">
                              <SelectGroup className="rounded ">
                                {userDetails.map(
                                  (v) =>
                                    v.username !==
                                      auth.currentUser?.displayName && (
                                      <SelectItem
                                        key={v.photoURL as string}
                                        className="hover:bg-gray-100 "
                                        value={v.username}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Avatar>
                                            <AvatarImage
                                              src={
                                                (v.photoURL as string) ??
                                                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                                              }
                                            />
                                          </Avatar>
                                          <CardTitle className="font-bold text-xs text-gray-600">
                                            {v.username}
                                          </CardTitle>
                                        </div>
                                      </SelectItem>
                                    )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                        {!receiverName && (
                          <ErrorMessage message={"Username is required"} />
                        )}
                      </div>
                    </div>
                  </DialogHeader>
                  <span className="ml-auto font-bold text-xs text-gray-600">
                    {watch("message").length} / 200
                  </span>
                  <Textarea {...register("message")} maxLength={201} />
                  {errors.message && (
                    <ErrorMessage message={errors.message.message} />
                  )}
                  <DialogFooter className="mt-2">
                    <Button className="rounded-full bg-gray-950">Send</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          {isPending ? (
            <ListingsLoader />
          ) : data?.data.notifications.length > 0 ? (
            <>
              <Tabs
                defaultValue="inbox"
                onValueChange={(value) => console.log(value)}
                className="bg-[#F5F5F5] rounded-md p-1 shadow-lg border w-full"
              >
                <TabsList className="bg-white mb-1">
                  <TabsTrigger
                    className="flex items-center justify-center gap-4 text-sm px-6 font-bold"
                    value="inbox"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                      />
                    </svg>
                    <span>Inbox ({data?.data.notifications.length})</span>
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex items-center justify-center gap-4 text-sm px-6 font-bold"
                    value="booking-requests"
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
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                    Booking requests (
                    {
                      data?.data.notifications.filter(
                        (v: { notificationType: string }) =>
                          v.notificationType === "Booking-Request"
                      ).length
                    }
                    )
                  </TabsTrigger>
                </TabsList>
                <div className="flex">
                  <ScrollArea className="h-[70vh]">
                    <TabsContent
                      className="grid grid-cols-1 gap-1"
                      value="inbox"
                    >
                      {data?.data.notifications.map((notification: unknown) => (
                        <AllInbox
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          key={notification._id}
                          notification={notification}
                        />
                      ))}
                    </TabsContent>
                  </ScrollArea>
                  <ScrollArea className="h-[70vh]">
                    <TabsContent
                      className="grid grid-cols-1 gap-1"
                      value="booking-requests"
                    >
                      {data?.data.notifications.map(
                        (notification: { notificationType: string }) =>
                          notification.notificationType ===
                            "Booking-Request" && (
                            <BookingRequests
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              key={notification._id}
                              notification={notification}
                              socket={socket}
                            />
                          )
                      )}
                    </TabsContent>
                  </ScrollArea>
                </div>
              </Tabs>
            </>
          ) : (
            <Card className="w-full h-[70vh] bg-[#F5F5F5] flex flex-col items-center justify-center">
              <Lottie
                animationData={empty}
                className="w-40 h-40"
                loop={false}
              />
              <CardTitle className="font-bold text-gray-600 text-lg">
                Nothing to show here
              </CardTitle>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

export default Inbox;
