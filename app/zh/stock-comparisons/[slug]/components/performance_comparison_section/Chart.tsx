"use client";

import { useRef, useEffect } from "react";
import { createChart, ColorType, LineSeries } from "lightweight-charts";

import styles from "./Chart.module.css";

type ChartProps = {
  data: {
    stockOne: {
      symbol: string;
      priceSeries: { date: string; price: number }[];
    };
    stockTwo: {
      symbol: string;
      priceSeries: { date: string; price: number }[];
    };
  };
};

function generateWeekdayArray(startDate: string, endDate: string): string[] {
  const weekdayArray: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      weekdayArray.push(current.toISOString().split("T")[0]);
    }
    current.setDate(current.getDate() + 1);
  }
  return weekdayArray;
}

function fillPriceSeries(
  priceSeries: { date: string; price: number }[],
  weekdayArray: string[],
): { time: string; price: number }[] {
  const priceMap = new Map(
    priceSeries.map((point) => [point.date, point.price]),
  );
  const filledPriceSeries: { time: string; price: number }[] = [];
  let lastRecordedPrice: number | null = null;

  for (const weekday of weekdayArray) {
    if (priceMap.has(weekday)) {
      lastRecordedPrice = priceMap.get(weekday)!;
    } else if (lastRecordedPrice === null) {
      lastRecordedPrice = priceSeries[0].price;
    }
    filledPriceSeries.push({ time: weekday, price: lastRecordedPrice });
  }
  return filledPriceSeries;
}

export function Chart({ data }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartContainerRef.current.style.position = "relative";

    const stockOneDates = data.stockOne.priceSeries.map((pt) => pt.date);
    const stockTwoDates = data.stockTwo.priceSeries.map((pt) => pt.date);

    const startDate = [stockOneDates[0], stockTwoDates[0]].sort()[0];
    const endDate = [
      stockOneDates[stockOneDates.length - 1],
      stockTwoDates[stockTwoDates.length - 1],
    ].sort()[1];

    const weekdayArray = generateWeekdayArray(startDate, endDate);

    const stockOneFilledPriceSeries = fillPriceSeries(
      data.stockOne.priceSeries,
      weekdayArray,
    );
    const stockTwoFilledPriceSeries = fillPriceSeries(
      data.stockTwo.priceSeries,
      weekdayArray,
    );

    const stockOneFirstPrice = stockOneFilledPriceSeries[0].price;
    const stockTwoFirstPrice = stockTwoFilledPriceSeries[0].price;

    const stockOneValueSeries = stockOneFilledPriceSeries.map((point) => ({
      time: point.time,
      value: (point.price / stockOneFirstPrice) * 10000,
    }));

    const stockTwoValueSeries = stockTwoFilledPriceSeries.map((point) => ({
      time: point.time,
      value: (point.price / stockTwoFirstPrice) * 10000,
    }));

    const chart = createChart(chartContainerRef.current, {
      layout: {
        attributionLogo: false,
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      localization: {
        locale: "zh",
      },
    });
    chart.timeScale().fitContent();

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
    stockOneLegendItem.innerHTML = `${data.stockOne.symbol}：$${stockOneFormattedLastValue}（${stockOneFormattedLastPercent}%）`;
    legend.appendChild(stockOneLegendItem);

    const stockTwoLegendItem = document.createElement("li");
    stockTwoLegendItem.className = `${styles.legendItem} ${styles.redBullet}`;
    stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}：$${stockTwoFormattedLastValue}（${stockTwoFormattedLastPercent}%）`;
    legend.appendChild(stockTwoLegendItem);

    chart.subscribeCrosshairMove((param) => {
      if (!param.time) {
        stockOneLegendItem.innerHTML = `${data.stockOne.symbol}：$${stockOneFormattedLastValue}（${stockOneFormattedLastPercent}%）`;
        stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}：$${stockTwoFormattedLastValue}（${stockTwoFormattedLastPercent}%）`;
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

      const stockOneCurrentValue =
        stockOneData && stockOneData.value !== undefined
          ? stockOneData.value
          : stockOneLastValue;
      const stockTwoCurrentValue =
        stockTwoData && stockTwoData.value !== undefined
          ? stockTwoData.value
          : stockTwoLastValue;

      const stockOneFormattedCurrentValue = stockOneCurrentValue.toFixed(2);
      const stockTwoFormattedCurrentValue = stockTwoCurrentValue.toFixed(2);
      const stockOneFormattedCurrentPercent = (
        (stockOneCurrentValue / 10000 - 1) *
        100
      ).toFixed(2);
      const stockTwoFormattedCurrentPercent = (
        (stockTwoCurrentValue / 10000 - 1) *
        100
      ).toFixed(2);

      stockOneLegendItem.innerHTML = `${data.stockOne.symbol}：$${stockOneFormattedCurrentValue}（${stockOneFormattedCurrentPercent}%）`;
      stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}：$${stockTwoFormattedCurrentValue}（${stockTwoFormattedCurrentPercent}%）`;
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
