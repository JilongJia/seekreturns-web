import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";
import { getIndustryMetric } from "@/app/lib/stock-analysis/getIndustryMetric";
import { getMetricApplicability } from "@/app/lib/stock-analysis/getMetricApplicability";
import { calculateMetricStats } from "@/app/lib/stock-analysis/calculateMetricStats";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

import { H3 } from "../article/H3";
import { MetricComparisonInterpretation } from "./metric-comparison-container/MetricComparisonInterpretation";
import { MetricComparisonBoxPlot } from "./metric-comparison-container/MetricComparisonBoxPlot";
import { MetricComparisonBoxPlotFigcaption } from "./metric-comparison-container/MetricComparisonBoxPlotFigcaption";
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
    nameType: "longNameEN",
  });
  const metricShortName = getMetricName({
    metricCode: metricCode,
    nameType: "shortNameEN",
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

      <MetricComparisonInterpretation
        metricCode={metricCode}
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryName={stockOneIndustryCode}
        stockOneMetricValue={stockOneMetricValue}
        stockOneIndustryMetricStats={stockOneIndustryMetricStats}
        isStockOneMetricApplicable={isStockOneMetricApplicable}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryName={stockTwoIndustryCode}
        stockTwoMetricValue={stockTwoMetricValue}
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
          stockOneIndustryMetricStats={stockOneIndustryMetricStats}
          isStockOneMetricApplicable={isStockOneMetricApplicable}
          stockTwoSymbol={stockTwoSymbol}
          stockTwoIndustryName={stockTwoIndustryCode}
          stockTwoMetricValue={stockTwoMetricValue}
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
