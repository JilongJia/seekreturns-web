import { PriceToEarningsRatioCommentary } from "./commentaries/PriceToEarningsRatioCommentary";
import { CurrentRatioCommentary } from "./commentaries/CurrentRatioCommentary";
import { DebtToEquityRatioCommentary } from "./commentaries/DebtToEquityRatioCommentary";
import { PriceToBookRatioCommentary } from "./commentaries/PriceToBookRatioCommentary";
import { DividendPayoutRatioCommentary } from "./commentaries/DividendPayoutRatioCommentary";
import { DividendYieldCommentary } from "./commentaries/DividendYieldCommentary";
import { InterestCoverageRatioCommentary } from "./commentaries/InterestCoverageRatioCommentary";
import { NetProfitMarginCommentary } from "./commentaries/NetProfitMarginCommentary";
import { OperatingProfitMarginCommentary } from "./commentaries/OperatingProfitMarginCommentary";
import { PriceToSalesRatioCommentary } from "./commentaries/PriceToSalesRatioCommentary";
import { ReturnOnEquityCommentary } from "./commentaries/ReturnOnEquityCommentary";

import type { MetricStats } from "@/lib/stock-properties";
import type { ComparableMetricKey } from "@/constants/stock-properties";

type MetricCommentaryProps = {
  metricKey: ComparableMetricKey;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  formattedMetricValue: string;
  industryMetricStats: MetricStats | null;
  isMetricApplicable: boolean;
};

const METRIC_COMMENTARIES: Record<
  ComparableMetricKey,
  (props: MetricCommentaryProps) => JSX.Element | null
> = {
  returnOnEquityTtm: ReturnOnEquityCommentary,
  netProfitMarginTtm: NetProfitMarginCommentary,
  operatingProfitMarginTtm: OperatingProfitMarginCommentary,
  currentRatioMrq: CurrentRatioCommentary,
  debtToEquityRatioMrq: DebtToEquityRatioCommentary,
  interestCoverageRatioTtm: InterestCoverageRatioCommentary,
  dividendYieldTtm: DividendYieldCommentary,
  dividendPayoutRatioTtm: DividendPayoutRatioCommentary,
  priceToEarningsRatioTtm: PriceToEarningsRatioCommentary,
  priceToSalesRatioTtm: PriceToSalesRatioCommentary,
  priceToBookRatioMrq: PriceToBookRatioCommentary,
};

export function MetricCommentary({
  metricKey,
  stockSymbol,
  industryName,
  metricValue,
  formattedMetricValue,
  industryMetricStats,
  isMetricApplicable,
}: MetricCommentaryProps) {
  const CommentaryComponent = METRIC_COMMENTARIES[metricKey];

  if (!CommentaryComponent) {
    return null;
  }

  return (
    <CommentaryComponent
      metricKey={metricKey}
      stockSymbol={stockSymbol}
      industryName={industryName}
      metricValue={metricValue}
      formattedMetricValue={formattedMetricValue}
      industryMetricStats={industryMetricStats}
      isMetricApplicable={isMetricApplicable}
    />
  );
}
