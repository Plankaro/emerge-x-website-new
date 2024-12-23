"use client";
import ModalAnimation from "@/components/reusable/ModalAnimation";
import { cn } from "@/lib/utils";
import { isChecked } from "@/store/fetures/buttons/providerButton";

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

interface BookDemoButtonTpes {
  rightArrow: boolean;
  className?: string;
  hideNavbar: boolean;
}
const BookDemoButton: React.FC<BookDemoButtonTpes> = ({
  rightArrow,
  className,
  hideNavbar,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();




  const hideNavBar = () => {
    if (hideNavbar) {
      dispatch(isChecked(false));
    }
  };

  const hidenavBarshow = () => {
    if (hideNavbar) {
      dispatch(isChecked(true));
    }
  };
  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
          hidenavBarshow();
        }}
        className={cn(
          ` bg-[#222720] text-white rounded-full flex items-center border border-white`,
          className
        )}
      >
        <span>Book a Demo</span>

        {rightArrow && (
          <span className=" bg-customGreen rounded-full w-[48px] h-[48px] sm:w-[58px] sm:h-[58px] text-2xl flex items-center justify-center ">
            <FaArrowRight color="#FFFFFF" />
          </span>
        )}
      </button>

      {openModal && (
        <ModalAnimation
          isVisible={openModal}
          onClose={() => {
            setModalVisible(false);
            setOpenModal(false);
            hideNavBar();
          }}
        />
      )}
    </>
  );
};

export default BookDemoButton;
