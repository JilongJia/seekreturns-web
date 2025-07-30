import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { GrowthComparisonBarChartFigure } from "@/components/zh/features/chart-figures";
import type { StockInfoData } from "@/constants/stock";

type GrowthData = {
  growthMrqYoy: number | null;
  growthTtmYoy: number | null;
  growth3yCagr: number | null;
  growth5yCagr: number | null;
};

type GrowthSectionProps = {
  stockOneInfo: StockInfoData | null;
  stockTwoInfo: StockInfoData | null;
};

function extractGrowthData(
  data: StockInfoData,
  type: "revenue" | "eps",
): GrowthData {
  if (type === "revenue") {
    return {
      growthMrqYoy: data.revenueGrowthMrqYoy,
      growthTtmYoy: data.revenueGrowthTtmYoy,
      growth3yCagr: data.revenueGrowth3yCagr,
      growth5yCagr: data.revenueGrowth5yCagr,
    };
  }
  return {
    growthMrqYoy: data.epsGrowthMrqYoy,
    growthTtmYoy: data.epsGrowthTtmYoy,
    growth3yCagr: data.epsGrowth3yCagr,
    growth5yCagr: data.epsGrowth5yCagr,
  };
}

export function GrowthSection({
  stockOneInfo,
  stockTwoInfo,
}: GrowthSectionProps) {
  if (!stockOneInfo || !stockTwoInfo) {
    return (
      <Section ariaLabelledby="growth">
        <H2 id="growth">成长性</H2>
        <P>成长性数据当前不可用。</P>
      </Section>
    );
  }

  const revenueGrowthOne = extractGrowthData(stockOneInfo, "revenue");
  const revenueGrowthTwo = extractGrowthData(stockTwoInfo, "revenue");
  const epsGrowthOne = extractGrowthData(stockOneInfo, "eps");
  const epsGrowthTwo = extractGrowthData(stockTwoInfo, "eps");

  return (
    <Section ariaLabelledby="growth">
      <H2 id="growth">成长性</H2>

      <H3>营收增长</H3>
      <GrowthComparisonBarChartFigure
        metricName="营收增长"
        stockOneSymbol={stockOneInfo.symbol}
        stockOneGrowth={revenueGrowthOne}
        stockTwoSymbol={stockTwoInfo.symbol}
        stockTwoGrowth={revenueGrowthTwo}
      />

      <H3>每股收益增长</H3>
      <GrowthComparisonBarChartFigure
        metricName="每股收益增长"
        stockOneSymbol={stockOneInfo.symbol}
        stockOneGrowth={epsGrowthOne}
        stockTwoSymbol={stockTwoInfo.symbol}
        stockTwoGrowth={epsGrowthTwo}
      />
    </Section>
  );
}
