"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroResusable } from "../reusable/HeroReusable";
import { NewsGrid } from "./NewsGrid";
import SectionWrapper from "../reusable/SectionWrapper";
import BreadCrumb from "../reusable/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { newsData } from "@/store/reducer/news";
import { useEffect } from "react";
import { getApiHelper } from "../helper/apiHelper";

const responseImage = "/services/Response.jpg";

export const NewsPage = ({ slug }: { slug: string }) => {
  const newsAllData = useSelector((state: RootState) => state.news.newsData);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    try {
      const response: any = await getApiHelper(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/news?page=1&limit=10`,
        "GET"
      );

      if (response?.success) {
        dispatch(newsData(response?.data));
      } else {
        console.error("Failed to fetch blogs:", response?.error);
      }
    } catch (error: any) {
      console.error("API error:", error.error || error.message);
    }
  };

  const newsItem =
    newsAllData &&
    newsAllData.news &&
    newsAllData.news.find((item: any) => item._id === slug);

  if (!newsItem) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-xl text-gray-600">News item not found</p>
      </div>
    );
  }

  // Interface for the news object
  interface News {
    _id: string;
    heading: string;
    mainDescription: string;
    description1: string;
    description2: string;
    finalDescription: string;
    heroBanner: string;
    featureImage: string;
    subFeatureImage1: string;
    subFeatureImage2: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  const {
    createdAt,
    heading,
    description1,
    description2,
    mainDescription,
    featureImage,
    subFeatureImage1,
    subFeatureImage2,
    heroBanner,
  }: News = newsItem;
  console.log("🚀 ~ NewsPage ~ newsItem:", newsItem);

  const navTrain = [
    { link: "/", label: "Home", id: "a1" },
    { link: "/news", label: "News", id: "a2" },
    {
      link: `/news/${slug}`,
      label: heading,
      id: "a4",
    },
  ];

  function formatDate(dateString: string) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options as any);
  }

  // Exclude the current news item and get the latest 3 news
  const latestNews = newsAllData.news
    .filter((item: any) => item._id !== newsItem._id) // Exclude the current news item
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) // Sort by createdAt descending
    .slice(0, 3); // Get the top 3 latest items

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <HeroResusable
        image={heroBanner}
        title={heading}
        date={formatDate(createdAt)}
      />

      {/* Breadcrumb */}

      {/* Main Content */}
      <div>
        <SectionWrapper>
          <BreadCrumb navTrainData={navTrain} />
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-8">
            <div></div>
            <div className="prose max-w-none">
              <p className="text-4xl text-bold text-gray-800">{heading}</p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-4xl font-semibold text-gray-400 mb-6 max-w-sm">
            What's New?
            </h2>
            <div>
              <Image
                src={featureImage ?? ""}
                alt="Feedback System"
                width={600}
                height={400}
                className="rounded-[20px]  w-full"
              />
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-xl leading-[44px] font-semibold text-gray-400 mb-6 lg:max-w-sm md:max-w-sm sm:max-w-full">
              {mainDescription}
            </h2>
            <div className="grid gap-10">
              <p className="text-lg text-gray-600">{description1}</p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-4xl font-semibold text-gray-400 mb-6 max-w-sm"> What's New?</h2>
            <div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Image
                  src={subFeatureImage1 ?? ""}
                  alt="Feedback System"
                  width={600}
                  height={400}
                  className=" rounded-[20px] w-full min-h-[385px]"
                />
                <Image
                  src={subFeatureImage2 ?? ""}
                  alt="Feedback System"
                  width={600}
                  height={400}
                  className="rounded-[20px]  w-full min-h-[385px]"
                />
              </div>
              <p className="mt-6 text-lg text-gray-600">{description2}</p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="">
            <h2 className="text-4xl font-semibold mb-8 text-center text-gray-900">
              You may also like
            </h2>
            <NewsGrid news={latestNews} />
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default NewsPage;
