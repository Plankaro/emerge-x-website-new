import React from "react";

import BookDemoButton from "./BookDemoButton";
import { MotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { motion } from "framer-motion";
// import { introImage } from "@/assets/news";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

const Hero = ({ scrollYProgress }: HeroProps) => {
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const scaleValue = useMotionTemplate`scale(${scale})`;

  return (
    <motion.div className=" sticky top-0 h-screen overflow-hidden  ">
      <div className="">
        <img
          src={"/assets/news/intro.png"}
          alt="Hero desktop"
          className="w-full  hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover z-[-1]"
        />
        <div className="bg-gradient-to-r from-black/80 to-transparent w-full h-full absolute top-0 left-0 z-1" />

        <img
          src={"/assets/news/intro.png"}
          alt="Hero mobile"
          className="w-full md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover z-[-1]"
        />
      </div>

      <div className=" absolute left-0 bottom-8 sm:bottom-0 w-full">
        <div className="  p-12 pb-10 w-full  ">
          <div>
            <motion.h2
              style={{ transform: scaleValue }}
              className="text-[38px] md:text-[58px] font-[700] text-white leading-[60px] md:leading-[70px] whitespace-nowrap"
            >
              Reliable
              <br />
              <span className="text-customGreen">Emergency management </span>
            </motion.h2>

            {/* <motion.h2 style={{ transform: scaleValue }} className="text-[38px] md:text-[70px] font-[700] text-customGreen">
              50 modules
            </motion.h2> */}
          </div>
          <div className=" flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
            <motion.p
              style={{ transform: scaleValue }}
              className=" text-white text-xl md:text-[28px]"
            >
              Solutions
            </motion.p>{" "}
          </div>
          <div className="  flex items-center justify-center mt-16 mb-10 ">
            <BookDemoButton
              hideNavbar={true}
              rightArrow={true}
              className="text-lg md:text-2xl pl-[40px] gap-4 z-50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
