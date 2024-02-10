import { NavLink, createSearchParams, useSearchParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NavigationIcons from "@/constants/NavigationIcons";
import ServiceTypeComboBox from "./listings filter components/ServiceTypeComboBox";
import PriceRangeSlider from "./listings filter components/PriceRangeSlider";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function ListingsNavigation() {
  const [serviceType, setServiceType] = useState("");
  const [minPrice, setMinPrice] = useState([500]);
  const [maxPrice, setMaxPrice] = useState([500]);
  const search = useSearchParams();

  return (
    <>
      <div className="flex w-full items-start justify-between gap-8 px-8 pb-0 pt-8 max-md:w-full max-md:p-4">
        <Swiper
          fadeEffect={{
            crossFade: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            480: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className="max-md:text-xs"
        >
          {NavigationIcons().map((v, i) => (
            <SwiperSlide key={i}>
              <NavLink
                to={`${v.path}`}
                className="flex flex-col items-center justify-center gap-1 text-xs font-semibold text-gray-600 opacity-70"
              >
                {v.icon}
                {v.name}
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
        <Dialog
          onOpenChange={(open) => {
            if (!open) {
              setMinPrice([500]);
              setMaxPrice([500]);
              setServiceType("");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button variant={"outline"} className="gap-2 px-3 py-6 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-center">Filters</DialogTitle>
            </DialogHeader>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">Type of service</h2>
                <ServiceTypeComboBox
                  serviceType={serviceType}
                  setServiceType={setServiceType}
                />
              </div>
              <Separator />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">Price range</h2>
                  <p className="text-sm font-medium">Prices per service</p>
                </div>
                <PriceRangeSlider
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                />
              </div>
              <Separator />
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <Button
                onClick={() => {
                  setMinPrice([500]);
                  setMaxPrice([500]);
                  setServiceType("");
                  search[1]("");
                  setTimeout(() => document.location.reload(), 200);
                }}
                variant={"outline"}
                size={"lg"}
              >
                Clear all
              </Button>
              <Button
                disabled={minPrice[0] > maxPrice[0]}
                onClick={() => {
                  const searchParams = createSearchParams([
                    ["minPrice", minPrice.toString()],
                    ["maxPrice", maxPrice.toString()],
                    ["serviceType", serviceType],
                  ]);
                  search[1](searchParams.toString());
                  setTimeout(() => document.location.reload(), 200);
                }}
                className="bg-gray-950"
                size={"lg"}
              >
                Save filter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default ListingsNavigation;
