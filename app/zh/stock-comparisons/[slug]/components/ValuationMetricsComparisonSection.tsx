import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";

type ValuationMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generatePriceToEarningsRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToEarningsRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToEarningsRatio: number,
): string {
  const PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE = 0;
  const PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH = 100;

  type PriceToEarningsRatioCategory = "Negative" | "Normal" | "High";

  const getPriceToEarningsRatioCategory = (
    ratio: number,
  ): PriceToEarningsRatioCategory => {
    if (ratio < PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE) return "Negative";
    if (ratio > PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH) return "High";
    return "Normal";
  };

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const priceToEarningsRatioOne = stockOnePriceToEarningsRatio.toFixed(2);
  const priceToEarningsRatioTwo = stockTwoPriceToEarningsRatio.toFixed(2);
  const categoryOne = getPriceToEarningsRatioCategory(
    stockOnePriceToEarningsRatio,
  );
  const categoryTwo = getPriceToEarningsRatioCategory(
    stockTwoPriceToEarningsRatio,
  );

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} 和 ${symbolTwo} 均未实现盈利 — 两者均为负市盈率 (分别为 ${priceToEarningsRatioOne} 和 ${priceToEarningsRatioTwo})，突显了持续亏损对其估值造成的压力。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} 的市盈率为负 (${priceToEarningsRatioOne})，反映了上一财年的净亏损，而 ${symbolTwo} (市盈率 ${priceToEarningsRatioTwo}) 则显示出健康的盈利状况。`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} 的市盈率为负 (${priceToEarningsRatioTwo})，凸显了年度亏损，而 ${symbolOne} (市盈率 ${priceToEarningsRatioOne}) 则展现了稳健的盈利能力。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "High") {
    return `${symbolOne} 由于近期亏损，市盈率为负 (${priceToEarningsRatioOne})。相比之下，${symbolTwo} 拥有较高的市盈率倍数 (${priceToEarningsRatioTwo})，表明市场对其未来盈利增长抱有强烈信心，从而支撑这一高估值。`;
  }
  if (categoryOne === "High" && categoryTwo === "Negative") {
    return `${symbolOne} 的市盈率颇高 (${priceToEarningsRatioOne})，暗示着强劲的增长预期；与此相反，${symbolTwo} 的负市盈率 (${priceToEarningsRatioTwo}) 则是由近期亏损所致。`;
  }

  if (categoryOne === "High" && categoryTwo === "High") {
    return `${symbolOne} 和 ${symbolTwo} 的市盈率均超过 100 倍 (分别为 ${priceToEarningsRatioOne} 和 ${priceToEarningsRatioTwo})，反映出其股价已计入了高远增长的预期。`;
  }

  if (categoryOne === "High" && categoryTwo === "Normal") {
    return `${symbolOne} 以其较高的市盈率 (${priceToEarningsRatioOne}) 脱颖而出，而 ${symbolTwo} (市盈率 ${priceToEarningsRatioTwo}) 则处于更常规的市盈率区间。`;
  }
  if (categoryOne === "Normal" && categoryTwo === "High") {
    return `${symbolTwo} 拥有较高的市盈率 (${priceToEarningsRatioTwo})，表明市场对其有强烈的增长预期；相较而言，${symbolOne} (市盈率 ${priceToEarningsRatioOne}) 的估值则更多地基于其当前盈利水平，更为标准。`;
  }

  return "";
}

function generateForwardPEGRatioCommentary(
  stockOneSymbol: string,
  stockOneForwardPEGRatio: number,
  stockTwoSymbol: string,
  stockTwoForwardPEGRatio: number,
): string {
  const FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE = 0;

  type ForwardPEGRatioCategory = "Negative" | "Normal";

  const getForwardPEGRatioCategory = (
    ratio: number,
  ): ForwardPEGRatioCategory =>
    ratio < FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE ? "Negative" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const forwardPEGRatioOne = stockOneForwardPEGRatio.toFixed(2);
  const forwardPEGRatioTwo = stockTwoForwardPEGRatio.toFixed(2);
  const categoryOne = getForwardPEGRatioCategory(stockOneForwardPEGRatio);
  const categoryTwo = getForwardPEGRatioCategory(stockTwoForwardPEGRatio);

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} (${forwardPEGRatioOne}) 和 ${symbolTwo} (${forwardPEGRatioTwo}) 的前瞻 PEG 比率均为负值，这表明分析师预期其在未来一期可能出现盈利萎缩或负增长 — 这是对其盈利前景的一个令人担忧的信号。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} 的前瞻 PEG 比率为负 (${forwardPEGRatioOne})，暗示了预期的盈利下滑；而 ${symbolTwo} (比率 ${forwardPEGRatioTwo}) 的预测则显示其盈利将保持稳定或有所增长。`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} 的前瞻 PEG 比率为负 (${forwardPEGRatioTwo})，预示着预期的盈利收缩；而 ${symbolOne} (比率 ${forwardPEGRatioOne}) 根据分析师的预测，其盈利将保持稳定或有所改善。`;
  }

  return "";
}

function generatePriceToBookRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToBookRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToBookRatio: number,
): string {
  const PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE = 0;

  type PriceToBookRatioCategory = "Negative" | "Normal";

  const getPriceToBookRatioCategory = (
    ratio: number,
  ): PriceToBookRatioCategory =>
    ratio < PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE ? "Negative" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const priceToBookRatioOne = stockOnePriceToBookRatio.toFixed(2);
  const priceToBookRatioTwo = stockTwoPriceToBookRatio.toFixed(2);
  const categoryOne = getPriceToBookRatioCategory(stockOnePriceToBookRatio);
  const categoryTwo = getPriceToBookRatioCategory(stockTwoPriceToBookRatio);

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} (${priceToBookRatioOne}) 和 ${symbolTwo} (${priceToBookRatioTwo}) 的账面价值均为负，意味着其负债超过资产 — 这对两家公司而言都是一个严重的偿付能力风险信号。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} 的市净率 (${priceToBookRatioOne}) 为负，表明其负债超过资产 (即负股东权益)。而 ${symbolTwo} (市净率 ${priceToBookRatioTwo}) 则维持着正的股东权益。`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} 的市净率 (${priceToBookRatioTwo}) 低于零，表明其股东权益为负。相比之下，${symbolOne} (市净率 ${priceToBookRatioOne}) 拥有正的账面价值。`;
  }

  return "";
}

function generatePriceToFreeCashFlowRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToFreeCashFlowRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToFreeCashFlowRatio: number,
): string {
  const PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE = 0;

  type PriceToFreeCashFlowRatioCategory = "Negative" | "Normal";

  const getPriceToFreeCashFlowRatioCategory = (
    ratio: number,
  ): PriceToFreeCashFlowRatioCategory =>
    ratio < PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE
      ? "Negative"
      : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const priceToFreeCashFlowRatioOne =
    stockOnePriceToFreeCashFlowRatio.toFixed(2);
  const priceToFreeCashFlowRatioTwo =
    stockTwoPriceToFreeCashFlowRatio.toFixed(2);
  const categoryOne = getPriceToFreeCashFlowRatioCategory(
    stockOnePriceToFreeCashFlowRatio,
  );
  const categoryTwo = getPriceToFreeCashFlowRatioCategory(
    stockTwoPriceToFreeCashFlowRatio,
  );

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} 和 ${symbolTwo} 在过去一年消耗的自由现金流均超过其产生的数额 — 市价自由现金流比率 (P/FCF) 分别为 ${priceToFreeCashFlowRatioOne} 和 ${priceToFreeCashFlowRatioTwo} — 这突显了持续的流动性压力。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} 的市价自由现金流比率 (P/FCF) 为负 (${priceToFreeCashFlowRatioOne})，表明其在过去一年消耗的现金多于产生的现金 — 这是一个重要的流动性警示。相比之下，${symbolTwo} (P/FCF ${priceToFreeCashFlowRatioTwo}) 则表明其产生了正的自由现金流。`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} 报告其市价自由现金流比率 (P/FCF) 为负 (${priceToFreeCashFlowRatioTwo})，显示现金流短缺，可能威胁其运营的可持续性；而 ${symbolOne} (P/FCF ${priceToFreeCashFlowRatioOne}) 则维持着正的自由现金流。`;
  }

  return "";
}

export async function ValuationMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: ValuationMetricsComparisonSectionProps) {
  const [
    stockOneRatiosData,
    stockOneKeyMetricsData,
    stockTwoRatiosData,
    stockTwoKeyMetricsData,
  ] = await Promise.all([
    fetchRatiosData(stockOneSymbol),
    fetchKeyMetricsData(stockOneSymbol),
    fetchRatiosData(stockTwoSymbol),
    fetchKeyMetricsData(stockTwoSymbol),
  ]);

  if (
    !stockOneRatiosData ||
    !stockOneKeyMetricsData ||
    !stockTwoRatiosData ||
    !stockTwoKeyMetricsData
  ) {
    return (
      <Section ariaLabelledby="valuation-metrics-comparison">
        <H2 id="valuation-metrics-comparison">估值指标比较</H2>
        <P>暂时无法加载估值指标数据。</P>
      </Section>
    );
  }

  const priceToEarningsRatioCommentary = generatePriceToEarningsRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.priceToEarningsRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.priceToEarningsRatioTTM,
  );
  const forwardPriceToEarningsGrowthRatioCommentary =
    generateForwardPEGRatioCommentary(
      stockOneSymbol,
      stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM,
      stockTwoSymbol,
      stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM,
    );
  const priceToBookRatioCommentary = generatePriceToBookRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.priceToBookRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.priceToBookRatioTTM,
  );
  const priceToFreeCashFlowRatioCommentary =
    generatePriceToFreeCashFlowRatioCommentary(
      stockOneSymbol,
      stockOneRatiosData.priceToFreeCashFlowRatioTTM,
      stockTwoSymbol,
      stockTwoRatiosData.priceToFreeCashFlowRatioTTM,
    );

  const hasCommentary = [
    priceToEarningsRatioCommentary,
    forwardPriceToEarningsGrowthRatioCommentary,
    priceToBookRatioCommentary,
    priceToFreeCashFlowRatioCommentary,
  ].some((commentary) => commentary !== "");

  return (
    <Section ariaLabelledby="valuation-metrics-comparison">
      <H2 id="valuation-metrics-comparison">估值指标比较</H2>
      {hasCommentary ? (
        <>
          <P>
            这里通过盈利、现金流、销售和账面价值等关键指标，评估{" "}
            {stockOneSymbol} 和 {stockTwoSymbol}{" "}
            的估值。以下几点尤其值得注意，特别是极端情况。
          </P>
          <Ul>
            {priceToEarningsRatioCommentary && (
              <Ul.Li>{priceToEarningsRatioCommentary}</Ul.Li>
            )}
            {forwardPriceToEarningsGrowthRatioCommentary && (
              <Ul.Li>{forwardPriceToEarningsGrowthRatioCommentary}</Ul.Li>
            )}
            {priceToBookRatioCommentary && (
              <Ul.Li>{priceToBookRatioCommentary}</Ul.Li>
            )}
            {priceToFreeCashFlowRatioCommentary && (
              <Ul.Li>{priceToFreeCashFlowRatioCommentary}</Ul.Li>
            )}
          </Ul>
        </>
      ) : (
        <P>
          想了解 {stockOneSymbol} 和 {stockTwoSymbol} 的估值对比，请看下表。
        </P>
      )}
      <Table>
        <Table.Thead>
          <Table.Thead.Tr>
            <Table.Thead.Tr.Th scope="row">代码</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockOneSymbol}</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockTwoSymbol}</Table.Thead.Tr.Th>
          </Table.Thead.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">市盈率 (P/E, TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              前瞻 PEG 比率 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">市销率 (P/S, TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">市净率 (P/B, TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              市价自由现金流比率 (P/FCF, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToFreeCashFlowRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToFreeCashFlowRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">EV/EBITDA (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneKeyMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoKeyMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              企业价值/销售额 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneKeyMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoKeyMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              企业价值/自由现金流 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneKeyMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoKeyMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
