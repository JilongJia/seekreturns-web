import { GrowthComparisonBarChartFigure } from "@/components/en/features/chart-figures/GrowthComparisonBarChartFigure";
import type { GrowthData } from "@/components/en/features/chart-figures/GrowthComparisonBarChartFigure";

export function GrowthSection() {
  // Example Data
  const appleData: GrowthData = {
    growthMrqYoy: 0.29,
    growthTtmYoy: 0.18,
    growth3yCagr: 0.15,
    growth5yCagr: 0.12,
  };

  const microsoftData: GrowthData = {
    growthMrqYoy: 0.21,
    growthTtmYoy: 0.22,
    growth3yCagr: 0.18,
    growth5yCagr: null,
  };

  return (
    <div>
      <h2>Growth Comparison</h2>
      <GrowthComparisonBarChartFigure
        metricName="Revenue Growth"
        stockOneSymbol="AAPL"
        stockOneGrowth={appleData}
        stockTwoSymbol="MSFT"
        stockTwoGrowth={microsoftData}
      />
    </div>
  );
}
