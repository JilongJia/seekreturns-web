"use client";

import { useRef, useEffect, useState } from "react";
import { axisLeft } from "d3-axis";
import { symbol, symbolTriangle } from "d3-shape";
import { select, type Selection } from "d3-selection";
import { scaleLinear, type ScaleLinear } from "d3-scale";

import { calculateMetricColor } from "@/app/lib/stock-analysis/calculateMetricColor";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

const plotConfig = {
  plot: {
    height: 450,
    minWidth: 250,
    margin: { top: 20, right: 20, bottom: 60, left: 32 },
  },
  axis: {
    ticks: 5,
    tickTextFontWeight: 600,
    tickTextFontSize: "12px",
    textColor: "oklch(55.3% 0.013 58.071)",
    gridColor: "oklch(86.9% 0.005 56.366)",
    gridStrokeWidth: 1,
  },
  boxAndWhiskers: {
    minWidth: 50,
    strokeWidth: 2,
    whiskerCapWidthRatio: 0.5,
    fillColor: {
      applicable: "oklch(95.1% 0.026 236.824)",
      inapplicable: "oklch(92.3% 0.003 48.717)",
    },
    strokeColor: {
      applicable: "oklch(58.8% 0.158 241.966)",
      inapplicable: "oklch(55.3% 0.013 58.071)",
    },
  },
  marker: {
    radius: 6,
    fillColor: {
      lime: "oklch(76.8% 0.233 130.85)",
      amber: "oklch(76.9% 0.188 70.08)",
      rose: "oklch(64.5% 0.246 16.439)",
      inapplicable: "oklch(55.3% 0.013 58.071)",
      stone: "oklch(55.3% 0.013 58.071)",
    },
  },
  label: {
    yOffset: 0,
    symbolFontSize: "14px",
    symbolFontWeight: 600,
    symbolFontColor: "oklch(26.8% 0.007 34.298)",
  },
};

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

function createPlotGroup({
  svg,
  width,
  height,
}: {
  svg: Selection<SVGSVGElement, unknown, null, undefined>;
  width: number;
  height: number;
}) {
  const { margin } = plotConfig.plot;
  return svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
}

function drawYAxis({
  plotGroup,
  yScale,
  innerWidth,
}: {
  plotGroup: Selection<SVGGElement, unknown, null, undefined>;
  yScale: ScaleLinear<number, number>;
  innerWidth: number;
}) {
  const { axis } = plotConfig;
  const yAxisGenerator = axisLeft(yScale)
    .ticks(axis.ticks)
    .tickSize(-innerWidth);

  plotGroup
    .append("g")
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
  plotGroup,
  centerX,
  innerHeight,
  stockSymbol,
}: {
  plotGroup: Selection<SVGGElement, unknown, null, undefined>;
  centerX: number;
  innerHeight: number;
  stockSymbol: string;
}) {
  const { label, plot } = plotConfig;
  const yPosition = innerHeight + plot.margin.bottom / 2 + label.yOffset;
  plotGroup
    .append("text")
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
  plotGroup,
  centerX,
  yScale,
  metricType,
  industryMetricStats,
  width,
}: {
  plotGroup: Selection<SVGGElement, unknown, null, undefined>;
  centerX: number;
  yScale: ScaleLinear<number, number>;
  metricType: "normal" | "inapplicable";
  industryMetricStats: IndustryMetricStats | null;
  width: number;
}) {
  if (!industryMetricStats) return;

  const { boxAndWhiskers } = plotConfig;
  const isMetricApplicable = metricType === "normal";

  const fillColor = isMetricApplicable
    ? boxAndWhiskers.fillColor.applicable
    : boxAndWhiskers.fillColor.inapplicable;
  const strokeColor = isMetricApplicable
    ? boxAndWhiskers.strokeColor.applicable
    : boxAndWhiskers.strokeColor.inapplicable;

  const boxAndWhiskersGroup = plotGroup.append("g");

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
  plotGroup,
  centerX,
  yScale,
  metricValue,
  metricType,
  metricColor,
}: {
  plotGroup: Selection<SVGGElement, unknown, null, undefined>;
  centerX: number;
  yScale: ScaleLinear<number, number>;
  metricValue: number | null;
  metricType: "normal" | "inapplicable";
  metricColor: "lime" | "amber" | "rose" | "stone";
}) {
  if (metricValue === null) return;

  const { marker } = plotConfig;
  const isMetricApplicable = metricType === "normal";
  const domain = yScale.domain();

  const fillColor = isMetricApplicable
    ? marker.fillColor[metricColor]
    : marker.fillColor.inapplicable;

  if (metricValue > domain[1]) {
    const symbolGenerator = symbol()
      .type(symbolTriangle)
      .size(marker.radius * marker.radius * 3);

    plotGroup
      .append("path")
      .attr("d", symbolGenerator)
      .attr("transform", `translate(${centerX}, ${yScale(domain[1])})`)
      .attr("fill", fillColor);
  } else if (metricValue < domain[0]) {
    const symbolGenerator = symbol()
      .type(symbolTriangle)
      .size(marker.radius * marker.radius * 3);

    plotGroup
      .append("path")
      .attr("d", symbolGenerator)
      .attr(
        "transform",
        `translate(${centerX}, ${yScale(domain[0])}) rotate(180)`,
      )
      .attr("fill", fillColor);
  } else {
    plotGroup
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", yScale(metricValue))
      .attr("r", marker.radius)
      .attr("fill", fillColor);
  }
}

type MetricComparisonBoxPlotProps = {
  metricCode: MetricCode;
  metricName: string;
  stockOneSymbol: string;
  stockOneIndustryName: string;
  stockOneMetricValue: number | null;
  stockOneIndustryMetricStats: IndustryMetricStats | null;
  isStockOneMetricApplicable: boolean;
  stockTwoSymbol: string;
  stockTwoIndustryName: string;
  stockTwoMetricValue: number | null;
  stockTwoIndustryMetricStats: IndustryMetricStats | null;
  isStockTwoMetricApplicable: boolean;
};

type PlotConfiguration = {
  stockSymbol: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  centerX: number;
  metricType: "normal" | "inapplicable";
  metricColor: "lime" | "amber" | "rose" | "stone";
};

export function MetricComparisonBoxPlot({
  metricCode,
  metricName,
  stockOneSymbol,
  stockOneIndustryName,
  stockOneMetricValue,
  stockOneIndustryMetricStats,
  isStockOneMetricApplicable,
  stockTwoSymbol,
  stockTwoIndustryName,
  stockTwoMetricValue,
  stockTwoIndustryMetricStats,
  isStockTwoMetricApplicable,
}: MetricComparisonBoxPlotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: plotConfig.plot.minWidth,
    height: plotConfig.plot.height,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        setDimensions({
          width: Math.max(containerWidth, plotConfig.plot.minWidth),
          height: plotConfig.plot.height,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    const { margin } = plotConfig.plot;

    const svg = select(svgRef.current!);
    svg.selectAll("*").remove();

    const stockOneMetricType = isStockOneMetricApplicable
      ? "normal"
      : "inapplicable";
    const stockOneMetricColor = calculateMetricColor({
      metricCode,
      metricValue: stockOneMetricValue,
      metricStats: stockOneIndustryMetricStats,
    });

    const stockTwoMetricType = isStockTwoMetricApplicable
      ? "normal"
      : "inapplicable";
    const stockTwoMetricColor = calculateMetricColor({
      metricCode,
      metricValue: stockTwoMetricValue,
      metricStats: stockTwoIndustryMetricStats,
    });

    const validIndustryMetricStats = [
      stockOneIndustryMetricStats,
      stockTwoIndustryMetricStats,
    ].filter((stats): stats is IndustryMetricStats => !!stats);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const plotGroup = createPlotGroup({ svg, width, height });

    const overallMin =
      validIndustryMetricStats.length > 0
        ? Math.min(...validIndustryMetricStats.map((s) => s.min))
        : 0;
    const overallMax =
      validIndustryMetricStats.length > 0
        ? Math.max(...validIndustryMetricStats.map((s) => s.max))
        : 0;

    const padding = (overallMax - overallMin) * 0.1 || 1;
    const domainMin = overallMin - padding;
    const domainMax = overallMax + padding;

    const yScale = scaleLinear()
      .domain([domainMin, domainMax])
      .range([innerHeight, 0])
      .nice();

    drawYAxis({ plotGroup, yScale, innerWidth });

    const boxAndWhiskersWidth = Math.min(
      plotConfig.boxAndWhiskers.minWidth,
      innerWidth / 5,
    );
    const stockOneCenterX = (innerWidth * 1) / 3;
    const stockTwoCenterX = (innerWidth * 2) / 3;

    const plotConfigurations: PlotConfiguration[] = [
      {
        stockSymbol: stockOneSymbol,
        metricValue: stockOneMetricValue,
        metricType: stockOneMetricType,
        metricColor: stockOneMetricColor,
        industryMetricStats: stockOneIndustryMetricStats,
        centerX: stockOneCenterX,
      },
      {
        stockSymbol: stockTwoSymbol,
        metricValue: stockTwoMetricValue,
        metricType: stockTwoMetricType,
        metricColor: stockTwoMetricColor,
        industryMetricStats: stockTwoIndustryMetricStats,
        centerX: stockTwoCenterX,
      },
    ];

    for (const config of plotConfigurations) {
      drawBoxAndWhiskers({
        plotGroup,
        yScale,
        centerX: config.centerX,
        metricType: config.metricType,
        industryMetricStats: config.industryMetricStats,
        width: boxAndWhiskersWidth,
      });

      drawMarker({
        plotGroup,
        yScale,
        centerX: config.centerX,
        metricValue: config.metricValue,
        metricColor: config.metricColor,
        metricType: config.metricType,
      });

      drawLabel({
        plotGroup,
        innerHeight,
        centerX: config.centerX,
        stockSymbol: config.stockSymbol,
      });
    }
  }, [
    dimensions,
    metricCode,
    metricName,
    stockOneSymbol,
    stockOneIndustryName,
    stockOneMetricValue,
    stockOneIndustryMetricStats,
    isStockOneMetricApplicable,
    stockTwoSymbol,
    stockTwoIndustryName,
    stockTwoMetricValue,
    stockTwoIndustryMetricStats,
    isStockTwoMetricApplicable,
  ]);

  return (
    <div ref={containerRef} style={{ overflowX: "auto" }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
