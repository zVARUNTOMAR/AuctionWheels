"use client";

import React, { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { Auction, PagedResult } from "../types";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "../hooks/useParamStore";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import { fileURLToPath } from "url";

export default function Listings() {
  // const [auctions, setAuctions] = useState<Auction[]>([]);
  // const [pageCount, setPageCount] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(4);

  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }))
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <>
      <Filters></Filters>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.results.map((auction) => (
            <AuctionCard auction={auction} key={auction.id}></AuctionCard>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={params.pageNumber}
          pageCount={data.pageCount}
          pageChanged={setPageNumber}
        ></AppPagination>
      </div>
    </>
  );
}
