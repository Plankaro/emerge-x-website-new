"use client";
import CardBlog from "@/components/blogs/CardBlog";

import BreadCrumb from "@/components/reusable/BreadCrumb";
import { HeroResusable } from "@/components/reusable/HeroReusable";
import { usePathname } from "next/navigation"; // Import usePathname hook
import SectionWrapper from "@/components/reusable/SectionWrapper";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetSingleBlogQuery } from "@/store/blogs";
interface BlogData {
  _id: string;
  title: string;
  htmlBody: string;
  description: string;
  bannerImage: string | null;
  futureImages: string | null;
}
const page = () => {
  const pathname = usePathname(); // Get the full pathname of the current URL
  const [slug, setSlug] = useState<string | null>(null);
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const blogsAllData = useSelector((state: RootState) => state.blog.blogsData);
  useEffect(() => {
    if (!pathname) return;

    const IdData = pathname?.split("/").pop();
    if (!IdData) return;
    setSlug(IdData);

    const AllData = blogsAllData?.blog?.filter((e: any) => e._id == IdData);
    console.log(AllData);
    setBlogData(AllData);
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

  const { data } = useGetSingleBlogQuery(slug ?? "");
  console.log("🚀 ~ page ~ data:", data);

  return (
    <div className=" min-h-screen">
      <HeroResusable
        title={data?.blog?.title ?? ""}
        description={data?.blog?.description ?? ""}
        image={data?.blog?.bannerImage ?? ""}
        className="bg-gradient-to-r from-black/0 to-black/90"
        textColor="white"
      />

      <SectionWrapper>
        <BreadCrumb navTrainData={navTrain} />
        <div className=" flex flex-col md:flex-row md:justify-between gap-5 mt-10 text-greyishblack">
          <div className=" w-full md:w-[58%] max-w-[611px] ">
            <p className="text-base md:text-[18px] leading-[32px]"  dangerouslySetInnerHTML={{ __html: data?.blog?.htmlBody ?? "" }}>
         
            </p>
          </div>
          <div className="w-full md:w-[45%] max-w-[516px] rounded-[20px]  overflow-hidden">
            <div className="rounded-[20px] overflow-hidden">
              <Image
                src={data?.blog?.futureImages ?? ""}
                alt="img-blog"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        {/* <h2 className=" text-center font-[600]  text-2xl">
                {data?.description}
              </h2> */}
        <div className=" flex justify-between gap-5 mt-20 text-base md:text-[18px] font-[400] leading-[30px] md:leading-[32px]">
          {/* <div className="w-full md:w-[48%]  ">
                  <p>{data?.details}</p>
                  <ul className="list-disc pt-4 pl-5">
                    <li>{data?.list1}</li>
                    <li>{data?.list2}</li>
                  </ul>
                </div> */}
          {/* <div
            className="hidden md:flex w-[48%] flex-col gap-8"
            dangerouslySetInnerHTML={{ __html: data?.blog?.htmlBody ?? "" }}
          ></div> */}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h2 className=" text-[32px] font-[600] text-center">
          You may also like
        </h2>
        <div className=" mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[0] md:gap-x-[20px] lg:gap-x-[34px] gap-y-[100px] ">
          {blogsAllData?.blog?.slice(0, 4).map((e: any, i: number) => (
            <CardBlog
              key={i}
              data={e}
              list={false}
              styleHeading="text-[14px] lg:text-[16px]"
              styleBox="aspect-square max-w-[270px]"
              styleCard="items-start max-w-[270px] mx-auto"
              imageStyle="rounded-[26px]"
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default page;
