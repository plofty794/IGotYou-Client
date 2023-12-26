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

function Service() {
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
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-16 flex flex-col items-center justify-center gap-8">
          <div className="text-center w-3/4">
            <h1 className="text-3xl font-semibold">
              Which of these best categories describes your service?
            </h1>
          </div>
          <div className="grid grid-cols-2 w-3/6 max-md:w-full gap-2 px-8">
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
                  className={`h-max flex flex-col gap-2 border text-950 bg-white p-6 hover:outline-gray-950 hover:outline hover:bg-white ${
                    selected === category.name ? "outline-gray-950 outline" : ""
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
                  className={`col-span-full h-max flex flex-col gap-2 border text-950 bg-white p-6 hover:outline-gray-950 hover:outline hover:bg-white ${
                    selected === category.name ? "outline-gray-950 outline" : ""
                  }`}
                >
                  {category.icon}
                  {category.name}
                </Button>
              )
            )}
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default Service;
