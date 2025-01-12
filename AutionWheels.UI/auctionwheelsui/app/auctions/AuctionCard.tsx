import React from "react";
import CountdownTimer from "./CountdownTimer";
import CarImage from "./CarImage";
import { Auction } from "../types";
import Link from "next/link";
import CurrentBid from "./CurrentBid";

type Props = {
  auction: Auction;
};

const AuctionCard = ({ auction }: Props) => {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden">
        <CarImage imageUrl={auction.imageUrl}></CarImage>
        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.auctionEnd}></CountdownTimer>
        </div>
        <div className="absolute bottom-2 right-2">
          <CurrentBid
            reservePrice={auction.reservePrice}
            amount={auction.currentHighBid ?? 0}
          ></CurrentBid>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h4 className="text-gray-500">
          {auction.make} {auction.model}
        </h4>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </Link>
  );
};

export default AuctionCard;
