import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import Image from "next/image";

export interface BlogsData {
  id: number,
  title: string,
  slug: string,
  image: string,
  content: string,
  heading: string,
  details: string,
  list1: string,
  list2: string,
  details2: string,
  details3: string,
}

interface CardBlogTypes {
  list: boolean;
  styleHeading?: string;
  styleDate?: string;
  styleBox?: string;
  styleCard?: string;
  data?: Partial<BlogsData>;
}
const CardBlog: React.FC<CardBlogTypes> = ({
  list,
  styleHeading,
  styleDate,
  styleBox,
  styleCard,
  data
}) => {
  console.log(data);
  return (
    <Link
      href={`/blogs/${data?.id}`}
      className={cn(
        ` w-full flex gap-4 items-center   ${list ? "flex-row" : "flex-col"}`,
        styleCard
      )}
    >
      <div
        className={cn(
          ` ${list ? "w-[30%] " : " w-full "
          }  rounded-[14px] bg-[#D9D9D9] relative`,
          styleBox
        )}
      >
        <Image
          src="/blogs/Subtract.svg"
          alt="Subtract Icon"
          width={100} // Set the actual width in pixels
          height={100} // Set the actual height in pixels
          className="absolute top-0 left-0"
        />
        <button
          className="absolute top-[1px] left-[7px] w-[80px] h-[25px] bg-green-500 text-white rounded-tl-[10px] rounded-br-[15px] text-[12px]">
          13-12-2024
        </button>

      </div>
      <div className={`${list ? " w-[60%] h-fit" : "w-full"}`}>
        <p className={cn(" text-customGreen text-xs font-[500]", styleDate)}>
          Dec 23,2024
        </p>
        <h2 className={cn(" text-greyishblack  font-[600]", styleHeading)}>
          {data?.title}
        </h2>
      </div>
    </Link>
  );
};

export default CardBlog;
