import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";
import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";
import { getCurrentRatioAnalysis } from "@/app/lib/stock-analysis/getCurrentRatioAnalysis";
import { getQuickRatioAnalysis } from "@/app/lib/stock-analysis/getQuickRatioAnalysis";
import { getDebtToEquityRatioAnalysis } from "@/app/lib/stock-analysis/getDebtToEquityRatioAnalysis";
import { getInterestCoverageRatioAnalysis } from "@/app/lib/stock-analysis/getInterestCoverageRatioAnalysis";
import { generateCurrentRatioCommentary } from "./lib/generateCurrentRatioCommentary";
import { generateQuickRatioCommentary } from "./lib/generateQuickRatioCommentary";
import { generateDebtToEquityRatioCommentary } from "./lib/generateDebtToEquityRatioCommentary";
import { generateInterestCoverageRatioCommentary } from "./lib/generateInterestCoverageRatioCommentary";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";
import styles from "./FinancialStrengthMetricsComparisonSection.module.css";

type FinancialStrengthMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function FinancialStrengthMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: FinancialStrengthMetricsComparisonSectionProps) {
  const [
    stockOneProfileData,
    stockOneRatiosData,
    stockTwoProfileData,
    stockTwoRatiosData,
  ] = await Promise.all([
    fetchProfileData(stockOneSymbol),
    fetchRatiosData(stockOneSymbol),
    fetchProfileData(stockTwoSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (
    !stockOneProfileData ||
    !stockOneRatiosData ||
    !stockTwoProfileData ||
    !stockTwoRatiosData
  ) {
    return (
      <Section ariaLabelledby="financial-strength-metrics-comparison">
        <H2 id="financial-strength-metrics-comparison">财务状况指标比较</H2>
        <P>暂时无法加载财务状况数据。</P>
      </Section>
    );
  }

  // Current Ratio
  const stockOneCurrentRatioAnalysisResult = getCurrentRatioAnalysis({
    industry: stockOneProfileData.industry,
    currentRatio: stockOneRatiosData.currentRatioTTM,
  });
  const stockTwoCurrentRatioAnalysisResult = getCurrentRatioAnalysis({
    industry: stockTwoProfileData.industry,
    currentRatio: stockTwoRatiosData.currentRatioTTM,
  });

  const currentRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOneCurrentRatioValue: stockOneRatiosData.currentRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOneCurrentRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoCurrentRatioValue: stockTwoRatiosData.currentRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoCurrentRatioAnalysisResult,
  };
  const currentRatioCommentary = generateCurrentRatioCommentary(
    currentRatioCommentaryParams,
  );

  // Quick Ratio
  const stockOneQuickRatioAnalysisResult = getQuickRatioAnalysis({
    industry: stockOneProfileData.industry,
    quickRatio: stockOneRatiosData.quickRatioTTM,
  });
  const stockTwoQuickRatioAnalysisResult = getQuickRatioAnalysis({
    industry: stockTwoProfileData.industry,
    quickRatio: stockTwoRatiosData.quickRatioTTM,
  });

  const quickRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOneQuickRatioValue: stockOneRatiosData.quickRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOneQuickRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoQuickRatioValue: stockTwoRatiosData.quickRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoQuickRatioAnalysisResult,
  };
  const quickRatioCommentary = generateQuickRatioCommentary(
    quickRatioCommentaryParams,
  );

  // Debt to Equity Ratio
  const stockOneDebtToEquityRatioAnalysisResult = getDebtToEquityRatioAnalysis({
    industry: stockOneProfileData.industry,
    debtToEquityRatio: stockOneRatiosData.debtToEquityRatioTTM,
  });
  const stockTwoDebtToEquityRatioAnalysisResult = getDebtToEquityRatioAnalysis({
    industry: stockTwoProfileData.industry,
    debtToEquityRatio: stockTwoRatiosData.debtToEquityRatioTTM,
  });

  const debtToEquityRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOneDebtToEquityRatioValue: stockOneRatiosData.debtToEquityRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOneDebtToEquityRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoDebtToEquityRatioValue: stockTwoRatiosData.debtToEquityRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoDebtToEquityRatioAnalysisResult,
  };
  const debtToEquityRatioCommentary = generateDebtToEquityRatioCommentary(
    debtToEquityRatioCommentaryParams,
  );

  // Interest Coverage Ratio
  const stockOneInterestCoverageRatioAnalysisResult =
    getInterestCoverageRatioAnalysis({
      industry: stockOneProfileData.industry,
      interestCoverageRatio: stockOneRatiosData.interestCoverageRatioTTM,
    });
  const stockTwoInterestCoverageRatioAnalysisResult =
    getInterestCoverageRatioAnalysis({
      industry: stockTwoProfileData.industry,
      interestCoverageRatio: stockTwoRatiosData.interestCoverageRatioTTM,
    });

  const interestCoverageRatioCommentaryParams = {
    stockOneSymbol: stockOneSymbol,
    stockOneInterestCoverageRatioValue:
      stockOneRatiosData.interestCoverageRatioTTM,
    stockOneIndustry: stockOneProfileData.industry,
    stockOneAnalysisResult: stockOneInterestCoverageRatioAnalysisResult,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoInterestCoverageRatioValue:
      stockTwoRatiosData.interestCoverageRatioTTM,
    stockTwoIndustry: stockTwoProfileData.industry,
    stockTwoAnalysisResult: stockTwoInterestCoverageRatioAnalysisResult,
  };
  const interestCoverageRatioCommentary =
    generateInterestCoverageRatioCommentary(
      interestCoverageRatioCommentaryParams,
    );

  const hasCommentary = [
    currentRatioCommentary,
    quickRatioCommentary,
    debtToEquityRatioCommentary,
    interestCoverageRatioCommentary,
  ].some((commentary) => commentary !== "");

  const formatNumber = (value: number): string =>
    value === 0 ? "--" : value.toFixed(2);

  return (
    <Section ariaLabelledby="financial-strength-metrics-comparison">
      <H2 id="financial-strength-metrics-comparison">财务状况指标比较</H2>

      {hasCommentary ? (
        <>
          <P>
            这里对比了 {stockOneSymbol} 和 {stockTwoSymbol}{" "}
            的财务状况，重点看流动性、杠杆和债务情况。
          </P>
          <Ul>
            {currentRatioCommentary && <Ul.Li>{currentRatioCommentary}</Ul.Li>}
            {quickRatioCommentary && <Ul.Li>{quickRatioCommentary}</Ul.Li>}
            {debtToEquityRatioCommentary && (
              <Ul.Li>{debtToEquityRatioCommentary}</Ul.Li>
            )}
            {interestCoverageRatioCommentary && (
              <Ul.Li>{interestCoverageRatioCommentary}</Ul.Li>
            )}
          </Ul>
        </>
      ) : (
        <P>
          请查看下方表格，了解 {stockOneSymbol} 和 {stockTwoSymbol} 的财务状况。
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
              <Table.Tbody.Tr.Th scope="row">流动比率 (TTM)</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.currentRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.currentRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">速动比率 (TTM)</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.quickRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.quickRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                负债权益比率 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.debtToEquityRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.debtToEquityRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                利息保障倍数 (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.interestCoverageRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.interestCoverageRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
