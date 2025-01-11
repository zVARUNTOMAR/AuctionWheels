"use client";

import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useCallback, useEffect, useRef } from "react";
import { useAuctionStore } from "../hooks/useAuctionStore";
import { useBidStore } from "../hooks/useBidStore";
import { useParams } from "next/navigation";
import { Auction, AuctionFinished, Bid } from "../types";
import { User } from "next-auth";
import AuctionCreatedToast from "../components/AuctionCreatedToast";
import { toast } from "react-hot-toast";
import { getDetailedViewData } from "../actions/auctionActions";
import AuctionFinishedToast from "../components/AuctionFinishedToast";

type Props = {
  children: React.ReactNode;
  user: User | null;
};

const SignalRProvider = ({ children, user }: Props) => {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleAuctionFinished = useCallback(
    (finishedAuction: AuctionFinished) => {
      const auction = getDetailedViewData(finishedAuction.auctionId);
      return toast.promise(
        auction,
        {
          loading: "Loading",
          success: (auction: Auction) => (
            <AuctionFinishedToast
              auction={auction}
              finishedAuction={finishedAuction}
            />
          ),
          error: (err) => `Error: ${err.message}`,
        },
        { success: { duration: 10000, icon: null } }
      );
    },
    []
  );

  const handleAuctionCreated = useCallback(
    (auction: Auction) => {
      if (user?.username !== auction.seller) {
        return toast(<AuctionCreatedToast auction={auction} />, {
          duration: 1000,
        });
      }
    },
    [user?.username]
  );

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
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl("http://localhost:6001/notifications")
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => "Connection to notification hub")
        .catch((err) => console.log(err));
    }
    connection.current.on("BidPlaced", handleBidPlaced);
    connection.current.on("AuctionCreated", handleAuctionCreated);
    connection.current.on("AuctionFinished", handleAuctionFinished);

    return () => {
      connection.current?.off("BidPlaced", handleBidPlaced);
      connection.current?.off("AuctionCreated", handleAuctionCreated);
      connection.current?.off("AuctionFinished", handleAuctionCreated);
    };
  }, [
    setCurrentPrice,
    handleBidPlaced,
    handleAuctionCreated,
    handleAuctionFinished,
  ]);

  return children;
};

export default SignalRProvider;
