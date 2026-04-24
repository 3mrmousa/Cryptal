"use client";

import {
  faAngleRight,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter,
  faFacebook,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type MarketItem = {
  name: string;
  value: number | null;
  prefix?: string;
  desc?: string;
};

type InfoItem = {
  name: string;
  value: string | string[] | null;
};

function formatCompactNumber(value: number) {
  if (!Number.isFinite(value)) return "--";

  if (value >= 1_000_000_000_000)
    return (value / 1_000_000_000_000).toFixed(1) + "T";

  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";

  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";

  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";

  return value.toString();
}

function getCommunityIcon(site: string) {
  if (site.includes("x.com") || site.includes("twitter"))
    return (
      <FontAwesomeIcon
        icon={faXTwitter}
        className="text-black dark:text-white"
      />
    );

  if (site.includes("facebook"))
    return <FontAwesomeIcon icon={faFacebook} className="text-blue-700" />;

  if (site.includes("t.me") || site.includes("telegram"))
    return <FontAwesomeIcon icon={faTelegram} className="text-blue-600" />;

  return null;
}

function CoinDetails({
  infoData,
  marketData,
}: {
  infoData: InfoItem[];
  marketData: MarketItem[];
}) {
  const [mobileDetails, setMobileDetails] = useState<boolean>(false);

  return (
    <div>
      <div className="lg:hidden"></div>

      <hr className="my-5" />

      <div
        onClick={() => {
          setMobileDetails((v) => !v);
        }}
        className="lg:hidden cursor-pointer hover:scale-105 duration-500 font-bold text-xl my-5"
      >
        Show{" "}
        {mobileDetails ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>

      <div className={`${mobileDetails ? "block" : "hidden"} lg:block`}>
        <ul className="flex flex-col gap-4">
          {marketData.map((item: MarketItem) => (
            <li
              key={item.name}
              className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800"
            >
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <span>{item.name}</span>

                <span className="relative group inline-flex items-center">
                  <span className="bg-zinc-200 dark:bg-zinc-800 rounded-full px-2 text-sm cursor-pointer select-none">
                    !
                  </span>

                  <div
                    className="
    absolute top-full left-1/2 mt-2 -translate-x-1/2
    lg:top-1/2 lg:left-full lg:mt-0 lg:ml-2 lg:-translate-y-1/2 lg:translate-x-0
    opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
    transition
    bg-white text-black dark:bg-zinc-900 dark:text-white
    border border-zinc-200 dark:border-zinc-700
    rounded-lg shadow-lg
    px-3 py-2
    w-55 sm:w-65 
    z-50
    pointer-events-none
    wrap-break-word
  "
                  >
                    {item.desc}
                  </div>
                </span>
              </div>
              <p className="font-semibold">
                {item.value
                  ? `${item.prefix ?? ""}${formatCompactNumber(item.value)}`
                  : "∞"}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 mt-5">
          <h4 className="font-bold">Info:</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[0].name}</p>
              </div>
              <a
                href={
                  typeof infoData[0].value === "string"
                    ? infoData[0].value
                    : undefined
                }
                className="font-semibold text-indigo-500 cursor-pointer"
              >
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </li>
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              {" "}
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[1].name}</p>
              </div>
              <a
                href={
                  typeof infoData[1].value === "string"
                    ? infoData[1].value
                    : undefined
                }
                className="font-semibold text-indigo-500 cursor-pointer"
              >
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </li>
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              {" "}
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[2].name}</p>
              </div>
              <a
                href={
                  typeof infoData[2].value === "string"
                    ? infoData[2].value
                    : undefined
                }
                className="font-semibold text-indigo-500 cursor-pointer"
              >
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </li>
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              {" "}
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[3].name}</p>
              </div>
              <div className="flex gap-3">
                {Array.isArray(infoData[3]?.value) &&
                  infoData[3].value.map((site: string, i: number) => {
                    if (!site) return null;

                    return (
                      <a
                        key={i}
                        href={site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 duration-200"
                      >
                        {getCommunityIcon(site)}
                      </a>
                    );
                  })}
              </div>
            </li>
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[4].name}</p>
              </div>
              <a
                href={
                  typeof infoData[4].value === "string"
                    ? infoData[4].value
                    : undefined
                }
                className="font-semibold text-black dark:text-white cursor-pointer"
              >
                GitHub
              </a>
            </li>
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              {" "}
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[5].name}</p>
              </div>
              <p className="font-semibold text-black dark:text-white">
                {infoData[5].value}
              </p>
            </li>
            <li className="flex justify-between p-2 border border-zinc-100 dark:border-zinc-900 rounded-lg shadow-lg shadow-zinc-400 dark:shadow-zinc-800">
              {" "}
              <div className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <p>{infoData[6].name}</p>
              </div>
              <p className="font-semibold text-black dark:text-white">
                {infoData[6].value}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;
