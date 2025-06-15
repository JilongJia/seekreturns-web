import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { MetricInterpretation } from "./metric-comparison-interpretation/MetricInterpretation";

import { Ul } from "../../article/Ul";

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricComparisonInterpretationProps = {
  metricCode: MetricCode;
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

export function MetricComparisonInterpretation({
  metricCode,
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
}: MetricComparisonInterpretationProps) {
  return (
    <>
      <Ul>
        <Ul.Li>
          <MetricInterpretation
            metricCode={metricCode}
            whichStock="one"
            stockSymbol={stockOneSymbol}
            industryName={stockOneIndustryName}
            metricValue={stockOneMetricValue}
            industryMetricStats={stockOneIndustryMetricStats}
            isMetricApplicable={isStockOneMetricApplicable}
          />
        </Ul.Li>

        <Ul.Li>
          <MetricInterpretation
            metricCode={metricCode}
            whichStock="two"
            stockSymbol={stockTwoSymbol}
            industryName={stockTwoIndustryName}
            metricValue={stockTwoMetricValue}
            industryMetricStats={stockTwoIndustryMetricStats}
            isMetricApplicable={isStockTwoMetricApplicable}
          />
        </Ul.Li>
      </Ul>
    </>
  );
}
