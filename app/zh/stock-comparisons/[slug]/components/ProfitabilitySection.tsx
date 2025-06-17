import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { MetricComparisonContainer } from "@/app/components/en/content/page/main/stock-comparison/MetricComparisonContainer";
import styles from "./ProfitabilitySection.module.css";

type ProfitabilitySectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function ProfitabilitySection({
  stockOneSymbol,
  stockTwoSymbol,
}: ProfitabilitySectionProps) {
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
      <Section ariaLabelledby="profitability">
        <H2 id="profitability">Profitability</H2>
        <P>Profitability data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="profitability">
      <H2 id="profitability">Profitability</H2>

      <MetricComparisonContainer
        metricCode="returnOnEquityTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneKeyMetricsData.returnOnEquityTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoKeyMetricsData.returnOnEquityTTM}
      />

      <MetricComparisonContainer
        metricCode="returnOnInvestedCapitalTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneKeyMetricsData.returnOnInvestedCapitalTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoKeyMetricsData.returnOnInvestedCapitalTTM}
      />

      <MetricComparisonContainer
        metricCode="netProfitMarginTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.netProfitMarginTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.netProfitMarginTTM}
      />

      <MetricComparisonContainer
        metricCode="operatingProfitMarginTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.operatingProfitMarginTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.operatingProfitMarginTTM}
      />

      <H3>Profitability at a Glance</H3>
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
                Return on Equity (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneKeyMetricsData.returnOnEquityTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoKeyMetricsData.returnOnEquityTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Return on Assets (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneKeyMetricsData.returnOnAssetsTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoKeyMetricsData.returnOnAssetsTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Return on Invested Capital (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(
                  stockOneKeyMetricsData.returnOnInvestedCapitalTTM * 100
                ).toFixed(2)}
                %
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(
                  stockTwoKeyMetricsData.returnOnInvestedCapitalTTM * 100
                ).toFixed(2)}
                %
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Net Profit Margin (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneRatiosData.netProfitMarginTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoRatiosData.netProfitMarginTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Operating Profit Margin (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneRatiosData.operatingProfitMarginTTM * 100).toFixed(2)}
                %
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoRatiosData.operatingProfitMarginTTM * 100).toFixed(2)}
                %
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Gross Profit Margin (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneRatiosData.grossProfitMarginTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoRatiosData.grossProfitMarginTTM * 100).toFixed(2)}%
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
