"use client";

import About from "@/components/home/about/About";
import Contact from "@/components/home/contactus/Contact";
import Hero from "@/components/home/hero/Hero";
import LetestBlogs from "@/components/home/letest-blogs/LetestBlogs";
import News from "@/components/home/news/News";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getApiHelper } from "@/components/helper/apiHelper";
import { useDispatch } from "react-redux";

import { blogsData } from "@/store/reducer/blog";

import { useGetBlogsQuery } from "@/store/blogs";

import SectionHeading from "@/components/reusable/SectionHeading";
import HomeServiceSlider from "@/components/home/all-services/HomeServiceSlider";
import { useGetNewsQuery } from "@/store/news";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getNewsData();
    getBlogData();
  }, []);

  const getBlogData = async () => {
    try {
      const response: any = await getApiHelper(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/blog?page=1&limit=10`,
        "GET"
      );
      if (response?.success) {
        dispatch(blogsData(response?.data));
        console.log("Blogs Data:", response?.data);
      } else {
        console.error("Failed to fetch blogs:", response?.error);
      }
    } catch (error: any) {
      console.error("API error:", error.error || error.message);
    }
  };

  const getNewsData = async () => {
    try {
      const response: any = await getApiHelper(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/news?page=1&limit=10`,
        "GET"
      );

      if (response?.success) {
        // dispatch(newsData(response?.data));
        console.log("Blogs Data:", response?.data);
      } else {
        console.error("Failed to fetch blogs:", response?.error);
      }
    } catch (error: any) {
      console.error("API error:", error.error || error.message);
    }
  };

  useEffect(() => {
    const preventZoom = (event: any) => {
      if (event.ctrlKey || event.metaKey || event.key === "0") {
        event.preventDefault();
      }
    };

    const preventWheelZoom = (event: any) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", preventZoom);
    document.addEventListener("wheel", preventWheelZoom, { passive: false });

    return () => {
      document.removeEventListener("keydown", preventZoom);
      document.removeEventListener("wheel", preventWheelZoom);
    };
  }, []);

  const { data } = useGetBlogsQuery({ page: 1, limit: 10 });
  const { data: newsData } = useGetNewsQuery({ page: 1, limit: 5 });

  return (
    <div className="space-y-4 relative " id="home">
      <div ref={targetRef} className="relative">
        <Hero scrollYProgress={scrollYProgress} />

        <div className="w-full flex justify-center" id="about-us">
          <About scrollYProgress={scrollYProgress} />
        </div>
      </div>
      <>
        <div className="  bg-greyishblack pt-12   " id="services">
          <SectionHeading text="All Services" className="text-white container" />
          <HomeServiceSlider />
        </div>
        {data?.blog && data.blog.length > 0 && <LetestBlogs data={data} />}
      </>
      {newsData && newsData?.news?.length > 0 && (
        <News newdData={newsData?.news} />
      )}
      <Contact />
    </div>
  );
}
