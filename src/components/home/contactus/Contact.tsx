import SectionHeading from "@/components/reusable/SectionHeading";
import SectionWrapper from "@/components/reusable/SectionWrapper";
import React from "react";

const Contact = () => {
    return (
        <>
            <div className="bg-white">
                <SectionWrapper className ="pb-14">
                    <SectionHeading text="Contact Us"  />
                    <div
                        className="contact_us mt-10  bg-[#3DA229] text-[36px] text-white xl:h-[414px] lg:h-[400px] md:h-[350px] sm:h-[300px] h-[250px] text-center flex items-center justify-center rounded-[56px] cursor-pointer transition-all duration-700 ease-in-out hover:rounded-[220px] hover:bg-black "
                    >
                        Get in touch with us today
                    </div>
                    
                </SectionWrapper>
            </div>



        </>
    );
};

export default Contact;
