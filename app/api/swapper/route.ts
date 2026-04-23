import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromId = searchParams.get("fromId");
  const toSymbol = searchParams.get("toSymbol");


  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${fromId}&vs_currencies=${toSymbol}`,
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
  return NextResponse.json(data);
}
