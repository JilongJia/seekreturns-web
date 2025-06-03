import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";
import { getPriceToEarningsRatioAnalysis } from "@/app/lib/stock-analysis/getPriceToEarningsRatioAnalysis";
import { getForwardPEGRatioAnalysis } from "@/app/lib/stock-analysis/getForwardPEGRatioAnalysis";
import { getPriceToBookRatioAnalysis } from "@/app/lib/stock-analysis/getPriceToBookRatioAnalysis";
import { generatePriceToEarningsRatioCommentary } from "./lib/generatePriceToEarningsRatioCommentary";
import { generateForwardPEGRatioCommentary } from "./lib/generateForwardPEGRatioCommentary";
import { generatePriceToBookRatioCommentary } from "./lib/generatePriceToBookRatioCommentary";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";
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
    stockOneKeyMetricsData,
    stockOneRatiosData,
    stockTwoProfileData,
    stockTwoKeyMetricsData,
    stockTwoRatiosData,
  ] = await Promise.all([
    fetchProfileData(stockOneSymbol),
    fetchKeyMetricsData(stockOneSymbol),
    fetchRatiosData(stockOneSymbol),
    fetchProfileData(stockTwoSymbol),
    fetchKeyMetricsData(stockTwoSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (
    !stockOneProfileData ||
    !stockOneKeyMetricsData ||
    !stockOneRatiosData ||
    !stockTwoProfileData ||
    !stockTwoKeyMetricsData ||
    !stockTwoRatiosData
  ) {
    return (
      <Section ariaLabelledby="valuation-metrics-comparison">
        <H2 id="valuation-metrics-comparison">Valuation Metrics Comparison</H2>
        <P>Valuation metrics data is currently unavailable.</P>
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
    stockOneAnalysisResult: stockOnePriceToEarningsRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoPriceToEarningsRatioValue:
      stockTwoRatiosData.priceToEarningsRatioTTM,
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
    stockOneAnalysisResult: stockOneForwardPEGRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoForwardPEGRatioValue:
      stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM,
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
    stockOneAnalysisResult: stockOnePriceToBookRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoPriceToBookRatioValue: stockTwoRatiosData.priceToBookRatioTTM,
    stockTwoAnalysisResult: stockTwoPriceToBookRatioAnalysisResult,
  };
  const priceToBookRatioCommentary = generatePriceToBookRatioCommentary(
    priceToBookRatioCommentaryParams,
  );

  const hasCommentary = [
    priceToEarningsRatioCommentary,
    forwardPriceToEarningsGrowthRatioCommentary,
    priceToBookRatioCommentary,
  ].some((commentary) => commentary !== "");

  const formatNumber = (value: number): string =>
    value === 0 ? "--" : value.toFixed(2);

  return (
    <Section ariaLabelledby="valuation-metrics-comparison">
      <H2 id="valuation-metrics-comparison">Valuation Metrics Comparison</H2>

      {hasCommentary ? (
        <>
          <P>
            This section compares the market valuation of {stockOneSymbol} and{" "}
            {stockTwoSymbol}. Key takeaways regarding their valuation, when
            viewed within their industry context, are presented in the
            commentary that follows.
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
          </Ul>
        </>
      ) : (
        <P>
          For a detailed comparison of valuation metrics between{" "}
          {stockOneSymbol} and {stockTwoSymbol}, please refer to the table
          below.
        </P>
      )}

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
                Price-to-Earnings Ratio (P/E, TTM)
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
                Forward PEG Ratio (TTM)
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
                Price-to-Sales Ratio (P/S, TTM)
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
                Price-to-Book Ratio (P/B, TTM)
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
                EV-to-EBITDA (TTM)
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
                EV-to-Sales (TTM)
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
