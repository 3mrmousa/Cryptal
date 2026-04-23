/* eslint-disable @typescript-eslint/no-explicit-any */
import { Market } from "@/app/lib/types";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function CryptoCards({ title, data }: { title: string; data: any }) {
  return (
    <div
      className="card w-70 min-h-45 p-3 rounded-2xl 
            border border-zinc-200 dark:border-zinc-800
            shadow-2xl shadow-zinc-300 dark:shadow-zinc-800 
            flex flex-col gap-6"
    >
      <div className="top flex justify-between">
        <p className="text-xs font-semibold">
          {title === "New" ? (
            <span className="text-shadow-lg font-extrabold text-indigo-500">
              {title}
            </span>
          ) : (
            title
          )}
        </p>
        <p className="text-xs font-semibold">
          more <FontAwesomeIcon icon={faCaretRight} />
        </p>
      </div>
      <div className="bottom h-full overflow-hidden">
        <ul className="flex flex-col gap-3">
          {data.slice(0, 3).map((c: Market | any) => (
            <li key={c.id || c.item.id} className="grid grid-cols-3">
              <div className="relative flex gap-2">
                <Image
                  src={c.image || c.item.small}
                  alt={c.name || c.item.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p className="font-bold ">{c.symbol || c.item.symbol}</p>
              </div>
              <p className="text-end">
                $
                {Number.isFinite(Number(c.current_price))
                  ? Number(c.current_price).toFixed(6)
                  : Number(c.item?.data?.price).toFixed(6)}
              </p>
              <p
                className={`text-end text-sm font-bold ${
                  Number.isFinite(Number(c.price_change_percentage_24h))
                    ? Number(c.price_change_percentage_24h) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                    : Number(c.item?.data?.price_change_percentage_24h?.usd) >=
                        0
                      ? "text-green-600"
                      : "text-red-600"
                }`}
              >
                {Number.isFinite(Number(c.price_change_percentage_24h))
                  ? Number(c.price_change_percentage_24h) >= 0
                    ? "+"
                    : ""
                  : Number(c.item?.data?.price_change_percentage_24h?.usd) >= 0
                    ? "+"
                    : ""}
                {Number.isFinite(Number(c.price_change_percentage_24h))
                  ? Number(c.price_change_percentage_24h).toFixed(1)
                  : Number(
                      c.item?.data?.price_change_percentage_24h?.usd,
                    ).toFixed(1)}
                %
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CryptoCards;
