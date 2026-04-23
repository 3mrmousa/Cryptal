"use client";
import { FetchByCoinAndTime } from "@/app/lib/fetch";
import Chart from "../../ui/Chart";
import { useEffect, useState } from "react";

type pricePair = [number, number];

function CoinChart({ coinId }: { coinId: string }) {
  const [timeChoosen, setTimeChoosen] = useState<string>("30");
  const [prices, setPrices] = useState<pricePair[]>([]);

  const timeOptions = [
    { label: "24H", time: 1 },
    { label: "7D", time: 7 },
    { label: "1M", time: 30 },
    { label: "3M", time: 90 },
    { label: "1Y", time: 365 },
  ];

  useEffect(() => {
    async function load() {
      const apiData = await FetchByCoinAndTime(coinId, timeChoosen);
      setPrices(apiData?.prices ?? []);
    }
    load();
  }, [coinId, timeChoosen]);

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold animate-pulse select-none">Price Chart</p>
        <ul className="flex gap-3">
          {timeOptions.map((item) => {
            const isActive = timeChoosen === String(item.time);
            return (
              <li
                key={item.time}
                onClick={() => setTimeChoosen(String(item.time))}
                className={`p-2 rounded-2xl cursor-pointer select-none
          ${isActive ? "bg-black text-white dark:bg-white dark:text-black" 
            : "bg-zinc-50 dark:bg-zinc-950"}
        `}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-30 md:h-70 w-full mt-10 md:mt-5">
        <Chart prices={prices} timeChoosen={timeChoosen} />
      </div>
    </div>
  );
}

export default CoinChart;
