"use client";

import { useRef, useEffect } from "react";
import {
  createChart,
  ColorType,
  LineSeries,
  type MouseEventParams,
  type ISeriesApi,
} from "lightweight-charts";

import styles from "./Chart.module.css";

type RawPoint = { date: string; price: number };

type ProcessedPoint = { time: string; value: number };

type ChartProps = {
  data: {
    stockOne: { symbol: string; priceSeries: RawPoint[] };
    stockTwo: { symbol: string; priceSeries: RawPoint[] };
  };
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

export function Chart({ data }: ChartProps): JSX.Element {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // Prepare date ranges
    const stockOneDates = data.stockOne.priceSeries.map((p) => p.date);
    const stockTwoDates = data.stockTwo.priceSeries.map((p) => p.date);
    const startDate = [stockOneDates[0], stockTwoDates[0]].sort()[0];
    const endDate = [
      stockOneDates[stockOneDates.length - 1],
      stockTwoDates[stockTwoDates.length - 1],
    ].sort()[1];
    const weekdayDates = generateWeekdayArray(startDate, endDate);

    // Fill missing prices for weekends
    const stockOneFilledSeries = fillMissingPrices(
      data.stockOne.priceSeries,
      weekdayDates,
    );
    const stockTwoFilledSeries = fillMissingPrices(
      data.stockTwo.priceSeries,
      weekdayDates,
    );

    // Normalize series to initial value of 10000
    const stockOneBasePrice = stockOneFilledSeries[0].price;
    const stockTwoBasePrice = stockTwoFilledSeries[0].price;

    const stockOneValueSeries: ProcessedPoint[] = stockOneFilledSeries.map(
      (pt) => ({
        time: pt.time,
        value: (pt.price / stockOneBasePrice) * 10000,
      }),
    );

    const stockTwoValueSeries: ProcessedPoint[] = stockTwoFilledSeries.map(
      (pt) => ({
        time: pt.time,
        value: (pt.price / stockTwoBasePrice) * 10000,
      }),
    );

    // Initialize chart
    container.style.position = "relative";
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
        attributionLogo: false,
      },
      width: container.clientWidth,
      height: 300,
      localization: { locale: "zh" },
    });

    // Add series lines
    const stockOneLineSeries: ISeriesApi<"Line"> = chart.addSeries(LineSeries, {
      color: "#2563eb",
    });
    const stockTwoLineSeries: ISeriesApi<"Line"> = chart.addSeries(LineSeries, {
      color: "#ef4444",
    });
    stockOneLineSeries.setData(stockOneValueSeries);
    stockTwoLineSeries.setData(stockTwoValueSeries);
    chart.timeScale().fitContent();

    // Legend creation
    const legendContainer = document.createElement("ul");
    legendContainer.className = styles.legend;
    container.appendChild(legendContainer);

    const createLegendItem = (
      symbol: string,
      latestValue: number,
      bulletClass: string,
    ): HTMLLIElement => {
      const listItem = document.createElement("li");
      listItem.className = `${styles.legendItem} ${bulletClass}`;
      const percentageChange = ((latestValue / 10000 - 1) * 100).toFixed(2);
      listItem.innerHTML = `${symbol}：$${latestValue.toFixed(2)}（${percentageChange}%）`;
      return listItem;
    };

    const latestStockOneValue =
      stockOneValueSeries[stockOneValueSeries.length - 1].value;
    const latestStockTwoValue =
      stockTwoValueSeries[stockTwoValueSeries.length - 1].value;
    const stockOneLegendItem = createLegendItem(
      data.stockOne.symbol,
      latestStockOneValue,
      styles.blueBullet,
    );
    const stockTwoLegendItem = createLegendItem(
      data.stockTwo.symbol,
      latestStockTwoValue,
      styles.redBullet,
    );
    legendContainer.append(stockOneLegendItem, stockTwoLegendItem);

    // Crosshair move handler
    const handleCrosshairMove = (params: MouseEventParams): void => {
      if (!params.time) {
        stockOneLegendItem.innerHTML = `${data.stockOne.symbol}：$${latestStockOneValue.toFixed(2)}（${((latestStockOneValue / 10000 - 1) * 100).toFixed(2)}%）`;
        stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}：$${latestStockTwoValue.toFixed(2)}（${((latestStockTwoValue / 10000 - 1) * 100).toFixed(2)}%）`;
        return;
      }
      const pointOne = params.seriesData.get(stockOneLineSeries) as
        | ProcessedPoint
        | undefined;
      const pointTwo = params.seriesData.get(stockTwoLineSeries) as
        | ProcessedPoint
        | undefined;
      const currentStockOneValue = pointOne?.value ?? latestStockOneValue;
      const currentStockTwoValue = pointTwo?.value ?? latestStockTwoValue;
      stockOneLegendItem.innerHTML = `${data.stockOne.symbol}：$${currentStockOneValue.toFixed(2)}（${((currentStockOneValue / 10000 - 1) * 100).toFixed(2)}%）`;
      stockTwoLegendItem.innerHTML = `${data.stockTwo.symbol}：$${currentStockTwoValue.toFixed(2)}（${((currentStockTwoValue / 10000 - 1) * 100).toFixed(2)}%）`;
    };
    chart.subscribeCrosshairMove(handleCrosshairMove);

    // Resize handler
    const handleWindowResize = (): void => {
      if (container) {
        chart.applyOptions({ width: container.clientWidth });
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      window.removeEventListener("resize", handleWindowResize);
      legendContainer.remove();
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
}
