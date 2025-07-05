import React from "react";

import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";

import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";

import { GrowthComparisonLineChartFigure } from "@/components/en/features/chart-figures/GrowthComparisonLineChartFigure";
import type { FinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData";

type GrowthSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneFinancialGrowthData: FinancialGrowthData | null;
  stockTwoFinancialGrowthData: FinancialGrowthData | null;
};

type FinancialGrowthPoint = {
  date: string;
  revenueGrowth: number;
  epsgrowth: number;
  freeCashFlowGrowth: number;
};

type GrowthPoint = {
  time: string;
  value: number;
};

type MetricCode = "revenueGrowth" | "epsgrowth" | "freeCashFlowGrowth";

const growthMetrics: MetricCode[] = [
  "revenueGrowth",
  "epsgrowth",
  "freeCashFlowGrowth",
];

function processData(
  metric: MetricCode,
  series: FinancialGrowthPoint[],
): GrowthPoint[] {
  return series
    .map((point) => ({
      time: point.date,
      value: point[metric],
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

export function GrowthSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneFinancialGrowthData,
  stockTwoFinancialGrowthData,
}: GrowthSectionProps) {
  if (!stockOneFinancialGrowthData || !stockTwoFinancialGrowthData) {
    return (
      <Section ariaLabelledby="growth">
        <H2 id="growth">Growth</H2>
        <P>Financial growth data is currently unavailable for comparison.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="growth">
      <H2 id="growth">Growth</H2>
      <P>
        The following charts compare key year-over-year (YoY) growth metrics for{" "}
        {stockOneSymbol} and {stockTwoSymbol}. These metrics are based on the
        companies’ annual financial reports.
      </P>

      {growthMetrics.map((metric) => {
        const metricLongName = getMetricName({
          metricCode: metric,
          nameType: "longNameEN",
        });
        const stockOneGrowthSeries = processData(
          metric,
          stockOneFinancialGrowthData,
        );
        const stockTwoGrowthSeries = processData(
          metric,
          stockTwoFinancialGrowthData,
        );

        return (
          <React.Fragment key={metric}>
            <H3>{metricLongName}</H3>
            <GrowthComparisonLineChartFigure
              metricName={metricLongName}
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneGrowthSeries={stockOneGrowthSeries}
              stockTwoGrowthSeries={stockTwoGrowthSeries}
            />
          </React.Fragment>
        );
      })}
    </Section>
  );
}
