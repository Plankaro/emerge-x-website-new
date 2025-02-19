
"use client";
import { inView, MotionValue, useInView } from "framer-motion";


import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/reusable/SectionHeading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);


import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const sliderData = [
  {
    image: "/services/Prevention.jpg",
    text: "Mitigation/ Prevention",
    id:"1"
  },
  {
    image: "/services/Preparedness.jpg",
    text: "Preparedness",
    id:"2"
  },
  {
    image: "/services/Response.jpg",
    text: "Response",
    id:"3"
  },
  {
    image: "/services/Recovery.jpg",
    text: "Recovery",
    id:"4"
  },
];

interface Props {
  scrollYProgress?: MotionValue<number>
}


const AllServices = ({ }: Props) => {


  const targetRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(270);
  const [isAnimating, setIsAnimating] = useState(false);



  const isInView = useInView(containerRef, {
    amount: "all",
  });



  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = (e: WheelEvent) => {
      // Prevent default scrolling only when the slider is active
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      // Check if we are at the start or end of the slider
      const isAtStart = activeIndex === 0 && direction === -1;
      const isAtEnd = activeIndex === sliderData.length - 1 && direction === 1;

      if (isAtStart || isAtEnd) {
        // Allow scrolling outside the slider if at the bounds
        return;
      }

      // Prevent scrolling and update the slide
      e.preventDefault();
      updateSlide(direction);
    };

    const updateSlide = (direction: number) => {
      const nextIndex = Math.max(0, Math.min(sliderData.length - 1, activeIndex + direction));
      if (nextIndex === activeIndex) return;

      setIsAnimating(true);
      setActiveIndex(nextIndex);

      gsap.to(slideRef.current, {
        x: -(nextIndex * cardWidth),
        duration: 1,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      });
    };

    // Attach and detach the event listener based on whether the slider is in view
    if (isInView) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", handleScroll);
    }

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [activeIndex, isAnimating, isInView]);



  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default scrolling if animation is active
      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const deltaY = e.touches[0].clientY - startY;

      if (Math.abs(deltaY) > 20) {
        // Determine direction of swipe
        const direction = deltaY < 0 ? 1 : -1;

        // Check bounds
        const isAtStart = activeIndex === 0 && direction === -1;
        const isAtEnd = activeIndex === sliderData.length - 1 && direction === 1;

        if (!isAtStart && !isAtEnd) {
          e.preventDefault();
          updateSlide(direction);
        }

        startY = e.touches[0].clientY; // Reset startY for smoother swipes
      }
    };

    const updateSlide = (direction: number) => {
      const nextIndex = Math.max(0, Math.min(sliderData.length - 1, activeIndex + direction));
      if (nextIndex === activeIndex) return;

      setIsAnimating(true);
      setActiveIndex(nextIndex);

      gsap.to(slideRef.current, {
        x: -(nextIndex * cardWidth),
        duration: 1,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      });
    };

    if (isInView) {
      // Attach touch event listeners
      slider.addEventListener("touchstart", handleTouchStart);
      slider.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex, isAnimating, isInView, cardWidth]);


  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth); // Dynamically calculate card width
    }
  }, [cardRef.current]);

  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(activeIndex);
    }
  }, [activeIndex])



  return (
    <div className="bg-white  relative z-30" id="services">
      <section className=" relative  h-[200vh] " ref={targetRef}>
        <motion.div
          ref={containerRef}
          className={cn(`sticky  top-[2.5vh] transform  bg-cover bg-center md:mx-8 rounded-0 md:rounded-[56px] overflow-hidden h-[90vh] sm:h-[95vh]`,
          )}
        >
          {/* Image Transition */}
          <div className="w-full h-full absolute top-0 left-0">
            {/* Current Image */}
            <motion.img
              key={activeIndex} // Trigger animation every time activeIndex changes
              src={sliderData[activeIndex]?.image}
              alt={sliderData[activeIndex]?.text}
              className="w-full h-full object-cover object-center absolute top-0 left-0"
              initial={{
                opacity: 0, // Start invisible
                filter: "blur(10px)", // Start with blur
              }}
              animate={{
                opacity: 1, // Fade in
                filter: "blur(0px)", // Remove blur
              }}
              exit={{
                opacity: 0, // Fade out
                filter: "blur(10px)", // Apply blur
              }}
              transition={{
                duration: 0.6, // Duration of the image fade
                ease: "easeOut", // Smooth easing
              }}
            />
          </div>

          <div className="w-full h-full bg-gray-800 bg-opacity-70 absolute top-0 right-0">
            <div className="w-full ">
              <SectionHeading text="All Services" className="text-white mt-10" />
              <div className="w-full h-full inset-0 flex md:items-end md:py-10 gap-20 md:gap-5 flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-[48%] flex items-center justify-center gap-4 md:pb-10  absolute top-[30%] sm:top-[30%] md:top-1/2 left-[50%] md:left-[22%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-[75%] flex flex-col gap-4 md:gap-12">
                    <div className="w-full">
                      <div className="w-full md:p-2">
                        <div className="md:py-3 w-full  ">
                          <AnimatePresence mode="wait">
                            <motion.p
                              className="text-xl md:text-5xl lg:text-[60px] text-white md:mt-10 whitespace-nowrap"
                              style={{ lineHeight: "70px" }}
                              key={`current-placeholder-${activeIndex}`}
                              initial={{
                                opacity: 0,
                                y: 50, // Start above the normal position
                              }}
                              animate={{
                                opacity: 1,
                                y: 0, // Move to the normal position
                              }}
                              exit={{
                                opacity: 0,
                                y: -50, // Exit to above the normal position
                              }}
                              transition={{
                                duration: 0.5, // Control the speed of the animation
                                ease: "easeOut", // Smooth easing
                              }}
                            >
                              {sliderData[activeIndex]?.text}
                            </motion.p>
                          </AnimatePresence>

                          <p className="text-xs md:text-lg lg:text-xl text-white md:mt-10">
                            EmergeX will assist you to better understand and manage
                            workplace safety by integrating hazards and incident
                            reporting with investigations, actions, and metrics
                            reporting.
                          </p>
                          <Link href={`/services/${sliderData[activeIndex]?.id}`}>
                            <button className=" mt-12 bg-customGreen px-4 py-1.5 md:px-6 md:py-2 text-white w-fit rounded-[60px] text-base md:text-2xl">
                              Explore Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="w-full  md:w-[50%] overflow-visible  md:pl-20 pb-6 absolute bottom-0 -right-[25%] sm:-right-[12%]  md:right-[12%]  lg:right-0   " ref={sliderRef}>
                  <motion.div
                    ref={slideRef}
                    className="w-full flex max-md:-mt-24 md:mt-32 items-end mx-auto gap-6"
                  >
                    {sliderData.map((card, index) => (
                      <ServiceCard
                        key={index}
                        image={card.image}
                        text={card.text}
                        isActive={activeIndex === index}
                        isLastIndex={index === sliderData.length - 1}
                        index={index}
                        activeIndex={activeIndex}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};


const ServiceCard = React.forwardRef<HTMLDivElement, { image: string; text: string; isActive: boolean; isLastIndex: boolean; index: number; activeIndex: number }>(
  ({ image, text, isActive, isLastIndex, index, activeIndex }, ref) => (
    <AnimatePresence>
      <motion.div
        className=" h-[420px] flex items-end"
        ref={ref}
        initial={{
          scale: 1,
          translateY: 0,
          padding: "0 0",
        }}
        animate={{
          scale: isActive ? 1.2 : 1,
          translateY: isActive ? -30 : 0,
          padding: isActive ? "0 20px" : "0 10px",
          opacity: index < activeIndex ? 0 : 1,  // Set opacity to 0 if index is less than activeIndex
        }}
        exit={{
          scale: 1,
          translateY: 0,
          padding: "0 10px",
          opacity: 0,  // Ensure exit transition has opacity 0
        }}
        transition={{
          duration: 0.6,
          ease: "easeIn",
        }}
      >
        <div className="rounded-2xl overflow-hidden  w-[200px] sm:w-[240px] lg:h-[300px] h-[220px] relative">
          <Image
            src={image}
            alt={text}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

      </motion.div>
    </AnimatePresence>

  )
);


ServiceCard.displayName = "ServiceCard";

export default AllServices;
