"use client";

import { Market } from "@/app/lib/types";
import { MarketContext } from "@/app/providers/MarketProvider";
import { useContext, useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Search() {
  const { marketData } = useContext(MarketContext);

  const [search, setSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);

  const filteredData: Market[] = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return (marketData ?? []).filter(
      (c: Market) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q),
    );
  }, [deferredQuery, marketData]);

  return (
    <div className="relative flex flex-col items-center">
      <input
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          setSearch(e.currentTarget.value.trim().length > 0);
        }}
        value={query}
        type="search"
        name="search"
        placeholder="Search..."
        className="bg-black dark:bg-white text-white dark:text-black 
        rounded-md w-1/2 lg:w-1/3 mx-auto px-3 py-1"
      />
      {search && (
        <div
          className="absolute top-10 z-500 text-white dark:text-black
        bg-black dark:bg-white w-1/2 lg:w-1/3 rounded-lg rounded-t-none p-3
         max-h-70 overflow-y-auto"
        >
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {filteredData.map((c) => (
              <li key={c.id} className="relative">
                <Link
                  href={`/market/${c.id}`}
                  className="flex items-center gap-1 bg-zinc-950 dark:bg-zinc-50
               rounded-md p-5"
                >
                  <Image
                    src={c.image}
                    alt={c.id}
                    width={20}
                    height={20}
                    className="w-7 h-7 object-contain rounded-full"
                  />
                  <p className="font-semibold">{c.symbol.toUpperCase()}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
