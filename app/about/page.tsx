export default function About() {
  return (
    <main className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <section>
          <h1 className="text-3xl font-bold">About Cryptal</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Cryptal is a modern cryptocurrency dashboard built with Next.js App
            Router. It focuses on real-time market data, interactive charts, and
            clean UI design.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Project Overview</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            This project provides structured access to cryptocurrency market
            data including prices, trends, and detailed coin analytics. It is
            built to demonstrate a server-first architecture using modern
            Next.js patterns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Application Structure</h2>
          <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400 list-disc pl-5">
            <li>
              <b>Dashboard:</b> Market overview with charts and key indicators
            </li>
            <li>
              <b>Market:</b> Browse cryptocurrencies and rankings
            </li>
            <li>
              <b>Coin Details:</b> Deep analytics per coin with charts
            </li>
            <li>
              <b>News:</b> Crypto-related updates and articles
            </li>
            <li>
              <b>Exchanges:</b> Information about crypto exchanges
            </li>
            <li>
              <b>NFTs:</b> NFT market overview and trends
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Implemented Features</h2>
          <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400 list-disc pl-5">
            <li>Interactive cryptocurrency price charts</li>
            <li>Market overview and trending coins</li>
            <li>Top gainers and volume tracking</li>
            <li>Fear & Greed Index visualization</li>
            <li>Coin swap preview system</li>
            <li>Server-side data fetching for performance</li>
            <li>Responsive UI with dark mode support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400 list-disc pl-5">
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>CoinGecko API for market data</li>
            <li>Chart library for visualization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Purpose</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Cryptal is a learning-focused project built to practice modern
            frontend architecture, server components in Next.js, API
            integration, and real-world dashboard design.
          </p>
        </section>
      </div>
    </main>
  );
}
