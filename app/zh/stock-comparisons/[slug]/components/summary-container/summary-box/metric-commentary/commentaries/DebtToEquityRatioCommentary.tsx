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

export function DebtToEquityRatioCommentary({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  metricCode,
}: MetricCommentaryProps) {
  // 1. 检查指标是否适用
  if (!isMetricApplicable) {
    return (
      <P>
        在 {industryName}{" "}
        行业中，产权比率通常不被视为衡量公司财务杠杆水平的核心指标。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的产权比率数据暂缺。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 优先处理特殊数值情况（此处的解释非常专业）
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的产权比率为 {formattedMetricValue}
        ，这表明其股东权益为负，即总负债已超过总资产（资不抵债）。这是一个公司陷入严重财务困境的关键信号。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的产权比率为 {formattedMetricValue}，但由于缺少{" "}
        {industryName} 行业的基准数据，我们无法进行有效的行业对比。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的产权比率高达 {formattedMetricValue}，远超 {industryName}{" "}
        行业的正常水平。这反映出公司在资金上高度依赖债务，这种激进的策略在可能放大股东回报的同时，也显著加剧了其财务风险。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的产权比率 {formattedMetricValue} 低于 {industryName}{" "}
        行业的普遍范围。这体现了公司较为保守的资本结构，表明管理层可能更看重财务的稳定性，而非通过债务杠杆追求高速增长。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的产权比率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的前四分之一。这说明其杠杆水平高于大部分同行。较高的杠杆有助于提升股东权益的增长潜力，但同时也使公司在面临经济下行或利率上升时更为脆弱。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的产权比率为 {formattedMetricValue}，位于 {industryName}{" "}
        行业的后四分之一。这反映了公司保守的融资策略，对债务融资的依赖度低。这种做法虽然降低了财务风险，但也可能使其在业务扩张和战略投资的规模上，不及那些杠杆更高的竞争对手。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的产权比率为 {formattedMetricValue}，与 {industryName}{" "}
        行业的普遍水平相当。这表明公司在利用债务杠杆方面采取了与行业主流一致的策略，体现了在风险与增长之间的一种平衡。
      </P>
    );
  }
}
