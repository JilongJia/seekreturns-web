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

    // Initialize chart
    container.style.position = "relative";
    const formatPercentage = (price: number): string => {
      return `${price.toFixed(2)}％`;
    };
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "#fafafa" },
        textColor: "#404040",
        attributionLogo: false,
      },
      width: container.clientWidth,
      height: 300,
      localization: { locale: "zh", priceFormatter: formatPercentage },
    });

    // Add series lines
    const stockOneLineSeries: ISeriesApi<"Line"> = chart.addSeries(LineSeries, {
      color: "#2563eb",
    });
    const stockTwoLineSeries: ISeriesApi<"Line"> = chart.addSeries(LineSeries, {
      color: "#ef4444",
    });
    stockOneLineSeries.setData(stockOnePercentageSeries);
    stockTwoLineSeries.setData(stockTwoPercentageSeries);
    chart.timeScale().fitContent();

    // Legend creation
    const legendContainer = document.createElement("ul");
    legendContainer.className = styles.legend;
    container.appendChild(legendContainer);

    const createLegendItem = (
      symbol: string,
      latestPercentageValue: number,
      bulletClass: string,
    ): HTMLLIElement => {
      const listItem = document.createElement("li");
      listItem.className = `${styles.legendItem} ${bulletClass}`;
      const scaledValueEquivalent = (1 + latestPercentageValue / 100) * 10000;
      listItem.innerHTML = `${symbol}：$${scaledValueEquivalent.toFixed(2)}（${latestPercentageValue.toFixed(2)}％）`;
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

    // Crosshair move handler
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
