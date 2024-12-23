"use client";

import Image from "next/image";
import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import CardBlog from "@/components/blogs/CardBlog";
import { BlogData } from "@/store/blogs/types/blog.types";
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface BlogDataTypes {
  data?: BlogData;
}

const LetestBlogs: React.FC<BlogDataTypes> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".blog-card", { opacity: 0, y: 50, scale: 0.9 }); // Initial state (hidden, scaled down)

      ScrollTrigger.create({
        trigger: "#container", // The parent container for the cards
        start: "top 80%",
        end: "bottom 20%",
        markers: false,
        onEnter: () => {
          gsap.to(".blog-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2, // Each card animates 0.2s apart
            duration: 0.8,
            ease: "power1.out",
          });
          gsap.to("#sectionHeading", {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(".blog-card", {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.5,
            ease: "power1.in",
          });
          gsap.to("#sectionHeading", {
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="relative overflow-visible  h-auto p-9  " id="container">
        <span id={"blogs"} className="mt-[-160px] pb-[130px] block">
          &nbsp;
        </span>
        <div
          id="latest-blogs-section"
          className="absolute top-[30%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 aspect-square bg-white rounded-full -z-10"
        />

        <div className="flex justify-center" id="card-container">
          <div className="bg-transparent">
            <div>
              <h2
                id="sectionHeading"
                className="pb-8 md:opacity-0 text-black text-3xl font-bold text-center translate-y-[50px] transition-all duration-300 ease-in-out"
              >
                Latest Blogs
              </h2>

              <div className="mt-8 md:mt-14 lg:mt-16 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                  {data?.blog?.slice(0, 6).map((e: any, i: number) => (
                    <div
                      key={e._id}
                      className="blog-card lg:opacity-0 lg:scale-50 w-full"
                      id="blogCard"
                    >
                      <CardBlog
                        data={e}
                        key={i}
                        list={false}
                        styleHeading="text-[14px] font-[400] md:font-semibold lg:text-base"
                        styleBox="aspect-square max-w-[100%]"
                        curveIconStyle="w-[60%]"
                        dateButtonStyle="w-[45%] left-2 h-[15%] text-[15px]"
                        imageStyle="rounded-[26px]"
                      />
                    
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Link href={"/blogs"}>
                  <button className="px-[20px] py-[8px] text-base bg-[#222720] text-white rounded-full  mt-20   ">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default LetestBlogs;
