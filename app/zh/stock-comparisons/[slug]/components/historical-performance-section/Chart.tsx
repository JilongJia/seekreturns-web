"use client";

import clsx from "clsx";
import {
  createChart,
  ColorType,
  LineSeries,
  LineStyle,
  type MouseEventParams,
} from "lightweight-charts";
import { useRef, useEffect, useState } from "react";

import styles from "./Chart.module.css";

type ChartProps = {
  data: {
    stockOne: { symbol: string; priceSeries: RawPoint[] };
    stockTwo: { symbol: string; priceSeries: RawPoint[] };
  };
  defaultTimeRange: TimeRangeOption;
};

type RawPoint = { date: string; price: number };
type ProcessedPoint = { time: string; value: number };
type TimeRangeOption = "6M" | "1Y" | "3Y" | "5Y";

const timeRangeOptions: TimeRangeOption[] = ["6M", "1Y", "3Y", "5Y"];
const rangeDescriptions: Record<TimeRangeOption, string> = {
  "6M": "六个月",
  "1Y": "一年",
  "3Y": "三年",
  "5Y": "五年",
};

function generateWeekdayArray(startDate: string, endDate: string): string[] {
  const weekdays: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      weekdays.push(current.toISOString().split("T")[0]);
    }
    current.setDate(current.getDate() + 1);
  }

  return weekdays;
}

function fillMissingPrices(
  originalSeries: RawPoint[],
  weekdayDates: string[],
): { time: string; price: number }[] {
  const priceLookup = new Map(
    originalSeries.map((point) => [point.date, point.price]),
  );
  const filledSeries: { time: string; price: number }[] = [];
  let lastKnownPrice = originalSeries[0].price;

  weekdayDates.forEach((date) => {
    if (priceLookup.has(date)) {
      lastKnownPrice = priceLookup.get(date)!;
    }
    filledSeries.push({ time: date, price: lastKnownPrice });
  });

  return filledSeries;
}

export function Chart({ data, defaultTimeRange }: ChartProps): JSX.Element {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] =
    useState<TimeRangeOption>(defaultTimeRange);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // 1. Filter data based on selectedRange
    const getStartDate = (range: TimeRangeOption): Date => {
      const now = new Date();
      switch (range) {
        case "6M":
          now.setMonth(now.getMonth() - 6);
          break;
        case "1Y":
          now.setFullYear(now.getFullYear() - 1);
          break;
        case "3Y":
          now.setFullYear(now.getFullYear() - 3);
          break;
        case "5Y":
          now.setFullYear(now.getFullYear() - 5);
          break;
      }
      return now;
    };

    const filterStartDate = getStartDate(selectedRange);
    const stockOneFilteredSeries = data.stockOne.priceSeries.filter(
      (p) => new Date(p.date) >= filterStartDate,
    );
    const stockTwoFilteredSeries = data.stockTwo.priceSeries.filter(
      (p) => new Date(p.date) >= filterStartDate,
    );

    container.innerHTML = "";

    if (
      stockOneFilteredSeries.length === 0 ||
      stockTwoFilteredSeries.length === 0
    ) {
      container.innerHTML = `<p class="${styles.noDataMessage}">没有此时间范围内的可用数据。</p>`;
      return;
    }

    // 2. Process the filtered data
    const stockOneDates = stockOneFilteredSeries.map((p) => p.date);
    const stockTwoDates = stockTwoFilteredSeries.map((p) => p.date);
    const startDate = [stockOneDates[0], stockTwoDates[0]].sort()[0];
    const endDate = [
      stockOneDates[stockOneDates.length - 1],
      stockTwoDates[stockTwoDates.length - 1],
    ].sort()[1];
    const weekdayDates = generateWeekdayArray(startDate, endDate);

    const stockOneFilledSeries = fillMissingPrices(
      stockOneFilteredSeries,
      weekdayDates,
    );
    const stockTwoFilledSeries = fillMissingPrices(
      stockTwoFilteredSeries,
      weekdayDates,
    );

    const stockOneBasePrice = stockOneFilledSeries[0].price;
    const stockTwoBasePrice = stockTwoFilledSeries[0].price;

    const stockOnePercentageSeries: ProcessedPoint[] = stockOneFilledSeries.map(
      (pt) => ({
        time: pt.time,
        value: (pt.price / stockOneBasePrice - 1) * 100,
      }),
    );
    const stockTwoPercentageSeries: ProcessedPoint[] = stockTwoFilledSeries.map(
      (pt) => ({
        time: pt.time,
        value: (pt.price / stockTwoBasePrice - 1) * 100,
      }),
    );

    // 3. Create Chart and Series
    const formatPercentage = (price: number): string => `${price.toFixed(2)}％`;
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
        attributionLogo: false,
      },
      width: container.clientWidth,
      height: 300,
      localization: { locale: "zh", priceFormatter: formatPercentage },
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
    });
    const stockTwoLineSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
    });
    stockOneLineSeries.setData(stockOnePercentageSeries);
    stockTwoLineSeries.setData(stockTwoPercentageSeries);
    chart.timeScale().fitContent();

    // 4. Create Legend
    const legendContainer = document.createElement("ul");
    legendContainer.className = styles.legend;
    container.appendChild(legendContainer);

    const createLegendItem = (
      symbol: string,
      value: number,
      bulletClass: string,
    ): HTMLLIElement => {
      const listItem = document.createElement("li");
      listItem.className = `${styles.legendItem} ${bulletClass}`;
      const scaledValue = (1 + value / 100) * 10000;
      listItem.innerHTML = `${symbol}：$${scaledValue.toFixed(2)}（${value.toFixed(2)}％）`;
      return listItem;
    };

    const latestStockOnePercentageValue =
      stockOnePercentageSeries[stockOnePercentageSeries.length - 1].value;
    const latestStockTwoPercentageValue =
      stockTwoPercentageSeries[stockTwoPercentageSeries.length - 1].value;

    const stockOneLegendItem = createLegendItem(
      data.stockOne.symbol,
      latestStockOnePercentageValue,
      styles.blueBullet,
    );
    const stockTwoLegendItem = createLegendItem(
      data.stockTwo.symbol,
      latestStockTwoPercentageValue,
      styles.redBullet,
    );
    legendContainer.append(stockOneLegendItem, stockTwoLegendItem);

    // 5. Setup Interactive Crosshair
    const handleCrosshairMove = (params: MouseEventParams): void => {
      let currentStockOnePerc = latestStockOnePercentageValue;
      let currentStockTwoPerc = latestStockTwoPercentageValue;

      if (params.time) {
        const pointOne = params.seriesData.get(stockOneLineSeries) as
          | ProcessedPoint
          | undefined;
        const pointTwo = params.seriesData.get(stockTwoLineSeries) as
          | ProcessedPoint
          | undefined;

        if (pointOne?.value !== undefined) currentStockOnePerc = pointOne.value;
        if (pointTwo?.value !== undefined) currentStockTwoPerc = pointTwo.value;
      }

      const stockOneScaledEquiv = (1 + currentStockOnePerc / 100) * 10000;
      const stockTwoScaledEquiv = (1 + currentStockTwoPerc / 100) * 10000;

      stockOneLegendItem.innerHTML = `${data.stockOne.symbol}：$${stockOneScaledEquiv.toFixed(2)}（${currentStockOnePerc.toFixed(2)}％）`;
      stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}：$${stockTwoScaledEquiv.toFixed(2)}（${currentStockTwoPerc.toFixed(2)}％）`;
    };
    chart.subscribeCrosshairMove(handleCrosshairMove);

    // 6. Setup Resize Observer
    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    // 7. Cleanup
    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      window.removeEventListener("resize", handleResize);
      legendContainer.remove();
      chart.remove();
    };
  }, [data, selectedRange]);

  return (
    <figure>
      <div className={styles.tabsContainer}>
        {timeRangeOptions.map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={clsx(styles.tabButton, {
              [styles.activeTab]: selectedRange === range,
            })}
          >
            {range}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className={styles.chartContainer} />
      <figcaption className={styles.figcaption}>
        {data.stockOne.symbol} 与 {data.stockTwo.symbol}：过去
        {rangeDescriptions[selectedRange]}内$10,000投资回报对比。
      </figcaption>
    </figure>
  );
}
