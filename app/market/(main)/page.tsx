import CryptoCards from "../../components/marketPage/CryptoCards";
import {
  FetchHotCoins,
  FetchMarket,
  FetchNewCoins,
  FetchTopGainerCoins,
  FetchTopVolumeCoins,
} from "../../lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { Market as typeMarket } from "../../lib/types";

export function formatCompactNumber(value: number) {
  if (!Number.isFinite(value)) return "--";

  if (value >= 1_000_000_000_000)
    return (value / 1_000_000_000_000).toFixed(1) + "T";

  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";

  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";

  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";

  return value.toString();
}

type Props = {
  searchParams?: { page?: string };
};

async function Market({ searchParams }: Props) {
  const params = await searchParams;

  const newCoinsData = await FetchNewCoins();
  const hotCoinsData = await FetchHotCoins();
  const topVolumeCoinsData = await FetchTopVolumeCoins();
  const topGainerCoinsData = await FetchTopGainerCoins();

  const page = Math.max(1, Number(params?.page ?? "1"));
  const perPage = 10;

  const allMarketCoinsData = await FetchMarket(page, perPage);

  console.log(params?.page);

  return (
    <section className="bg-white dark:bg-black min-h-screen flex flex-col gap-10 p-4 sm:p-5 overflow-x-hidden">
      <div className="category-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <CryptoCards title="Hot" data={hotCoinsData} />
        <CryptoCards title="Top" data={topGainerCoinsData} />
        <CryptoCards title="New" data={newCoinsData} />
        <CryptoCards title="Volume" data={topVolumeCoinsData} />
      </div>
      <div className="mt-2">
        <div className="mt-10 overflow-x-auto">
          <ul className="min-w-100 flex flex-col gap-10">
            <li className="grid grid-cols-5 lg:grid-cols-7 text-center font-bold opacity-60">
              <p className="lg:col-span-2 text-start">Name</p>
              <p>Price</p>
              <p>24h</p>
              <p>Volume</p>
              <p>Market Cap</p>
              <p className="hidden lg:block">Actions</p>
            </li>

            {allMarketCoinsData.map((c: typeMarket) => {
              const isPositive = c.price_change_percentage_24h >= 0;
              const sign = isPositive ? "+" : "";

              return (
                <li
                  key={c.id}
                  className="grid grid-cols-5 lg:grid-cols-7 text-center items-center"
                >
                  <Link
                    href={`/market/${c.id}`}
                    className="relative flex gap-2 lg:col-span-2"
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <p className="font-bold">{c.symbol.toUpperCase()}</p>
                    <p className="text-sm opacity-50 hidden lg:block">
                      {c.name}
                    </p>
                  </Link>

                  <p>${c.current_price.toFixed(2)}</p>

                  <p
                    className={`font-semibold ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {sign}
                    {c.price_change_percentage_24h.toFixed(2)}%
                  </p>

                  <p className="font-bold">
                    ${formatCompactNumber(c.total_volume)}
                  </p>

                  <p className="font-bold">
                    ${formatCompactNumber(c.market_cap)}
                  </p>

                  <Link
                    href={`/market/${c.id}`}
                    className="font-semibold cursor-pointer hover:underline hidden lg:block"
                  >
                    View
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Link
          href={`/market?page=${page - 1}`}
          className={`px-4 py-2 rounded-lg border ${
            page === 1 ? "pointer-events-none opacity-40" : "hover:opacity-80"
          }`}
        >
          Prev
        </Link>

        <p className="font-semibold">Page {page}</p>

        <Link
          href={`/market?page=${page + 1}`}
          className="px-4 py-2 rounded-lg border hover:opacity-80"
        >
          Next
        </Link>
      </div>
    </section>
  );
}

export default Market;
