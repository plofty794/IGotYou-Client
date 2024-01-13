import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceTitle() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "Service Title - IGotYou";
    const timeout = setTimeout(() => setIsFadingIn(false), 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ScrollArea
        className={`h-[450px] w-full rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-28 flex flex-col items-center justify-center gap-4">
          <div className="w-2/4 text-center">
            <h1 className="text-4xl font-semibold">
              What will you call your service?{" "}
            </h1>
            <span className="text-lg font-medium text-gray-600">
              (Service title)
            </span>
          </div>
          <Input
            autoFocus
            spellCheck="true"
            placeholder={"Ex. Mang Juan's Photography Service"}
            className="mb-2 w-2/5 px-4 py-8 text-xl font-medium"
            value={service.serviceDescription}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                serviceTitle: e.target.value,
              }))
            }
          />
        </section>
      </ScrollArea>
    </>
  );
}

export default ServiceTitle;
