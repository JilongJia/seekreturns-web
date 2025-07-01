import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { MetricComparisonContainer } from "@/app/components/en/content/page/main/stock-comparison/MetricComparisonContainer";

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
        <H2 id="valuation">Valuation</H2>
        <P>Valuation data is currently unavailable.</P>
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
      <H2 id="valuation">Valuation</H2>

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

      <H3>Valuation at a Glance</H3>
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
                Price-to-Earnings Ratio (P/E, TTM)
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
                Forward PEG Ratio (TTM)
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
                Price-to-Sales Ratio (P/S, TTM)
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
                Price-to-Book Ratio (P/B, TTM)
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
                Price-to-Free Cash Flow Ratio (P/FCF, TTM)
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
                EV-to-EBITDA (TTM)
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
                EV-to-Sales (TTM)
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
