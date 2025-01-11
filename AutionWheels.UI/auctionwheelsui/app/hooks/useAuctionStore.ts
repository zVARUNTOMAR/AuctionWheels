import { create } from "zustand";
import { Auction, PagedResult } from "../types";

type State = {
  auctions: Auction[];
  totalCount: number;
  pageCount: number;
};

type Actions = {
  setData: (data: PagedResult<Auction>) => void;
  setCurrentPrice: (auctionId: string, amount: number) => void;
};

const initialState: State = {
  auctions: [],
  totalCount: 0,
  pageCount: 0,
};

export const useAuctionStore = create<State & Actions>((set) => ({
  ...initialState,
  setData: (data: PagedResult<Auction>) => {
    set({
      auctions: data.results,
      totalCount: data.totalCount,
      pageCount: data.pageCount,
    });
  },

  setCurrentPrice: (auctionId: string, amount: number) => {
    set((state) => {
      const auctions = state.auctions.map((auction) => {
        if (auction.id === auctionId) {
          return { ...auction, currentHighBid: amount };
        }
        return auction;
      });
      return {
        auctions,
        totalCount: state.totalCount,
        pageCount: state.pageCount,
      };
    });
  },
}));
