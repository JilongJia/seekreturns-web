import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { MetricComparisonContainer } from "@/app/components/en/content/page/main/stock-comparison/MetricComparisonContainer";
import styles from "./DividendSection.module.css";

type DividendSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function DividendSection({
  stockOneSymbol,
  stockTwoSymbol,
}: DividendSectionProps) {
  const [
    stockOneProfileData,
    stockOneRatiosData,
    stockTwoProfileData,
    stockTwoRatiosData,
  ] = await Promise.all([
    fetchProfileData(stockOneSymbol),
    fetchRatiosData(stockOneSymbol),
    fetchProfileData(stockTwoSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (
    !stockOneProfileData ||
    !stockOneRatiosData ||
    !stockTwoProfileData ||
    !stockTwoRatiosData
  ) {
    return (
      <Section ariaLabelledby="dividend">
        <H2 id="dividend">Dividend</H2>
        <P>Dividend data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="dividend">
      <H2 id="dividend">Dividend</H2>

      <MetricComparisonContainer
        metricCode="dividendYieldTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.dividendYieldTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.dividendYieldTTM}
      />

      <MetricComparisonContainer
        metricCode="dividendPayoutRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.dividendPayoutRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.dividendPayoutRatioTTM}
      />

      <H3>Dividend at a Glance</H3>

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">Symbol</Table.Thead.Tr.Th>
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
              <Table.Tbody.Tr.Th scope="row">
                Dividend Yield (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneRatiosData.dividendYieldTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoRatiosData.dividendYieldTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Dividend Payout Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneRatiosData.dividendPayoutRatioTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoRatiosData.dividendPayoutRatioTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
