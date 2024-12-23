import { cn } from "@/lib/utils";
import React from "react";
interface SectionHeadingtypes {
  text: string;
  className?: string;
  id?: string;
}
const SectionHeading: React.FC<SectionHeadingtypes> = ({ className, text, id }) => {
  return (
    <h2
      id={id}
      className={cn(
        ` text-black  font-[700] text-[28px] md:text-[39px] lg:text-[36px] text-center mb-10  `,
        className
      )}
    >
      {text}
    </h2>
  );
};

export default SectionHeading;
