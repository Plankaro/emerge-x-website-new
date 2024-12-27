import SectionHeading from "@/components/reusable/SectionHeading";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import React from "react";
import Slider from "./Slider";
import Link from "next/link";
import SliderWithMotion from "./SliderWithMotion";
import { NewsItem } from "@/store/news/types/news.types";


interface NewsProps {
  newdData: NewsItem[]
}


const News: React.FC<NewsProps> = ({
  newdData
}) => {
  return (
    <div className="bg-white container text-greyishblack flex flex-col items-center justify-center pt-14" id="news">
      <SectionHeading text="News" />
      {/* <Slider /> */}

      <SliderWithMotion newdData={newdData} />
      {/* <SlickSlider/> */}

      <div className="text-center">
        <Link href={'/news'}>
          <button className="px-[20px] py-[8px] text-base bg-[#222720] text-white rounded-full  mt-10   ">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default News;
