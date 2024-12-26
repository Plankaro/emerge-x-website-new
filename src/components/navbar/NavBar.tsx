"use client";
import { navList } from "@/enums/Navbar/navbarlist";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import BookDemoButton from "../home/hero/BookDemoButton";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { MdOutlineClose } from "react-icons/md";

gsap.registerPlugin(ScrollToPlugin);

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const pathName = usePathname();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1, // Duration in seconds
      scrollTo: { y: id, offsetY: 0 }, // Scroll to the section ID
      ease: "power2.inOut", // Easing function for smoothness
    });
    setIsSidebarOpen(false);
    // Close sidebar when clicking a link
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navList.map((item) => ({
        id: item.link,
        element: document.querySelector(item.link),
      }));

      sections.forEach((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <div className="w-full px-4 lg:px-14 ">
      <div
        className={` w-full
        relative rounded-t-xl md:rounded-t-2xl bg-white shadow-md lg:rounded-t-full flex items-center justify-between  px-10 py-3 md:py-5 lg:py-4    gap-4 transition-all duration-300 ${isSidebarOpen
            ? " rounded-b-none   "
            : "rounded-b-xl  md:rounded-b-2xl lg:rounded-b-full "
          }`}
      >
        <Link href={"/"} className="w-[130px] md:w-[192px] h-auto ">
          <Image src={"/logo/main-logo.png"} alt="" width={200} height={70} />
        </Link>

        {pathName === "/" ? (
          <ul className=" sm:w-[70%] lg:w-[60%] max-w-[900px]  hidden md:flex items-center gap-1   justify-between ">
            {navList?.map((e, i) => {
              const active = activeSection == e.link;
              return (
                <li
                  key={i}
                  className={`hover:text-customGreen cursor-pointer text-sm lg:text-base ${active ? "text-customGreen" : "text-[#767676]"
                    }`}
                >
                  <div onClick={() => scrollToSection(e.link)}>{e.label}</div>
                </li>
              );
            })}
            <li>
              <BookDemoButton
                hideNavbar={false}
                rightArrow={false}
                className={`bg-customGreen text-white text-sm lg:text-base rounded-2xl md:py-[8px] sm:w-auto px-[4px]  md:w-[167px] text-md justify-center`}
              />
            </li>
          </ul>
        ) : (
          <ul className=" sm:w-[70%] lg:w-[60%] max-w-[900px]  hidden md:flex items-center  gap-1   justify-between ">
            {navList?.map((e, i) => {
              const active =
                e.page !== "/" &&
                (pathName === e.page || pathName.startsWith(`${e.page}/`));
              return (
                <li
                  key={i}
                  className={`hover:text-customGreen cursor-pointer text-sm lg:text-base ${active ? "text-customGreen" : "text-[#767676]"
                    }`}
                >
                  <button
                    onClick={() => {
                      router.push(e.page);
                    }}
                  >
                    {e.label}
                  </button>
                </li>
              );
            })}
            <li>
              <BookDemoButton
                hideNavbar={false}
                rightArrow={false}
                className={`bg-customGreen text-white text-sm lg:text-base rounded-2xl md:py-[8px] sm:w-auto px-[8px]  md:w-[167px] text-md justify-center`}
              />
            </li>
          </ul>
        )}

        <div
          className={`block md:hidden transition-all duration-300  ${isSidebarOpen ? " rotate-180" : " rotate-0"
            }`}
        >
          {isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-black text-[33px]"
            >
              <MdOutlineClose />
            </button>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className=" md:hidden text-black text-[33px]"
            >
              <GiHamburgerMenu />
            </button>
          )}
        </div>

        <div
          className={` absolute bg-white block md:hidden   w-full  ${isSidebarOpen
            ? "h-[300px] rounded-b-3xl  "
            : "   h-0 rounded-b-none"
            } overflow-hidden transition-all left-0 top-[50px] duration-300 `}
          style={{ zIndex: 3000 }}
        >
          {pathName === "/" ? (
            <ul className=" space-y-2 pt-5 ">
              {navList?.map((e, i) => {
                const isActive = activeSection === e.link;
                return (
                  <li
                    key={i}
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                    className=" text-base   px-5 py-1.5 border-b border-dashed pb-2"
                  >
                    {" "}
                    <div
                      onClick={() => scrollToSection(e.link)}
                      className={`flex items-center justify-center gap-[16px]   ${isActive ? "text-[#3DA229]" : "text-[#767676]"
                        }`}
                    >
                      {e.label}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className=" space-y-2 pt-5 ">
              {navList?.map((e, i) => {
                const isActive =
                  e.page !== "/" &&
                  (pathName === e.page || pathName.startsWith(`${e.page}/`));
                return (
                  <li
                    key={i}
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                    className=" text-base   px-5 py-1.5 border-b border-dashed pb-2"
                  >
                    <button
                      // href={e.page}
                      onClick={() => {
                        router.push(e.page);
                      }}
                      className={`flex items-center justify-center gap-[16px]    ${isActive ? "text-[#3DA229]" : "text-[#767676]"
                        }`}
                    >
                      {e.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
