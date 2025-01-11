"use client";

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useCallback, useEffect, useRef } from "react";
import { useAuctionStore } from "../hooks/useAuctionStore";
import { useBidStore } from "../hooks/useBidStore";
import { useParams } from "next/navigation";
import { Bid } from "../types";

type Props = {
  children: React.ReactNode;
};

const SignalRProvider = ({ children }: Props) => {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleBidPlaced = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes("Accepted")) {
        setCurrentPrice(bid.auctionId, bid.amount);
      }
      if (params.id == bid.auctionId) {
        addBid(bid);
      }
    },
    [setCurrentPrice, addBid, params.id]
  );

  useEffect(() => {
    if (connection.current) {
      return;
    } else {
      connection.current = new HubConnectionBuilder()
        .withUrl("http://localhost:6001/notifications")
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => "Connection to nofication hub")
        .catch((err) => console.log(err));
    }
    connection.current.on("BidPlaced", handleBidPlaced);

    return () => {
      connection.current?.off("BidPlaced", handleBidPlaced);
    };
  }, [setCurrentPrice, handleBidPlaced]);

  return children;
};

export default SignalRProvider;
