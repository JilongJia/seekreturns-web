import React from "react";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { SummaryContainer } from "./SummaryContainer";
import { MetricComparisonBoxPlotFigure } from "@/components/en/features/chart-figures/MetricComparisonBoxPlotFigure";
import styles from "./ValuationSection.module.css";

import {
  getPropertyName,
  getMetricApplicability,
  getIndustryMetricStats,
  calculateMetricColor,
  formatPropertyValue,
} from "@/lib/stock-properties";
import type {
  StockPropertyData,
  ValuationKey,
  ComparableMetricKey,
} from "@/constants/stock-properties";

type ValuationSectionProps = {
  stockOneData: StockPropertyData | null;
  stockTwoData: StockPropertyData | null;
};

// Keys for the detailed commentary and box plot sections.
const comparableValuationKeys: ComparableMetricKey[] = [
  "priceToEarningsRatioTtm",
  "priceToSalesRatioTtm",
  "priceToBookRatioMrq",
];

// Keys for the "at a Glance" summary table.
const tableRows: ValuationKey[] = [
  "priceToEarningsRatioTtm",
  "priceToSalesRatioTtm",
  "priceToBookRatioMrq",
  "priceToFreeCashFlowRatioTtm",
];

export function ValuationSection({
  stockOneData,
  stockTwoData,
}: ValuationSectionProps) {
  if (!stockOneData || !stockTwoData) {
    return (
      <Section ariaLabelledby="valuation">
        <H2 id="valuation">Valuation</H2>
        <P>Valuation data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="valuation">
      <H2 id="valuation">Valuation</H2>

      {comparableValuationKeys.map((key) => {
        const stockOneMetricValue = stockOneData[key];
        const stockTwoMetricValue = stockTwoData[key];
        const metricLongName = getPropertyName(key, "en", "long");
        const stockOneIndustryMetricStats = getIndustryMetricStats(
          stockOneData.industry,
          key,
        );
        const stockTwoIndustryMetricStats = getIndustryMetricStats(
          stockTwoData.industry,
          key,
        );
        const stockOneMetricColor = calculateMetricColor(
          key,
          stockOneMetricValue,
          stockOneIndustryMetricStats,
        );
        const stockTwoMetricColor = calculateMetricColor(
          key,
          stockTwoMetricValue,
          stockTwoIndustryMetricStats,
        );
        const isStockOneMetricApplicable = getMetricApplicability(
          stockOneData.industry,
          key,
        );
        const isStockTwoMetricApplicable = getMetricApplicability(
          stockTwoData.industry,
          key,
        );

        return (
          <React.Fragment key={key}>
            <H3>{metricLongName}</H3>
            <SummaryContainer
              metricKey={key}
              stockOneSymbol={stockOneData.symbol}
              stockOneIndustryName={stockOneData.industry as string}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoData.symbol}
              stockTwoIndustryName={stockTwoData.industry as string}
              stockTwoMetricValue={stockTwoMetricValue}
              stockTwoMetricColor={stockTwoMetricColor}
              stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
              isStockTwoMetricApplicable={isStockTwoMetricApplicable}
            />
            <MetricComparisonBoxPlotFigure
              metricKey={key}
              metricName={metricLongName}
              stockOneSymbol={stockOneData.symbol}
              stockOneIndustryName={stockOneData.industry as string}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoData.symbol}
              stockTwoIndustryName={stockTwoData.industry as string}
              stockTwoMetricValue={stockTwoMetricValue}
              stockTwoMetricColor={stockTwoMetricColor}
              stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
              isStockTwoMetricApplicable={isStockTwoMetricApplicable}
            />
          </React.Fragment>
        );
      })}

      <H3>Valuation at a Glance</H3>
      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">
                {getPropertyName("symbol", "en", "long")}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneData.symbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoData.symbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.map((key) => (
              <Table.Tbody.Tr key={key}>
                <Table.Tbody.Tr.Th scope="row">
                  {getPropertyName(key, "en", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatPropertyValue(key, stockOneData[key], {
                    lang: "en",
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatPropertyValue(key, stockTwoData[key], {
                    lang: "en",
                  })}
                </Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
