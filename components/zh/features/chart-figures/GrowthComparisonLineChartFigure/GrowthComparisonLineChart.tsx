"use client";

import {
  createChart,
  ColorType,
  LineSeries,
  LineStyle,
} from "lightweight-charts";
import { useRef, useEffect } from "react";

import styles from "./GrowthComparisonLineChart.module.css";

type GrowthPoint = {
  time: string;
  value: number;
};

type GrowthComparisonLineChartProps = {
  stockOneSymbol: string;
  stockOneGrowthSeries: GrowthPoint[];
  stockTwoSymbol: string;
  stockTwoGrowthSeries: GrowthPoint[];
};

export function GrowthComparisonLineChart({
  stockOneSymbol,
  stockOneGrowthSeries,
  stockTwoSymbol,
  stockTwoGrowthSeries,
}: GrowthComparisonLineChartProps): JSX.Element {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const formatPercentage = (value: number): string =>
      `${(value * 100).toFixed(2)}%`;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
        attributionLogo: false,
      },
      width: container.clientWidth,
      height: 300,
      localization: { locale: "zh-CN", priceFormatter: formatPercentage },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      grid: {
        vertLines: {
          color: "oklch(87% 0 0)",
          style: LineStyle.LargeDashed,
        },
        horzLines: {
          color: "oklch(87% 0 0)",
          style: LineStyle.LargeDashed,
        },
      },
    });

    const stockOneLineSeries = chart.addSeries(LineSeries, {
      color: "#2563eb",
      lineWidth: 2,
      title: stockOneSymbol,
    });
    const stockTwoLineSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
      lineWidth: 2,
      title: stockTwoSymbol,
    });
    stockOneLineSeries.setData(stockOneGrowthSeries);
    stockTwoLineSeries.setData(stockTwoGrowthSeries);
    chart.timeScale().fitContent();

    const handleWindowResize = (): void => {
      if (container) {
        chart.applyOptions({ width: container.clientWidth });
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      chart.remove();
    };
  }, [
    stockOneSymbol,
    stockOneGrowthSeries,
    stockTwoSymbol,
    stockTwoGrowthSeries,
  ]);

  return <div ref={chartContainerRef} className={styles.container} />;
}
