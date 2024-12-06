import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroResusableProps {
  image: string,
  title: string,
  date?: string,
  description?: string
  textColor?: string 
  facebookUrl?: string,
  instagramUrl?: string,
  linkedinUrl?: string
  className?: string
}

export const HeroResusable: React.FC<HeroResusableProps> = ({image, title, date, description, facebookUrl = '#', instagramUrl = '#', linkedinUrl = '#', textColor, className}) => {
  return (
     <div className="relative h-[100vh] w-full overflow-hidden xs:rounded-b-[20px] sm:rounded-b-[40px] md:rounded-b-[80px] lg:rounded-b-[120px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
      />
      
      {/* White gradient overlay with right side emphasis */} 
      <div className={cn(
        `absolute inset-0 bg-gradient-to-r from-white/0 to-white/90`,
        className
      )} />
        
      {/* Content container */}
        <div className="p-10 absolute 
          bottom-10 w-full
          sm:right-5 sm:bottom-10 
          md:right-5 md:bottom-5 
          lg:right-10 lg:bottom-20 
          max-w-2xl">
        {/* <div className="p-10 absolute bottom-10 sm:bottom-10 md:bottom-5 md:right-5 lg:bottom-20 lg:right-10 max-w-2xl"> */}
          <h1 className={`text-5xl leading-[58px] lg:leading-[58px] text-center lg:text-5xl md:text-5xl sm:text-4xl font-semibold md:text-end md:justify-end text-${textColor || 'black'} mb-4`}>
            {title}
          </h1>
        
          <div className={`flex items-center text-center sm:justify-center md:text-end md:justify-end lg:text-end lg:justify-end gap-2 text-${textColor || 'black'} text-sm`}>
            {description ?
              <p className="mb-4 text-2xl leading-7 text-gray-300 max-w-sm">{description}</p>
              : (
              <span className="text-xl leading-6">{date} - Share Via <Link href={facebookUrl}>Facebook</Link>, <Link href={instagramUrl}>Instagram</Link>, <Link href={linkedinUrl}>LinkedIn</Link></span>
            )} 
          </div>
        </div>
      </div>
  )
}