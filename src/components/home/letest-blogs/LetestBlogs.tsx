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
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { Play } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button";

// Slide animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%", // Use percentage instead of viewport width
    opacity: 0,
  }),
  center: { zIndex: 1, x: 0, opacity: 1 }, // Center of the screen
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%", // Use percentage instead of viewport width
    opacity: 0,
  }),
}

interface BlogDataTypes {
  data?: BlogData
}

const LetestBlogs: React.FC<BlogDataTypes> = ({ data }) => {

  console.log('sffdsdsf', data?.blog)

  const swiperRef = useRef<any>(null)
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false) // State to track mobile devices

  // Detect screen size and set isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
    }
    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Modified to only trigger when 75% of the component is in view (for non-mobile screens)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: isMobile ? 0 : 0.75, // Disable 75% logic for mobile
  })

  const [[page, direction], setPage] = useState([0, 0])
  const [animationKey, setAnimationKey] = useState(0) // Change this to re-trigger animations

  useEffect(() => {
    if (isInView) {
      setAnimationKey((prev) => prev + 1) // Re-trigger animation when 75% of the section is in view
    }
  }, [isInView])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }


  return (
    <section ref={sectionRef} className="py-8 md:py-12 px-4 overflow-x-hidden"> {/* Add overflow-x-hidden */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-950 via-green-900 to-black opacity-30 z-0" />

      <div className="max-w-7xl mx-auto">
        {/* Heading & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <motion.div
            key={`heading-${animationKey}`}
            initial={{ opacity: 0, x: "-100%" }} // Use percentage instead of viewport width
            animate={isMobile || isInView ? { opacity: 1, x: 0 } : {}} // Always animate on mobile
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full" // Ensure it takes full width
          >
            <h2 className="text-3xl mb-2">Our</h2>
            <h3 className="text-[48px] md:text-[48px] font-extrabold leading-[1.2] md:leading-[57.6px] tracking-normal globalColor">
              Latest Blogs
            </h3>
          </motion.div>

          <motion.div
            key={`subtext-${animationKey}`}
            initial={{ opacity: 0, x: "100%" }} // Use percentage instead of viewport width
            animate={isMobile || isInView ? { opacity: 1, x: 0 } : {}} // Always animate on mobile
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start" // Ensure it takes full width
          >
            <p className="max-w-md blueColor text-base font-normal leading-[23.36px] tracking-normal">
              Welcome to our blog section, where knowledge meets inspiration. Explore insightful articles, expert tips,
              and the latest trends in our field.
            </p>

            <div className="flex justify-center items-center gap-4 mt-8 cursor-pointer">
              <div

                onClick={() => {
                  swiperRef.current?.slidePrev()
                  paginate(-1)
                }}
              >
                <Image
                  src="/logo/Frame.svg"
                  alt="Left Arrow"
                  width={34}
                  height={34}
                  className="w-full cursor-pointer"
                />
              </div>
              <div

                onClick={() => {
                  swiperRef.current?.slideNext()
                  paginate(1)
                }}
              >
                <Image
                  src="/logo/arrow.svg"
                  alt="Right Arrow"
                  width={34}
                  height={34}
                  className="w-[80%] cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 3 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          navigation={false}
          modules={[Autoplay, Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="overflow-hidden" // Prevent Swiper from causing overflow
        >
          <AnimatePresence initial={false} custom={direction}>
            {data?.blog?.map((blog, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  key={`slide-${animationKey}-${index}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate={isMobile || isInView ? "center" : "enter"} // Always animate on mobile
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 100, damping: 30, duration: 0.8 },
                    opacity: { duration: 0.6 },
                  }}
                  className="bg-transparent rounded-3xl overflow-hidden relative h-[55vh] md:h-[55vh] w-full" // Ensure it takes full width
                >
                  <motion.img
                    src={blog.futureImages}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-[15px]"
                    initial={{ scale: 1.2 }}
                    animate={isMobile || isInView ? { scale: 1 } : {}} // Always animate on mobile
                    transition={{ duration: 0.8 }}
                  />
                  <div className="p-4 md:p-6 absolute bottom-8 w-[90%] bg-black h-auto md:h-[32vh] rounded-[20px] rounded-tl-none">
                    <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 leading-tight md:leading-[21.6px] tracking-normal">
                      {blog.title}
                    </h4>
                    <div className="flex gap-2 text-xs md:text-sm text-gray-400 mb-2 md:mb-4">
                      <div className="relative">
                        <span>{new Date(blog.updatedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}</span>
                      </div>
                      <span className="text-w">•</span>
                      <span className="blueColor">{blog.authorName}</span>
                    </div>
                    <p className="blueColor mb-4 md:mb-6 text-sm md:text-base leading-tight md:leading-[23.2px] font-normal tracking-normal">
                      {blog.description.length > 100
                        ? `${blog.description.substring(0, 100)}...`
                        : blog.description}
                    </p>

                    <Link href="/blogs">

                      <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 200, duration: 0.5 }}>
                        <Button
                          variant="link"
                          className="text-[#4CAF50] hover:text-[#45a049] p-0 flex items-center gap-2 text-sm md:text-base"
                        >
                          <Play className="w-3 h-3 fill-[#4CAF50] text-[#4CAF50]" />
                          READ MORE
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </AnimatePresence>
        </Swiper>
      </div>
    </section>
  );
};

export default LetestBlogs;
