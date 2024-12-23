"use client";
import React, { useEffect, useRef, useState } from "react";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/virtual";

import Image from "next/image";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import { AnimatePresence, motion } from "framer-motion";
import { servicesData } from "./services";
import { cn } from "@/lib/utils";

interface Props {
  subHeading?: string;
  numericId?: number;
  page?: string;
}

const SingleServiceSliderSection: React.FC<Props> = ({
  subHeading,
  numericId,
  page,
}) => {
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

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

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

  const serviceData = servicesData.find(
    (e) => e.id === numericId
  )?.subServiceDatas;

  return (
    <div
      className={` bg-greyishblack text-white  ${
        page !== "home" ? "p-[40px] md:p-[80px]" : "p-24"
      }  pb-10   rounded-t-[25px] md:rounded-t-[90px] lg:rounded-t-[100px] `}
    >
      <div className="flex flex-col md:flex-row gap-10 justify-between">
        <div className=" w-full md:w-[48%]  flex flex-col gap-10 justify-between ">
          <div className="w-full  ">
            <p className=" text-xl  md:text-[28px] md:leading-[38px] lg:text-[36px] lg:leading-[43px] ">
              {subHeading}
            </p>
          </div>
          <div
            className={cn(
              " md:px-0 ",
              page !== "home" && " w-full md:w-[70%] mt-7 md:mt-0   "
            )}
          >
            <h2 className=" text-2xl  mb-6 max-w-sm">What&apos;s New?</h2>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-sm  leading-[24px] font-[400]"
              >
                {serviceData?.[activeIndex]?.content}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* right Side  */}
        <div className=" w-full  md:w-[56%]  flex flex-col items-end">
          {page !== "home" && (
            <div className=" w-full  ">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-2xl w-full  font-[400] text-left md:text-right  "
                >
                  {serviceData?.[activeIndex]?.heading}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          <div className=" w-full flex flex-col  items-end gap-5 mt-[50px] ">
            {page === "home" && (
              <div className="w-full">
                <div className=" ">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-3xl w-full  font-[400] text-left"
                    >
                      {serviceData?.[activeIndex]?.heading}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className="w-full   ">
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
                style={{ position: "relative", borderRadius: "16px" }}
              >
                {serviceData?.map((item, i) => (
                  <SwiperSlide key={i} className="rounded-[16px]">
                    <div className="w-full  ">
                      <Image
                        src={item.image}
                        alt="slideimg"
                        width={800}
                        height={500}
                        className="rounded-[16px]  object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </SwiperComponent>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center ">
        <div className="flex items-center gap-4 mt-5 ">
          {serviceData && serviceData.length > 0 && (
            <>
              <button
                onClick={slidePreview}
                disabled={activeIndex === 0}
                className=" w-10 h-10 rounded-full disabled:grayscale disabled:opacity-50  hover:bg-customGreen/70  bg-customGreen border text-white flex items-center justify-center"
              >
                <FaArrowLeftLong />
              </button>
              <div>
                {activeIndex + 1} /{serviceData.length}
              </div>
              <button
                disabled={activeIndex === serviceData.length - 1}
                onClick={slideNext}
                className=" w-10 h-10  disabled:grayscale disabled:opacity-50  hover:bg-customGreen/70  bg-customGreen  rounded-full border text-white flex items-center justify-center"
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

export default SingleServiceSliderSection;
