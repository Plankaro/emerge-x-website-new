"use client"
import type React from "react"
import type { NewsItem } from "@/store/news/types/news.types"
import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NewsProps {
  newdData: NewsItem[]
}

const News: React.FC<NewsProps> = ({ newdData }) => {
  console.log("News Data:", newdData)

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
    }

    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % newdData.length)
    }, 3000)

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [])

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + newdData.length) % newdData.length)
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % newdData.length)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
  return (
    <section ref={sectionRef} id="news-section" className="py-8 sm:py-12 px-4 overflow-hidden">
      <div className="max-w-[900px] mx-auto text-let sm:text-center">
        {/* Title animations */}
        <motion.h2
          className="text-3xl mb-2"
          initial={{ y: -100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our
        </motion.h2>
        <motion.h3
          className="text-[32px] sm:text-[48px] font-extrabold leading-[1.2] sm:leading-[57.6px] tracking-normal globalColor mb-8 sm:mb-12"
          initial={{ y: -100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Latest news
        </motion.h3>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="cursor-pointer absolute sm:left-[-20px] top-[-20px] sm:top-1/2 sm:-translate-y-1/2 left-[calc(10%-30px)] rounded-full z-10 border-none"
              onClick={() => setActiveIndex((prev) => (prev - 1 + newdData.length) % newdData.length)}
            >
              <Image src="/logo/left.svg" alt="Left Arrow" width={24} height={24} className="text-white w-[40px] sm:w-full" />
            </div>
          </motion.div>

          {/* News Cards */}
          <motion.div
            className="relative w-full h-[300px] sm:h-[400px] max-w-[700px]"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative h-full">
              {newdData?.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${index === activeIndex
                      ? "z-40"
                      : index === (activeIndex + 1) % newdData.length
                        ? "z-30"
                        : index === (activeIndex + 2) % newdData.length
                          ? "z-20"
                          : "z-10"
                    }`}
                  initial={false}
                  animate={{
                    top: "50%",
                    left:
                      index === activeIndex
                        ? "0%"
                        : index === (activeIndex + 1) % newdData.length
                          ? "5%"
                          : index === (activeIndex + 2) % newdData.length
                            ? "10%"
                            : "45%",
                    opacity:
                      index === activeIndex
                        ? 1
                        : index === (activeIndex + 1) % newdData.length
                          ? 0.8
                          : index === (activeIndex + 2) % newdData.length
                            ? 0.6
                            : 0,
                    scale:
                      index === activeIndex
                        ? 1
                        : index === (activeIndex + 1) % newdData.length
                          ? 0.95
                          : index === (activeIndex + 2) % newdData.length
                            ? 0.9
                            : 0.85,
                    translateY: "-50%",
                    display:
                      index === activeIndex ||
                        index === (activeIndex + 1) % newdData.length ||
                        index === (activeIndex + 2) % newdData.length
                        ? "block"
                        : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    if (index !== activeIndex) {
                      setActiveIndex(index)
                    }
                  }}
                  style={{
                    cursor: index !== activeIndex ? "pointer" : "default",
                    width: "100%",
                    height: "80%",
                    position: "absolute",
                  }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={item.featureImage || "/placeholder.svg"}
                      alt={item.heading}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 text-left">
                      <div>
                        <h4 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-white line-clamp-2">
                          {item.heading}
                        </h4>
                        <div className="flex gap-2 text-xs text-gray-300">
                          <span>{new Date(item.updatedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Arrow */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              className="cursor-pointer absolute sm:right-[-60px] top-[-20px] sm:top-1/2 sm:-translate-y-1/2 right-[calc(75%-20px)] rounded-full border-none z-10"
              onClick={() => setActiveIndex((prev) => (prev + 1) % newdData.length)}
            >
              <Image src="/logo/right.svg" alt="Right Arrow" width={24} height={24} className="text-white w-[40px] sm:w-full" />
            </div>
          </motion.div>
        </div>
        <Link href="/news">

        {/* Explore Button */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 100 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          <Button className=" cursor-pointer buttogGradientBG hover:bg-[#45a049] text-[14px] sm:text-[16px] px-6 sm:px-8 py-4 sm:py-6 mt-8 sm:mt-12 text-white rounded-[10px]">
            Explore all news
          </Button>
        </motion.div>
        </Link>

      </div>
    </section>
  )
}

export default News

