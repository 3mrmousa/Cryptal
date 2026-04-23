"use client";

import { FetchSwapper } from "@/app/lib/fetch";
import { Market } from "@/app/lib/types";
import { MarketContext } from "@/app/providers/MarketProvider";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";

function CryptoSelector() {
  const { marketData } = useContext(MarketContext);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [fromCoin, setFromCoin] = useState<string | null>("BTC");
  const [toCoin, setToCoin] = useState<string | null>("USDT");

  const [fromId, setFromId] = useState<string>("bitcoin");
  const [toSymbole, setToSymbole] = useState<string>("eth");

  const [marketData_] = useState<Market[]>(marketData);
  const [query, setQuery] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const data = await FetchSwapper(fromId, toSymbole);
      setPrice(data);
      // console.log(fromId, data, toSymbole);
    }
    load();
  }, [fromId, toSymbole]);

  const filteredCoins = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return marketData_ ?? [];

    return (marketData_ ?? []).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q),
    );
  }, [marketData_, query]);

  return (
    <section className="p-4 rounded-xl shadow-2xl shadow-zinc-300 dark:shadow-zinc-800 bg-white dark:bg-black">
      <div className="flex flex-col gap-3 items-start mt-3">
        {/* From */}
        <div className="relative w-full">
          <p className="text-sm font-semibold mb-1">From</p>

          <div className="flex px-3 py-2 justify-between items-center border border-zinc-300 dark:border-zinc-800 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setOpenFrom((v) => !v);
                setOpenTo(false);
              }}
              className="cursor-pointer flex items-center gap-2 select-none"
            >
              <span className="font-semibold">
                {fromCoin ? fromCoin : "Select"}
              </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>

            <p className="font-semibold">-----</p>
          </div>

          {openFrom && (
            <div className="absolute left-0 top-full mt-2 w-full z-50">
              <section className="bg-white dark:bg-black shadow-2xl shadow-zinc-200 dark:shadow-zinc-800 p-3 rounded-2xl border">
                <input
                  type="search"
                  placeholder="Search..."
                  className="my-1 border border-zinc-500
        rounded-xl py-1 px-2 w-full"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <ul className="flex flex-col h-40 overflow-auto">
                  {filteredCoins.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-center gap-3 cursor-pointer"
                      onClick={() => {
                        setFromCoin(c.symbol.toUpperCase());
                        console.log(c.id);

                        setFromId(c.id);
                        setOpenFrom(false);
                      }}
                    >
                      <div className="relative w-7 h-7 shrink-0">
                        <Image
                          src={c.image}
                          alt={c.id}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        className="py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer w-full 
                        font-semibold"
                      >
                        {c.name}
                      </button>
                    </div>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* To */}
        <div className="relative w-full">
          <p className="text-sm font-semibold mb-1">To</p>

          <div className="flex px-3 py-2 justify-between items-center border border-zinc-300 dark:border-zinc-800 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setOpenTo((v) => !v);
                setOpenFrom(false);
              }}
              className="cursor-pointer flex items-center gap-2 select-none"
            >
              <span className="font-semibold">
                {toCoin ? toCoin : "Select"}
              </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>

            <p className="font-semibold">-----</p>
          </div>

          {openTo && (
            <div className="absolute left-0 top-full mt-2 w-full z-50">
              <section className="bg-white dark:bg-black shadow-2xl shadow-zinc-500 p-3 rounded-2xl border">
                <input
                  type="search"
                  placeholder="Search..."
                  className="my-1 border border-zinc-500
        rounded-xl py-1 px-2 w-full"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <ul className="flex flex-col h-40 overflow-auto">
                  {filteredCoins.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-center gap-3 cursor-pointer"
                      onClick={() => {
                        setToCoin(c.symbol.toUpperCase());
                        setToSymbole(c.symbol);
                        setOpenTo(false);
                      }}
                    >
                      <div className="relative w-7 h-7 shrink-0">
                        <Image
                          src={c.image}
                          alt={c.id}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        className="text-leftx py-2 rounded-xl hover:bg-zinc-100 w-full 
                        font-semibold"
                      >
                        {c.name}
                      </button>
                    </div>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>

      {price ? (
        <p className="mt-3 mb-5 text-sm text-zinc-500">
          1 {fromCoin} = {price} {toCoin}
        </p>
      ) : (
        <p className="mt-3 mb-5 text-sm text-red-500 font-semibold">
          impossible trade
        </p>
      )}

      <button
        className="bg-indigo-400 dark:bg-indigo-800 text-black dark:text-white w-full rounded-2xl text-lg py-2
      hover:scale-101 hover:bg-indigo-800 hover:text-white 
      dark:hover:bg-indigo-400 dark:hover:text-black duration-500 cursor-pointer"
      >
        Exchange Now
      </button>
    </section>
  );
}

export default CryptoSelector;
