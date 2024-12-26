import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import icon from "./blog/Subtract.svg"
import Image from "next/image";

export interface BlogsData {
  _id: number;
  title: string;
  slug: string;
  futureImages: string;
  content: string;
  heading: string;
  details: string;
  list1: string;
  list2: string;
  details2: string;
  details3: string;
  createdAt: string;
}

interface CardBlogTypes {
  list: boolean;
  styleHeading?: string;
  styleDate?: string;
  styleBox?: string;
  styleCard?: string;
  data?: Partial<BlogsData>;
  curveIconStyle?: string;
  dateButtonStyle?: string;
  imageStyle?: string;
}
const CardBlog: React.FC<CardBlogTypes> = ({
  list,
  styleHeading,
  styleDate,
  styleBox,
  styleCard,
  data,
  curveIconStyle,
  dateButtonStyle,
  imageStyle
}) => {
  const [date, setDate] = useState("")
  useEffect(() => {
    const apiDate = data?.createdAt;
    // Create a Date object
    const dateObj = new Date(apiDate || "");

    // Format the date as "Dec 13, 2024"
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    console.log(formattedDate)
    setDate(formattedDate)
  }, [])
  return (
    <Link
      href={`/blogs/${data?._id}`}
      className={cn(
        ` w-full flex gap-4 items-center    ${list ? "flex-row" : "flex-col"}`,
        styleCard
      )}
    >
      <div
        className={cn(
          ` ${list ? "w-[30%] " : " w-full "
          }  rounded-[14px] relative`,
          styleBox
        )}
      >
        <Image
          src={"/Subtract.svg"}
          alt="Subtract Icon"
          width={280}
          height={400}
          className={cn(` absolute top-0 left-0 z-20 w-[60%]  `, curveIconStyle)}
        />
        <Image
          src={data?.futureImages || ""}
          // src="/services/About US.jpg"
          alt="Subtract Icon"
          fill
          className={cn("w-full object-cover ", imageStyle)}
        />
        <button className={cn(`absolute z-20  top-[0] left-[7px] w-[80px] h-[25px] bg-green-500 text-white rounded-tl-[12px] rounded-br-[20px] rounded-tr-[8px] rounded-bl-[12px] text-[12px]`, dateButtonStyle)}>
          {data && date}
        </button>
      </div>
      <div className={`${list ? " w-[60%] h-fit" : "w-full"}`}>
        <p className={cn(" text-customGreen text-xs font-[500]", styleDate)}>
          {/* {data && date} */}
        </p>
        <h2 className={cn(" text-greyishblack  font-[600]", styleHeading)}>
          {data?.title}
        </h2>
      </div>
    </Link>
  );
};

export default CardBlog;
