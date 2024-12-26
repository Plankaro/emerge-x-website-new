"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Contact number must contain only digits")
    .max(14, "Contact number cannot exceed 14 digits")
    .min(10, "Contact number must be 10 digits")
    .required("Contact number is required"),
  country: yup.string().optional(),
  company: yup.string().optional(),
  note: yup.string().required("Message is required"),
});

const mobileUsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:8081/v1/contact", {
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

      const result = await response.json();
      toast.success(
        "Form submitted successfully! We will get back to you shortly.",
        {
          duration: 4000,
          position: "top-center",
          icon: "🎉", // Custom icon for success
        }
      );

      console.log("Success:", result);
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        " Something went wrong! Please double-check the form and try again.",
        {
          duration: 4000,
          position: "top-center",
          icon: "❌", // Custom icon for error
        }
      );
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-greyishblack space-y-6">
          {/* Name */}
          <div className="border-b-2 border-black flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="pr-3 py-2 border-none outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="border-b-2 border-black flex flex-col">
            <label htmlFor="email">E-mail Id</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="pr-3 py-2 border-none outline-none"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* mobile */}
          <div className="border-b-2 border-black flex flex-col">
            <label htmlFor="contact">Contact No</label>
            <input
              type="number"
              maxLength={14}
              minLength={10}
              id="contact"
              {...register("mobile")}
              className="pr-3 py-2 border-none outline-none"
            />
            {errors.mobile && (
              <span className="text-red-500 text-sm">
                {errors.mobile.message}
              </span>
            )}
          </div>

          {/* Country */}
          <div className="border-b-2 border-black flex flex-col">
            <label htmlFor="country">Country (Optional)</label>
            <input
              type="text"
              id="country"
              {...register("country")}
              className="pr-3 py-2 border-none outline-none"
            />
          </div>

          {/* Company */}
          <div className="border-b-2 border-black flex flex-col">
            <label htmlFor="company">Company (Optional)</label>
            <input
              type="text"
              id="company"
              {...register("company")}
              className="pr-3 py-2 border-none outline-none"
            />
            {errors.company && (
              <span className="text-red-500 text-sm">
                {errors.company.message}
              </span>
            )}
          </div>

          {/* Message */}
          <div className=" flex flex-col">
            <label htmlFor="message">Message</label>
            <textarea
              id="note"
              {...register("note")}
              className="px-3 py-2 border-2 border-black rounded-lg outline-none"
            ></textarea>
            {errors.note && (
              <span className="text-red-500 text-sm">
                {errors.note.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white rounded-full px-5 py-1.5 mt-8"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default mobileUsForm;
