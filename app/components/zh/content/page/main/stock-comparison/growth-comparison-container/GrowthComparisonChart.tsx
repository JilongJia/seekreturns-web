"use client";

import { useRef, useEffect } from "react";
import {
  createChart,
  ColorType,
  LineSeries,
  type ISeriesApi,
} from "lightweight-charts";

import styles from "./GrowthComparisonChart.module.css";

type FinancialGrowthPoint = {
  date: string;
  revenueGrowth: number;
  epsgrowth: number;
  freeCashFlowGrowth: number;
};

type MetricKey = "revenueGrowth" | "epsgrowth" | "freeCashFlowGrowth";

type ProcessedGrowthPoint = {
  time: string;
  value: number;
};

type FinancialGrowthChartProps = {
  stockOne: {
    symbol: string;
    growthSeries: FinancialGrowthPoint[];
  };
  stockTwo: {
    symbol: string;
    growthSeries: FinancialGrowthPoint[];
  };
  metricCode: MetricKey;
};

function processDataForChart(
  series: FinancialGrowthPoint[],
  metric: MetricKey,
): ProcessedGrowthPoint[] {
  return series
    .map((point) => ({
      time: point.date,
      value: point[metric] * 100, // Convert to percentage
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Ensure data is sorted by date
}

export function FinancialGrowthChart({
  stockOne,
  stockTwo,
  metricCode,
}: FinancialGrowthChartProps): JSX.Element {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container || !stockOne.growthSeries || !stockTwo.growthSeries) return;

    const stockOneProcessedSeries = processDataForChart(
      stockOne.growthSeries,
      metricCode,
    );
    const stockTwoProcessedSeries = processDataForChart(
      stockTwo.growthSeries,
      metricCode,
    );

    const formatPercentage = (value: number): string => `${value.toFixed(2)}%`;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
        attributionLogo: false,
      },
      width: container.clientWidth,
      height: 300,
      // *** THIS IS THE KEY CHANGE FOR LOCALIZATION ***
      localization: { locale: "zh-CN", priceFormatter: formatPercentage },
      rightPriceScale: {
        scaleMargins: { top: 0.2, bottom: 0.1 },
      },
      timeScale: {
        borderColor: "#cccccc",
      },
      grid: {
        vertLines: { color: "#e0e0e0" },
        horzLines: { color: "#e0e0e0" },
      },
    });

    const stockOneLineSeries: ISeriesApi<"Line"> = chart.addSeries(LineSeries, {
      color: "#2563eb",
      lineWidth: 2,
      title: stockOne.symbol,
    });
    const stockTwoLineSeries: ISeriesApi<"Line"> = chart.addSeries(LineSeries, {
      color: "#ef4444",
      lineWidth: 2,
      title: stockTwo.symbol,
    });
    stockOneLineSeries.setData(stockOneProcessedSeries);
    stockTwoLineSeries.setData(stockTwoProcessedSeries);
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
  }, [stockOne, stockTwo, metricCode]);

  return <div ref={chartContainerRef} className={styles.container} />;
}
