import SectionHeading from "@/components/reusable/SectionHeading";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div className="bg-white">
        <div className="pt-14 max-md:px-8 flex justify-center flex-col items-center container  ">
          <SectionHeading text="Contact Us" />
          <Link href={"/contact-us"} className="w-full md:w-[60%]" >
            <motion.button
              initial={{
                borderRadius: "9px",
              }}
              whileHover={{
                borderRadius: "220px",
              }}
              transition={{ duration: 0.5, stiffness: 100 }}
              className="mt-10  bg-[#3DA229] text-white  text-lg md:text-2xl py-8 md:py-12 px-4 w-full whitespace-nowrap md:px-16  self-center "
            >
              Get in touch with us today
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Contact;
