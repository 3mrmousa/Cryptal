export async function FetchByCoinAndTime(coin: string, time: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${time}&${process.env.COINGECKO_API_KEY}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Cant Fetch FetchByCoinAndTime: " + res.text);
  }

  return res.json();
}

export async function FetchMarket(
  page: null | number = null,
  per_page: null | number = null,
) {
  const url = new URL(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
  );

  if (page) url.searchParams.append("page", String(page));
  if (per_page) url.searchParams.append("per_page", String(per_page));

  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
    },
    next: { revalidate: 100 },
  });

  if (!res.ok) throw new Error("CoinGecko failed");
  return res.json();
}

export async function FetchSwapper(fromId: string, toSymbol: string) {
  const res = await fetch(`/api/swapper?fromId=${fromId}&toSymbol=${toSymbol}`);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const json = await res.json();
  return json?.[fromId]?.[toSymbol];
}

export async function FetchCoinData(id: string) {
  const res = await fetch(`/api/coinData?id=${id}`);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function FetchFearGreed() {
  const res = await fetch("/api/fear_greed");

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

// -----------------------Market------------------------------------

export async function FetchNewCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=id_desc&per_page=20&page=1",
    {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error(`Fetch failed: ${res.status} - ${text}`);
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
}
export async function FetchHotCoins() {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending", {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Fetch failed: ${res.status} - ${text}`);
    throw new Error(`API Error ${res.status}`);
  }

  const data = await res.json();
  return data.coins;
}
export async function FetchTopVolumeCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=1",
    {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error(`Fetch failed: ${res.status} - ${text}`);
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
}
export async function FetchTopGainerCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1",
    {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error(`Fetch failed: ${res.status} - ${text}`);
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
}

// -----------------------Market>Coins------------------------------------

export async function FetchCoinById(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`,
    {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error(`Fetch failed: ${res.status} - ${text}`);
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
}

// --------------------------News------------------------------------

export async function FetchNews(
  q: string,
  page: string = "1",
  pageSize: string = "16",
) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${q}}&page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY!,
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error(`Fetch failed: ${res.status} - ${text}`);
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
}
