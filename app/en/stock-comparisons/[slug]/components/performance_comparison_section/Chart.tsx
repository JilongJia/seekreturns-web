"use client";

import { useRef, useEffect } from "react";
import { createChart, ColorType, LineSeries } from "lightweight-charts";
import styles from "./Chart.module.css";

type StockDataPoint = { date: string; price: number };

type ChartProps = {
  data: {
    stockOne: {
      symbol: string;
      priceSeries: StockDataPoint[];
    };
    stockTwo: {
      symbol: string;
      priceSeries: StockDataPoint[];
    };
  };
};

export function Chart({ data }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartContainerRef.current.style.position = "relative";

    const chart = createChart(chartContainerRef.current, {
      layout: {
        attributionLogo: false,
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const stockOneFirstPrice = data.stockOne.priceSeries[0].price;
    const stockOneValueSeries = data.stockOne.priceSeries.map((point) => ({
      time: point.date,
      value: (point.price / stockOneFirstPrice) * 10000,
    }));

    const stockTwoFirstPrice = data.stockTwo.priceSeries[0].price;
    const stockTwoValueSeries = data.stockTwo.priceSeries.map((point) => ({
      time: point.date,
      value: (point.price / stockTwoFirstPrice) * 10000,
    }));

    const stockOneLineSeries = chart.addSeries(LineSeries, {
      color: "#2563eb",
    });
    stockOneLineSeries.setData(stockOneValueSeries);

    const stockTwoLineSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
    });
    stockTwoLineSeries.setData(stockTwoValueSeries);

    const legend = document.createElement("ul");
    legend.className = styles.legend;
    chartContainerRef.current.appendChild(legend);

    const stockOneLastValue =
      stockOneValueSeries[stockOneValueSeries.length - 1].value;
    const stockOneFormattedLastValue = stockOneLastValue.toFixed(2);
    const stockOneFormattedLastPercent = (
      (stockOneLastValue / 10000 - 1) *
      100
    ).toFixed(2);

    const stockTwoLastValue =
      stockTwoValueSeries[stockTwoValueSeries.length - 1].value;
    const stockTwoFormattedLastValue = stockTwoLastValue.toFixed(2);
    const stockTwoFormattedLastPercent = (
      (stockTwoLastValue / 10000 - 1) *
      100
    ).toFixed(2);

    const stockOneLegendItem = document.createElement("li");
    stockOneLegendItem.className = `${styles.legendItem} ${styles.blueBullet}`;
    stockOneLegendItem.innerHTML = `${data.stockOne.symbol}: $${stockOneFormattedLastValue} (${stockOneFormattedLastPercent}%)`;
    legend.appendChild(stockOneLegendItem);

    const stockTwoLegendItem = document.createElement("li");
    stockTwoLegendItem.className = `${styles.legendItem} ${styles.redBullet}`;
    stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}: $${stockTwoFormattedLastValue} (${stockTwoFormattedLastPercent}%)`;
    legend.appendChild(stockTwoLegendItem);

    chart.subscribeCrosshairMove((param) => {
      if (!param.time) {
        stockOneLegendItem.innerHTML = `${data.stockOne.symbol}: $${stockOneFormattedLastValue} (${stockOneFormattedLastPercent}%)`;
        stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}: $${stockTwoFormattedLastValue} (${stockTwoFormattedLastPercent}%)`;
        return;
      }

      const stockOneData = param.seriesData.get(stockOneLineSeries) as {
        time: string;
        value: number;
      };
      const stockTwoData = param.seriesData.get(stockTwoLineSeries) as {
        time: string;
        value: number;
      };

      const stockOneValue =
        stockOneData.value !== undefined
          ? stockOneData.value
          : stockOneLastValue;
      const stockTwoValue =
        stockTwoData.value !== undefined
          ? stockTwoData.value
          : stockTwoLastValue;

      const stockOneFormattedValue = stockOneValue.toFixed(2);
      const stockTwoFormattedValue = stockTwoValue.toFixed(2);
      const stockOneFormattedPercent = (
        (stockOneValue / 10000 - 1) *
        100
      ).toFixed(2);
      const stockTwoFormattedPercent = (
        (stockTwoValue / 10000 - 1) *
        100
      ).toFixed(2);

      stockOneLegendItem.innerHTML = `${data.stockOne.symbol}: $${stockOneFormattedValue} (${stockOneFormattedPercent}%)`;
      stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}: $${stockTwoFormattedValue} (${stockTwoFormattedPercent}%)`;
    });

    const handleResize = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
}
