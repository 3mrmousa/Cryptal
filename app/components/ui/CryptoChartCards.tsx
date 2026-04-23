"use client";

import { FetchCoinData } from "@/app/lib/fetch";
import { Market } from "@/app/lib/types";
import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MarketContext } from "@/app/providers/MarketProvider";

function CryptoChartCards({ id }: { id: string }) {
  const { marketData } = useContext(MarketContext);

  const [data, setData] = useState<Market>();
  const [list, setList] = useState(false);
  const [coinId, setCoinId] = useState<string>("");

  const [query, setQuery] = useState<string>("");

  // console.log(marketData);

  useEffect(() => {
    async function load() {
      const coinData = await FetchCoinData(coinId || id);
      setData(coinData);
    }
    load();
  }, [id, coinId]);

  const filterMarket = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return marketData;

    return marketData.filter(
      (c: Market) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q),
    );
  }, [query, marketData]);

  return (
    <section className="relative card h-45 w-full lg:w-70 p-4 rounded-xl shadow-lg shadow-zinc-200 dark:shadow-zinc-800
    flex flex-col justify-center">
      <div
        className="flex items-center gap-1 mb-2 cursor-pointer"
        onClick={() => setList((v) => !v)}
      >
        <div className="img relative">
          {data && (
            <Image
              src={data.image}
              width={40}
              height={40}
              alt={data.name}
            />
          )}
        </div>
        <div>
          <p>{data?.name}</p>
          <p className="text-sm">{data?.symbol}</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 mt-2">
        <h4 className="font-semibold">Price: {data?.current_price}$</h4>
        <h6 className="font-semibold">
          24h: {`${data?.price_change_percentage_24h.toFixed(2)}%`}
          {data &&
            (data?.price_change_percentage_24h > 0 ? (
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="text-green-700"
              />
            ) : (
              <FontAwesomeIcon
                icon={faArrowTrendDown}
                className="text-red-600"
              />
            ))}
        </h6>
      </div>
      {list && (
        <div
          className="absolute left-0 top-0 z-100 h-full w-full bg-white dark:bg-black
        border border-zinc-100 dark:border-zinc-900 rounded-2xl px-5 py-2"
        >
          <input
            type="search"
            placeholder="Search..."
            className="my-1 border border-zinc-500
        rounded-xl py-1 px-2 w-full"
            value={query}
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
          />
          <ul className="flex flex-col gap-3 overflow-y-scroll h-2/3 pt-4">
            {filterMarket.map((c: Market) => (
              <li
                key={c.id}
                onClick={() => {
                  setCoinId(c.id);
                  setList(false);
                }}
              >
                <div className="flex items-center justify-start cursor-pointer">
                  <div className="img relative">
                    {data && (
                      <Image
                        src={c.image}
                        width={30}
                        height={30}
                        alt={data.name}
                      />
                    )}
                  </div>
                  <p className="font-semibold w-full text-center">
                    {c.name.split("", 15)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default CryptoChartCards;
