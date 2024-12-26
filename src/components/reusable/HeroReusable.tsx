import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroResusableProps {
  image?: string;
  title: string;
  date?: string;
  description?: string;
  textColor?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  className?: string;
}

export const HeroResusable: React.FC<HeroResusableProps> = ({
  image,
  title,
  date,
  description,
  facebookUrl = "#",
  instagramUrl = "#",
  linkedinUrl = "#",
  textColor,
  className,
}) => {
  return (

  
    <div className="relative h-[450px] md:h-[500px]  lg:h-[100vh] w-full overflow-hidden xs:rounded-b-[20px] sm:rounded-b-[40px] md:rounded-b-[80px] lg:rounded-b-[120px]">
      {image&&<Image src={image} alt={title||"emerge-x-hero-image"} fill className="object-cover " />}

      {/* White gradient overlay with right side emphasis */}
      <div
        className={cn(
          `absolute inset-0 bg-gradient-to-r from-white/0 to-black/90`,
          className
        )}
      />

      {/* Content container */}
      <div
        className="pb-4 px-10 sm:px-10 absolute 
           bottom-0 sm:bottom-10 w-full
          sm:right-5 
          md:right-5  
          lg:right-10 lg:bottom-20 
          max-w-2xl "
      >
        <h1
          className={`text-2xl  sm:text-4xl text-center  font-semibold md:text-end md:justify-end text-${
            textColor || "white"
          } mb-4`}
        >
          {title}
        </h1>

        <div
          className={`flex items-center text-center sm:justify-center md:text-end md:justify-end lg:text-end lg:justify-end gap-2 text-${
            textColor || "white"
          } text-base `}
        >
          {description ? (
            <p className="mb-4 text-base  text-gray-200  ">
              {description}
            </p>
          ) : (
            <span className="text-base ">
              {date} - Share Via <Link href={facebookUrl}>Facebook</Link>,{" "}
              <Link href={instagramUrl}>Instagram</Link>,{" "}
              <Link href={linkedinUrl}>LinkedIn</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
