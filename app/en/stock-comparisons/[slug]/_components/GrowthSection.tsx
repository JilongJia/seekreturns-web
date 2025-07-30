import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { GrowthComparisonBarChartFigure } from "@/components/en/features/chart-figures";
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
        <H2 id="growth">Growth</H2>
        <P>Growth data is currently unavailable.</P>
      </Section>
    );
  }

  const revenueGrowthOne = extractGrowthData(stockOneInfo, "revenue");
  const revenueGrowthTwo = extractGrowthData(stockTwoInfo, "revenue");
  const epsGrowthOne = extractGrowthData(stockOneInfo, "eps");
  const epsGrowthTwo = extractGrowthData(stockTwoInfo, "eps");

  return (
    <Section ariaLabelledby="growth">
      <H2 id="growth">Growth</H2>

      <H3>Revenue Growth</H3>
      <GrowthComparisonBarChartFigure
        metricName="Revenue Growth"
        stockOneSymbol={stockOneInfo.symbol}
        stockOneGrowth={revenueGrowthOne}
        stockTwoSymbol={stockTwoInfo.symbol}
        stockTwoGrowth={revenueGrowthTwo}
      />

      <H3>EPS Growth</H3>
      <GrowthComparisonBarChartFigure
        metricName="EPS Growth"
        stockOneSymbol={stockOneInfo.symbol}
        stockOneGrowth={epsGrowthOne}
        stockTwoSymbol={stockTwoInfo.symbol}
        stockTwoGrowth={epsGrowthTwo}
      />
    </Section>
  );
}
