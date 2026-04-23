"use client";

import { useTheme } from "next-themes";
import { memo, useMemo } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

type Point = { t: number; price: number };
type pricePair = [number, number];

function Chart({
  prices,
  timeChoosen,
}: {
  prices: pricePair[];
  timeChoosen: string;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const tickFormatter = (ts: number) => {
    const date = new Date(ts);

    if (timeChoosen === "365") {
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "2-digit",
      });
    }

    if (timeChoosen === "90" || timeChoosen === "30") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    }

    if (timeChoosen === "7") {
      return date.toLocaleDateString("en-US", {
        hour: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      hour: "2-digit",
    });
  };

  const formatPriceTick = (v: number) => {
    if (!Number.isFinite(v)) return "";
    if (v >= 1000) return `$${Math.round(v).toLocaleString("en-US")}`;
    if (v >= 1) return `$${v.toFixed(2)}`;
    return `$${v.toFixed(4)}`;
  };

  const data: Point[] = useMemo(
    () => prices.map(([t, price]) => ({ t, price })),
    [prices],
  );

  console.log("Chart Render");
  

  return (
    <ResponsiveContainer width="100%" height="100%" className="overflow-hidden">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#4b5563"
        />
        <XAxis
          dataKey="t"
          tickFormatter={(ts) => tickFormatter(Number(ts))}
          minTickGap={40}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 12 }}
        />

        <YAxis
          orientation="right"
          tickFormatter={(v) => formatPriceTick(Number(v))}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 11 }}
          width={60}
          domain={["auto", "auto"]}
        />

        <Tooltip
          labelFormatter={(ts) => tickFormatter(Number(ts))}
          formatter={(value) => [
            `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
            "Price",
          ]}
          contentStyle={{
            borderRadius: "14px",
            border: isDark ? "1px solid #27272A" : "1px solid #E5E7EB",
            backgroundColor: isDark ? "#09090B" : "#FFFFFF",
            color: isDark ? "#FAFAFA" : "#18181B",
            boxShadow: isDark
              ? "0 10px 30px rgba(0,0,0,0.45)"
              : "0 10px 30px rgba(0,0,0,0.08)",
          }}
          labelStyle={{
            color: isDark ? "#A1A1AA" : "#52525B",
          }}
          itemStyle={{
            color: isDark ? "#FAFAFA" : "#18181B",
          }}
        />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#9c27b0"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default memo(Chart);
