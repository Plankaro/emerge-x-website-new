import React from "react";
import SectionWrapper from "../reusable/SectionWrapper";
import Image from "next/image";
import Link from "next/link";
import { navList } from "@/enums/Navbar/navbarlist";
import FooterSubscribeForm from "./FooterSubscribeForm";

const Footer = () => {
  return (
    <footer className="py-20 bg-white">
      <SectionWrapper className="mt-20 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-14 px-4 text-black">
          {" "}
          {/* Set text color to black for all content inside this container */}
          <div className="space-y-5">
            <div className="w-[172px] h-auto">
              <Image
                src={"/logo/main-logo.png"}
                alt=""
                width={200}
                height={70}
              />
            </div>

            <p className="font-[400] text-base">
              EmergeX will assist you to better understand and manage workplace
              safety by integrating hazards and incident reporting with
              investigations, actions, and metrics reporting.
            </p>
            {/* <div className="space-y-4">
              <strong>Subscribe Us</strong>
              <div className="flex items-center gap-3">
                <div className="bg-black rounded-full p-3"></div>
                <div className="bg-black rounded-full p-3"></div>
                <div className="bg-black rounded-full p-3"></div>
              </div>
            </div> */}
          </div>
          <div className="flex justify-start lg:justify-center">
            <div>
              {/* <h2 className="font-semibold text-base mb-5">Useful links</h2> */}
              <ul className="space-y-4">
                {navList?.map((e, i) => (
                  <li key={i} className="hover:text-customGreen text-base">
                    <Link href={e.link}>{e.label}</Link>
                  </li>
                ))}
                <div>
                  <Link href={"/contact-us"}>contact us</Link>
                </div>
              </ul>
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="font-semibold text-base text-start mb-5">
              Subscribe for our newsletter
            </h2>
            <FooterSubscribeForm />
            <div className="flex flex-col md:flex-row gap-8 lg:justify-between mt-8">
              <div className="text-[16px]">
                <p className="font-semibold">Phone</p>
                <p>+971 55 544 0210</p>
              </div>
              <div className="text-[16px]">
                <p className="font-semibold">Email</p>
                <p>info@emerge-x.com</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
};

export default Footer;
