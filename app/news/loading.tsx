

export default function Loading() {
  return (
    <main className="min-h-screen mt-10 lg:mt-0">
      <div className="mb-10">
        <h2 className="font-bold">Crypto News</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 animate-pulse space-y-3"
          >
            <div className="w-full h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </main>
  );
}
