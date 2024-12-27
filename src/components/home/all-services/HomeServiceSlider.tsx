"use client";
import React, { useEffect, useRef, useState } from "react";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Virtual, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/virtual";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { servicesData } from "@/components/services/services";
import Link from "next/link";

const HomeServiceSlider: React.FC = ({}) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      const updateIndex = () => setActiveIndex(swiperInstance.activeIndex);

      swiperInstance.on("slideChange", updateIndex);
      updateIndex(); // Set initial active index

      return () => {
        swiperInstance.off("slideChange", updateIndex);
      };
    }
  }, []);



  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePreview = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div
      className={` bg-greyishblack text-white container     pb-10   rounded-t-[40px] md:rounded-t-[90px] lg:rounded-t-[110px] `}
    >
      <div className=" w-full flex flex-col md:flex-row md:justify-between gap-5 md:pl-[50px] ">
        <div className="w-full  md:w-[38%] flex flex-col justify-between  gap-5 px-4 md:px-0 ">
          <div className=" w-full ">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-3xl w-full  font-[400] text-left"
              >
                {servicesData?.[activeIndex]?.title}
              </motion.p>
            </AnimatePresence>

            <div className={cn(" mt-4")}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-sm  leading-[24px] font-[400]"
                >
                  {/* EmergeX will assist you to better understand and manage workplace
              safety by integrating hazards and incident reporting with
              investigations, actions and metrics reporting. */}
                  {servicesData?.[activeIndex]?.titledetails}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex self-start items-start justify-start ">
            <Link
              href={`/services/${servicesData?.[activeIndex]?.id}`}
              className="px-[20px] py-[8px] text-[16px] sm:text-base bg-[#3DA229] rounded-full text-white hover:bg-[#3DA229] transition-all duration-300 ease-in-out"
            >
              Explore Now
            </Link>
          </div>
        </div>
        <div className=" w-full md:w-[60%] ">
          <SwiperComponent
            ref={swiperRef}
            modules={[Virtual]}
            breakpoints={{
              240: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
            virtual
            style={{ position: "relative" }}
          >
            {servicesData?.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="w-full ">
                  <div className="w-full px-4">
                    <Image
                      src={item.image}
                      alt="slideimg"
                      width={800}
                      height={400}
                      className="rounded-[16px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <div className=" hidden md:block w-0 md:w-[32%]"></div>
        <div className="flex items-center justify-center md:justify-start gap-4 mt-5 w-full md:w-[56.5%]">
          {servicesData && servicesData.length > 0 && (
            <>
              <button
                onClick={slidePreview}
                disabled={activeIndex === 0}
                className=" w-10 h-10 z-20 rounded-full disabled:grayscale disabled:opacity-50  hover:bg-customGreen/70  bg-customGreen border text-white flex items-center justify-center"
              >
                <FaArrowLeftLong />
              </button>
              <div>
                {activeIndex + 1} /{servicesData.length}
              </div>
              <button
                disabled={activeIndex === servicesData.length - 1}
                onClick={slideNext}
                className=" w-10 h-10 z-20  disabled:grayscale disabled:opacity-50  hover:bg-customGreen/70  bg-customGreen  rounded-full border text-white flex items-center justify-center"
              >
                <FaArrowRightLong />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeServiceSlider;
