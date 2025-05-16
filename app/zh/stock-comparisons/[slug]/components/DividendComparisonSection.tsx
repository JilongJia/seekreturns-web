import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";

type DividendComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generateDividendYieldCommentary(
  stockOneSymbol: string,
  stockOneDividendYield: number,
  stockTwoSymbol: string,
  stockTwoDividendYield: number,
): string {
  const DIVIDEND_YIELD_THRESHOLD_NONE = 0;
  const DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP = 0.5;

  type DividendYieldCategory = "None" | "Has";

  const getDividendYieldCategory = (
    dividendYield: number,
  ): DividendYieldCategory =>
    dividendYield <= DIVIDEND_YIELD_THRESHOLD_NONE ? "None" : "Has";

  const stockOneCategory = getDividendYieldCategory(stockOneDividendYield);
  const stockTwoCategory = getDividendYieldCategory(stockTwoDividendYield);

  const stockOneDividendYieldPercent = (stockOneDividendYield * 100).toFixed(2);
  const stockTwoDividendYieldPercent = (stockTwoDividendYield * 100).toFixed(2);

  if (stockOneCategory === "None" && stockTwoCategory === "None") {
    return `${stockOneSymbol} 和 ${stockTwoSymbol} 均不支付股息，利润主要用于再投资，可能优先考虑业务扩展或长期增长而非短期股东回报。`;
  }

  if (stockOneCategory === "None" && stockTwoCategory === "Has") {
    return `${stockOneSymbol} 不支付股息，利润更多用于支持公司发展，适合追求资本增值的投资者。而 ${stockTwoSymbol} 的股息率为 ${stockTwoDividendYieldPercent}% ，通过分红直接回报股东，反映出较稳定的盈利能力，两者策略形成对比。`;
  }

  if (stockOneCategory === "Has" && stockTwoCategory === "None") {
    return `${stockOneSymbol} 的股息率为 ${stockOneDividendYieldPercent}% ，在回报股东的同时兼顾增长；而 ${stockTwoSymbol} 不支付股息，利润主要投入未来发展，如业务扩展或研发，体现出不同的经营策略。`;
  }

  if (stockOneCategory === "Has" && stockTwoCategory === "Has") {
    const baseCommentary = `${stockOneSymbol} 的股息率为 ${stockOneDividendYieldPercent}% ，${stockTwoSymbol} 为 ${stockTwoDividendYieldPercent}% ，两者均在股东回报与公司发展之间取得平衡。`;

    const higherDividendYield = Math.max(
      stockOneDividendYield,
      stockTwoDividendYield,
    );
    const lowerDividendYield = Math.min(
      stockOneDividendYield,
      stockTwoDividendYield,
    );
    const relativeDifference =
      (higherDividendYield - lowerDividendYield) / lowerDividendYield;
    const relativeDifferencePercent = (relativeDifference * 100).toFixed(0);

    if (relativeDifference > DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP) {
      const higherStockSymbol =
        stockOneDividendYield > stockTwoDividendYield
          ? stockOneSymbol
          : stockTwoSymbol;
      const lowerStockSymbol =
        stockOneDividendYield > stockTwoDividendYield
          ? stockTwoSymbol
          : stockOneSymbol;
      const higherDividendYieldPercent = (higherDividendYield * 100).toFixed(2);

      return `${baseCommentary} 其中，${higherStockSymbol} 的股息率达 ${higherDividendYieldPercent}% ，高出 ${lowerStockSymbol} 约 ${relativeDifferencePercent}% ，显示其更倾向于回报股东，而 ${lowerStockSymbol} 则更多保留利润用于发展。`;
    }

    return `${baseCommentary} 两者的股息率差距较小，显示出相似的分红与增长策略。`;
  }

  return "";
}

export async function DividendComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: DividendComparisonSectionProps) {
  const stockOneRatiosData = await fetchRatiosData(stockOneSymbol);
  const stockTwoRatiosData = await fetchRatiosData(stockTwoSymbol);

  if (!stockOneRatiosData || !stockTwoRatiosData) {
    return (
      <Section ariaLabelledby="dividend-comparison">
        <H2 id="dividend-comparison">股息比较</H2>
        <P>暂时无法加载股息数据。</P>
      </Section>
    );
  }

  const dividendYieldCommentary = generateDividendYieldCommentary(
    stockOneSymbol,
    stockOneRatiosData.dividendYieldTTM,
    stockTwoSymbol,
    stockTwoRatiosData.dividendYieldTTM,
  );

  return (
    <Section ariaLabelledby="dividend-comparison">
      <H2 id="dividend-comparison">股息比较</H2>
      <P>{dividendYieldCommentary}</P>
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
            <Table.Tbody.Tr.Th scope="row">股息率 (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(stockOneRatiosData.dividendYieldTTM * 100).toFixed(2)}%
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoRatiosData.dividendYieldTTM * 100).toFixed(2)}%
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
