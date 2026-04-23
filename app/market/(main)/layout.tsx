"use client";

import Search from "@/app/components/marketPage/Search";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MarketMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isOverview = pathname === "/market";
  const isTrading = pathname === "/market/tradingdata";

  return (
    <div className="flex flex-col">
      <Search />

      <div className="flex gap-5 mt-15">
        <Link
          href="/market"
          className={`text-2xl cursor-pointer hover:scale-105 duration-300 ${
            isOverview
              ? "font-extrabold text-black dark:text-white"
              : "font-black text-zinc-500"
          }`}
        >
          Overview
        </Link>

        <Link
          href="/market/tradingdata"
          className={`text-2xl cursor-pointer hover:scale-105 duration-300 ${
            isTrading
              ? "font-extrabold text-black dark:text-white"
              : "font-black text-zinc-500"
          }`}
        >
          Trading data
        </Link>
      </div>

      {children}
    </div>
  );
}
