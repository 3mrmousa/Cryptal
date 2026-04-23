import { NextResponse } from "next/server";



export async function GET() {
  const res = await fetch(`https://api.alternative.me/fng/?limit=1`, {
    next: { revalidate: 300 },
  });

  if(!res.ok) {
    const text = await res.text();
    return NextResponse.json({error: text}, {status: res.status})
  }

  const data = await res.json()
  return NextResponse.json(data.data[0])
}
