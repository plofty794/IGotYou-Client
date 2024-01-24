import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TGuestID = {
  _id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  identityVerified: boolean;
  mobileVerified: boolean;
  photoUrl: string;
  educationalAttainment: string;
  work: string;
  funFact: string;
  address: string;
  mobilePhone: string;
  userStatus: string;
};

function GuestInformation({ guestID }: { guestID: TGuestID }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-black text-xs" variant={"outline"}>
          {guestID.username}'s information
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-3xl flex-col gap-2">
        <Avatar className="mx-auto h-28 w-28">
          <AvatarImage
            className="object-cover"
            src={guestID.photoUrl}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mx-auto w-max text-base font-semibold capitalize text-gray-600">
          {guestID.userStatus}
        </p>
        <h2 className="text-xl font-semibold">
          {guestID.username}'s information
        </h2>
        <div className="flex w-max gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-medium"> {guestID.email} </p>
        </div>
        <div className="flex w-max gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
            <path
              fillRule="evenodd"
              d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-medium">
            {guestID.mobilePhone ?? "No mobile phone"}
          </p>
        </div>
        <div className="flex w-full items-center justify-center gap-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
              <AccordionTrigger>Educational Attainment</AccordionTrigger>
              <AccordionContent className="capitalize">
                {guestID.educationalAttainment ?? "N/A"}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Where does {guestID.username} live?
              </AccordionTrigger>
              <AccordionContent className="capitalize">
                {guestID.address ?? "N/A"}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is {guestID.username}
                's' work?
              </AccordionTrigger>
              <AccordionContent className="capitalize">
                {guestID.work ?? "N/A"}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Fun fact about {guestID.username}
              </AccordionTrigger>
              <AccordionContent className="capitalize">
                {guestID.funFact ?? "N/A"}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mx-auto mt-4 flex w-max items-center justify-between gap-2">
          {guestID.emailVerified ? (
            <div className="flex w-max items-center justify-center gap-2 rounded-lg border p-4 shadow-md">
              {" "}
              <CheckCircledIcon
                color="#FFF"
                width={22}
                height={22}
                className="inline-block rounded-full bg-green-600"
              />{" "}
              <p className="text-sm font-semibold text-gray-600">
                Email verified
              </p>
            </div>
          ) : (
            <div className="flex w-max items-center justify-center gap-2 rounded-lg border p-4 shadow-md">
              {" "}
              <CrossCircledIcon
                color="#FFF"
                width={22}
                height={22}
                className="inline-block rounded-full bg-red-600"
              />{" "}
              <p className="text-sm font-semibold text-gray-600">
                Email verified
              </p>
            </div>
          )}
          {guestID.identityVerified ? (
            <div className="flex w-max items-center justify-center gap-2 rounded-lg border p-4 shadow-md">
              {" "}
              <CheckCircledIcon
                color="#FFF"
                width={22}
                height={22}
                className="inline-block rounded-full bg-green-600"
              />{" "}
              <p className="text-sm font-semibold text-gray-600">
                Identity verified
              </p>
            </div>
          ) : (
            <div className="flex w-max items-center justify-center gap-2 rounded-lg border p-4 shadow-md">
              {" "}
              <CrossCircledIcon
                color="#FFF"
                width={22}
                height={22}
                className="inline-block rounded-full bg-red-600"
              />{" "}
              <p className="text-sm font-semibold text-gray-600">
                Identity (not verified)
              </p>
            </div>
          )}
          {guestID.mobileVerified ? (
            <div className="flex w-max items-center justify-center gap-2 rounded-lg border p-4 shadow-md">
              {" "}
              <CheckCircledIcon
                color="#FFF"
                width={22}
                height={22}
                className="inline-block rounded-full bg-green-600"
              />{" "}
              <p className="text-sm font-semibold text-gray-600">
                Mobile verified
              </p>
              <p className="text-sm font-semibold text-gray-600">
                {guestID.mobilePhone}
              </p>
            </div>
          ) : (
            <div className="flex w-max items-center justify-center gap-2 rounded-lg border p-4 shadow-md">
              {" "}
              <CrossCircledIcon
                color="#FFF"
                width={22}
                height={22}
                className="inline-block rounded-full bg-red-600"
              />{" "}
              <p className="text-sm font-semibold text-gray-600">
                Mobile (not verified)
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GuestInformation;
