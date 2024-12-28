"use client";

import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { useParamsStore } from "../hooks/useParamStore";

const Logo = () => {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div
      className="flex items-center gap-2 text-2xl font-semibold text-red-500 cursor-pointer"
      onClick={reset}
    >
      <AiOutlineCar size={30}></AiOutlineCar>
      <div>Auction Wheels</div>
    </div>
  );
};

export default Logo;
