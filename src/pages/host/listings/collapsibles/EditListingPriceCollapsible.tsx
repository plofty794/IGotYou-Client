import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { BASE_PRICE, PRICE_CAP } from "@/constants/price";
import { useEffect, useState } from "react";
import CurrencyInput, { formatValue } from "react-currency-input-field";

function EditListingPriceCollapsible({ price }: { price: number }) {
  const [editListingPricePressed, setEditListingPricePressed] = useState(false);
  const [listingPrice, setListingPrice] = useState<number>(price);

  useEffect(() => {
    if (!editListingPricePressed) {
      setListingPrice(0);
    }
  }, [editListingPricePressed]);

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex w-2/5 flex-col gap-2">
          {editListingPricePressed ? (
            <>
              <Label className="text-base font-semibold">Edit price</Label>
              <div className="flex items-end gap-2">
                <CurrencyInput
                  autoFocus
                  className="w-1/3 rounded border-none text-base font-semibold focus:outline-none"
                  prefix="₱"
                  allowNegativeValue={false}
                  decimalsLimit={2}
                  value={listingPrice}
                  inputMode="numeric"
                  onValueChange={(value) =>
                    setListingPrice(parseInt(value ?? "0"))
                  }
                />
                <Badge>
                  {listingPrice > PRICE_CAP
                    ? `Price can't exceed ${formatValue({
                        value: PRICE_CAP.toString(),
                        intlConfig: { locale: "ph", currency: "php" },
                      })}`
                    : listingPrice < BASE_PRICE
                      ? `Price can't be less than ${formatValue({
                          value: BASE_PRICE.toString(),
                          intlConfig: { locale: "ph", currency: "php" },
                        })}`
                      : "Set price"}
                </Badge>
              </div>
              <Button
                disabled={
                  !listingPrice ||
                  listingPrice < BASE_PRICE ||
                  listingPrice > PRICE_CAP
                }
                className="w-max rounded-full bg-gray-950"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold">Listing price</h3>
              <p className="text-sm font-semibold text-gray-600">
                {formatValue({
                  value: price.toString(),
                  intlConfig: {
                    locale: "ph",
                    currency: "php",
                  },
                })}
              </p>
            </>
          )}
        </div>
        <Toggle
          onPressedChange={(v) => setEditListingPricePressed(v)}
          className="flex items-center justify-center gap-2 rounded-full p-4"
        >
          <p className="text-base font-bold underline"> Edit</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Toggle>
      </div>
    </>
  );
}

export default EditListingPriceCollapsible;
