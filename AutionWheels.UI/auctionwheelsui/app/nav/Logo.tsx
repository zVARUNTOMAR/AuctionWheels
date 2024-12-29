"use client";

import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { useParamsStore } from "../hooks/useParamStore";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
//import use router

const Logo = () => {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function checkPath() {
    if (pathName != "/") {
      router.push("/");
    }
    reset();
  }

  return (
    <div
      className="flex items-center gap-2 text-2xl font-semibold text-red-500 cursor-pointer"
      onClick={checkPath}
    >
      <AiOutlineCar size={30}></AiOutlineCar>
      <div>Auction Wheels</div>
    </div>
  );
};

export default Logo;
