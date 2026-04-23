"use client";

import { FetchFearGreed } from "@/app/lib/fetch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

function sentimentLabel(v: number) {
  if (v <= 24) return "Extreme Fear";
  if (v <= 49) return "Fear";
  if (v <= 54) return "Neutral";
  if (v <= 74) return "Greed";
  return "Extreme Greed";
}

function sentimentColor(v: number) {
  if (v <= 24) return "#ef4444";
  if (v <= 49) return "#f97316";
  if (v <= 54) return "#a1a1aa";
  if (v <= 74) return "#84cc16";
  return "red";
}

export default function FearGreedCard() {
  const { resolvedTheme } = useTheme();

  const [indecator, setIndecator] = useState(50);

  const isDark = resolvedTheme === "dark";

  const pointerColor = isDark ? "#e5e7eb" : "#111827";

  const label = sentimentLabel(indecator);
  const labelColor = sentimentColor(indecator);

  useEffect(() => {
    async function load() {
      const data = await FetchFearGreed();
      setIndecator(Number(data.value));
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border w-full border-black/5 dark:border-white/10 bg-white dark:bg-black backdrop-blur-xl p-4 shadow-2xl shadow-zinc-200 dark:shadow-zinc-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-wide text-zinc-500 dark:text-zinc-400">
            Market Sentiment
          </p>
          <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Fear & Greed Index
          </h3>
        </div>

        <div className="text-right">
          <p
            className="text-2xl font-semibold leading-none"
            style={{ color: labelColor }}
          >
            {indecator.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">/ 100</p>
        </div>
      </div>

      <div>
        <GaugeComponent
          value={indecator}
          type="semicircle"
          minValue={0}
          maxValue={100}
          arc={{
            width: 0.12,
            cornerRadius: 16,
            nbSubArcs: 10,
            colorArray: ["#ef4444", "#f59e0b", "#22c55e"],
            padding: 0,
            subArcsStrokeWidth: 0,
            gradient: true,
            effects: {
              glow: true,
              glowBlur: 2,
              glowSpread: 1,
              dropShadow: { dy: 0, blur: 0, opacity: 0 },
              innerShadow: false,
            },
            padEndpoints: true,
          }}
          pointer={{
            type: "arrow",
            color: pointerColor,
            length: 0.35,
            width: 18,
            elastic: true,
            animationDelay: 0,
            animationDuration: 900,
          }}
          labels={{
            valueLabel: {
              matchColorWithArc: true,
              style: {
                fontSize: "22px",
                fontWeight: 700,
                fill: isDark ? "#e5e7eb" : "#111827",
              },
              offsetY: 0.55,
              animateValue: true,
            },
            tickLabels: {
              type: "outer",
              hideMinMax: true,
              defaultTickLineConfig: {
                width: 1,
                length: 8,
                distanceFromArc: 2,
              },
              defaultTickValueConfig: {
                style: {
                  fontSize: "9px",
                  fill: isDark ? "#a1a1aa" : "#6b7280",
                },
              },
              ticks: [
                { value: 0 },
                { value: 25 },
                { value: 50 },
                { value: 75 },
                { value: 100 },
              ],
            },
          }}
          startAngle={-90}
          endAngle={90}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm font-semibold" style={{ color: labelColor }}>
          {label}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          Updated: Today
        </p>
      </div>
    </section>
  );
}
