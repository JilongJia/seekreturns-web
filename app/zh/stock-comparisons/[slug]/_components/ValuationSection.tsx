import React from "react";
import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
import { MetricComparisonBoxPlotFigure } from "@/components/zh/features/chart-figures";
import { SummaryContainer } from "./SummaryContainer";
import styles from "./ValuationSection.module.css";

import {
  getDisplayName,
  getMetricApplicability,
  getIndustryMetricStats,
  calculateMetricColor,
  formatStockInfo,
} from "@/lib/stock";
import type {
  StockInfoData,
  ValuationKey,
  ComparableMetricKey,
} from "@/constants/stock";

type ValuationSectionProps = {
  stockOneData: StockInfoData | null;
  stockTwoData: StockInfoData | null;
};

const comparableValuationKeys: ComparableMetricKey[] = [
  "priceToEarningsRatioTtm",
  "priceToSalesRatioTtm",
  "priceToBookRatioMrq",
];

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
        <H2 id="valuation">估值</H2>
        <P>估值数据当前不可用。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="valuation">
      <H2 id="valuation">估值</H2>

      {comparableValuationKeys.map((key) => {
        const stockOneMetricValue = stockOneData[key];
        const stockTwoMetricValue = stockTwoData[key];
        const metricLongName = getDisplayName(key, "zh", "long");
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

      <H3>估值概览</H3>
      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">
                {getDisplayName("symbol", "zh", "long")}
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
                  {getDisplayName(key, "zh", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockOneData[key], {
                    lang: "zh",
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoData[key], {
                    lang: "zh",
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
