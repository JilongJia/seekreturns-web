import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
import { MetricComparisonContainer } from "@/app/components/zh/content/page/main/stock-comparison/MetricComparisonContainer";

import styles from "./ValuationSection.module.css";
import type { ProfileData } from "@/app/lib/fmp/fetchProfileData";

type KeyMetricsData = {
  evToEBITDATTM: number | null;
  evToSalesTTM: number | null;
};

type RatiosData = {
  priceToEarningsRatioTTM: number | null;
  forwardPriceToEarningsGrowthRatioTTM: number | null;
  priceToSalesRatioTTM: number | null;
  priceToBookRatioTTM: number | null;
  priceToFreeCashFlowRatioTTM: number | null;
};

type ValuationSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneProfileData: ProfileData | null;
  stockOneKeyMetricsData: KeyMetricsData | null;
  stockOneRatiosData: RatiosData | null;
  stockTwoProfileData: ProfileData | null;
  stockTwoKeyMetricsData: KeyMetricsData | null;
  stockTwoRatiosData: RatiosData | null;
};

export function ValuationSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneProfileData,
  stockOneKeyMetricsData,
  stockOneRatiosData,
  stockTwoProfileData,
  stockTwoKeyMetricsData,
  stockTwoRatiosData,
}: ValuationSectionProps) {
  if (
    !stockOneProfileData ||
    !stockOneKeyMetricsData ||
    !stockOneRatiosData ||
    !stockTwoProfileData ||
    !stockTwoKeyMetricsData ||
    !stockTwoRatiosData
  ) {
    return (
      <Section ariaLabelledby="valuation">
        <H2 id="valuation">估值</H2>
        <P>估值数据当前不可用。</P>
      </Section>
    );
  }

  const formatNumber = (value: number | null): string => {
    if (value === null) {
      return "--";
    }
    return value.toFixed(2);
  };

  return (
    <Section ariaLabelledby="valuation">
      <H2 id="valuation">估值</H2>

      <MetricComparisonContainer
        metricCode="priceToEarningsRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.priceToEarningsRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.priceToEarningsRatioTTM}
      />

      <MetricComparisonContainer
        metricCode="forwardPriceToEarningsGrowthRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={
          stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM
        }
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={
          stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM
        }
      />

      <MetricComparisonContainer
        metricCode="priceToSalesRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.priceToSalesRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.priceToSalesRatioTTM}
      />

      <MetricComparisonContainer
        metricCode="priceToBookRatioTTM"
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryCode={stockOneProfileData.industry}
        stockOneMetricValue={stockOneRatiosData.priceToBookRatioTTM}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryCode={stockTwoProfileData.industry}
        stockTwoMetricValue={stockTwoRatiosData.priceToBookRatioTTM}
      />

      <H3>估值概览</H3>
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
                市盈率 (P/E, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.priceToEarningsRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.priceToEarningsRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                预期市盈增长率 (PEG, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(
                  stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM,
                )}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(
                  stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM,
                )}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                市销率 (P/S, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.priceToSalesRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.priceToSalesRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                市净率 (P/B, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.priceToBookRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.priceToBookRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                市现率 (P/FCF, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.priceToFreeCashFlowRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.priceToFreeCashFlowRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                企业价值倍数 (EV/EBITDA, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneKeyMetricsData.evToEBITDATTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoKeyMetricsData.evToEBITDATTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                企业价值与销售额比率 (EV/Sales, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneKeyMetricsData.evToSalesTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoKeyMetricsData.evToSalesTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
