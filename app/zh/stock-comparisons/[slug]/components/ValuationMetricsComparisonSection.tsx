import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";
import { getPriceToEarningsRatioAnalysis } from "@/app/lib/stock-analysis/getPriceToEarningsRatioAnalysis";
import { getForwardPEGRatioAnalysis } from "@/app/lib/stock-analysis/getForwardPEGRatioAnalysis";
import { getPriceToBookRatioAnalysis } from "@/app/lib/stock-analysis/getPriceToBookRatioAnalysis";
import { getPriceToFreeCashFlowRatioAnalysis } from "@/app/lib/stock-analysis/getPriceToFreeCashFlowRatioAnalysis";
import { generatePriceToEarningsRatioCommentary } from "./lib/generatePriceToEarningsRatioCommentary";
import { generateForwardPEGRatioCommentary } from "./lib/generateForwardPEGRatioCommentary";
import { generatePriceToBookRatioCommentary } from "./lib/generatePriceToBookRatioCommentary";
import { generatePriceToFreeCashFlowRatioCommentary } from "./lib/generatePriceToFreeCashFlowRatioCommentary";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";
import styles from "./ValuationMetricsComparisonSection.module.css";

type ValuationMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function ValuationMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: ValuationMetricsComparisonSectionProps) {
  const [
    stockOneProfileData,
    stockOneRatiosData,
    stockOneKeyMetricsData,
    stockTwoProfileData,
    stockTwoRatiosData,
    stockTwoKeyMetricsData,
  ] = await Promise.all([
    fetchProfileData(stockOneSymbol),
    fetchRatiosData(stockOneSymbol),
    fetchKeyMetricsData(stockOneSymbol),
    fetchProfileData(stockTwoSymbol),
    fetchRatiosData(stockTwoSymbol),
    fetchKeyMetricsData(stockTwoSymbol),
  ]);

  if (
    !stockOneProfileData ||
    !stockOneRatiosData ||
    !stockOneKeyMetricsData ||
    !stockTwoProfileData ||
    !stockTwoRatiosData ||
    !stockTwoKeyMetricsData
  ) {
    return (
      <Section ariaLabelledby="valuation-metrics-comparison">
        <H2 id="valuation-metrics-comparison">估值指标比较</H2>
        <P>暂时无法加载估值指标数据。</P>
      </Section>
    );
  }

  // Price to Earnings Ratio
  const stockOnePriceToEarningsRatioAnalysisResult =
    getPriceToEarningsRatioAnalysis({
      industry: stockOneProfileData.industry,
      priceToEarningsRatio: stockOneRatiosData.priceToEarningsRatioTTM,
    });
  const stockTwoPriceToEarningsRatioAnalysisResult =
    getPriceToEarningsRatioAnalysis({
      industry: stockTwoProfileData.industry,
      priceToEarningsRatio: stockTwoRatiosData.priceToEarningsRatioTTM,
    });

  const priceToEarningsRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOnePriceToEarningsRatioValue:
      stockOneRatiosData.priceToEarningsRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOnePriceToEarningsRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoPriceToEarningsRatioValue:
      stockTwoRatiosData.priceToEarningsRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoPriceToEarningsRatioAnalysisResult,
  };
  const priceToEarningsRatioCommentary = generatePriceToEarningsRatioCommentary(
    priceToEarningsRatioCommentaryParams,
  );

  // Forward PEG Ratio
  const stockOneForwardPEGRatioAnalysisResult = getForwardPEGRatioAnalysis({
    industry: stockOneProfileData.industry,
    forwardPEGRatio: stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM,
  });
  const stockTwoForwardPEGRatioAnalysisResult = getForwardPEGRatioAnalysis({
    industry: stockTwoProfileData.industry,
    forwardPEGRatio: stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM,
  });

  const forwardPEGRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOneForwardPEGRatioValue:
      stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOneForwardPEGRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoForwardPEGRatioValue:
      stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoForwardPEGRatioAnalysisResult,
  };
  const forwardPriceToEarningsGrowthRatioCommentary =
    generateForwardPEGRatioCommentary(forwardPEGRatioCommentaryParams);

  // Price to Book Ratio
  const stockOnePriceToBookRatioAnalysisResult = getPriceToBookRatioAnalysis({
    industry: stockOneProfileData.industry,
    priceToBookRatio: stockOneRatiosData.priceToBookRatioTTM,
  });
  const stockTwoPriceToBookRatioAnalysisResult = getPriceToBookRatioAnalysis({
    industry: stockTwoProfileData.industry,
    priceToBookRatio: stockTwoRatiosData.priceToBookRatioTTM,
  });

  const priceToBookRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOnePriceToBookRatioValue: stockOneRatiosData.priceToBookRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOnePriceToBookRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoPriceToBookRatioValue: stockTwoRatiosData.priceToBookRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoPriceToBookRatioAnalysisResult,
  };
  const priceToBookRatioCommentary = generatePriceToBookRatioCommentary(
    priceToBookRatioCommentaryParams,
  );

  // Price to Free Cash Flow Ratio
  const stockOnePriceToFreeCashFlowRatioAnalysisResult =
    getPriceToFreeCashFlowRatioAnalysis({
      industry: stockOneProfileData.industry,
      priceToFreeCashFlowRatio: stockOneRatiosData.priceToFreeCashFlowRatioTTM,
    });
  const stockTwoPriceToFreeCashFlowRatioAnalysisResult =
    getPriceToFreeCashFlowRatioAnalysis({
      industry: stockTwoProfileData.industry,
      priceToFreeCashFlowRatio: stockTwoRatiosData.priceToFreeCashFlowRatioTTM,
    });

  const priceToFreeCashFlowRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOnePriceToFreeCashFlowRatioValue:
      stockOneRatiosData.priceToFreeCashFlowRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOnePriceToFreeCashFlowRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoPriceToFreeCashFlowRatioValue:
      stockTwoRatiosData.priceToFreeCashFlowRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoPriceToFreeCashFlowRatioAnalysisResult,
  };
  const priceToFreeCashFlowRatioCommentary =
    generatePriceToFreeCashFlowRatioCommentary(
      priceToFreeCashFlowRatioCommentaryParams,
    );

  const hasCommentary = [
    priceToEarningsRatioCommentary,
    forwardPriceToEarningsGrowthRatioCommentary,
    priceToBookRatioCommentary,
    priceToFreeCashFlowRatioCommentary,
  ].some((commentary) => commentary !== "");

  const formatNumber = (value: number): string =>
    value === 0 ? "--" : value.toFixed(2);

  return (
    <Section ariaLabelledby="valuation-metrics-comparison">
      <H2 id="valuation-metrics-comparison">估值指标比较</H2>

      {hasCommentary ? (
        <>
          <P>
            这里通过盈利、现金流、销售和账面价值等关键指标，评估{" "}
            {stockOneSymbol} 和 {stockTwoSymbol} 的估值。
          </P>
          <Ul>
            {priceToEarningsRatioCommentary && (
              <Ul.Li>{priceToEarningsRatioCommentary}</Ul.Li>
            )}
            {forwardPriceToEarningsGrowthRatioCommentary && (
              <Ul.Li>{forwardPriceToEarningsGrowthRatioCommentary}</Ul.Li>
            )}
            {priceToBookRatioCommentary && (
              <Ul.Li>{priceToBookRatioCommentary}</Ul.Li>
            )}
            {priceToFreeCashFlowRatioCommentary && (
              <Ul.Li>{priceToFreeCashFlowRatioCommentary}</Ul.Li>
            )}
          </Ul>
        </>
      ) : (
        <P>
          想了解 {stockOneSymbol} 和 {stockTwoSymbol} 的估值对比，请看下表。
        </P>
      )}

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">代码</Table.Thead.Tr.Th>
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
                前瞻 PEG 比率 (TTM)
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
                市价自由现金流比率 (P/FCF, TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.priceToFreeCashFlowRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.priceToFreeCashFlowRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">EV/EBITDA (TTM)</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneKeyMetricsData.evToEBITDATTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoKeyMetricsData.evToEBITDATTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                企业价值/销售额 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneKeyMetricsData.evToSalesTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoKeyMetricsData.evToSalesTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                企业价值/自由现金流 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneKeyMetricsData.evToFreeCashFlowTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoKeyMetricsData.evToFreeCashFlowTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
