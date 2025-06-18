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

      <h4 className={styles.industryHeading}>{industryName} 行业</h4>

      <dl
        className={clsx(
          styles.statsList,
          !isMetricApplicable && styles.notApplicable,
        )}
      >
        <dt>最大值</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.max,
          })}
        </dd>

        <dt>上四分位数</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.q3,
          })}
        </dd>

        <dt>中位数</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.median,
          })}
        </dd>

        <dt>下四分位数</dt>
        <dd>
          {formatMetricValue({
            metricCode,
            metricValue: industryMetricStats?.q1,
          })}
        </dd>

        <dt>最小值</dt>
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
