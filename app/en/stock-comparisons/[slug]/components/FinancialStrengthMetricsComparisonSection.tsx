import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

type FinancialStrengthMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generateCurrentRatioCommentary(
  stockOneSymbol: string,
  stockOneCurrentRatio: number,
  stockTwoSymbol: string,
  stockTwoCurrentRatio: number,
): string {
  if (stockOneCurrentRatio === 0 || stockTwoCurrentRatio === 0) {
    return "";
  }

  const CURRENT_RATIO_THRESHOLD_LOW = 1;

  type CurrentRatioCategory = "Low" | "Normal";

  const getCurrentRatioCategory = (
    currentRatio: number,
  ): CurrentRatioCategory =>
    currentRatio < CURRENT_RATIO_THRESHOLD_LOW ? "Low" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const currentRatioOne = stockOneCurrentRatio.toFixed(2);
  const currentRatioTwo = stockTwoCurrentRatio.toFixed(2);
  const categoryOne = getCurrentRatioCategory(stockOneCurrentRatio);
  const categoryTwo = getCurrentRatioCategory(stockTwoCurrentRatio);

  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `With current ratios of ${currentRatioOne} and ${currentRatioTwo}, both ${symbolOne} and ${symbolTwo} have less current assets than short-term liabilities, which could strain their working capital and force reliance on additional financing.`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne}’s current ratio of ${currentRatioOne} signals a possible liquidity squeeze, while ${symbolTwo} at ${currentRatioTwo} comfortably covers its short-term obligations.`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo}’s current ratio of ${currentRatioTwo} indicates its assets may not cover near-term debts, whereas ${symbolOne} at ${currentRatioOne} maintains healthy liquidity.`;
  }

  return "";
}

function generateQuickRatioCommentary(
  stockOneSymbol: string,
  stockOneQuickRatio: number,
  stockTwoSymbol: string,
  stockTwoQuickRatio: number,
): string {
  if (stockOneQuickRatio === 0 || stockTwoQuickRatio === 0) {
    return "";
  }

  const QUICK_RATIO_THRESHOLD_LOW = 0.8;

  type QuickRatioCategory = "Low" | "Normal";

  const getQuickRatioCategory = (ratio: number): QuickRatioCategory =>
    ratio < QUICK_RATIO_THRESHOLD_LOW ? "Low" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const quickRatioOne = stockOneQuickRatio.toFixed(2);
  const quickRatioTwo = stockTwoQuickRatio.toFixed(2);
  const categoryOne = getQuickRatioCategory(stockOneQuickRatio);
  const categoryTwo = getQuickRatioCategory(stockTwoQuickRatio);

  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `Both ${symbolOne} (quick ratio ${quickRatioOne}) and ${symbolTwo} (quick ratio ${quickRatioTwo}) fall below 0.8, meaning their most liquid assets—excluding inventory—aren’t enough to meet short-term obligations. This could force them to rely on receivables, inventory turn, or external financing.`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne}’s quick ratio of ${quickRatioOne} suggests it may struggle to cover immediate liabilities without selling inventory or raising cash, whereas ${symbolTwo} at ${quickRatioTwo} maintains a comfortable buffer of liquid assets.`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo} posts a quick ratio of ${quickRatioTwo}, indicating limited coverage of short-term debts from its most liquid assets—while ${symbolOne} at ${quickRatioOne} enjoys stronger liquidity resilience.`;
  }

  return "";
}

function generateDebtToEquityRatioCommentary(
  stockOneSymbol: string,
  stockOneDebtToEquityRatio: number,
  stockTwoSymbol: string,
  stockTwoDebtToEquityRatio: number,
): string {
  const DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH = 3.0;
  const DEBT_TO_EQUITY_RATIO_THRESHOLD_NEGATIVE = 0;

  type DebtToEquityRatioCategory = "Negative" | "High" | "Normal";

  const getDebtToEquityRatioCategory = (
    ratio: number,
  ): DebtToEquityRatioCategory => {
    if (ratio < DEBT_TO_EQUITY_RATIO_THRESHOLD_NEGATIVE) return "Negative";
    if (ratio > DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH) return "High";
    return "Normal";
  };

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const debtToEquityRatioOne = stockOneDebtToEquityRatio.toFixed(2);
  const debtToEquityRatioTwo = stockTwoDebtToEquityRatio.toFixed(2);
  const categoryOne = getDebtToEquityRatioCategory(stockOneDebtToEquityRatio);
  const categoryTwo = getDebtToEquityRatioCategory(stockTwoDebtToEquityRatio);

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Both ${symbolOne} (debt-to-equity ratio ${debtToEquityRatioOne}) and ${symbolTwo} (${debtToEquityRatioTwo}) exhibit negative shareholder equity—assets fall short of liabilities—signaling serious balance-sheet stress.`;
  }

  if (categoryOne === "High" && categoryTwo === "High") {
    return `${symbolOne} and ${symbolTwo} both have debt-to-equity ratios above ${DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH} (${debtToEquityRatioOne} and ${debtToEquityRatioTwo}), reflecting aggressive use of debt that can amplify gains but also increase vulnerability to rising rates.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "High") {
    return `${symbolOne} shows negative equity (debt-to-equity ratio ${debtToEquityRatioOne}), while ${symbolTwo} is heavily leveraged (${debtToEquityRatioTwo}), illustrating two different balance-sheet risks.`;
  }
  if (categoryOne === "High" && categoryTwo === "Negative") {
    return `${symbolOne} carries high leverage (debt-to-equity ratio ${debtToEquityRatioOne}), whereas ${symbolTwo} has negative equity (${debtToEquityRatioTwo}), each presenting distinct capital-structure concerns.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} has negative equity (debt-to-equity ratio ${debtToEquityRatioOne}), an unusual warning sign, while ${symbolTwo} at ${debtToEquityRatioTwo} maintains a conventional debt-to-equity balance.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} has negative equity (debt-to-equity ratio ${debtToEquityRatioTwo}), suggesting asset shortfalls, whereas ${symbolOne} at ${debtToEquityRatioOne} preserves healthier equity coverage.`;
  }

  if (categoryOne === "High" && categoryTwo === "Normal") {
    return `${symbolOne} is heavily leveraged (debt-to-equity ratio ${debtToEquityRatioOne}), which can boost returns but raises risk if borrowing costs climb, while ${symbolTwo} at ${debtToEquityRatioTwo} keeps leverage at a more moderate level.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "High") {
    return `${symbolTwo} is highly leveraged (debt-to-equity ratio ${debtToEquityRatioTwo}), elevating both potential gains and risks, compared to ${symbolOne} at ${debtToEquityRatioOne}, which maintains a steadier capital structure.`;
  }

  return "";
}

function generateDebtToAssetsRatioCommentary(
  stockOneSymbol: string,
  stockOneDebtToAssetsRatio: number,
  stockTwoSymbol: string,
  stockTwoDebtToAssetsRatio: number,
): string {
  const DEBT_TO_ASSETS_RATIO_THRESHOLD_HIGH = 0.8;

  type DebtToAssetsRatioCategory = "High" | "Normal";

  const getDebtToAssetsRatioCategory = (
    ratio: number,
  ): DebtToAssetsRatioCategory =>
    ratio > DEBT_TO_ASSETS_RATIO_THRESHOLD_HIGH ? "High" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const debtToAssetsRatioOne = stockOneDebtToAssetsRatio.toFixed(2);
  const debtToAssetsRatioTwo = stockTwoDebtToAssetsRatio.toFixed(2);
  const categoryOne = getDebtToAssetsRatioCategory(stockOneDebtToAssetsRatio);
  const categoryTwo = getDebtToAssetsRatioCategory(stockTwoDebtToAssetsRatio);

  if (categoryOne === "High" && categoryTwo === "High") {
    return `With debt funding over 80% of their assets—${symbolOne} at ${debtToAssetsRatioOne} and ${symbolTwo} at ${debtToAssetsRatioTwo}—both firms use high leverage that can boost returns but also increases risk if asset values fall or borrowing costs climb.`;
  }

  if (categoryOne === "High" && categoryTwo === "Normal") {
    return `${symbolOne}’s debt-to-assets ratio of ${debtToAssetsRatioOne} indicates it relies heavily on debt to back its assets—potentially risky in a downturn—whereas ${symbolTwo} at ${debtToAssetsRatioTwo} keeps borrowing to a more moderate level.`;
  }

  if (categoryOne === "Normal" && categoryTwo === "High") {
    return `${symbolTwo} carries a debt-to-assets ratio of ${debtToAssetsRatioTwo}, suggesting substantial asset funding via debt, while ${symbolOne} at ${debtToAssetsRatioOne} opts for a more conservative financing structure.`;
  }

  return "";
}

function generateInterestCoverageRatioCommentary(
  stockOneSymbol: string,
  stockOneInterestCoverageRatio: number,
  stockTwoSymbol: string,
  stockTwoInterestCoverageRatio: number,
): string {
  const INTEREST_COVERAGE_RATIO_THRESHOLD_LOW = 1;
  const INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO = 0;

  type InterestCoverageRatioCategory = "Negative" | "Zero" | "Low" | "Normal";

  const getInterestCoverageRatioCategory = (
    ratio: number,
  ): InterestCoverageRatioCategory => {
    if (ratio < INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO) return "Negative";
    if (ratio === INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO) return "Zero";
    if (ratio < INTEREST_COVERAGE_RATIO_THRESHOLD_LOW) return "Low";
    return "Normal";
  };

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const interestCoverageRatioOne = stockOneInterestCoverageRatio.toFixed(2);
  const interestCoverageRatioTwo = stockTwoInterestCoverageRatio.toFixed(2);
  const categoryOne = getInterestCoverageRatioCategory(
    stockOneInterestCoverageRatio,
  );
  const categoryTwo = getInterestCoverageRatioCategory(
    stockTwoInterestCoverageRatio,
  );

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Both ${symbolOne} and ${symbolTwo} report negative interest coverage ratios (${interestCoverageRatioOne}, ${interestCoverageRatioTwo}), meaning EBIT itself is negative—neither can cover interest, a critical solvency warning.`;
  }
  if (categoryOne === "Zero" && categoryTwo === "Zero") {
    return `Neither ${symbolOne} nor ${symbolTwo} records interest coverage (both “--”), indicating virtually no interest expense—usually a sign of negligible debt.`;
  }
  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `Both ${symbolOne} (at ${interestCoverageRatioOne}) and ${symbolTwo} (at ${interestCoverageRatioTwo}) have low interest coverage, meaning their operating earnings do not fully cover interest expenses. This indicates financial strain.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Zero") {
    return `${symbolOne} has negative EBIT (interest coverage ${interestCoverageRatioOne}), unable to cover interest, while ${symbolTwo} shows “--” (negligible interest expense).`;
  }
  if (categoryOne === "Zero" && categoryTwo === "Negative") {
    return `${symbolOne} shows “--” (minimal interest expense), but ${symbolTwo} is in the red with interest coverage ${interestCoverageRatioTwo}, signaling a net operating loss.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Low") {
    return `${symbolOne} posts a negative interest coverage ratio (${interestCoverageRatioOne}), reflecting an operating loss. ${symbolTwo}, with its ratio at ${interestCoverageRatioTwo}, also faces difficulty, as its operating earnings do not cover its interest expenses.`;
  }
  if (categoryOne === "Low" && categoryTwo === "Negative") {
    return `${symbolOne} (at ${interestCoverageRatioOne}) is not covering its interest expenses from operating earnings, while ${symbolTwo} posts negative EBIT (interest coverage ${interestCoverageRatioTwo}).`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `With negative EBIT (${interestCoverageRatioOne}), ${symbolOne} cannot cover its interest payments. ${symbolTwo}, with an interest coverage of ${interestCoverageRatioTwo}, meets its interest obligations.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolOne} meets its interest obligations (ratio ${interestCoverageRatioOne}). In stark contrast, ${symbolTwo}’s negative ratio (${interestCoverageRatioTwo}) means its operating earnings (EBIT) don't cover basic operations, let alone interest, signaling serious financial trouble.`;
  }

  if (categoryOne === "Zero" && categoryTwo === "Low") {
    return `${symbolOne} shows “--” for interest coverage (indicating minimal interest cost). ${symbolTwo}, however, with a ratio of ${interestCoverageRatioTwo}, is not generating enough operating earnings to cover its current interest payments.`;
  }
  if (categoryOne === "Low" && categoryTwo === "Zero") {
    return `${symbolOne} (at ${interestCoverageRatioOne}) fails to cover its interest expenses from operating earnings, whereas ${symbolTwo} shows “--” for minimal interest expense.`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne}’s low ratio (${interestCoverageRatioOne}) indicates its earnings don't cover interest. ${symbolTwo} (at ${interestCoverageRatioTwo}) meets its interest obligations.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo}’s low interest coverage (${interestCoverageRatioTwo}) means it doesn't cover interest from operating earnings. ${symbolOne} (at ${interestCoverageRatioOne}) meets its interest obligations.`;
  }

  if (categoryOne === "Zero" && categoryTwo === "Normal") {
    return `${symbolOne} shows “--” for interest coverage, hinting at negligible interest costs, whereas ${symbolTwo} (at ${interestCoverageRatioTwo}) covers its interest obligations.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Zero") {
    return `${symbolOne} (at ${interestCoverageRatioOne}) covers its interest payments, while ${symbolTwo} shows “--” for minimal debt service.`;
  }

  return "";
}

export async function FinancialStrengthMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: FinancialStrengthMetricsComparisonSectionProps) {
  const [stockOneRatiosData, stockTwoRatiosData] = await Promise.all([
    fetchRatiosData(stockOneSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (!stockOneRatiosData || !stockTwoRatiosData) {
    return (
      <Section ariaLabelledby="financial-strength-metrics-comparison">
        <H2 id="financial-strength-metrics-comparison">
          Financial Strength Metrics Comparison
        </H2>
        <P>Financial strength metrics data is currently unavailable.</P>
      </Section>
    );
  }

  const currentRatioCommentary = generateCurrentRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.currentRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.currentRatioTTM,
  );
  const quickRatioCommentary = generateQuickRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.quickRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.quickRatioTTM,
  );
  const debtToEquityRatioCommentary = generateDebtToEquityRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.debtToEquityRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.debtToEquityRatioTTM,
  );
  const debtToAssetsRatioCommentary = generateDebtToAssetsRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.debtToAssetsRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.debtToAssetsRatioTTM,
  );
  const interestCoverageRatioCommentary =
    generateInterestCoverageRatioCommentary(
      stockOneSymbol,
      stockOneRatiosData.interestCoverageRatioTTM,
      stockTwoSymbol,
      stockTwoRatiosData.interestCoverageRatioTTM,
    );

  const hasCommentary = [
    currentRatioCommentary,
    quickRatioCommentary,
    debtToEquityRatioCommentary,
    debtToAssetsRatioCommentary,
    interestCoverageRatioCommentary,
  ].some((commentary) => commentary !== "");

  return (
    <Section ariaLabelledby="financial-strength-metrics-comparison">
      <H2 id="financial-strength-metrics-comparison">
        Financial Strength Metrics Comparison
      </H2>
      {hasCommentary ? (
        <>
          <P>
            This section dives into the financial resilience of {stockOneSymbol}{" "}
            and {stockTwoSymbol}, spotlighting key metrics like liquidity,
            leverage, and debt coverage. Check out the standout observations
            below where notable differences or extremes pop up.
          </P>
          <Ul>
            {currentRatioCommentary && <Ul.Li>{currentRatioCommentary}</Ul.Li>}
            {quickRatioCommentary && <Ul.Li>{quickRatioCommentary}</Ul.Li>}
            {debtToEquityRatioCommentary && (
              <Ul.Li>{debtToEquityRatioCommentary}</Ul.Li>
            )}
            {debtToAssetsRatioCommentary && (
              <Ul.Li>{debtToAssetsRatioCommentary}</Ul.Li>
            )}
            {interestCoverageRatioCommentary && (
              <Ul.Li>{interestCoverageRatioCommentary}</Ul.Li>
            )}
          </Ul>
        </>
      ) : (
        <P>
          Explore the financial strength details for {stockOneSymbol} and{" "}
          {stockTwoSymbol} in the table below.
        </P>
      )}
      <Table>
        <Table.Thead>
          <Table.Thead.Tr>
            <Table.Thead.Tr.Th scope="row">Symbol</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockOneSymbol}</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockTwoSymbol}</Table.Thead.Tr.Th>
          </Table.Thead.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Current Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.currentRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.currentRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Quick Ratio (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.quickRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.quickRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Debt-to-Equity Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.debtToEquityRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.debtToEquityRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Debt-to-Assets Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.debtToAssetsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.debtToAssetsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Interest Coverage Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.interestCoverageRatioTTM === 0
                ? "--"
                : stockOneRatiosData.interestCoverageRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.interestCoverageRatioTTM === 0
                ? "--"
                : stockTwoRatiosData.interestCoverageRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
