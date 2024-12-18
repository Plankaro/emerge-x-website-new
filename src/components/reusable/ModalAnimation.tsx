"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useDisableScroll from "@/hooks/useDisableScroll ";
import toast, { Toaster } from "react-hot-toast";

// Define form types
interface IFormInputs {
  name: string;
  email: string;
  mobile: string;
  country?: string;
}

// Yup validation schema
const schema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .matches(/@.*\.com$/, "Email must include '@' and end with '.com'")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "mobile No must contain only digits")
    .min(10, "mobile No must be at least 10 digits")
    .max(15, "mobile No must not exceed 15 digits")
    .required("mobile No is required"),
  country: yup.string().optional(),
});

interface ModalAnimationTypes {
  isVisible: boolean;
  onClose: () => void;
}

const ModalAnimation: React.FC<ModalAnimationTypes> = ({
  isVisible,
  onClose,
}) => {
  useDisableScroll(isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log(data);
    try {
      // Posting data using fetch
      const response = await fetch("http://localhost:8081/v1/demoRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error(
          " Something went wrong! Please double-check the form and try again.",
          {
            duration: 4000,
            position: "top-center",
            icon: "❌", // Custom icon for error
          }
        );
        return;
      }

      const responseData = await response.json();
      toast.success(
        "Form submitted successfully! We will get back to you shortly.",
        {
          duration: 4000,
          position: "top-center",
          icon: "🎉", // Custom icon for success
        }
      );
      console.log("Form Data Submitted:", responseData);

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Something went wrong! Please double-check the form and try again.",
        {
          duration: 4000,
          position: "top-center",
          icon: "❌", // Custom icon for error
        }
      );
    }
  };

  // Function to allow only numbers in the mobile input
  const handlemobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers by replacing any non-numeric characters
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  return (
    <div className="z-[9000] fixed left-0 top-0 w-full h-screen bg-[#010101] flex items-center justify-center">
      <Toaster />
      <div className={`popup-border`}>
        <div className="left-shine"></div>
        <div className="right-shine"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white bg-[#222720] rounded-full p-2 transition font-bold"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="p-4 flex flex-col gap-6">
          <h2 className="text-center text-[24px] sm:text-[28px] font-bold text-white">
            Join the Demo!
          </h2>
          <p className="text-center text-[16px] sm:text-[18px] text-white">
            Be the first to know about the demo! Login for early access.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="w-full flex flex-col gap-1 border-b border-b-white pb-2">
              <label
                htmlFor="name"
                className="text-sm sm:text-base text-white text-start"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="border-none outline-none bg-[#222720] px-3 text-white"
              />
              {errors.name && (
                <span className="text-red-500 text-xs text-left">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-1 border-b border-b-white pb-2">
              <label
                htmlFor="email"
                className="text-sm sm:text-base text-white text-start"
              >
                E-mail Id
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="border-none outline-none bg-[#222720] px-3 text-white"
              />
              {errors.email && (
                <span className="text-red-500 text-xs text-left">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* mobile No */}
            <div className="w-full flex flex-col gap-1 border-b border-b-white pb-2">
              <label
                htmlFor="mobile"
                className="text-sm sm:text-base text-white text-start"
              >
                mobile No
              </label>
              <input
                type="text"
                maxLength={14}
                id="mobile"
                {...register("mobile")}
                onInput={handlemobileChange} // Call the handler to restrict input to numbers only
                className="border-none outline-none bg-[#222720] px-3 text-white"
              />
              {errors.mobile && (
                <span className="text-red-500 text-xs text-left">
                  {errors.mobile.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div className="w-full flex flex-col gap-1 border-b border-b-white pb-2">
              <label
                htmlFor="country"
                className="text-sm sm:text-base text-white text-start"
              >
                Country (Optional)
              </label>
              <input
                type="text"
                id="country"
                {...register("country")}
                className="border-none outline-none bg-[#222720] px-3 text-white"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-[20px] py-[8px] text-sm sm:text-base bg-white rounded-full text-black hover:bg-[#3DA229] transition-all duration-300 ease-in-out hover:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAnimation;
