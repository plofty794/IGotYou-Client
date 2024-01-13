import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CATEGORIES from "@/constants/CATEGORIES";
import { TListing } from "@/root layouts/BecomeAHostLayout";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function ServiceType() {
  const { setService } = useOutletContext<TSetServiceType>();
  const [selected, setSelected] = useState("");
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "Service Type - IGotYou";
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
        <section className="my-16 flex flex-col items-center justify-center gap-8">
          <div className="w-3/4 text-center">
            <h1 className="text-3xl font-semibold">
              Which of these best categories describes your service?
            </h1>
          </div>
          <div className="grid w-3/6 grid-cols-2 gap-2 px-8 max-md:w-full">
            {CATEGORIES().map((category, i) =>
              i != CATEGORIES().length - 1 ? (
                <Button
                  key={i}
                  onClick={() => {
                    setSelected(category.name);
                    setService((prev) => ({
                      ...prev,
                      serviceType: category.name,
                    }));
                  }}
                  type="button"
                  className={`text-950 flex h-max flex-col gap-2 border bg-white p-6 hover:bg-white hover:outline hover:outline-gray-950 ${
                    selected === category.name ? "outline outline-gray-950" : ""
                  }`}
                >
                  {category.icon}
                  {category.name}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setSelected(category.name);
                    setService((prev) => ({
                      ...prev,
                      serviceType: category.name,
                    }));
                  }}
                  type="button"
                  className={`text-950 col-span-full flex h-max flex-col gap-2 border bg-white p-6 hover:bg-white hover:outline hover:outline-gray-950 ${
                    selected === category.name ? "outline outline-gray-950" : ""
                  }`}
                >
                  {category.icon}
                  {category.name}
                </Button>
              ),
            )}
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default ServiceType;
