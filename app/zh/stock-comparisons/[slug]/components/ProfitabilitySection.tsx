import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { H3 } from "@/app/components/zh/content/page/main/article/H3";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { MetricComparisonContainer } from "@/app/components/zh/content/page/main/stock-comparison/MetricComparisonContainer";
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
        <H2 id="profitability">盈利能力</H2>
        <P>盈利能力数据当前不可用。</P>
      </Section>
    );
  }

  const formatPercentage = (value: number | null): string => {
    if (value === null) {
      return "--";
    }
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <Section ariaLabelledby="profitability">
      <H2 id="profitability">盈利能力</H2>

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

      <H3>盈利能力概览</H3>
      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">股票代码</Table.Thead.Tr.Th>
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
                净资产收益率 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneKeyMetricsData.returnOnEquityTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoKeyMetricsData.returnOnEquityTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                资产回报率 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneKeyMetricsData.returnOnAssetsTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoKeyMetricsData.returnOnAssetsTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                投入资本回报率 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(
                  stockOneKeyMetricsData.returnOnInvestedCapitalTTM,
                )}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(
                  stockTwoKeyMetricsData.returnOnInvestedCapitalTTM,
                )}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">净利率 (TTM)</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneRatiosData.netProfitMarginTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoRatiosData.netProfitMarginTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                营业利润率 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneRatiosData.operatingProfitMarginTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoRatiosData.operatingProfitMarginTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">毛利率 (TTM)</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneRatiosData.grossProfitMarginTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoRatiosData.grossProfitMarginTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
