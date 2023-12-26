import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceDescription() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "Service Description - IGotYou";
    const timeout = setTimeout(() => setIsFadingIn(false), 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-28 flex flex-col items-center justify-center gap-4">
          <div className="text-center w-2/4">
            <h1 className="text-4xl font-semibold">
              What will you call your service?{" "}
            </h1>
            <span className="text-lg font-medium text-gray-600">
              (Service name)
            </span>
          </div>
          <Input
            autoFocus
            spellCheck
            placeholder={"Ex. Mang Juan's Photography Service"}
            className="w-2/5 mb-2 text-xl font-medium py-8 px-4"
            value={service.serviceDescription}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                serviceDescription: e.target.value,
              }))
            }
          />
        </section>
      </ScrollArea>
    </>
  );
}

export default ServiceDescription;
