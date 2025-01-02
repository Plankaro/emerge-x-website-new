"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { NewsItem } from "@/store/news/types/news.types";
import { useRouter } from "next/navigation";

interface SliderWithMotionProps {
  newdData: NewsItem[];
}

const SliderWithMotion = ({ newdData }: SliderWithMotionProps) => {

  const [positionIdex, setPositionIndex] = useState([0, 1, 2, 3, 4]);
  const [isPaused, setIsPaused] = useState(false);
  const [imgWidth, setImgWidth] = useState("");
  const handleNext = () => {
    setPositionIndex((prev) => {
      return prev.map((pre) => (pre + 1) % 5);
    });
  };

  const handlePrev = () => {
    setPositionIndex((prev) => {
      return prev.map((pre) => (pre - 1 + 5) % 5);
    });
  };

  const position = ["center", "left1", "left", "right", "right1"];

  const imageVariant = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 2 },
    left: { x: "-90%", scale: 0.5, zIndex: 1 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 2 },
  };

  const router = useRouter();

  const handleImageClick = (clickedIndex: number) => {
    console.log(clickedIndex);
    router.push(`/news/${newdData[clickedIndex]._id}`);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setTimeout(() => {
      handleNext();
    }, 2000);

    return () => clearTimeout(interval);
  }, [positionIdex, isPaused]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 768) {
        setImgWidth("40%");
      } else if (window.innerWidth >= 400) {
        setImgWidth("60%");
      } else {
        setImgWidth("60%");
      }
    };

    updateSlidesPerView(); // Set initially
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  const centerIndex = positionIdex.findIndex(
    (pos) => position[pos] === "center"
  );

  return (
    <>
      <div
        {...swipeHandlers}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full flex items-center flex-col justify-center  h-[250px] sm:h-[500px] lg:h-[500px] overflow-hidden relative"
      >
        {newdData?.map((e, index) => (
          <motion.img
            key={index}
            src={e.heroBanner}
            alt={"slide"}
            className="rounded-[12px] cursor-pointer"
            initial="center"
            animate={position[positionIdex[index]]}
            variants={imageVariant}
            transition={{ duration: 0.5 }}
            style={{
              width: imgWidth,
              position: "absolute",
            }}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={centerIndex}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, y: 50 }}
          className="text-center md:text-[26px] text-[20px] mt-10"
        >
          {newdData?.[centerIndex]?.heading}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SliderWithMotion;
