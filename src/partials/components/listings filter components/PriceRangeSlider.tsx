import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dispatch } from "react";
import CurrencyInput from "react-currency-input-field";

function PriceRangeSlider({
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
}: {
  maxPrice: number[];
  setMaxPrice: Dispatch<React.SetStateAction<number[]>>;
  minPrice: number[];
  setMinPrice: Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <Card className="p-6">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <Label htmlFor="minimum">Minimum</Label>
          <CurrencyInput
            id="minimum"
            value={
              minPrice[0] > 500000
                ? 500000
                : isNaN(minPrice[0])
                  ? 500
                  : minPrice[0]
            }
            prefix="₱"
            onValueChange={(value) => setMinPrice([parseInt(value!)])}
            allowNegativeValue={false}
            className="w-max rounded-md p-2 text-lg font-semibold"
            defaultValue={500}
          />
          <Slider
            defaultValue={[500]}
            value={minPrice}
            onValueChange={(value) => setMinPrice(value)}
            min={500}
            max={500000}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="maximum">Maximum</Label>
          <CurrencyInput
            id="maximum"
            value={
              maxPrice[0] > 500000
                ? 500000
                : isNaN(maxPrice[0])
                  ? 500
                  : maxPrice[0]
            }
            prefix="₱"
            onValueChange={(value) => setMaxPrice([parseInt(value!)])}
            allowNegativeValue={false}
            className="w-max rounded-md p-2 text-lg font-semibold"
            defaultValue={500}
          />
          <Slider
            defaultValue={[500]}
            value={maxPrice}
            onValueChange={(value) => setMaxPrice(value)}
            min={500}
            max={500000}
          />
        </div>
      </div>
      {minPrice[0] > maxPrice[0] && (
        <div className="mt-6">
          <p className="text-center text-sm font-bold text-red-600">
            Price ranges are overlapping
          </p>
        </div>
      )}
    </Card>
  );
}

export default PriceRangeSlider;
