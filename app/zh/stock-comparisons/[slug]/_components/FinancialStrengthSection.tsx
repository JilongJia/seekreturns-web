import React from "react";
import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
import { MetricComparisonBoxPlotFigure } from "@/components/zh/features/chart-figures";
import { SummaryContainer } from "./SummaryContainer";
import styles from "./FinancialStrengthSection.module.css";

import {
  getDisplayName,
  getMetricApplicability,
  getIndustryMetricStats,
  calculateMetricColor,
  formatStockInfo,
} from "@/lib/stock";
import type {
  StockInfoData,
  FinancialStrengthKey,
  ComparableMetricKey,
} from "@/constants/stock";

type FinancialStrengthSectionProps = {
  stockOneInfo: StockInfoData | null;
  stockTwoInfo: StockInfoData | null;
};

const comparableFinancialStrengthKeys: ComparableMetricKey[] = [
  "currentRatioMrq",
  "debtToEquityRatioMrq",
  "interestCoverageRatioTtm",
];

const tableRows: FinancialStrengthKey[] = [
  "currentRatioMrq",
  "quickRatioMrq",
  "debtToEquityRatioMrq",
  "interestCoverageRatioTtm",
];

export function FinancialStrengthSection({
  stockOneInfo,
  stockTwoInfo,
}: FinancialStrengthSectionProps) {
  if (!stockOneInfo || !stockTwoInfo) {
    return (
      <Section ariaLabelledby="financial-strength">
        <H2 id="financial-strength">财务实力</H2>
        <P>财务实力数据当前不可用。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="financial-strength">
      <H2 id="financial-strength">财务实力</H2>

      {comparableFinancialStrengthKeys.map((key) => {
        const stockOneMetricValue = stockOneInfo[key];
        const stockTwoMetricValue = stockTwoInfo[key];
        const metricLongName = getDisplayName(key, "zh", "long");
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

      <H3>财务实力概览</H3>
      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">
                {getDisplayName("symbol", "zh", "long")}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneInfo.symbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoInfo.symbol}
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
                  {formatStockInfo(key, stockOneInfo[key], {
                    lang: "zh",
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoInfo[key], {
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
