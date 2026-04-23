"use client";

import Image from "next/image";
import { FetchByCoinAndTime } from "@/app/lib/fetch";
import { Market } from "@/app/lib/types";
import {
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MarketContext } from "@/app/providers/MarketProvider";
import Chart from "../ui/Chart";

type PricePair = [number, number];

export default function MainPricesChart() {
  const { marketData } = useContext(MarketContext);

  const [prices, setPrices] = useState<PricePair[]>([]);
  const [timeChoosen, setTimeChoosen] = useState("30");

  const [symbol, setSymbol] = useState("BTC");
  const [searchChoosen, setSearchChoosen] = useState("bitcoin");
  const [searchOpen, setSearchOpen] = useState(false);
  const coinData:Market[] = marketData;

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isLoading = deferredQuery !== query;

  const [mobileListOpen, setMobileListOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const apiData = await FetchByCoinAndTime(searchChoosen, timeChoosen);
      setPrices(apiData?.prices ?? []);
    }
    load();
  }, [timeChoosen, searchChoosen]);

  const filteredCoins = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return coinData ?? [];

    return (coinData ?? []).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q),
    );
  }, [coinData, deferredQuery]);

  return (
    <section className="md:p-4 rounded-xl shadow-2xl shadow-zinc-200 dark:shadow-zinc-800 bg-white dark:bg-black">
      <div className="flex items-center justify-between p-4">
        <div className="relative">
          <button
            className="md:hidden px-4 py-2 rounded-2xl border cursor-pointer border-zinc-200
           dark:border-zinc-700 text-sm"
            onClick={() => setMobileListOpen((v) => !v)}
          >
            {timeChoosen === "30"
              ? "Month"
              : timeChoosen === "7"
                ? "Week"
                : timeChoosen === "365"
                  ? "Year"
                  : "Day"}
          </button>

          {mobileListOpen && (
            <ul className="absolute top-0 left-0 z-100 bg-white dark:bg-black px-4 py-2 rounded-2xl border cursor-pointer border-zinc-200 dark:border-zinc-700 text-sm">
              {[
                { label: "Day", number: "1", active: timeChoosen === "1" },
                { label: "Week", number: "7", active: timeChoosen === "7" },
                { label: "Month", number: "30", active: timeChoosen === "30" },
                { label: "Year", number: "365", active: timeChoosen === "365" },
              ].map((x) => (
                <li
                  key={x.label}
                  className={`px-4 py-1 rounded-xl text-sm cursor-pointer ${
                    x.active === true
                      ? "bg-blue-500 text-white"
                      : "text-zinc-600 dark:text-zinc-300"
                  }`}
                  onClick={() => {
                    setTimeChoosen(x.number);
                    setMobileListOpen((v) => !v);
                  }}
                >
                  {x.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:flex hidden mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-1 gap-1">
          {[
            { label: "Day", number: "1", active: timeChoosen === "1" },
            { label: "Week", number: "7", active: timeChoosen === "7" },
            { label: "Month", number: "30", active: timeChoosen === "30" },
            { label: "Year", number: "365", active: timeChoosen === "365" },
          ].map((x) => (
            <button
              key={x.label}
              className={`px-4 py-1 rounded-xl text-sm cursor-pointer ${
                x.active === true
                  ? "bg-blue-500 text-white"
                  : "text-zinc-600 dark:text-zinc-300"
              }`}
              onClick={() => setTimeChoosen(x.number)}
            >
              {x.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSearchOpen((v) => !v)}
          className="px-4 py-2 rounded-2xl border cursor-pointer border-zinc-200 dark:border-zinc-700 text-sm"
        >
          {symbol} ▾
        </button>
      </div>

      <div className="h-30 md:h-50 w-full mt-10 md:mt-0">
        <Chart prices={prices} timeChoosen={timeChoosen} />
      </div>

      {searchOpen && (
        <div
          className="fixed top-1/2 left-1/2 z-900 -translate-x-1/2 -translate-y-1/2
        bg-white dark:bg-black shadow-2xl shadow-zinc-500 dark:shadow-zinc-500 rounded-2xl p-5 
        w-80 md:w-150 max-h-130"
        >
          <div className="flex justify-between">
            <div className="flex gap-1">
              <input
                type="search"
                placeholder="Search..."
                className="border border-zinc-400 p-1 
            rounded-xl"
                value={isLoading ? "Loading..." : query}
                onChange={(e) => {
                  const next = e.target.value;
                  setQuery(next);
                }}
              />
            </div>
            <h3
              className="font-semibold cursor-pointer hover:scale-120 duration-500"
              onClick={() => setSearchOpen((v) => !v)}
            >
              X
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5 overflow-y-scroll max-h-110">
            {filteredCoins.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 cursor-pointer shadow-xl dark:shadow-zinc-950 hover:shadow-zinc-500 dark:hover:shadow-zinc-800 duration-300 
                  p-2 rounded-xl"
                onClick={() => {
                  setSearchChoosen(c.id);
                  setSymbol(c.symbol.toUpperCase());
                  setSearchOpen(false);
                }}
              >
                <div className="relativ">
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <h6 className="font-medium">{c.name.slice(0, 10)}</h6>
                  <p className="text-sm text-zinc-500 uppercase">{c.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
