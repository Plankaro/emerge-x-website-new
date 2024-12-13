"use client";
import CardBlog from "@/components/blogs/CardBlog";
import HeroBlog from "@/components/blogs/HeroBlog";
import BreadCrumb from "@/components/reusable/BreadCrumb";
import { HeroResusable } from "@/components/reusable/HeroReusable";
import { usePathname } from "next/navigation"; // Import usePathname hook
import SectionWrapper from "@/components/reusable/SectionWrapper";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { blogs } from "@/components/blogs/blogData";

const page = () => {
  const pathname = usePathname(); // Get the full pathname of the current URL
  const [slug, setSlug] = useState<string | null>(null);
  const [blogData, setBlogData] = useState<[]>([]);
  useEffect(() => {
    console.log(pathname)
    const IdData = pathname?.split("/").pop()
    const AllData = blogs.filter((e) => e.id == IdData)
    setBlogData(AllData)
  }, [pathname]);
  const navTrain = [
    { link: "/", label: "Home", id: "a1" },
    { link: "/", label: "Blogs", id: "a2" },
    { link: "/blogs", label: "View All", id: "a3" },
    {
      link: "/blogs/blog1fe24w",
      label: "Safety Management System",
      id: "a3",
    },
  ];
  const youMayLikeData = [0, 1, 2, 3];
  return (
    <div className=" min-h-screen">
      {
        blogData?.map((data) => {
          return (
            <>
              <HeroResusable
                title={data?.title}
                description={data?.slug}
                image="/blogs/hero-blog-details.png"
                className="bg-gradient-to-r from-black/0 to-black/90"
                textColor="white"
              />

              <SectionWrapper>
                <BreadCrumb navTrainData={navTrain} />
                <div className=" flex flex-col md:flex-row md:justify-between gap-5 mt-10 text-greyishblack">
                  <div className=" w-full md:w-[58%] max-w-[611px] ">
                    <p className="text-base md:text-[18px] leading-[32px]">
                      {data?.content}
                    </p>
                  </div>
                  <div className="w-full md:w-[45%] max-w-[516px]">
                    <div>
                      <Image
                        src={"/image-blogs-details.png"}
                        alt="img"
                        width={600}
                        height={500}
                      />
                    </div>
                  </div>
                </div>
              </SectionWrapper>
              <SectionWrapper>
                <h2 className=" text-center font-[600]  text-2xl">
                 {data?.heading}
                </h2>
                <div className=" flex justify-between gap-5 mt-20 text-base md:text-[18px] font-[400] leading-[30px] md:leading-[32px]">
                  <div className="w-full md:w-[48%]  ">
                    <p>
                     {data?.details}
                    </p>
                    <ul className="list-disc pt-4 pl-5">
                      <li>
                      {data?.list1}

                      </li>
                      <li>
                      {data?.list2}
                      </li>
                    
                    </ul>
                  </div>
                  <div className=" hidden md:flex  w-[48%]   flex-col gap-8">
                    <p>
                  {data?.details2}
                    </p>
                    <div className=" border border-dashed border-black"></div>
                    <p className="pt-4">
                    {data?.details3}
                    </p>
                  </div>
                </div>
              </SectionWrapper>

              <SectionWrapper>
                <h2 className=" text-[32px] font-[600] text-center">
                  You may also like
                </h2>
                <div className=" mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0] md:gap-x-[20px] lg:gap-x-[34px] gap-y-[100px] ">
                  {blogs?.slice(0,4).map((e, i) => (
                    <CardBlog
                      key={i}
                      data={e}
                      list={false}
                      styleHeading="text-[14px] lg:text-[16px]"
                      styleBox="aspect-square max-w-[270px]"
                      styleCard="items-start max-w-[270px] mx-auto"
                    />
                  ))}
                </div>
              </SectionWrapper>
            </>
          )
        })
      }
    </div>
  );
};

export default page;
