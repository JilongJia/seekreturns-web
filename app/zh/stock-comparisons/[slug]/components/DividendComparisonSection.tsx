import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import styles from "./DividendComparisonSection.module.css";

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

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const categoryOne = getDividendYieldCategory(stockOneDividendYield);
  const categoryTwo = getDividendYieldCategory(stockTwoDividendYield);
  const dividendYieldOne = (stockOneDividendYield * 100).toFixed(2);
  const dividendYieldTwo = (stockTwoDividendYield * 100).toFixed(2);

  if (categoryOne === "None" && categoryTwo === "None") {
    return `${symbolOne} 和 ${symbolTwo} 均不支付股息；两者似乎都将所有收益再投资于增长，优先考虑长期扩张而非即时现金回报。`;
  }

  if (categoryOne === "None" && categoryTwo === "Has") {
    return `${symbolOne} 不提供股息，似乎将所有现金重新投入到业务中，而 ${symbolTwo} 则提供 ${dividendYieldTwo}% 的股息率，为投资者带来稳定的收入流。`;
  }

  if (categoryOne === "Has" && categoryTwo === "None") {
    return `${symbolOne} 提供 ${dividendYieldOne}% 的股息率，实现了收入与增长的结合，而 ${symbolTwo} 则似乎保留全部利润用于资助运营和研发。`;
  }

  const absoluteGap = Math.abs(stockOneDividendYield - stockTwoDividendYield);
  const smallerDividendYield = Math.min(
    stockOneDividendYield,
    stockTwoDividendYield,
  );
  const relativeGapPercent = (
    (absoluteGap / smallerDividendYield) *
    100
  ).toFixed(0);

  if (
    stockOneDividendYield >
    stockTwoDividendYield * (1 + DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP)
  ) {
    return `${symbolOne} 的股息率 ${dividendYieldOne}% 比 ${symbolTwo} 的 ${dividendYieldTwo}% 大约高出 ${relativeGapPercent}%，突显其更侧重于向股东返还现金。`;
  }

  if (
    stockTwoDividendYield >
    stockOneDividendYield * (1 + DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP)
  ) {
    return `${symbolTwo} 以 ${dividendYieldTwo}% 的股息率脱颖而出 — 比 ${symbolOne} 的 ${dividendYieldOne}% 大约高出 ${relativeGapPercent}% — 突显其对慷慨派息的重视。`;
  }

  return `${symbolOne} 和 ${symbolTwo} 提供相似的股息率 (分别为 ${dividendYieldOne}% 和 ${dividendYieldTwo}%)，表明两者在平衡收入与增长方面采取了类似的方法。`;
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

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">代码</Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneSymbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoSymbol}
              </Table.Thead.Tr.Th>
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
      </div>
    </Section>
  );
}
