import React from "react";

import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { MetricComparisonBoxPlotFigure } from "@/components/en/features/chart-figures";
import { SummaryContainer } from "./SummaryContainer";
import styles from "./DividendSection.module.css";

import {
  getDisplayName,
  getMetricApplicability,
  getIndustryMetricStats,
  calculateMetricColor,
  formatStockInfo,
} from "@/lib/stock";
import type {
  StockInfoData,
  DividendKey,
  ComparableMetricKey,
} from "@/constants/stock";

type DividendSectionProps = {
  stockOneInfo: StockInfoData | null;
  stockTwoInfo: StockInfoData | null;
};

const comparableDividendKeys: ComparableMetricKey[] = [
  "dividendYieldTtm",
  "dividendPayoutRatioTtm",
];

const tableRows: DividendKey[] = ["dividendYieldTtm", "dividendPayoutRatioTtm"];

export function DividendSection({
  stockOneInfo,
  stockTwoInfo,
}: DividendSectionProps) {
  if (!stockOneInfo || !stockTwoInfo) {
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

      {comparableDividendKeys.map((key) => {
        const stockOneMetricValue = stockOneInfo[key];
        const stockTwoMetricValue = stockTwoInfo[key];
        const metricLongName = getDisplayName(key, "en", "long");

        const stockOneIndustryMetricStats = getIndustryMetricStats(
          stockOneInfo.industry,
          key,
        );
        const stockTwoIndustryMetricStats = getIndustryMetricStats(
          stockTwoInfo.industry,
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
          stockOneInfo.industry,
          key,
        );
        const isStockTwoMetricApplicable = getMetricApplicability(
          stockTwoInfo.industry,
          key,
        );

        return (
          <React.Fragment key={key}>
            <H3>{metricLongName}</H3>
            <SummaryContainer
              metricKey={key}
              stockOneSymbol={stockOneInfo.symbol}
              stockOneIndustryName={stockOneInfo.industry as string}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoInfo.symbol}
              stockTwoIndustryName={stockTwoInfo.industry as string}
              stockTwoMetricValue={stockTwoMetricValue}
              stockTwoMetricColor={stockTwoMetricColor}
              stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
              isStockTwoMetricApplicable={isStockTwoMetricApplicable}
            />
            <MetricComparisonBoxPlotFigure
              metricKey={key}
              metricName={metricLongName}
              stockOneSymbol={stockOneInfo.symbol}
              stockOneIndustryName={stockOneInfo.industry as string}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoInfo.symbol}
              stockTwoIndustryName={stockTwoInfo.industry as string}
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
              <Table.Thead.Tr.Th scope="row">
                {getDisplayName("symbol", "en", "long")}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {formatStockInfo("symbol", stockOneInfo.symbol, {
                  lang: "en",
                })}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {formatStockInfo("symbol", stockTwoInfo.symbol, {
                  lang: "en",
                })}
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
                  {formatStockInfo(key, stockOneInfo[key], {
                    lang: "en",
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoInfo[key], {
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
