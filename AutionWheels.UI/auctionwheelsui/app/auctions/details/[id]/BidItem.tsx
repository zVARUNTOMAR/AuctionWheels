import { Bid } from "@/app/types";
import React from "react";
import { format } from "date-fns";
import { numberWithCommas } from "@/app/lib/numberWithCommas";

type Props = {
  bid: Bid;
};

const BidItem = ({ bid }: Props) => {
  function getBidInfo() {
    let bgColor = "";
    let text = "";

    switch (bid.bidStatus) {
      case "Accepted":
        bgColor = "bg-green-500";
        text = "Accepted";
        break;
      case "AcceptedBelowReserve":
        bgColor = "bg-yellow-500";
        text = "Accepted Below Reserve";
        break;
      case "TooLow":
        bgColor = "bg-red-200";
        text = "Too Low";
        break;
      default:
        bgColor = "bg-red-200";
        text = "Bid Placed after auction finished";
        break;
    }

    return { bgColor, text };
  }

  return (
    <div
      className={`border-gray-300 border-2 px-3 py-2 rounded-lg flex justify-between items-center mb-2 ${
        getBidInfo().bgColor
      }`}
    >
      <div className="flex flex-col">
        <span>Bidder : {bid.bidder}</span>
        <span className="text-gray-700 text-sm">
          Time: {format(new Date(bid.bidTime), "dd MMM yyyy h:mm a")}
        </span>
      </div>

      <div className="flex flex-col text-right">
        <div className="text-xl font-semibold">
          ${numberWithCommas(bid.amount)}
        </div>
        <div className="text-xl font-semibold">
          <div className="flex flex-row items-center">{getBidInfo().text}</div>
        </div>
      </div>
    </div>
  );
};

export default BidItem;
