import BreadCrumb from "@/components/reusable/BreadCrumb";

import SectionWrapper from "@/components/reusable/SectionWrapper";
import FrequentlyaskedQuestions from "@/components/services/FrequentlyaskedQuestions";

import { servicesData } from "@/components/services/services";
import SingleServiceSliderSection from "@/components/services/SingleServiceSliderSection";

import React from "react";

const page = () => {
  const navTrain = [
    { link: "/", label: "Home", id: "a1" },
    { link: "/", label: "Services", id: "a2" },
    { link: "/services", label: "View All", id: "a3" },
    {
      link: "/services/s1fe24w",
      label: "Mitigation/Prevention",
      id: "a3",
    },
  ];

  return (
    <div className=" min-h-screen">
      {/* <HeroResusable
        title={servicesData[0].title}
        description={servicesData[0].titledetails}
        image={servicesData[0]?.image ?? ""}
        className="bg-gradient-to-r from-black/5 to-black/90"
        textColor="white"
      /> */}

      <SectionWrapper>
        <BreadCrumb navTrainData={navTrain} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mt-8">
          <div className=" flex items-end">
            <div className="w-full  md:w-[50%]">
              <h2 className="text-2xl font-semibold mb-6 max-w-sm">
                What&apos;s New?
              </h2>
              <p className="text-sm  leading-[24px] font-[400]">
                {servicesData[0].whatsnew}
              </p>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className=" text-xl md:text-4xl  text-bold text-greyishblack">
              {servicesData[0].whatsnewContent}
            </p>
          </div>
        </div>
      </SectionWrapper>

      <div>
        <SectionWrapper>
          <SingleServiceSliderSection />
        </SectionWrapper>
      </div>

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mt-8 ">
          <div className=" flex ">
            <div className="w-full  md:w-[50%] ">
              <h2 className="text-2xl font-semibold mb-6 max-w-sm text-greyishblack">
                {servicesData[0].heading}
              </h2>
            </div>
          </div>
          <div className="prose max-w-none flex flex-col gap-8">
            <p className=" text-base md:text-lg  text-greyishblack">
              {servicesData[0].details2}
            </p>

            <div className="w-full border border-dashed border-black my-10"></div>
            <p className=" text-base md:text-lg leading-[32px] text-greyishblack">
              {servicesData[0].details3}
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* <SectionWrapper> */}
      {/* <ImageHoverEffect /> */}
      {/* </SectionWrapper> */}
      <SectionWrapper>
        <FrequentlyaskedQuestions
          faq={servicesData[0].faq}
          title={servicesData[0].faqtitle}
        />
      </SectionWrapper>
    </div>
  );
};

export default page;
