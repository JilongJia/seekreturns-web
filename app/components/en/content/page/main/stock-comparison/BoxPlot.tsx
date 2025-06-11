"use client";

import { useRef, useEffect, useState } from "react";
import { axisLeft } from "d3-axis";
import { select, type Selection } from "d3-selection";
import { scaleLinear, type ScaleLinear } from "d3-scale";
import { symbol, symbolTriangle } from "d3-shape";

import { calculateMetricStats } from "@/app/lib/stock-analysis/calculateMetricStats";
import { calculateMetricColor } from "@/app/lib/stock-analysis/calculateMetricColor";
import { getIndustryMetric } from "@/app/lib/stock-analysis/getIndustryMetric";
import { getMetricApplicability } from "@/app/lib/stock-analysis/getMetricApplicability";
import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";
import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { formatNumber } from "./lib/formatNumber";

const plotConfig = {
  plot: {
    height: 450,
    minWidth: 500,
    margin: { top: 20, right: 20, bottom: 60, left: 30 },
    gap: 15,
  },
  axis: {
    ticks: 5,
    tickTextFontWeight: 600,
    tickTextFontSize: "12px",
    textColor: "#737373",
    gridColor: "#d4d4d4",
    gridStrokeWidth: 1,
  },
  boxAndWhiskers: {
    minWidth: 50,
    strokeWidth: 2,
    whiskerCapWidthRatio: 0.5,
    fillColor: {
      applicable: "#dbeafe",
      inapplicable: "#e5e5e5",
    },
    strokeColor: {
      applicable: "#2563eb",
      inapplicable: "#737373",
    },
  },
  marker: {
    radius: 6,
    fillColor: {
      green: "#84cc16",
      yellow: "#f59e0b",
      red: "#ef4444",
      inapplicable: "#737373",
      stone: "#737373",
    },
  },
  label: {
    yOffset: 0,
    symbolFontSize: "14px",
    symbolFontWeight: 600,
    symbolFontColor: "#171717",
  },
  summaryBox: {
    padding: "12px 12px",
    yOffset: 0,
    borderRadius: "8px",
    fillColor: "rgba(255, 255, 255, 0.85)",
    strokeColor: "#e5e5e5",
    strokeWidth: 1,
    shadow: {
      dx: 2,
      dy: 2,
      stdDeviation: 3,
      floodColor: "#000000",
      floodOpacity: 0.15,
    },
    lineHeight: 1.6,
    metricNameFontColor: "#171717",
    metricNameFontWeight: 700,
    metricNameFontSize: "16px",
    metricNameMarginBottom: "4px",
    symbolFontColor: {
      applicable: "#262626",
      inapplicable: "#737373",
    },
    symbolFontWeight: 600,
    symbolFontSize: "14px",
    symbolMarginBottom: "6px",
    metricValueFontColor: "#fafafa",
    metricValueBorderRadius: "4px",
    metricValuePadding: "2px 0",
    metricValueBackgroundColor: {
      green: "#84cc16",
      yellow: "#f59e0b",
      red: "#ef4444",
      inapplicable: "#737373",
      stone: "#737373",
    },
    metricValueFontSize: "14px",
    metricValueFontWeight: 700,
    metricValueMarginBottom: "12px",
    industryFontColor: "#262626",
    industryFontSize: "12px",
    industryFontWeight: 600,
    industryMarginBottom: "5px",
    statsFontColor: {
      applicable: "#525252",
      inapplicable: "#737373",
    },
    statsFontSize: "12px",
    statsFontWeight: 400,
    disclaimerFontColor: "#737373",
    disclaimerFontSize: "10px",
    disclaimerMarginTop: "12px",
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
  industryMetricStats: IndustryMetricStats;
  width: number;
}) {
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
  metricColor: "green" | "yellow" | "red" | "stone";
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

function drawSummaryBox({
  plotGroup,
  width,
  x,
  stockSymbol,
  metricName,
  metricValue,
  metricType,
  metricColor,
  industryCode,
  industryMetricStats,
}: {
  plotGroup: Selection<SVGGElement, unknown, null, undefined>;
  width: number;
  x: number;
  stockSymbol: string;
  metricName: string;
  metricValue: number | null;
  metricType: "normal" | "inapplicable";
  metricColor: "green" | "yellow" | "red" | "stone";
  industryCode: string;
  industryMetricStats: IndustryMetricStats | null;
}) {
  const { summaryBox } = plotConfig;
  const isMetricApplicable = metricType === "normal";

  const symbolFontColor = isMetricApplicable
    ? summaryBox.symbolFontColor.applicable
    : summaryBox.symbolFontColor.inapplicable;

  const statsFontColor = isMetricApplicable
    ? summaryBox.statsFontColor.applicable
    : summaryBox.statsFontColor.inapplicable;

  const metricValueBackgroundColor = isMetricApplicable
    ? summaryBox.metricValueBackgroundColor[metricColor]
    : summaryBox.metricValueBackgroundColor.inapplicable;

  const summaryGroup = plotGroup
    .append("g")
    .attr("transform", `translate(${x}, ${summaryBox.yOffset})`);

  const backgroundRect = summaryGroup
    .append("rect")
    .attr("width", width)
    .attr("rx", summaryBox.borderRadius)
    .attr("ry", summaryBox.borderRadius)
    .attr("fill", summaryBox.fillColor)
    .attr("stroke", summaryBox.strokeColor)
    .attr("stroke-width", summaryBox.strokeWidth)
    .style("filter", "url(#drop-shadow)");

  const foreignObject = summaryGroup
    .append("foreignObject")
    .attr("width", width);

  const div = foreignObject
    .append("xhtml:div")
    .style("width", "100%")
    .style("padding", summaryBox.padding)
    .style("box-sizing", "border-box")
    .style("line-height", summaryBox.lineHeight);

  const maxStat = industryMetricStats
    ? formatNumber({ number: industryMetricStats.max })
    : "--";
  const q3Stat = industryMetricStats
    ? formatNumber({ number: industryMetricStats.q3 })
    : "--";
  const medianStat = industryMetricStats
    ? formatNumber({ number: industryMetricStats.median })
    : "--";
  const q1Stat = industryMetricStats
    ? formatNumber({ number: industryMetricStats.q1 })
    : "--";
  const minStat = industryMetricStats
    ? formatNumber({ number: industryMetricStats.min })
    : "--";

  let disclaimerHtml = "";
  if (!isMetricApplicable) {
    disclaimerHtml = `
      <div style="color: ${summaryBox.disclaimerFontColor}; font-size: ${summaryBox.disclaimerFontSize}; font-style: italic; margin-top: ${summaryBox.disclaimerMarginTop};">
        *${metricName} may not be suitable for the ${industryCode} industry.
      </div>
    `;
  }

  div.html(`
    <div style="font-size: ${summaryBox.metricNameFontSize}; font-weight: ${summaryBox.metricNameFontWeight}; color: ${summaryBox.metricNameFontColor}; margin-bottom: ${summaryBox.metricNameMarginBottom};">
      ${metricName}
    </div>
    <div style="font-size: ${summaryBox.symbolFontSize}; font-weight: ${summaryBox.symbolFontWeight}; color: ${symbolFontColor}; margin-bottom: ${summaryBox.symbolMarginBottom};">
      ${stockSymbol}
    </div>
    <div style="background-color: ${metricValueBackgroundColor}; color: ${summaryBox.metricValueFontColor}; border-radius: ${summaryBox.metricValueBorderRadius}; padding: ${summaryBox.metricValuePadding}; text-align: center; font-size: ${summaryBox.metricValueFontSize}; font-weight: ${summaryBox.metricValueFontWeight}; margin-bottom: ${summaryBox.metricValueMarginBottom};">
      ${formatNumber({ number: metricValue })}
    </div>
    <div style="font-size: ${summaryBox.industryFontSize}; font-weight: ${summaryBox.industryFontWeight}; color: ${summaryBox.industryFontColor}; margin-bottom: ${summaryBox.industryMarginBottom};">
      ${industryCode} Industry
    </div>
    <div style="font-size: ${summaryBox.statsFontSize}; font-weight: ${summaryBox.statsFontWeight}; color: ${statsFontColor};">
      Max: ${maxStat}<br/>
      Q3: ${q3Stat}<br/>
      Median: ${medianStat}<br/>
      Q1: ${q1Stat}<br/>
      Min: ${minStat}
    </div>
    ${disclaimerHtml}
  `);

  const contentHeight = (div.node() as HTMLDivElement).getBoundingClientRect()
    .height;
  backgroundRect.attr("height", contentHeight);
  foreignObject.attr("height", contentHeight);
}

type MetricComparisonBoxPlotProps = {
  metricCode: MetricCode;
  stockOneSymbol: string;
  stockOneIndustry: IndustryCode;
  stockOneValue: number;
  stockTwoSymbol: string;
  stockTwoIndustry: IndustryCode;
  stockTwoValue: number;
};

type PlotConfiguration = {
  stockSymbol: string;
  industryCode: IndustryCode;
  metricValue: number;
  industryMetricStats: IndustryMetricStats | null;
  centerX: number;
  summaryBoxWidth: number;
  summaryBoxX: number;
  metricType: "normal" | "inapplicable";
  metricColor: "green" | "yellow" | "red" | "stone";
};

export function MetricComparisonBoxPlot({
  metricCode,
  stockOneSymbol,
  stockOneIndustry,
  stockOneValue,
  stockTwoSymbol,
  stockTwoIndustry,
  stockTwoValue,
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
    const { margin, gap } = plotConfig.plot;
    const { shadow } = plotConfig.summaryBox;

    const svg = select(svgRef.current!);
    svg.selectAll("*").remove();

    const metricName = getMetricName({
      metricCode: metricCode,
      nameType: "shortNameEN",
    });

    // Calculate all data for Stock One
    const stockOneIndustryMetricStats = calculateMetricStats({
      metricValues: getIndustryMetric({
        industryCode: stockOneIndustry,
        metricCode: metricCode,
      }),
    });
    const isStockOneMetricApplicable = getMetricApplicability({
      industryCode: stockOneIndustry,
      metricCode: metricCode,
    });
    const stockOneMetricType = isStockOneMetricApplicable
      ? "normal"
      : "inapplicable";
    const stockOneMetricColor: "green" | "yellow" | "red" | "stone" =
      calculateMetricColor({
        metricValue: stockOneValue,
        metricStats: stockOneIndustryMetricStats,
      });

    // Calculate all data for Stock Two
    const stockTwoIndustryMetricStats = calculateMetricStats({
      metricValues: getIndustryMetric({
        industryCode: stockTwoIndustry,
        metricCode: metricCode,
      }),
    });
    const isStockTwoMetricApplicable = getMetricApplicability({
      industryCode: stockTwoIndustry,
      metricCode: metricCode,
    });
    const stockTwoMetricType = isStockTwoMetricApplicable
      ? "normal"
      : "inapplicable";
    const stockTwoMetricColor: "green" | "yellow" | "red" | "stone" =
      calculateMetricColor({
        metricValue: stockTwoValue,
        metricStats: stockTwoIndustryMetricStats,
      });

    const validIndustryMetricStats = [
      stockOneIndustryMetricStats,
      stockTwoIndustryMetricStats,
    ].filter((stats): stats is IndustryMetricStats => !!stats);

    svg
      .append("defs")
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%")
      .append("feDropShadow")
      .attr("dx", shadow.dx)
      .attr("dy", shadow.dy)
      .attr("stdDeviation", shadow.stdDeviation)
      .attr("flood-color", shadow.floodColor)
      .attr("flood-opacity", shadow.floodOpacity);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const plotGroup = createPlotGroup({ svg, width, height });

    const overallMin = Math.min(...validIndustryMetricStats.map((s) => s.min));
    const overallMax = Math.max(...validIndustryMetricStats.map((s) => s.max));

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
      innerWidth / 10,
    );
    const stockOneCenterX = (innerWidth * 3) / 7;
    const stockTwoCenterX = (innerWidth * 4) / 7;
    const summaryBoxOneWidth =
      stockOneCenterX - boxAndWhiskersWidth / 2 - gap * 2;
    const summaryBoxOneX = gap;
    const summaryBoxTwoWidth =
      innerWidth - (stockTwoCenterX + boxAndWhiskersWidth / 2) - gap * 2;
    const summaryBoxTwoX = stockTwoCenterX + boxAndWhiskersWidth / 2 + gap;

    const plotConfigurations: PlotConfiguration[] = [
      {
        stockSymbol: stockOneSymbol,
        industryCode: stockOneIndustry,
        metricValue: stockOneValue,
        metricType: stockOneMetricType,
        metricColor: stockOneMetricColor,
        industryMetricStats: stockOneIndustryMetricStats,
        centerX: stockOneCenterX,
        summaryBoxWidth: summaryBoxOneWidth,
        summaryBoxX: summaryBoxOneX,
      },
      {
        stockSymbol: stockTwoSymbol,
        industryCode: stockTwoIndustry,
        metricValue: stockTwoValue,
        metricType: stockTwoMetricType,
        metricColor: stockTwoMetricColor,
        industryMetricStats: stockTwoIndustryMetricStats,
        centerX: stockTwoCenterX,
        summaryBoxWidth: summaryBoxTwoWidth,
        summaryBoxX: summaryBoxTwoX,
      },
    ];

    for (const config of plotConfigurations) {
      if (config.industryMetricStats) {
        drawBoxAndWhiskers({
          plotGroup,
          centerX: config.centerX,
          yScale,
          metricType: config.metricType,
          industryMetricStats: config.industryMetricStats,
          width: boxAndWhiskersWidth,
        });
      }

      drawMarker({
        plotGroup,
        centerX: config.centerX,
        yScale,
        metricValue: config.metricValue,
        metricColor: config.metricColor,
        metricType: config.metricType,
      });

      drawSummaryBox({
        plotGroup,
        width: config.summaryBoxWidth,
        x: config.summaryBoxX,
        stockSymbol: config.stockSymbol,
        metricName,
        metricValue: config.metricValue,
        metricType: config.metricType,
        metricColor: config.metricColor,
        industryCode: config.industryCode,
        industryMetricStats: config.industryMetricStats,
      });

      drawLabel({
        plotGroup,
        centerX: config.centerX,
        innerHeight,
        stockSymbol: config.stockSymbol,
      });
    }
  }, [
    dimensions,
    metricCode,
    stockOneIndustry,
    stockOneValue,
    stockOneSymbol,
    stockTwoIndustry,
    stockTwoValue,
    stockTwoSymbol,
  ]);

  return (
    <div ref={containerRef} style={{ overflowX: "auto" }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
