import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";
import { getIndustryMetric } from "@/app/lib/stock-analysis/getIndustryMetric";
import { getMetricApplicability } from "@/app/lib/stock-analysis/getMetricApplicability";
import { calculateMetricStats } from "@/app/lib/stock-analysis/calculateMetricStats";
import { calculateMetricColor } from "@/app/lib/stock-analysis/calculateMetricColor";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

import { H3 } from "@/components/zh/ui/H3";
import { MetricComparisonBoxPlot } from "@/components/zh/features/charts";
import { MetricComparisonBoxPlotFigcaption } from "./metric-comparison-container/MetricComparisonBoxPlotFigcaption";
import { SummaryContainer } from "./metric-comparison-container/summary-container/SummaryContainer";
import styles from "./MetricComparisonContainer.module.css";

type MetricComparisonContainerProps = {
  metricCode: MetricCode;
  stockOneSymbol: string;
  stockOneIndustryCode: IndustryCode;
  stockOneMetricValue: number | null;
  stockTwoSymbol: string;
  stockTwoIndustryCode: IndustryCode;
  stockTwoMetricValue: number | null;
};

export function MetricComparisonContainer({
  metricCode,
  stockOneSymbol,
  stockOneIndustryCode,
  stockOneMetricValue,
  stockTwoSymbol,
  stockTwoIndustryCode,
  stockTwoMetricValue,
}: MetricComparisonContainerProps) {
  const metricLongName = getMetricName({
    metricCode: metricCode,
    nameType: "longNameZH",
  });
  const metricShortName = getMetricName({
    metricCode: metricCode,
    nameType: "shortNameZH",
  });

  const stockOneIndustryMetricStats = calculateMetricStats({
    metricCode,
    metricValues: getIndustryMetric({
      industryCode: stockOneIndustryCode,
      metricCode: metricCode,
    }),
  });
  const stockTwoIndustryMetricStats = calculateMetricStats({
    metricCode,
    metricValues: getIndustryMetric({
      industryCode: stockTwoIndustryCode,
      metricCode: metricCode,
    }),
  });

  const stockOneMetricColor = calculateMetricColor({
    metricCode,
    metricValue: stockOneMetricValue,
    metricStats: stockOneIndustryMetricStats,
  });

  const stockTwoMetricColor = calculateMetricColor({
    metricCode,
    metricValue: stockTwoMetricValue,
    metricStats: stockTwoIndustryMetricStats,
  });

  const isStockOneMetricApplicable = getMetricApplicability({
    industryCode: stockOneIndustryCode,
    metricCode: metricCode,
  });
  const isStockTwoMetricApplicable = getMetricApplicability({
    industryCode: stockTwoIndustryCode,
    metricCode: metricCode,
  });

  return (
    <>
      <H3>{metricLongName}</H3>

      <SummaryContainer
        metricCode={metricCode}
        metricName={metricShortName}
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryName={stockOneIndustryCode}
        stockOneMetricValue={stockOneMetricValue}
        stockOneMetricColor={stockOneMetricColor}
        stockOneIndustryMetricStats={stockOneIndustryMetricStats}
        isStockOneMetricApplicable={isStockOneMetricApplicable}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryName={stockTwoIndustryCode}
        stockTwoMetricValue={stockTwoMetricValue}
        stockTwoMetricColor={stockTwoMetricColor}
        stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
        isStockTwoMetricApplicable={isStockTwoMetricApplicable}
      />

      <figure className={styles.imageFigure}>
        <MetricComparisonBoxPlot
          metricCode={metricCode}
          metricName={metricShortName}
          stockOneSymbol={stockOneSymbol}
          stockOneIndustryName={stockOneIndustryCode}
          stockOneMetricValue={stockOneMetricValue}
          stockOneMetricColor={stockOneMetricColor}
          stockOneIndustryMetricStats={stockOneIndustryMetricStats}
          isStockOneMetricApplicable={isStockOneMetricApplicable}
          stockTwoSymbol={stockTwoSymbol}
          stockTwoIndustryName={stockTwoIndustryCode}
          stockTwoMetricValue={stockTwoMetricValue}
          stockTwoMetricColor={stockTwoMetricColor}
          stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
          isStockTwoMetricApplicable={isStockTwoMetricApplicable}
        />

        <MetricComparisonBoxPlotFigcaption
          stockOneSymbol={stockOneSymbol}
          stockTwoSymbol={stockTwoSymbol}
          metricName={metricShortName}
          stockOneIndustryName={stockOneIndustryCode}
          stockTwoIndustryName={stockTwoIndustryCode}
        />
      </figure>
    </>
  );
}
