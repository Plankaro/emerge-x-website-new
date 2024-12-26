import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
interface News {
  title: string;
  date: string;
  slug: string;
  image: string;
  createdAt: string;
  heading: string;
  featureImage: string;
}

interface NewsGridProps {
  news: News[];
}

export const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  function formatDate(dateString: string) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options as any);
  }
  return (
    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-8">
      {Array.isArray(news) &&
        news.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden mx-auto items-center max-w-[315px]"
          >
            <Link href={`/news/${(item as any)._id}`}>
              <div className="overflow-hidden max-h-[482px] rounded-[14px]">
                <Image
                  src={item?.featureImage || "/services/Response.jpg"}
                  alt={item?.title || "emerge-x-news-image"}
                  width={500}
                  height={500}
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="mb-1 text-sx leading-10 text-gray-500">
                  {formatDate(item.createdAt)}
                </p>
                <h2 className="mt-1 text-base leading-5 font-semibold text-gray-800">
                  {item.heading}
                </h2>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};
