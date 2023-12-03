import { NavLink } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NavigationIcons from "@/constants/NavigationIcons";

function ListingsNavigation() {
  return (
    <>
      <div className="flex items-start justify-between w-full gap-8 px-8 pt-8 pb-0 max-md:w-full max-md:p-4">
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
                className="flex flex-col items-center justify-center gap-1 opacity-70 text-xs font-semibold text-gray-600"
              >
                {v.icon}
                {v.name}
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"secondary"}
              className="max-sm:hidden p-5 border flex items-center justify-center gap-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent>hello</DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default ListingsNavigation;
