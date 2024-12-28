"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { Auction } from "../types";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";

export default function Listings() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    getData(pageNumber, pageSize).then((data) => {
      setAuctions(data.results);
      setPageCount(data.pageCount);
    });
  }, [pageNumber, pageSize]);

  if (auctions.length === 0) return <h2>Loading...</h2>;

  return (
    <>
      <Filters pageSize={pageSize} setPageSize={setPageSize}></Filters>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {auctions &&
          auctions.map((auction) => (
            <AuctionCard auction={auction} key={auction.id}></AuctionCard>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={pageNumber}
          pageCount={pageCount}
          pageChanged={setPageNumber}
        ></AppPagination>
      </div>
    </>
  );
}
