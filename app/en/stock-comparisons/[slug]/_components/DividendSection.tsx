import React from "react";

import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { MetricComparisonBoxPlotFigure } from "@/components/en/features/chart-figures/MetricComparisonBoxPlotFigure";
import { SummaryContainer } from "./SummaryContainer";

import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";
import { getIndustryMetric } from "@/app/lib/stock-analysis/getIndustryMetric";
import { getMetricApplicability } from "@/app/lib/stock-analysis/getMetricApplicability";
import { calculateMetricStats } from "@/app/lib/stock-analysis/calculateMetricStats";
import { calculateMetricColor } from "@/app/lib/stock-analysis/calculateMetricColor";

import styles from "./DividendSection.module.css";
import type { ProfileData } from "@/lib/firestore/stocks";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

type RatiosData = {
  dividendYieldTTM: number | null;
  dividendPayoutRatioTTM: number | null;
};

type DividendSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneProfileData: ProfileData | null;
  stockOneRatiosData: RatiosData | null;
  stockTwoProfileData: ProfileData | null;
  stockTwoRatiosData: RatiosData | null;
};

const metricsForComparison: (keyof RatiosData)[] = [
  "dividendYieldTTM",
  "dividendPayoutRatioTTM",
];

export function DividendSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneProfileData,
  stockOneRatiosData,
  stockTwoProfileData,
  stockTwoRatiosData,
}: DividendSectionProps) {
  if (
    !stockOneProfileData ||
    !stockOneRatiosData ||
    !stockTwoProfileData ||
    !stockTwoRatiosData
  ) {
    return (
      <Section ariaLabelledby="dividend">
        <H2 id="dividend">Dividend</H2>
        <P>Dividend data is currently unavailable.</P>
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
    <Section ariaLabelledby="dividend">
      <H2 id="dividend">Dividend</H2>

      {metricsForComparison.map((metricCode) => {
        const stockOneMetricValue = stockOneRatiosData[metricCode];
        const stockTwoMetricValue = stockTwoRatiosData[metricCode];

        const metricLongName = getMetricName({
          metricCode,
          nameType: "longNameEN",
        });
        const metricShortName = getMetricName({
          metricCode,
          nameType: "shortNameEN",
        });

        const stockOneIndustryMetricStats = calculateMetricStats({
          metricCode,
          metricValues: getIndustryMetric({
            industryCode: stockOneProfileData.industry,
            metricCode,
          }),
        });
        const stockTwoIndustryMetricStats = calculateMetricStats({
          metricCode,
          metricValues: getIndustryMetric({
            industryCode: stockTwoProfileData.industry,
            metricCode,
          }),
        });

        const stockOneMetricColor = calculateMetricColor({
          metricCode,
          metricValue: stockOneMetricValue,
          metricStats: stockOneIndustryMetricStats,
        });
        const stockTwoMetricColor = calculateMetricColor({
          metricCode,
          metricValue: stockTwoMetricValue,
          metricStats: stockTwoIndustryMetricStats,
        });

        const isStockOneMetricApplicable = getMetricApplicability({
          industryCode: stockOneProfileData.industry,
          metricCode,
        });
        const isStockTwoMetricApplicable = getMetricApplicability({
          industryCode: stockTwoProfileData.industry,
          metricCode,
        });

        return (
          <React.Fragment key={metricCode}>
            <H3>{metricLongName}</H3>
            <SummaryContainer
              metricCode={metricCode as MetricCode}
              metricName={metricShortName}
              stockOneSymbol={stockOneSymbol}
              stockOneIndustryName={stockOneProfileData.industry ?? "--"}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoSymbol}
              stockTwoIndustryName={stockTwoProfileData.industry ?? "--"}
              stockTwoMetricValue={stockTwoMetricValue}
              stockTwoMetricColor={stockTwoMetricColor}
              stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
              isStockTwoMetricApplicable={isStockTwoMetricApplicable}
            />
            <MetricComparisonBoxPlotFigure
              metricCode={metricCode as MetricCode}
              metricName={metricShortName}
              stockOneSymbol={stockOneSymbol}
              stockOneIndustryName={stockOneProfileData.industry ?? "--"}
              stockOneMetricValue={stockOneMetricValue}
              stockOneMetricColor={stockOneMetricColor}
              stockOneIndustryMetricStats={stockOneIndustryMetricStats}
              isStockOneMetricApplicable={isStockOneMetricApplicable}
              stockTwoSymbol={stockTwoSymbol}
              stockTwoIndustryName={stockTwoProfileData.industry ?? "--"}
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
                Dividend Yield (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneRatiosData.dividendYieldTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoRatiosData.dividendYieldTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Dividend Payout Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockOneRatiosData.dividendPayoutRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatPercentage(stockTwoRatiosData.dividendPayoutRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
