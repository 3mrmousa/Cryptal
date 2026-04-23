import CoinChart from "@/app/components/marketPage/coin/CoinChart";
import { FetchCoinById } from "@/app/lib/fetch";
import {
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import CoinDetails from "@/app/components/marketPage/coin/CoinDetails";

type Params = {
  id: string;
};

async function CoinPage({ params }: { params: Params }) {
  const { id } = await params;
  const coinData = await FetchCoinById(id);
  console.log(coinData);

  const marketData = [
    {
      name: "Market Cap",
      value: coinData?.market_data?.market_cap?.usd,
      prefix: "$",
      desc: "Market Cap = Current Price × Circulating Supply. Represents the total market value of all circulating coins.",
    },
    {
      name: "pH Volume",
      value: coinData?.market_data?.total_volume?.usd,
      prefix: "$",
      desc: "Total trading volume across all exchanges in the last 24 hours. Indicates short-term market activity and liquidity.",
    },
    {
      name: "Total Supply",
      value: coinData?.market_data?.total_supply,
      desc: "Total number of coins that currently exist, including both circulating and locked tokens.",
    },
    {
      name: "Circulating Supply",
      value: coinData?.market_data?.circulating_supply,
      desc: "Number of coins currently available and circulating in the market.",
    },
    {
      name: "Max Supply",
      value: coinData?.market_data?.max_supply,
      desc: "Maximum number of coins that will ever exist for this cryptocurrency. Some assets have no maximum cap.",
    },
  ];

  const infoData = [
    { name: "Website", value: coinData?.links?.homepage?.[0] ?? null },
    { name: "Whitepaper", value: coinData?.links?.whitepaper ?? null },
    {
      name: "Explorers",
      value: coinData?.links?.blockchain_site?.filter(Boolean) ?? [],
    },
    {
      name: "Community",
      value: [
        coinData?.links?.twitter_screen_name
          ? `https://x.com/${coinData.links.twitter_screen_name}`
          : null,
        coinData?.links?.facebook_username
          ? `https://facebook.com/${coinData.links.facebook_username}`
          : null,
        coinData?.links?.subreddit_url ?? null,
        coinData?.links?.telegram_channel_identifier
          ? `https://t.me/${coinData.links.telegram_channel_identifier}`
          : null,
      ],
    },
    {
      name: "Source Code",
      value: coinData?.links?.repos_url?.github?.[0] ?? null,
    },
    { name: "API ID", value: coinData?.id ?? null },
    { name: "Categories", value: coinData?.categories?.[0] ?? null },
  ];

  return (
    <section className="p-5">
      <h4 className="opacity-50 font-light">
        / <Link href="/market">Market</Link> /
        <Link href={`/market/${coinData.id}`}> {coinData.name}</Link>
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-12 mt-10">
        <div className="flex lg:col-span-3 w-full flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                width={35}
                height={35}
                quality={100}
                className="rounded-full"
              />
              <p className="text-xl font-semibold">{coinData.name}</p>
              <p className="opacity-80">
                {coinData.symbol.toUpperCase()} Price{" "}
                <span className="bg-zinc-500 text-white p-1 rounded-lg text-sm font-bold">
                  #{coinData.market_cap_rank}
                </span>
              </p>
            </div>
            <div className="flex text-center">
              <p className="font-bold text-4xl">
                ${coinData.market_data.current_price.usd}
              </p>
              <p
                className={`text-lg font-bold ${
                  coinData.market_data.price_change_percentage_24h_in_currency
                    .usd >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coinData.market_data.price_change_percentage_24h_in_currency
                  .usd >= 0 ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
                {coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                  3,
                )}
                % (24h)
              </p>
            </div>
          </div>

          <CoinDetails marketData={marketData} infoData={infoData} />
        </div>
        <hr className="w-full my-9 lg:col-span-1 border lg:w-fit mx-auto lg:h-screen border-zinc-300 dark:border-zinc-800" />
        <div className="lg:col-span-8">
          <CoinChart coinId={id} />

          <div className="mt-5">
            <p
              className="font-bold bg-black dark:bg-white text-white dark:text-black 
             rounded-lg p-2 w-fit mb-3"
            >
              About
            </p>
            <p className="leading-8">{coinData.description.en}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoinPage;
