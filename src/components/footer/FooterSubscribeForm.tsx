import React from "react";

const FooterSubscribeForm = () => {
  return (
    <div className=" ">
      <form action="">
        <div className="flex flex-col sm:flex-row items-center gap-3 ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Your Email"
            className=" border outline-none px-4 py-2  h-[40px] rounded-[20px] "
          />
          <button className=" bg-customGreen text-white h-full py-2 px-4 rounded-[20px]">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterSubscribeForm;
