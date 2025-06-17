import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { formatMetricValue } from "./formatMetricValue";
import { P } from "./P";

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricCommentaryProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
};

export function ForwardPriceToEarningsGrowthRatioCommentary({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  metricCode,
}: MetricCommentaryProps) {
  // 1. 检查指标是否适用于该行业
  if (!isMetricApplicable) {
    return (
      <P>
        在 {industryName} 行业中，预期市盈增长率（Forward
        PEG）通常不作为核心的估值工具。
      </P>
    );
  }

  // 2. 检查公司的预期PEG数据是否可用
  if (metricValue === null) {
    return <P>我们暂时无法获取 {stockSymbol} 的预期市盈增长率数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负数PEG
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率（Forward PEG）为负数（
        {formattedMetricValue}
        ）。这通常是由于公司当前处于亏损状态，或市场预期其未来盈利将出现下滑。在这种情况下，该指标失去了作为估值参考的意义。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}。由于缺少{" "}
        {industryName} 行业的对比基准，我们无法就其估值水平与同行进行比较。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率 {formattedMetricValue} 远高于{" "}
        {industryName}{" "}
        行业的普遍水平。这可能意味着其股价相对于未来的盈利增长预期而言偏高，暗示存在估值过高的风险，或者反映了市场对其未来发展寄予了极高的期望。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率 {formattedMetricValue} 低于{" "}
        {industryName}{" "}
        行业的正常范围。这可能暗示该公司的股价并未充分反映其未来的增长潜力，与其他同行相比，其增长前景可能被市场低估。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率 {formattedMetricValue} 处于{" "}
        {industryName}{" "}
        行业的前25%。这表明，相较于多数竞争对手，投资者愿意为该公司预期的盈利增长支付更高的溢价。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率 {formattedMetricValue} 位于{" "}
        {industryName}{" "}
        行业的后25%。这可能意味着市场对其未来增长的定价相对保守，其股价与增长前景的比值低于许多同行。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的预期市盈增长率 {formattedMetricValue} 处于{" "}
        {industryName}{" "}
        行业的中位水平。这表明其估值与其增长预期基本匹配，符合行业的一般标准。
      </P>
    );
  }
}
