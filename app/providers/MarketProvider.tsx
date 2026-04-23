/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext } from "react";
import { Market } from "../lib/types";

type MarketContextType = {
  children: React.ReactNode;
  marketData: Market[];
};

export const MarketContext = createContext<any>(null!);

function MarketProvider({ children, marketData }: MarketContextType) {

  return (
    <MarketContext.Provider value={{ marketData }}>
      {children}
    </MarketContext.Provider>
  );
}

export default MarketProvider;
