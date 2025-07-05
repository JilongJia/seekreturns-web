import React from "react";

import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";

import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";

import { GrowthComparisonLineChartFigure } from "@/components/zh/features/chart-figures/GrowthComparisonLineChartFigure";
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
        <H2 id="growth">成长性</H2>
        <P>成长性数据当前不可用，无法进行比较。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="growth">
      <H2 id="growth">成长性</H2>
      <P>
        以下图表比较了 {stockOneSymbol} 和 {stockTwoSymbol} 的关键同比增长 (YoY)
        指标。这些指标基于公司的年度财务报告。
      </P>

      {growthMetrics.map((metric) => {
        const metricLongName = getMetricName({
          metricCode: metric,
          nameType: "longNameZH",
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
