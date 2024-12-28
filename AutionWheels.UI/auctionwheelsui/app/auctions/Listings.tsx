import React from "react";
import AuctionCard from "./AuctionCard";
import { Auction, PagedResult } from "../types";
import AppPagination from "../components/AppPagination";

async function getData(): Promise<PagedResult<Auction>> {
  const res = await fetch("http://localhost:6001/search?pageSize=8");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Listings() {
  const data = await getData();

  return (
    <>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.results.map((auction) => (
            <AuctionCard auction={auction} key={auction.id}></AuctionCard>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={1}
          pageCount={data.pageCount}
        ></AppPagination>
      </div>
    </>
  );
}
