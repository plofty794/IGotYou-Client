import { NavLink, Outlet } from "react-router-dom";

function HeroLayout() {
  return (
    <>
      <main className="min-h-screen">
        <nav className="text-slate-950 flex justify-between items-center px-12 py-6 shadow">
          <div className="-tracking-wide font-bold text-xl flex items-center justify-center gap-2 pointer-events-none">
            <span>
              <img
                className="w-[30px] h-[30px]"
                loading="lazy"
                src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                alt="logo"
              />
            </span>
          </div>
          <ul className="font-semibold text-xs flex justify-center items-center gap-8">
            <NavLink className="hover:text-[#A259FF]" to={"/about-us"}>
              About us
            </NavLink>
            <NavLink
              className="bg-[#A259FF] hover:bg-[#9d54fc] text-white rounded-md px-3 py-2"
              to={"/contact-us"}
            >
              Contact us
            </NavLink>
          </ul>
        </nav>
        <section className="my-5">{<Outlet />}</section>
      </main>
    </>
  );
}

export default HeroLayout;
