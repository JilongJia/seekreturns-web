import clsx from "clsx";
import { MetricCommentary } from "./metric-commentary/MetricCommentary";
import styles from "./SummaryBox.module.css";

import { formatStockInfo } from "@/lib/stock";
import type { MetricStats } from "@/lib/stock";
import type { ComparableMetricKey } from "@/constants/stock";

type SummaryBoxProps = {
  metricKey: ComparableMetricKey;
  stockSymbol: string;
  metricValue: number | null;
  metricColor: "green" | "yellow" | "red" | "neutral";
  industryName: string;
  industryMetricStats: MetricStats | null;
  isMetricApplicable: boolean;
  className?: string;
};

export function SummaryBox({
  metricKey,
  stockSymbol,
  metricValue,
  metricColor,
  industryName,
  industryMetricStats,
  isMetricApplicable,
  className,
}: SummaryBoxProps) {
  const formattedMetricValue = formatStockInfo(metricKey, metricValue, {
    lang: "en",
  });

  return (
    <article className={className}>
      <h4 className={styles.symbolHeading}>{stockSymbol}</h4>

      <p
        className={clsx(
          styles.metricValue,
          isMetricApplicable ? styles[metricColor] : styles.notApplicable,
        )}
      >
        {formattedMetricValue}
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
          {formatStockInfo(metricKey, industryMetricStats?.max ?? null, {
            lang: "en",
          })}
        </dd>

        <dt>Q3</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.q3 ?? null, {
            lang: "en",
          })}
        </dd>

        <dt>Median</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.median ?? null, {
            lang: "en",
          })}
        </dd>

        <dt>Q1</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.q1 ?? null, {
            lang: "en",
          })}
        </dd>

        <dt>Min</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.min ?? null, {
            lang: "en",
          })}
        </dd>
      </dl>

      <MetricCommentary
        metricKey={metricKey}
        stockSymbol={stockSymbol}
        metricValue={metricValue}
        formattedMetricValue={formattedMetricValue}
        industryName={industryName}
        industryMetricStats={industryMetricStats}
        isMetricApplicable={isMetricApplicable}
      />
    </article>
  );
}
