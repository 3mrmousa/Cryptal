import MainPricesChart from "./components/charts/MainPricesChart";
import CryptoChartCards from "./components/ui/CryptoChartCards";
import CryptoSelector from "./components/ui/CryptoSelector";
import FearGreedCard from "./components/ui/FearGreedCard";

export default async function Home() {
  return (
    <main className="bg-white dark:bg-black flex flex-col px-5">
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-auto mt-8">
        <div className="col-span-1 lg:col-span-3 flex flex-col lg:flex-row gap-5 items-center ">
          <CryptoChartCards id="bitcoin" />
          <CryptoChartCards id="ethereum" />
          <CryptoChartCards id="tether" />
        </div>
        <div className="col-span-1 items-center">
          <CryptoSelector />
        </div>
        <div className="col-span-1 lg:col-span-3 items-center">
          <MainPricesChart />
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <FearGreedCard />
        </div>
      </section>
    </main>
  );
}
