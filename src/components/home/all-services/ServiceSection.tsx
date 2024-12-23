import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const sliderData = [
  {
    id: "1",
    image: "/assets/services/Prevention.jpg",
    text: "Mitigation/Prevention",
    heading:
      "Explore how Emerge-X utilizes AI CCTV Cameras, Wearable Devices, and HSE Management Software to enhance workplace safety, monitor health indicators, and streamline HSE processes. Mitigate risks, ensure compliance, and foster a safer working environment with our innovative solutions.",
    description:
      "Revolutionizing safety with cutting-edge technology: real-time health monitoring, brain function analysis, and GPS tracking ensure rapid response, empowering users with unmatched protection and peace of mind.",
  },
  {
    id: "2",
    image: "/assets/services/Preparedness.jpg",
    text: "Preparedness",
    heading:
      "Enhance your organization's readiness with Emerge-X's comprehensive preparedness solutions, including online and offline training, emergency drill support, and real-time training tracking. Equip your team with essential skills to respond effectively in emergencies and foster resilience",
    description:
      "Revolutionizing emergency preparedness through comprehensive training and simulation programs. These ensure that wearers and emergency teams are equipped to respond effectively in any critical situation. Our advanced wearable technology supports these efforts by providing real-time health monitoring, ensuring that preparedness is backed by actionable data.",
  },
  {
    id: "3",
    image: "/assets/services/Response.jpg",
    text: "Response",
    heading:
      "Enhance emergency response efficiency and effectiveness with Emerge-X's integrated hardware solutions. Our platform ensures complete automation, providing real-time access to critical information, enabling prompt and coordinated emergency management to minimize impact and ensure safety",
    description:
      "Revolutionizing recovery with advanced wearable technology that monitors health metrics during rehabilitation. Continuous tracking of vital signs helps optimize recovery time by providing real-time data, ensuring that wearers get the support they need to fully recover after an incident.",
  },
  {
    id: "4",
    image: "/assets/services/Recovery.jpg",
    text: "Recovery",
    heading:
      "Facilitate effective recovery with Emerge-X's comprehensive services, including automated incident reporting, AI-driven root cause analysis, and tailored precautionary measures. Empower your organization to learn, adapt, and strengthen emergency management capabilities post-incident",
    description:
      "Revolutionizing response times with advanced wearable technology that sends immediate alerts and coordinates real-time responses with emergency teams. This ensures fast intervention and rapid assistance, maximizing safety during critical situations.",
  },
];

const ServiceSection = () => {
  const containerRef = useRef(null);
  const router = useRouter();

  useGSAP(
    () => {
      const details = gsap.utils.toArray(".service-card:not(:first-child)");
      const allPhotos = gsap.utils.toArray(".right-image");
      const photos = gsap.utils.toArray(".right-image:not(:first-child)");

      // gsap.set(photos.slice(1), { autoAlpha: 0 }); // Hide non-first images initially
      gsap.set(photos, { yPercent: 101 });

      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".right-wrapper", // Pin wrapper instead of direct flex child
        pinSpacing: true, // Add spacing
        markers: true,
      });

      details.forEach((detail, index) => {
        let headline = (detail as any).querySelector("h2");

        let animation = gsap
          .timeline()
          .to(photos[index] as any, {
            yPercent: 0,
            duration: 1,
            ease: "power1.inOut",
          }) // Fade-in current image
          .set(allPhotos[index] as any, { autoAlpha: 0 }); // Fade-out for next step

        ScrollTrigger.create({
          trigger: headline,
          start: "clamp(top 80%)",
          end: "clamp(top 20%)",
          animation: animation,
          scrub: 1,
          markers: false,
        });
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card");
      const backgroundColors = ["#FFFAF0", "#F0FFF4", "#F0F8FF", "#FFF5F5"]; // Light pastel colors

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card as any,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(".gallery", {
              backgroundColor: backgroundColors[index],
              duration: 0.5,
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to(".gallery", {
              backgroundColor: backgroundColors[index],
              duration: 0.5,
              overwrite: "auto",
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    // Refresh ScrollTrigger on component mount
    ScrollTrigger.refresh();
  }, []);

  return (
    <div ref={containerRef}>
      <span id={"services"} className="mt-[-140px] pb-[150px] block">
        &nbsp;
      </span>
      <div className="flex gap-4 gallery">
        {/* Left Section */}
        <div className=" w-full md:w-1/2 space-y-8">
          {sliderData.map((service, index) => (
            <div
              key={index}
              className="service-card p-4 lg:p-8 min-h-[50vh] flex flex-col gap-6 justify-center  rounded-md"
            >
              <div className="space-y-3">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">
                  {service.text}
                </h2>
                <p className="text-black/90 font-semibold text-lg">
                  <strong>{service.heading}</strong>
                </p>
              </div>
              <button
                type="submit"
                onClick={() => router.push(`/services/${service.id}`)}
                className="px-[20px] py-[8px] text-[16px] w-fit sm:text-base bg-[#3DA229] rounded-full text-white hover:bg-[#3DA229] transition-all duration-300 ease-in-out"
              >
                Explore Now
              </button>

              <div className="w-full h-[400px] md:hidden">
                <Image
                  src={service.image}
                  alt={service.text}
                  width={800}
                  height={400}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Section Wrapper */}
        <div className="w-1/2 h-screen right-wrapper  relative overflow-hidden  hidden md:flex">
          <div className="absolute w-[80%] lg:w-[70%] max-lg:max-h-[24rem] h-[50vh] aspect-square border shadow-lg rounded-md overflow-hidden inset-0 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2  flex items-center justify-center">
            {sliderData.map((service, index) => (
              <div key={index} className="right-image absolute w-full h-full ">
                <Image
                  src={service.image}
                  width={800}
                  height={400}
                  alt={service.text}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
