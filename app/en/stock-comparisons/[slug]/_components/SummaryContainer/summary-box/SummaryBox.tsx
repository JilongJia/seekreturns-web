import clsx from "clsx";

import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { formatMetricValue } from "../../formatMetricValue";

import { MetricCommentary } from "./metric-commentary/MetricCommentary";
import styles from "./SummaryBox.module.css";

type IndustryMetricStats = {
  max: number;
  q3: number;
  median: number;
  q1: number;
  min: number;
};

type SummaryBoxProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  metricName: string;
  metricValue: number | null;
  metricColor: "green" | "yellow" | "red" | "neutral";
  industryName: string;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
  className?: string;
};

export function SummaryBox({
  metricCode,
  stockSymbol,
  metricValue,
  metricColor,
  industryName,
  industryMetricStats,
  isMetricApplicable,
  className,
}: SummaryBoxProps) {
  return (
    <article className={className}>
      <h4 className={styles.symbolHeading}>{stockSymbol}</h4>

      <p
        className={clsx(
          styles.metricValue,
          isMetricApplicable ? styles[metricColor] : styles.notApplicable,
        )}
      >
        {formatMetricValue({ metricCode, metricValue })}
      </p>

      <h4 className={styles.industryHeading}>{industryName} Industry</h4>

      <dl
        className={clsx(
          styles.statsList,
          !industryMetricStats && styles.neutral,
          !isMetricApplicable && styles.notApplicable,
        )}
      >
        <dt>Max</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.max,
          })}
        </dd>

        <dt>Q3</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.q3,
          })}
        </dd>

        <dt>Median</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.median,
          })}
        </dd>

        <dt>Q1</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.q1,
          })}
        </dd>

        <dt>Min</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.min,
          })}
        </dd>
      </dl>

      <MetricCommentary
        metricCode={metricCode}
        stockSymbol={stockSymbol}
        metricValue={metricValue}
        industryName={industryName}
        industryMetricStats={industryMetricStats}
        isMetricApplicable={isMetricApplicable}
      />
    </article>
  );
}
