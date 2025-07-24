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

import styles from "./ValuationSection.module.css";
import type { ProfileData } from "@/lib/firestore/stocks";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

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

const metricsForComparison: (keyof KeyMetricsData | keyof RatiosData)[] = [
  "priceToEarningsRatioTTM",
  "forwardPriceToEarningsGrowthRatioTTM",
  "priceToSalesRatioTTM",
  "priceToBookRatioTTM",
];

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

  const stockOneMetrics = { ...stockOneKeyMetricsData, ...stockOneRatiosData };
  const stockTwoMetrics = { ...stockTwoKeyMetricsData, ...stockTwoRatiosData };

  return (
    <Section ariaLabelledby="valuation">
      <H2 id="valuation">估值</H2>

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
