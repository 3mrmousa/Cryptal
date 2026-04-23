import { FetchNews } from "@/app/lib/fetch";
import { News } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

type Params = { q: string };

async function NewsById({ params }: { params: Params }) {
  const { q } = await params;
  const newsData = await FetchNews(q);
  const article: News = newsData.articles[0];

  return (
    <section className="relative mt-12 flex flex-col items-center text-center
     shadow-2xl dark:shadow-zinc-800 py-10 px-4">
      {article.urlToImage ? (
        <Image
          src={article.urlToImage}
          alt={article.title}
          width={400}
          height={250}
          className="lg:w-1/2 h-100 mx-auto object-cover rounded-lg"
          unoptimized
        />
      ) : (
        <div
          className="w-full h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800
              flex items-center justify-center text-4xl"
        >
          No Image
        </div>
      )}
      <p
        className="text-lg font-semibold 
            group-hover:text-red-500 duration-300 transition"
      >
        {article.title}
      </p>
      <p>{article.description}</p>
      <p className="text-sm font-semibold text-zinc-500">
        {article.author ? article.author : `User_${Math.random()}`} {" - "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <Link href={article.url} className="text-indigo-500 font-bold">
        Go To Article
      </Link>
    </section>
  );
}

export default NewsById;
