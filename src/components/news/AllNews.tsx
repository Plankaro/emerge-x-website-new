"use client";
import { NewsGrid } from "./NewsGrid";
import { HeroResusable } from "../reusable/HeroReusable";
import BreadCrumb from "../reusable/BreadCrumb";
import SectionWrapper from "../reusable/SectionWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { newsData } from "@/store/reducer/news";
import { useEffect, useState } from "react";
import { getApiHelper } from "../helper/apiHelper";
import { Button } from "../ui/button";
import Loader from "../Loader";

interface NewsItem {
  title: string;
  date: string;
  image: string;
  slug: string;
  D3Data: string;
  D2Image: string;
  D4Image2: string;
  D4Image1: string;
  D3Title: string;
  D2Data: string;
  D1Data: string;
  D4Data: string;
}

export const AllNewsPage = () => {
  const newsAllData = useSelector((state: RootState) => state.news.newsData);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(
    newsAllData?.currentPage || 1
  );
  useEffect(() => {
    getNewsData(1);
  }, []);

  const getNewsData = async (page: number) => {
    try {
      const response: any = await getApiHelper(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/news?page=${page}&limit=10`,
        "GET"
      );

      if (response?.success) {
        dispatch(newsData(response?.data));
        console.log("Blogs Data:", response?.data);
      } else {
        console.error("Failed to fetch blogs:", response?.error);
      }
    } catch (error: any) {
      console.error("API error:", error.error || error.message);
      alert(error.error || error.message);
    }
  };

  const newsItemsData = newsAllData?.news;
  console.log(newsAllData);

  const navTrain = [
    { link: "/", label: "Home", id: "a1" },
    { link: "/", label: "News", id: "a2" },
    { link: "/News", label: "View All", id: "a3" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroResusable
        title="What's New?"
        image={newsAllData?.news?.[0].heroBanner ?? ""}
        description="Stay up-to-date with Everything about EmergeX related"
        textColor="white"
        className="absolute inset-0 bg-gradient-to-r from-white/0 to-black/90"
      />

      {/* Breadcrumb */}
      <SectionWrapper>
        <BreadCrumb navTrainData={navTrain} />
        {newsAllData?.length === 0 && <Loader />}
        <NewsGrid news={newsItemsData} />
        {newsAllData?.length !== 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={() => getNewsData(currentPage - 1)}
              disabled={newsAllData?.previousPage === true ? false : true}
              className="px-4 py-2 bg-[#3DA229B3] text-white rounded-md hover:bg-[#3DA229] "
            >
              Previous
            </Button>
            <div>
              <span className="text-lg font-semibold">{`Page ${currentPage} of ${
                newsAllData?.pages?.length || 1
              }`}</span>
            </div>
            <Button
              onClick={() => getNewsData(currentPage + 1)}
              disabled={newsAllData?.nextPage === true ? false : true}
              className="px-4 py-2 bg-[#3DA229B3] text-white rounded-md hover:bg-[#3DA229]"
            >
              Next
            </Button>
          </div>
        )}
      </SectionWrapper>
    </main>
  );
};
