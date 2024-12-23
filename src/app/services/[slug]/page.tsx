"use client";
import BreadCrumb from "@/components/reusable/BreadCrumb";
import { HeroResusable } from "@/components/reusable/HeroReusable";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import FrequentlyaskedQuestions from "@/components/services/FrequentlyaskedQuestions";
import ImageHoverEffect from "@/components/services/ImageHoverEffect";
import { servicesData } from "@/components/services/services";
import SingleServiceSliderSection from "@/components/services/SingleServiceSliderSection";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
export interface Faq {
  question: string;
  answer: string;
}
export interface footerImagesArra {
  id: number;
  image: string;
}
export interface PreparednessData {
  id: number;
  title: string;
  titledetails: string;
  image: string;
  whatsnew: string;
  whatsnewContent: string;
  heading: string;
  details2: string;
  details3: string;
  faqtitle: string;
  subHeading: string;
  details: string;
  faq: Faq[];
  footerImages: footerImagesArra[];
}
const page = () => {
  const pathname = usePathname(); // Get the full pathname of the current URL
  const [id, setId] = useState<number | null>(null);
  const [allData, setAllData] = useState<PreparednessData[]>([]);

  useEffect(() => {
    if (!pathname) return;

    const IdData = pathname?.split("/").pop();
    if (!IdData) return;

    const numericId = parseInt(IdData, 10); // Convert to a number
    setId(numericId);
    if (isNaN(numericId)) return; // Ensure valid number

    const AllData = servicesData.filter((e) => e.id === numericId); // Compare as numbers
    setAllData(AllData as any);
  }, [pathname]);

  const navTrain = [
    { link: "/", label: "Home", id: "a1" },
    { link: "/", label: "Services", id: "a2" },

    {
      link: `/services/${id}`,
      label: allData[0]?.title,
      id: "a3",
    },
  ];

  return (
    <div className=" min-h-screen">
      {allData?.map((data) => {
        return (
          <>
            <HeroResusable
              title={data?.title}
              description={data?.titledetails}
              image={data?.image}
              className="bg-gradient-to-r from-black/5 to-black/60"
              textColor="white"
            />

            <SectionWrapper>
              <BreadCrumb navTrainData={navTrain} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mt-8 ">
                <div className=" flex items-end">
                  <div className="w-full  md:w-[50%]">
                    <h2 className="text-2xl font-semibold mb-6 max-w-sm">
                      What&apos;s New?
                    </h2>
                    <p className="text-sm  leading-[24px] font-[400]">
                      {data?.whatsnew}
                    </p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className=" text-xl md:text-3xl lg:text-4xl  text-bold text-greyishblack">
                    {data?.whatsnewContent}
                  </p>
                </div>
              </div>
            </SectionWrapper>

            <SectionWrapper className="w-full">
              <SingleServiceSliderSection
                subHeading={data?.subHeading}
                numericId={id ?? 0}
              />
            </SectionWrapper>

            <SectionWrapper>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mt-8 ">
                <div className=" flex ">
                  <div className="w-full  md:w-[50%] ">
                    <h2 className="text-2xl font-semibold mb-6 max-w-sm text-greyishblack">
                      {data?.heading}
                    </h2>
                  </div>
                </div>
                <div className="prose max-w-none flex flex-col gap-8">
                  <p className=" text-base md:text-lg  text-greyishblack">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.details,
                      }}
                    />
                  </p>
                </div>
              </div>
            </SectionWrapper>

            <SectionWrapper className="w-full">
              <ImageHoverEffect imageData={data?.footerImages} />
            </SectionWrapper>
            <SectionWrapper>
              <FrequentlyaskedQuestions
                faq={data?.faq}
                title={data?.faqtitle}
              />
            </SectionWrapper>
          </>
        );
      })}
    </div>
  );
};

export default page;
