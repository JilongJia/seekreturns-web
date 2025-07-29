import React from "react";
import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { MetricComparisonBoxPlotFigure } from "@/components/en/features/chart-figures";
import { SummaryContainer } from "./SummaryContainer";
import styles from "./ProfitabilitySection.module.css";

import {
  getDisplayName,
  getMetricApplicability,
  getIndustryMetricStats,
  calculateMetricColor,
  formatStockInfo,
} from "@/lib/stock";
import type {
  StockInfoData,
  ProfitabilityKey,
  ComparableMetricKey,
} from "@/constants/stock";

type ProfitabilitySectionProps = {
  stockOneData: StockInfoData | null;
  stockTwoData: StockInfoData | null;
};

// Keys for the detailed commentary and box plot sections.
const comparableProfitabilityKeys: ComparableMetricKey[] = [
  "returnOnEquityTtm",
  "netProfitMarginTtm",
  "operatingProfitMarginTtm",
];

// Keys for the "at a Glance" summary table.
const tableRows: ProfitabilityKey[] = [
  "returnOnEquityTtm",
  "returnOnAssetsTtm",
  "netProfitMarginTtm",
  "operatingProfitMarginTtm",
  "grossProfitMarginTtm",
];

export function ProfitabilitySection({
  stockOneData,
  stockTwoData,
}: ProfitabilitySectionProps) {
  if (!stockOneData || !stockTwoData) {
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

      {comparableProfitabilityKeys.map((key) => {
        const stockOneMetricValue = stockOneData[key];
        const stockTwoMetricValue = stockTwoData[key];
        const metricLongName = getDisplayName(key, "en", "long");
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

      <H3>Profitability at a Glance</H3>
      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">
                {getDisplayName("symbol", "en", "long")}
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
                  {getDisplayName(key, "en", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockOneData[key], {
                    lang: "en",
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoData[key], {
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
