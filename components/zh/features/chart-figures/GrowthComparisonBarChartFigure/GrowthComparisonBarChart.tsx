"use client";

import { useRef, useEffect, useState } from "react";
import { axisBottom, axisLeft } from "d3-axis";
import { select, type Selection } from "d3-selection";
import {
  scaleBand,
  scaleLinear,
  type ScaleLinear,
  type ScaleBand,
} from "d3-scale";

import styles from "./GrowthComparisonBarChart.module.css";
import type { GrowthData } from "./types";

const chartConfig = {
  chart: {
    height: 450,
    minWidth: 500,
    margin: { top: 20, right: 20, bottom: 65, left: 50 },
  },
  yAxis: {
    ticks: 5,
    tickTextFontWeight: 600,
    tickTextFontSize: "12px",
    textColor: "oklch(37.1% 0 0)",
    gridColor: "oklch(87% 0 0)",
    gridStrokeWidth: 1,
  },
  xAxis: {
    tickTextFontWeight: 600,
    tickTextFontSize: "12px",
    textColor: "oklch(37.1% 0 0)",
    verticalOffset: 10,
  },
  bar: {
    stockOneColor: "oklch(54.6% 0.245 262.881)",
    stockTwoColor: "oklch(64.6% 0.222 41.116)",
    padding: 0.1,
  },
  legend: {
    yOffset: 50,
    boxSize: 12,
    spacing: 25,
    textOffset: 20,
    textColor: "oklch(26.9% 0 0)",
    textFontWeight: 600,
    textFontSize: "13px",
  },
};

const metricLabels: Record<keyof GrowthData, string> = {
  growthMrqYoy: "MRQ (YoY)",
  growthTtmYoy: "TTM (YoY)",
  growth3yCagr: "3-Year CAGR",
  growth5yCagr: "5-Year CAGR",
};

const metricKeys: (keyof GrowthData)[] = [
  "growthMrqYoy",
  "growthTtmYoy",
  "growth3yCagr",
  "growth5yCagr",
];

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

function drawXAxis({
  chartGroup,
  xScale,
  innerHeight,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  xScale: ScaleBand<string>;
  innerHeight: number;
}) {
  const { xAxis } = chartConfig;
  const xAxisGenerator = axisBottom(xScale).tickFormat(
    (d) => metricLabels[d as keyof GrowthData],
  );
  const xAxisY = innerHeight + xAxis.verticalOffset;

  chartGroup
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${xAxisY})`)
    .call(xAxisGenerator)
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").remove())
    .call((g) =>
      g
        .selectAll(".tick text")
        .attr("fill", xAxis.textColor)
        .style("font-weight", xAxis.tickTextFontWeight)
        .style("font-size", xAxis.tickTextFontSize),
    );
}

function drawYAxis({
  chartGroup,
  yScale,
  innerWidth,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  yScale: ScaleLinear<number, number>;
  innerWidth: number;
}) {
  const { yAxis } = chartConfig;
  const yAxisGenerator = axisLeft(yScale)
    .ticks(yAxis.ticks)
    .tickSize(-innerWidth)
    .tickFormat((d) =>
      new Intl.NumberFormat("en-US", { style: "percent" }).format(d as number),
    );

  chartGroup
    .append("g")
    .attr("class", "y-axis")
    .call(yAxisGenerator)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", yAxis.gridColor)
        .attr("stroke-width", yAxis.gridStrokeWidth)
        .attr("stroke-dasharray", "4 4"),
    )
    .call((g) =>
      g
        .selectAll(".tick text")
        .attr("fill", yAxis.textColor)
        .style("font-weight", yAxis.tickTextFontWeight)
        .style("font-size", yAxis.tickTextFontSize),
    );
}

function drawBars({
  chartGroup,
  xScale,
  yScale,
  stockOneSymbol,
  stockOneGrowth,
  stockTwoSymbol,
  stockTwoGrowth,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  stockOneSymbol: string;
  stockOneGrowth: GrowthData;
  stockTwoSymbol: string;
  stockTwoGrowth: GrowthData;
}) {
  const { bar } = chartConfig;

  const xSubgroupScale = scaleBand()
    .domain([stockOneSymbol, stockTwoSymbol])
    .range([0, xScale.bandwidth()])
    .padding(bar.padding);

  const barGroups = chartGroup
    .selectAll(".bar-group")
    .data(metricKeys)
    .enter()
    .append("g")
    .attr("class", "bar-group")
    .attr("transform", (d) => `translate(${xScale(d) as number},0)`);

  barGroups.each((metricKey, i, nodes) => {
    const value = stockOneGrowth[metricKey];
    if (value !== null && typeof value !== "undefined") {
      select(nodes[i])
        .append("rect")
        .attr("x", xSubgroupScale(stockOneSymbol) as number)
        .attr("y", value >= 0 ? yScale(value) : yScale(0))
        .attr("width", xSubgroupScale.bandwidth())
        .attr("height", Math.abs(yScale(0) - yScale(value)))
        .attr("fill", bar.stockOneColor);
    }
  });

  barGroups.each((metricKey, i, nodes) => {
    const value = stockTwoGrowth[metricKey];
    if (value !== null && typeof value !== "undefined") {
      select(nodes[i])
        .append("rect")
        .attr("x", xSubgroupScale(stockTwoSymbol) as number)
        .attr("y", value >= 0 ? yScale(value) : yScale(0))
        .attr("width", xSubgroupScale.bandwidth())
        .attr("height", Math.abs(yScale(0) - yScale(value)))
        .attr("fill", bar.stockTwoColor);
    }
  });
}

function drawLegend({
  chartGroup,
  innerWidth,
  innerHeight,
  stockOneSymbol,
  stockTwoSymbol,
}: {
  chartGroup: Selection<SVGGElement, unknown, null, undefined>;
  innerWidth: number;
  innerHeight: number;
  stockOneSymbol: string;
  stockTwoSymbol: string;
}) {
  const { legend, bar } = chartConfig;
  const legendY = innerHeight + legend.yOffset;

  const legendGroup = chartGroup.append("g").attr("class", "legend");

  const legendItemOne = legendGroup.append("g");
  legendItemOne
    .append("rect")
    .attr("width", legend.boxSize)
    .attr("height", legend.boxSize)
    .attr("fill", bar.stockOneColor);
  legendItemOne
    .append("text")
    .attr("x", legend.textOffset)
    .attr("y", legend.boxSize / 2)
    .attr("dy", "0.35em")
    .text(stockOneSymbol)
    .attr("fill", legend.textColor)
    .style("font-size", legend.textFontSize)
    .style("font-weight", legend.textFontWeight);

  const legendItemTwo = legendGroup.append("g");
  legendItemTwo
    .append("rect")
    .attr("width", legend.boxSize)
    .attr("height", legend.boxSize)
    .attr("fill", bar.stockTwoColor);
  legendItemTwo
    .append("text")
    .attr("x", legend.textOffset)
    .attr("y", legend.boxSize / 2)
    .attr("dy", "0.35em")
    .text(stockTwoSymbol)
    .attr("fill", legend.textColor)
    .style("font-size", legend.textFontSize)
    .style("font-weight", legend.textFontWeight);

  const itemOneWidth = (legendItemOne.node() as SVGGElement).getBBox().width;
  const itemTwoWidth = (legendItemTwo.node() as SVGGElement).getBBox().width;

  const totalLegendWidth = itemOneWidth + legend.spacing + itemTwoWidth;
  const startX = (innerWidth - totalLegendWidth) / 2;

  legendItemOne.attr("transform", `translate(${startX}, ${legendY})`);
  legendItemTwo.attr(
    "transform",
    `translate(${startX + itemOneWidth + legend.spacing}, ${legendY})`,
  );
}

type GrowthComparisonBarChartProps = {
  stockOneSymbol: string;
  stockOneGrowth: GrowthData;
  stockTwoSymbol: string;
  stockTwoGrowth: GrowthData;
};

export function GrowthComparisonBarChart({
  stockOneSymbol,
  stockOneGrowth,
  stockTwoSymbol,
  stockTwoGrowth,
}: GrowthComparisonBarChartProps) {
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

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const chartGroup = createChartGroup({ svg, width, height });

    const allValues = [
      ...Object.values(stockOneGrowth),
      ...Object.values(stockTwoGrowth),
    ].filter((v): v is number => v !== null);

    const yMin = Math.min(0, ...allValues);
    const yMax = Math.max(0, ...allValues);

    const yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([innerHeight, 0])
      .nice();

    const xScale = scaleBand()
      .domain(metricKeys)
      .range([0, innerWidth])
      .padding(0.3);

    drawYAxis({ chartGroup, yScale, innerWidth });
    drawXAxis({ chartGroup, xScale, innerHeight });
    drawBars({
      chartGroup,
      xScale,
      yScale,
      stockOneSymbol,
      stockOneGrowth,
      stockTwoSymbol,
      stockTwoGrowth,
    });
    drawLegend({
      chartGroup,
      innerWidth,
      innerHeight,
      stockOneSymbol,
      stockTwoSymbol,
    });
  }, [
    dimensions,
    stockOneSymbol,
    stockOneGrowth,
    stockTwoSymbol,
    stockTwoGrowth,
  ]);

  return (
    <div ref={containerRef} className={styles.container}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
