import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";
import { generateDividendYieldCommentary } from "./lib/generateDividendYieldCommentary";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import styles from "./DividendComparisonSection.module.css";

type DividendComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function DividendComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: DividendComparisonSectionProps) {
  const [stockOneRatiosData, stockTwoRatiosData] = await Promise.all([
    fetchRatiosData(stockOneSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (!stockOneRatiosData || !stockTwoRatiosData) {
    return (
      <Section ariaLabelledby="dividend-comparison">
        <H2 id="dividend-comparison">股息比较</H2>
        <P>暂时无法加载股息数据。</P>
      </Section>
    );
  }

  const dividendYieldCommentary = generateDividendYieldCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneDividendYield: stockOneRatiosData.dividendYieldTTM,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoDividendYield: stockTwoRatiosData.dividendYieldTTM,
  });

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
              <Table.Tbody.Tr.Th scope="row">股息率（TTM）</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneRatiosData.dividendYieldTTM * 100).toFixed(2)}％
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoRatiosData.dividendYieldTTM * 100).toFixed(2)}％
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
