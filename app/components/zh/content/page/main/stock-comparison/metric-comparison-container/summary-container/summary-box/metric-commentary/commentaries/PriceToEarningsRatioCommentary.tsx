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

export function PriceToEarningsRatioCommentary({
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
        在评估 {industryName} 行业的公司时，市盈率（P/E
        Ratio）通常不作为首要的估值参考指标。
      </P>
    );
  }

  // 2. 检查公司的市盈率数据是否可用
  if (metricValue === null) {
    return <P>我们目前未能获取 {stockSymbol} 的市盈率（P/E）数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负市盈率
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的市盈率（P/E）为负（{formattedMetricValue}
        ），这表明该公司处于净亏损状态。负市盈率在估值比较中不具备可靠的参考价值。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，但由于 {industryName}{" "}
        行业的基准数据缺失，我们无法进行直接的行业对比。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的市盈率 {formattedMetricValue} 在 {industryName}{" "}
        行业中处于极高水平。这既可能反映了市场对其抱有强烈的信心和高增长预期，也可能暗示着股价存在被高估的风险。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的市盈率 {formattedMetricValue} 低于 {industryName}{" "}
        行业的通常水平。这可能意味着公司价值被低估，但也可能折射出市场对公司未来盈利增长的担忧，或对其面临的特定经营挑战的顾虑。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的市盈率 {formattedMetricValue}{" "}
        位列行业前25%。这表明投资者相对于同行给予了它更高的估值溢价，这通常源于对其增长路径或竞争优势的强烈信心。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的市盈率 {formattedMetricValue}{" "}
        位于行业后25%的区间，反映出市场对其估值比许多同行更为保守。这可能为投资者提供了一个潜在的切入点，但也可能表明公司的增长前景存在不确定性。
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol} 的市盈率 {formattedMetricValue} 与 {industryName}{" "}
        行业的通常水平相当，这表明其估值与同行相比，既没有明显的溢价，也没有显著的折价。
      </P>
    );
  }
}
