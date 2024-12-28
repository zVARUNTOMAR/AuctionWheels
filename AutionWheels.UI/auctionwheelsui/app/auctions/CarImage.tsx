"use client";
import React from "react";
import Image from "next/image";

type Props = {
  imageUrl: string;
};

const CarImage = ({ imageUrl }: Props) => {
  const [isLoading, setLoading] = React.useState(true);
  return (
    <Image
      src={imageUrl}
      alt="image"
      fill
      priority
      sizes="(min-width: 640px) 50vw, 100vw"
      className={`object-cover group-hover:opacity-75 transition-opacity duration-300 ease-in-out ${
        isLoading
          ? "grayscale blur-2xl scale-110"
          : "grayscale-0 blur-0 scale-100"
      }`}
      onLoad={() => setLoading(false)}
    ></Image>
  );
};

export default CarImage;
