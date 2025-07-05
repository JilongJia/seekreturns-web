import type { MetricCode } from "@/app/data/fmp/metricCodes";

import { PriceToEarningsRatioCommentary } from "./commentaries/PriceToEarningsRatioCommentary";
import { CurrentRatioCommentary } from "./commentaries/CurrentRatioCommentary";
import { DebtToEquityRatioCommentary } from "./commentaries/DebtToEquityRatioCommentary";
import { PriceToBookRatioCommentary } from "./commentaries/PriceToBookRatioCommentary";
import { ForwardPriceToEarningsGrowthRatioCommentary } from "./commentaries/ForwardPriceToEarningsGrowthRatioCommentary";
import { DividendPayoutRatioCommentary } from "./commentaries/DividendPayoutRatioCommentary";
import { DividendYieldCommentary } from "./commentaries/DividendYieldCommentary";
import { InterestCoverageRatioCommentary } from "./commentaries/InterestCoverageRatioCommentary";
import { NetProfitMarginCommentary } from "./commentaries/NetProfitMarginCommentary";
import { OperatingProfitMarginCommentary } from "./commentaries/OperatingProfitMarginCommentary";
import { PriceToSalesRatioCommentary } from "./commentaries/PriceToSalesRatioCommentary";
import { ReturnOnEquityCommentary } from "./commentaries/ReturnOnEquityCommentary";
import { ReturnOnInvestedCapitalCommentary } from "./commentaries/ReturnOnInvestedCapitalCommentary";

type MetricCommentaryProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
};

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

const METRIC_COMMENTARIES: Partial<
  Record<MetricCode, (props: MetricCommentaryProps) => JSX.Element>
> = {
  currentRatioTTM: CurrentRatioCommentary,
  debtToEquityRatioTTM: DebtToEquityRatioCommentary,
  priceToBookRatioTTM: PriceToBookRatioCommentary,

  forwardPriceToEarningsGrowthRatioTTM:
    ForwardPriceToEarningsGrowthRatioCommentary,
  dividendPayoutRatioTTM: DividendPayoutRatioCommentary,
  dividendYieldTTM: DividendYieldCommentary,
  interestCoverageRatioTTM: InterestCoverageRatioCommentary,
  netProfitMarginTTM: NetProfitMarginCommentary,
  operatingProfitMarginTTM: OperatingProfitMarginCommentary,
  priceToEarningsRatioTTM: PriceToEarningsRatioCommentary,
  priceToSalesRatioTTM: PriceToSalesRatioCommentary,
  returnOnEquityTTM: ReturnOnEquityCommentary,
  returnOnInvestedCapitalTTM: ReturnOnInvestedCapitalCommentary,
};

export function MetricCommentary({
  metricCode,
  stockSymbol,
  industryName,
  metricValue,
  industryMetricStats,
  isMetricApplicable,
}: MetricCommentaryProps) {
  const CommentaryComponent = METRIC_COMMENTARIES[metricCode];

  if (!CommentaryComponent) {
    return null;
  }

  return CommentaryComponent({
    metricCode,
    stockSymbol,
    industryName,
    metricValue,
    industryMetricStats,
    isMetricApplicable,
  });
}
