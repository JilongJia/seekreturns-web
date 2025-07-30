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
import styles from "./PriceComparisonLineChartFigure.module.css";

import type {
  StockAdjustedClosesData,
  StockAdjustedClosesPricePoint,
} from "@/lib/cloud-storage";

type NormalizedPoint = { time: string; value: number };
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
  originalSeries: StockAdjustedClosesPricePoint[],
  weekdayDates: string[],
): { date: string; adjClose: number }[] {
  const priceLookup = new Map(
    originalSeries.map((point) => [point.date, point.adjClose]),
  );
  const filledSeries: { date: string; adjClose: number }[] = [];
  let lastKnownPrice = originalSeries[0].adjClose;

  weekdayDates.forEach((date) => {
    if (priceLookup.has(date)) {
      lastKnownPrice = priceLookup.get(date)!;
    }
    filledSeries.push({ date: date, adjClose: lastKnownPrice });
  });

  return filledSeries;
}

type PriceComparisonLineChartFigureProps = {
  stockOneAdjustedCloses: StockAdjustedClosesData;
  stockTwoAdjustedCloses: StockAdjustedClosesData;
  defaultTimeRange: TimeRangeOption;
};

export function PriceComparisonLineChartFigure({
  stockOneAdjustedCloses,
  stockTwoAdjustedCloses,
  defaultTimeRange,
}: PriceComparisonLineChartFigureProps): JSX.Element {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] =
    useState<TimeRangeOption>(defaultTimeRange);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

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
    const stockOneFilteredSeries = stockOneAdjustedCloses.series.filter(
      (p) => new Date(p.date) >= filterStartDate,
    );
    const stockTwoFilteredSeries = stockTwoAdjustedCloses.series.filter(
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

    const stockOneBasePrice = stockOneFilledSeries[0].adjClose;
    const stockTwoBasePrice = stockTwoFilledSeries[0].adjClose;

    const stockOneNormalizedSeries: NormalizedPoint[] =
      stockOneFilledSeries.map((pt) => ({
        time: pt.date,
        value: pt.adjClose / stockOneBasePrice - 1,
      }));
    const stockTwoNormalizedSeries: NormalizedPoint[] =
      stockTwoFilledSeries.map((pt) => ({
        time: pt.date,
        value: pt.adjClose / stockTwoBasePrice - 1,
      }));

    const percentageFormatter = new Intl.NumberFormat("zh-CN", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const currencyFormatter = new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "USD",
    });

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
        attributionLogo: false,
      },
      width: container.clientWidth,
      height: 300,
      localization: {
        locale: "zh",
        priceFormatter: (price: number) => percentageFormatter.format(price),
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      grid: {
        vertLines: { color: "oklch(87% 0 0)", style: LineStyle.LargeDashed },
        horzLines: { color: "oklch(87% 0 0)", style: LineStyle.LargeDashed },
      },
    });

    const stockOneLineSeries = chart.addSeries(LineSeries, {
      color: "#2563eb",
      title: stockOneAdjustedCloses.symbol,
    });
    const stockTwoLineSeries = chart.addSeries(LineSeries, {
      color: "#ef4444",
      title: stockTwoAdjustedCloses.symbol,
    });
    stockOneLineSeries.setData(stockOneNormalizedSeries);
    stockTwoLineSeries.setData(stockTwoNormalizedSeries);
    chart.timeScale().fitContent();

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
      const scaledValue = (1 + value) * 10000;

      listItem.innerHTML = `${symbol}：${currencyFormatter.format(
        scaledValue,
      )} (${percentageFormatter.format(value)})`;
      return listItem;
    };

    const latestStockOneNormalizedValue =
      stockOneNormalizedSeries[stockOneNormalizedSeries.length - 1].value;
    const latestStockTwoNormalizedValue =
      stockTwoNormalizedSeries[stockTwoNormalizedSeries.length - 1].value;

    const stockOneLegendItem = createLegendItem(
      stockOneAdjustedCloses.symbol,
      latestStockOneNormalizedValue,
      styles.blueBullet,
    );
    const stockTwoLegendItem = createLegendItem(
      stockTwoAdjustedCloses.symbol,
      latestStockTwoNormalizedValue,
      styles.redBullet,
    );
    legendContainer.append(stockOneLegendItem, stockTwoLegendItem);

    const handleCrosshairMove = (params: MouseEventParams): void => {
      let currentStockOneNormalizedValue = latestStockOneNormalizedValue;
      let currentStockTwoNormalizedValue = latestStockTwoNormalizedValue;

      if (params.time) {
        const stockOnePoint = params.seriesData.get(stockOneLineSeries) as
          | NormalizedPoint
          | undefined;
        const stockTwoPoint = params.seriesData.get(stockTwoLineSeries) as
          | NormalizedPoint
          | undefined;

        if (stockOnePoint?.value !== undefined)
          currentStockOneNormalizedValue = stockOnePoint.value;
        if (stockTwoPoint?.value !== undefined)
          currentStockTwoNormalizedValue = stockTwoPoint.value;
      }

      const stockOneScaledEquiv = (1 + currentStockOneNormalizedValue) * 10000;
      const stockTwoScaledEquiv = (1 + currentStockTwoNormalizedValue) * 10000;

      stockOneLegendItem.innerHTML = `${
        stockOneAdjustedCloses.symbol
      }：${currencyFormatter.format(
        stockOneScaledEquiv,
      )} (${percentageFormatter.format(currentStockOneNormalizedValue)})`;
      stockTwoLegendItem.innerHTML = `${
        stockTwoAdjustedCloses.symbol
      }：${currencyFormatter.format(
        stockTwoScaledEquiv,
      )} (${percentageFormatter.format(currentStockTwoNormalizedValue)})`;
    };
    chart.subscribeCrosshairMove(handleCrosshairMove);

    const handleResize = () =>
      chart.applyOptions({ width: container.clientWidth });
    window.addEventListener("resize", handleResize);

    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      window.removeEventListener("resize", handleResize);
      legendContainer.remove();
      chart.remove();
    };
  }, [stockOneAdjustedCloses, stockTwoAdjustedCloses, selectedRange]);

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
        {stockOneAdjustedCloses.symbol} 与 {stockTwoAdjustedCloses.symbol}
        ：过去{rangeDescriptions[selectedRange]}内$10,000投资回报对比。
      </figcaption>
    </figure>
  );
}
