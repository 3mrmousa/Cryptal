import Link from "next/link";
import { FetchNews } from "../lib/fetch";
import Cards from "../components/news/Cards";

async function News({ searchParams }: { searchParams: { page?: string } }) {
  const params = await searchParams;

  const page = await Number(params.page ?? "1");

  console.log(page);

  const newsData = await FetchNews("crypto", String(page));
  const articles = newsData.articles;

  return (
    <main className="min-h-screen mt-10 lg:mt-0">
      <div className="mb-10">
        <h2 className="font-bold">Crypto News</h2>
      </div>

      <Cards articles={articles}/>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Link
          href={`/news?page=${page - 1}`}
          className={`px-4 py-2 rounded-lg border ${
            page === 1 ? "pointer-events-none opacity-40" : "hover:opacity-80"
          }`}
        >
          Prev
        </Link>

        <p className="font-semibold">Page {page}</p>

        <Link
          href={`/news?page=${page + 1}`}
          className={`px-4 py-2 rounded-lg border ${page === 6 ? "pointer-events-none opacity-40" : "hover:opacity-80"}`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}

export default News;
