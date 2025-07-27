import React from "react";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { SummaryContainer } from "./SummaryContainer";
import { MetricComparisonBoxPlotFigure } from "@/components/en/features/chart-figures/MetricComparisonBoxPlotFigure";
import styles from "./DividendSection.module.css";

// Import types from their correct locations
import type {
  StockPropertyData,
  DividendKey,
} from "@/constants/stock-properties/types";
// 1. Corrected import path for ComparableMetricKey.
import {
  getPropertyName,
  getMetricApplicability,
  getIndustryMetricStats,
  calculateMetricColor,
} from "@/lib/stock-properties";

type DividendSectionProps = {
  stockOneData: StockPropertyData | null;
  stockTwoData: StockPropertyData | null;
};

const dividendKeys: DividendKey[] = [
  "dividendYieldTtm",
  "dividendPayoutRatioTtm",
];

export function DividendSection({
  stockOneData,
  stockTwoData,
}: DividendSectionProps) {
  if (!stockOneData || !stockTwoData) {
    return (
      <Section ariaLabelledby="dividend">
        <H2 id="dividend">Dividend</H2>
        <P>Dividend data is currently unavailable.</P>
      </Section>
    );
  }

  const formatValue = (key: DividendKey, value: number | null): string => {
    if (value === null) return "--";
    if (key === "dividendYieldTtm") return `${(value * 100).toFixed(2)}%`;
    if (key === "dividendPayoutRatioTtm") return `${value.toFixed(2)}%`;
    return String(value);
  };

  return (
    <Section ariaLabelledby="dividend">
      <H2 id="dividend">Dividend</H2>

      {dividendKeys.map((metricKey) => {
        const stockOneMetricValue = stockOneData[metricKey];
        const stockTwoMetricValue = stockTwoData[metricKey];

        // 2. Reverted parameter order for getPropertyName.
        const metricLongName = getPropertyName(metricKey, "en", "long");

        // 3. Removed 'as' type assertions as requested.
        const stockOneIndustryMetricStats = getIndustryMetricStats(
          stockOneData.industry,
          metricKey,
        );
        const stockTwoIndustryMetricStats = getIndustryMetricStats(
          stockTwoData.industry,
          metricKey,
        );

        const stockOneMetricColor = calculateMetricColor(
          metricKey,
          stockOneMetricValue,
          stockOneIndustryMetricStats,
        );
        const stockTwoMetricColor = calculateMetricColor(
          metricKey,
          stockTwoMetricValue,
          stockTwoIndustryMetricStats,
        );

        const isStockOneMetricApplicable = getMetricApplicability(
          stockOneData.industry,
          metricKey,
        );
        const isStockTwoMetricApplicable = getMetricApplicability(
          stockTwoData.industry,
          metricKey,
        );

        return (
          <React.Fragment key={metricKey}>
            <H3>{metricLongName}</H3>
            <SummaryContainer
              metricKey={metricKey}
              metricName={metricLongName}
              stockOneSymbol={stockOneData.symbol}
              stockOneIndustryName={stockOneData.industry ?? "--"}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoData.symbol}
              stockTwoIndustryName={stockTwoData.industry ?? "--"}
              stockTwoMetricValue={stockTwoMetricValue}
              stockTwoMetricColor={stockTwoMetricColor}
              stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
              isStockTwoMetricApplicable={isStockTwoMetricApplicable}
            />
            <MetricComparisonBoxPlotFigure
              metricKey={metricKey}
              metricName={metricLongName}
              stockOneSymbol={stockOneData.symbol}
              stockOneIndustryName={stockOneData.industry ?? "--"}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoData.symbol}
              stockTwoIndustryName={stockTwoData.industry ?? "--"}
              stockTwoMetricValue={stockTwoMetricValue}
              stockTwoMetricColor={stockTwoMetricColor}
              stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
              isStockTwoMetricApplicable={isStockTwoMetricApplicable}
            />
          </React.Fragment>
        );
      })}

      <H3>Dividend at a Glance</H3>

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">Metric</Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneData.symbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoData.symbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            {dividendKeys.map((metricKey) => (
              <Table.Tbody.Tr key={metricKey}>
                <Table.Tbody.Tr.Th scope="row">
                  {/* 2. Reverted parameter order for getPropertyName. */}
                  {getPropertyName(metricKey, "en", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatValue(metricKey, stockOneData[metricKey])}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatValue(metricKey, stockTwoData[metricKey])}
                </Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
