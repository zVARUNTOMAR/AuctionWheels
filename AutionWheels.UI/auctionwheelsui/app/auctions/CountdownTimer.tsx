"use client";

import React from "react";
import Countdown, { zeroPad } from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <div
      className={`border-2 border-white text-gray-100 py-1 px-2 rounded-lg flex justify-center ${
        completed
          ? "bg-red-600"
          : days === 0 && hours < 10
          ? "bg-amber-600"
          : "bg-green-600"
      }`}
    >
      {completed ? (
        <span>Finished!</span>
      ) : (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{seconds}
        </span>
      )}
    </div>
  );
};

const CountdownTimer = ({ auctionEnd }: Props) => {
  return (
    <div>
      <Countdown date={auctionEnd} renderer={renderer}></Countdown>
    </div>
  );
};

export default CountdownTimer;
