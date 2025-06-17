import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { MetricComparisonContainer } from "@/app/components/en/content/page/main/stock-comparison/MetricComparisonContainer";
import styles from "./FinancialStrengthSection.module.css";

type FinancialStrengthSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function FinancialStrengthSection({
  stockOneSymbol,
  stockTwoSymbol,
}: FinancialStrengthSectionProps) {
  const [
    stockOneProfileData,
    stockOneKeyMetricsData,
    stockOneRatiosData,
    stockTwoProfileData,
    stockTwoKeyMetricsData,
    stockTwoRatiosData,
  ] = await Promise.all([
    fetchProfileData(stockOneSymbol),
    fetchKeyMetricsData(stockOneSymbol),
    fetchRatiosData(stockOneSymbol),
    fetchProfileData(stockTwoSymbol),
    fetchKeyMetricsData(stockTwoSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (
    !stockOneProfileData ||
    !stockOneKeyMetricsData ||
    !stockOneRatiosData ||
    !stockTwoProfileData ||
    !stockTwoKeyMetricsData ||
    !stockTwoRatiosData
  ) {
    return (
      <Section ariaLabelledby="financial-strength">
        <H2 id="financial-strength">Financial Strength</H2>
        <P>Financial strength data is currently unavailable.</P>
      </Section>
    );
  }

  const formatNumber = (value: number): string =>
    value === 0 ? "--" : value.toFixed(2);

  return (
    <Section ariaLabelledby="financial-strength">
      <H2 id="financial-strength">Financial Strength</H2>

      <MetricComparisonContainer
        metricCode="currentRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.currentRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.currentRatioTTM}
      />

      <MetricComparisonContainer
        metricCode="debtToEquityRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.debtToEquityRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.debtToEquityRatioTTM}
      />

      <MetricComparisonContainer
        metricCode="interestCoverageRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.interestCoverageRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.interestCoverageRatioTTM}
      />

      <H3>Financial Strength at a Glance</H3>
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
                Current Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.currentRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.currentRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Quick Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.quickRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.quickRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Debt-to-Equity Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.debtToEquityRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.debtToEquityRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Debt-to-Asset Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.debtToAssetsRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.debtToAssetsRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Net Debt-to-EBITDA Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneKeyMetricsData.netDebtToEBITDATTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoKeyMetricsData.netDebtToEBITDATTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Interest Coverage Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.interestCoverageRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.interestCoverageRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
