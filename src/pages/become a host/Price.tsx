import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CurrencyInput, { formatValue } from "react-currency-input-field";
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
        `Enter a price between ${formatValue({
          value: BASE_PRICE.toString(),
          intlConfig: { locale: "ph", currency: "php" },
        })} and ${formatValue({
          value: PRICE_CAP.toString(),
          intlConfig: { locale: "ph", currency: "php" },
        })}.`,
      );
    } else {
      setErrorMessage("");
    }
  }, [service.price]);

  return (
    <>
      <ScrollArea
        className={`h-[450px] w-full rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 flex h-[400px] flex-col flex-wrap items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold">
              Now, set your price per day of service.
            </h1>
            <span className="text-center text-lg font-semibold text-gray-600">
              You can change it anytime.
            </span>
          </div>
          <CurrencyInput
            autoFocus
            className="w-1/3 rounded border-none text-6xl font-semibold focus:outline-none"
            prefix="₱"
            allowNegativeValue={false}
            decimalsLimit={2}
            value={service.price}
            inputMode="numeric"
            onValueChange={(value) =>
              setService((prev) => ({
                ...prev,
                price: parseInt(value ?? "0"),
              }))
            }
          />
          {errorMessage && (
            <div className="mx-auto w-max">
              <ErrorMessage message={errorMessage} />
            </div>
          )}
        </section>
      </ScrollArea>
    </>
  );
}

export default Price;
