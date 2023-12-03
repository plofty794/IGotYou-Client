import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { BASE_PRICE, PRICE_CAP } from "@/constants/price";
import ErrorMessage from "@/partials/components/ErrorMessage";
import { TListing } from "@/root layouts/BecomeAHostLayout";

type TSetServiceType = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function Price() {
  const { setService, service } = useOutletContext<TSetServiceType>();
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "IGotYou - Price";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  useEffect(() => {
    if (service.price > PRICE_CAP || service.price < BASE_PRICE) {
      setErrorMessage(
        `Please enter a price between ₱${BASE_PRICE} and ₱${PRICE_CAP}.`
      );
    } else {
      setErrorMessage("");
    }
  }, [service.price]);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 h-[400px] flex flex-wrap flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold">Now, set your price.</h1>
            <span className="text-lg font-medium text-gray-600">
              You can change it anytime.
            </span>
          </div>
          <CurrencyInput
            autoFocus
            className="w-1/3 rounded border-none focus:outline-none text-6xl font-semibold"
            prefix="₱"
            allowNegativeValue={false}
            decimalsLimit={2}
            value={service.price}
            onValueChange={(value) =>
              setService((prev) => ({
                ...prev,
                price: parseInt(value ?? "0"),
              }))
            }
          />
          {errorMessage && (
            <div className="w-max mx-auto">
              <ErrorMessage message={errorMessage} />
            </div>
          )}
        </section>
      </ScrollArea>
    </>
  );
}

export default Price;
