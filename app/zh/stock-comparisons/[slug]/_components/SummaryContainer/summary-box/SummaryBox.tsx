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
    lang: "zh",
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

      <h4 className={styles.industryHeading}>{industryName} 行业</h4>

      <dl
        className={clsx(
          styles.statsList,
          !industryMetricStats && styles.neutral,
          !isMetricApplicable && styles.notApplicable,
        )}
      >
        <dt>最大值</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.max ?? null, {
            lang: "zh",
          })}
        </dd>

        <dt>上四分位数</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.q3 ?? null, {
            lang: "zh",
          })}
        </dd>

        <dt>中位数</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.median ?? null, {
            lang: "zh",
          })}
        </dd>

        <dt>下四分位数</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.q1 ?? null, {
            lang: "zh",
          })}
        </dd>

        <dt>最小值</dt>
        <dd>
          {formatStockInfo(metricKey, industryMetricStats?.min ?? null, {
            lang: "zh",
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
