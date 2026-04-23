import Image from "next/image";
import Link from "next/link";
import { News as NewsType } from "../../lib/types";


async function Cards({ articles }: { articles: NewsType[]  }) {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {articles.map((article: NewsType, i: number) => (
        <Link
          href={`/news/${article.title}`}
          className="group card relative flex flex-col justify-center shadow-2xl 
          shadow-zinc-200 dark:shadow-zinc-900 rounded-2xl p-4
          border border-zinc-100 dark:border-zinc-950
          hover:scale-105 duration-300"
          key={i}
        >
          {article.urlToImage ? (
            <Image
              src={article.urlToImage}
              alt={article.title}
              width={400}
              height={250}
              priority={i < 4}
              className="w-full h-48 object-cover rounded-lg"
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
          <p className="text-sm font-semibold text-zinc-500">
            {article.author ? article.author : `User_${i}`} {" - "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
