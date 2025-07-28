"use client";

import { useRef, useEffect, useState } from "react";
import { axisLeft } from "d3-axis";
import { symbol, symbolTriangle } from "d3-shape";
import { select, type Selection } from "d3-selection";
import { scaleLinear, type ScaleLinear } from "d3-scale";
import styles from "./MetricComparisonBoxPlot.module.css";

import { formatPropertyValue } from "@/lib/stock-properties";
import type { MetricStats } from "@/lib/stock-properties";
import type { ComparableMetricKey } from "@/constants/stock-properties";

const chartConfig = {
  chart: {
    height: 450,
    minWidth: 250,
    margin: { top: 20, right: 20, bottom: 40, left: 50 },
  },
  axis: {
    ticks: 5,
    tickTextFontWeight: 600,
    tickTextFontSize: "12px",
    textColor: "oklch(37.1% 0 0)",
    gridColor: "oklch(87% 0 0)",
    gridStrokeWidth: 1,
  },
  boxAndWhiskers: {
    minWidth: 50,
    strokeWidth: 2,
    whiskerCapWidthRatio: 0.5,
    fillColor: {
      applicable: "oklch(93.2% 0.032 255.585)",
      inapplicable: "oklch(97% 0 0)",
    },
    strokeColor: {
      applicable: "oklch(54.6% 0.245 262.881)",
      inapplicable: "oklch(43.9% 0 0)",
    },
  },
  marker: {
    radius: 6,
    fillColor: {
      green: "oklch(72.3% 0.219 149.579)",
      yellow: "oklch(79.5% 0.184 86.047)",
      red: "oklch(63.7% 0.237 25.331)",
      neutral: "oklch(55.6% 0 0)",
      inapplicable: "oklch(55.6% 0 0)",
    },
  },
  label: {
    yOffset: 30,
    symbolFontSize: "14px",
    symbolFontWeight: 600,
    symbolFontColor: "oklch(26.9% 0 0)",
  },
};

type MetricColor = "green" | "yellow" | "red" | "neutral";

function createTickFormatter(
  metricKey: ComparableMetricKey,
): (d: number | { valueOf(): number }) => string {
  return (d) => {
    return formatPropertyValue(metricKey, d.valueOf(), { lang: "zh" });
  };
}

function createChartGroup({
  svg,
  width,
  height,
}: {
  svg: Selection<SVGSVGElement, unknown, null, undefined>;
  width: number;
  height: number;
}) {
  const { margin } = chartConfig.chart;
  return svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
}

function drawYAxis({
  chartGroup,
  yScale,
  innerWidth,
  tickFormatter,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  yScale: ScaleLinear<number, number>;
  innerWidth: number;
  tickFormatter: (d: number | { valueOf(): number }) => string;
}) {
  const { axis } = chartConfig;

  const yAxisGenerator = axisLeft(yScale)
    .ticks(axis.ticks)
    .tickSize(-innerWidth)
    .tickFormat(tickFormatter);

  chartGroup
    .append("g")
    .attr("class", "y-axis")
    .call(yAxisGenerator)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", axis.gridColor)
        .attr("stroke-width", axis.gridStrokeWidth)
        .attr("stroke-dasharray", "4 4"),
    )
    .call((g) =>
      g
        .selectAll(".tick text")
        .attr("fill", axis.textColor)
        .attr("font-weight", axis.tickTextFontWeight)
        .style("font-size", axis.tickTextFontSize),
    );
}

function drawLabel({
  chartGroup,
  centerX,
  innerHeight,
  stockSymbol,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  centerX: number;
  innerHeight: number;
  stockSymbol: string;
}) {
  const { label } = chartConfig;

  const yPosition = innerHeight + label.yOffset;

  chartGroup
    .append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("fill", label.symbolFontColor)
    .append("tspan")
    .attr("x", centerX)
    .attr("y", yPosition)
    .attr("font-size", label.symbolFontSize)
    .attr("font-weight", label.symbolFontWeight)
    .text(stockSymbol);
}

function drawBoxAndWhiskers({
  chartGroup,
  centerX,
  yScale,
  metricType,
  industryMetricStats,
  width,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  centerX: number;
  yScale: ScaleLinear<number, number>;
  metricType: "normal" | "inapplicable";
  industryMetricStats: MetricStats | null;
  width: number;
}) {
  if (!industryMetricStats) return;

  const { boxAndWhiskers } = chartConfig;
  const isMetricApplicable = metricType === "normal";

  const fillColor = isMetricApplicable
    ? boxAndWhiskers.fillColor.applicable
    : boxAndWhiskers.fillColor.inapplicable;
  const strokeColor = isMetricApplicable
    ? boxAndWhiskers.strokeColor.applicable
    : boxAndWhiskers.strokeColor.inapplicable;

  const boxAndWhiskersGroup = chartGroup
    .append("g")
    .attr("class", "box-and-whiskers-group");

  boxAndWhiskersGroup
    .append("rect")
    .attr("x", centerX - width / 2)
    .attr("y", yScale(industryMetricStats.q3))
    .attr("width", width)
    .attr(
      "height",
      yScale(industryMetricStats.q1) - yScale(industryMetricStats.q3),
    )
    .attr("fill", fillColor)
    .attr("stroke", strokeColor)
    .attr("stroke-width", boxAndWhiskers.strokeWidth);

  boxAndWhiskersGroup
    .append("line")
    .attr("x1", centerX - width / 2)
    .attr("x2", centerX + width / 2)
    .attr("y1", yScale(industryMetricStats.median))
    .attr("y2", yScale(industryMetricStats.median))
    .attr("stroke", strokeColor)
    .attr("stroke-width", boxAndWhiskers.strokeWidth);

  const whiskerCapWidth = width * boxAndWhiskers.whiskerCapWidthRatio;

  boxAndWhiskersGroup
    .append("line")
    .attr("x1", centerX - whiskerCapWidth / 2)
    .attr("x2", centerX + whiskerCapWidth / 2)
    .attr("y1", yScale(industryMetricStats.min))
    .attr("y2", yScale(industryMetricStats.min))
    .attr("stroke", strokeColor)
    .attr("stroke-width", boxAndWhiskers.strokeWidth);
  boxAndWhiskersGroup
    .append("line")
    .attr("x1", centerX)
    .attr("x2", centerX)
    .attr("y1", yScale(industryMetricStats.q1))
    .attr("y2", yScale(industryMetricStats.min))
    .attr("stroke", strokeColor)
    .attr("stroke-width", boxAndWhiskers.strokeWidth);

  boxAndWhiskersGroup
    .append("line")
    .attr("x1", centerX - whiskerCapWidth / 2)
    .attr("x2", centerX + whiskerCapWidth / 2)
    .attr("y1", yScale(industryMetricStats.max))
    .attr("y2", yScale(industryMetricStats.max))
    .attr("stroke", strokeColor)
    .attr("stroke-width", boxAndWhiskers.strokeWidth);
  boxAndWhiskersGroup
    .append("line")
    .attr("x1", centerX)
    .attr("x2", centerX)
    .attr("y1", yScale(industryMetricStats.q3))
    .attr("y2", yScale(industryMetricStats.max))
    .attr("stroke", strokeColor)
    .attr("stroke-width", boxAndWhiskers.strokeWidth);
}

function drawMarker({
  chartGroup,
  centerX,
  yScale,
  metricValue,
  metricType,
  metricColor,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  centerX: number;
  yScale: ScaleLinear<number, number>;
  metricValue: number | null;
  metricType: "normal" | "inapplicable";
  metricColor: MetricColor;
}) {
  if (metricValue === null) return;

  const { marker } = chartConfig;
  const isMetricApplicable = metricType === "normal";
  const domain = yScale.domain();

  const fillColor = isMetricApplicable
    ? marker.fillColor[metricColor]
    : marker.fillColor.inapplicable;

  if (metricValue > domain[1]) {
    const symbolGenerator = symbol()
      .type(symbolTriangle)
      .size(marker.radius * marker.radius * 3);

    chartGroup
      .append("path")
      .attr("class", "metric-marker off-scale-marker")
      .attr("d", symbolGenerator)
      .attr("transform", `translate(${centerX}, ${yScale(domain[1])})`)
      .attr("fill", fillColor);
  } else if (metricValue < domain[0]) {
    const symbolGenerator = symbol()
      .type(symbolTriangle)
      .size(marker.radius * marker.radius * 3);

    chartGroup
      .append("path")
      .attr("class", "metric-marker off-scale-marker")
      .attr("d", symbolGenerator)
      .attr(
        "transform",
        `translate(${centerX}, ${yScale(domain[0])}) rotate(180)`,
      )
      .attr("fill", fillColor);
  } else {
    chartGroup
      .append("circle")
      .attr("class", "metric-marker")
      .attr("cx", centerX)
      .attr("cy", yScale(metricValue))
      .attr("r", marker.radius)
      .attr("fill", fillColor);
  }
}

type MetricComparisonBoxPlotProps = {
  metricKey: ComparableMetricKey;
  stockOneSymbol: string;
  stockOneMetricValue: number | null;
  stockOneMetricColor: MetricColor;
  stockOneIndustryMetricStats: MetricStats | null;
  isStockOneMetricApplicable: boolean;
  stockTwoSymbol: string;
  stockTwoMetricValue: number | null;
  stockTwoMetricColor: MetricColor;
  stockTwoIndustryMetricStats: MetricStats | null;
  isStockTwoMetricApplicable: boolean;
};

type ChartConfiguration = {
  stockSymbol: string;
  centerX: number;
  industryMetricStats: MetricStats | null;
  metricType: "normal" | "inapplicable";
  metricValue: number | null;
  metricColor: MetricColor;
};

export function MetricComparisonBoxPlot({
  metricKey,
  stockOneSymbol,
  stockOneMetricValue,
  stockOneMetricColor,
  stockOneIndustryMetricStats,
  isStockOneMetricApplicable,
  stockTwoSymbol,
  stockTwoMetricValue,
  stockTwoMetricColor,
  stockTwoIndustryMetricStats,
  isStockTwoMetricApplicable,
}: MetricComparisonBoxPlotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: chartConfig.chart.minWidth,
    height: chartConfig.chart.height,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        setDimensions({
          width: Math.max(containerWidth, chartConfig.chart.minWidth),
          height: chartConfig.chart.height,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    const { margin } = chartConfig.chart;

    if (!svgRef.current) {
      return;
    }
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const stockOneMetricType = isStockOneMetricApplicable
      ? "normal"
      : "inapplicable";
    const stockTwoMetricType = isStockTwoMetricApplicable
      ? "normal"
      : "inapplicable";

    const validIndustryMetricStats = [
      stockOneIndustryMetricStats,
      stockTwoIndustryMetricStats,
    ].filter((stats): stats is MetricStats => !!stats);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const chartGroup = createChartGroup({ svg, width, height });

    const overallMin =
      validIndustryMetricStats.length > 0
        ? Math.min(...validIndustryMetricStats.map((s) => s.min))
        : 0;
    const overallMax =
      validIndustryMetricStats.length > 0
        ? Math.max(...validIndustryMetricStats.map((s) => s.max))
        : 0;

    const padding = (overallMax - overallMin) * 0.1 || 1;

    const validMetricValues = [stockOneMetricValue, stockTwoMetricValue].filter(
      (v): v is number => v !== null,
    );

    const minStockValue =
      validMetricValues.length > 0
        ? Math.min(...validMetricValues)
        : overallMin;
    const maxStockValue =
      validMetricValues.length > 0
        ? Math.max(...validMetricValues)
        : overallMax;

    const domainMin =
      minStockValue < overallMin
        ? Math.max(minStockValue, overallMin - padding)
        : overallMin;
    const domainMax =
      maxStockValue > overallMax
        ? Math.min(maxStockValue, overallMax + padding)
        : overallMax;

    const yScale = scaleLinear()
      .domain([domainMin, domainMax])
      .range([innerHeight, 0])
      .nice();

    const tickFormatter = createTickFormatter(metricKey);
    drawYAxis({ chartGroup, yScale, innerWidth, tickFormatter });

    const boxAndWhiskersWidth = Math.min(
      chartConfig.boxAndWhiskers.minWidth,
      innerWidth / 5,
    );
    const stockOneCenterX = (innerWidth * 1) / 3;
    const stockTwoCenterX = (innerWidth * 2) / 3;

    const chartConfigurations: ChartConfiguration[] = [
      {
        stockSymbol: stockOneSymbol,
        metricType: stockOneMetricType,
        metricValue: stockOneMetricValue,
        metricColor: stockOneMetricColor,
        industryMetricStats: stockOneIndustryMetricStats,
        centerX: stockOneCenterX,
      },
      {
        stockSymbol: stockTwoSymbol,
        metricType: stockTwoMetricType,
        metricValue: stockTwoMetricValue,
        metricColor: stockTwoMetricColor,
        industryMetricStats: stockTwoIndustryMetricStats,
        centerX: stockTwoCenterX,
      },
    ];

    for (const config of chartConfigurations) {
      drawBoxAndWhiskers({
        chartGroup,
        yScale,
        centerX: config.centerX,
        metricType: config.metricType,
        industryMetricStats: config.industryMetricStats,
        width: boxAndWhiskersWidth,
      });

      drawMarker({
        chartGroup,
        yScale,
        centerX: config.centerX,
        metricValue: config.metricValue,
        metricColor: config.metricColor,
        metricType: config.metricType,
      });

      drawLabel({
        chartGroup,
        innerHeight,
        centerX: config.centerX,
        stockSymbol: config.stockSymbol,
      });
    }
  }, [
    dimensions,
    metricKey,
    stockOneSymbol,
    stockOneMetricValue,
    stockOneMetricColor,
    stockOneIndustryMetricStats,
    isStockOneMetricApplicable,
    stockTwoSymbol,
    stockTwoMetricValue,
    stockTwoMetricColor,
    stockTwoIndustryMetricStats,
    isStockTwoMetricApplicable,
  ]);

  return (
    <div ref={containerRef} className={styles.container}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
