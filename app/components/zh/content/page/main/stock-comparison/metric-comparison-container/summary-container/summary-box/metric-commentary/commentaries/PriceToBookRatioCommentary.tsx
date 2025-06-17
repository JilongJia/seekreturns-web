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

export function PriceToBookRatioCommentary({
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
        对于 {industryName} 这样偏向轻资产运营的行业，市净率（P/B
        Ratio）通常不被看作是主要的估值方法。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的市净率（P/B）数据暂缺。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负净值
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的市净率（P/B）为负数（{formattedMetricValue}
        ），这表示其股东权益为负值，即公司的总负债已经超过了其总资产。这是财务状况极不稳定的一个关键危险信号。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的市净率为 {formattedMetricValue}，但由于缺少{" "}
        {industryName}{" "}
        行业的横向比较数据，我们无法判断其估值相对于净资产是高是低。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 极高，远超 {industryName}{" "}
        行业的普遍估值范围。这表明投资者愿意为其净资产支付高昂的溢价，原因很可能是市场对其未来的成长性和盈利能力抱有极高的期望。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 低于 {industryName}{" "}
        行业的通常范围。这背后可能有两个原因：一是其股价相对于资产价值被市场低估；二也可能反映了市场对公司未来盈利能力或其资产质量存在担忧。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue}{" "}
        处在行业前25%的水平，说明与大多数同行相比，投资者对它的净资产给出了更高的估值溢价。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue}{" "}
        位于行业后25%的区间。这暗示市场对其资产的估值相对保守。对于价值投资者来说，这可能是一个潜在的机会，但也可能是公司存在某些潜在问题的信号。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 处于 {industryName}{" "}
        行业的中位数附近，表明其市值相对于账面价值的水平符合行业基准，处于一个标准的范围之内。
      </P>
    );
  }
}
