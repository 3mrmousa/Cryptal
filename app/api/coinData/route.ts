import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=1&page=1`,
    {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data[0]);
}
