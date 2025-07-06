import React from "react";

import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
import { MetricComparisonBoxPlotFigure } from "@/components/zh/features/chart-figures/MetricComparisonBoxPlotFigure";
import { SummaryContainer } from "./SummaryContainer";

import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";
import { getIndustryMetric } from "@/app/lib/stock-analysis/getIndustryMetric";
import { getMetricApplicability } from "@/app/lib/stock-analysis/getMetricApplicability";
import { calculateMetricStats } from "@/app/lib/stock-analysis/calculateMetricStats";
import { calculateMetricColor } from "@/app/lib/stock-analysis/calculateMetricColor";

import styles from "./ProfitabilitySection.module.css";
import type { ProfileData } from "@/lib/firebase/stocks";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

type KeyMetricsData = {
  returnOnEquityTTM: number | null;
  returnOnAssetsTTM: number | null;
  returnOnInvestedCapitalTTM: number | null;
};

type RatiosData = {
  netProfitMarginTTM: number | null;
  operatingProfitMarginTTM: number | null;
  grossProfitMarginTTM: number | null;
};

type ProfitabilitySectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneProfileData: ProfileData | null;
  stockOneKeyMetricsData: KeyMetricsData | null;
  stockOneRatiosData: RatiosData | null;
  stockTwoProfileData: ProfileData | null;
  stockTwoKeyMetricsData: KeyMetricsData | null;
  stockTwoRatiosData: RatiosData | null;
};

const metricsForComparison: (keyof KeyMetricsData | keyof RatiosData)[] = [
  "returnOnEquityTTM",
  "returnOnInvestedCapitalTTM",
  "netProfitMarginTTM",
  "operatingProfitMarginTTM",
];

export function ProfitabilitySection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneProfileData,
  stockOneKeyMetricsData,
  stockOneRatiosData,
  stockTwoProfileData,
  stockTwoKeyMetricsData,
  stockTwoRatiosData,
}: ProfitabilitySectionProps) {
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

  const stockOneMetrics = { ...stockOneKeyMetricsData, ...stockOneRatiosData };
  const stockTwoMetrics = { ...stockTwoKeyMetricsData, ...stockTwoRatiosData };

  return (
    <Section ariaLabelledby="profitability">
      <H2 id="profitability">盈利能力</H2>

      {metricsForComparison.map((metricCode) => {
        const stockOneMetricValue = stockOneMetrics[metricCode];
        const stockTwoMetricValue = stockTwoMetrics[metricCode];

        const metricLongName = getMetricName({
          metricCode,
          nameType: "longNameZH",
        });
        const metricShortName = getMetricName({
          metricCode,
          nameType: "shortNameZH",
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
