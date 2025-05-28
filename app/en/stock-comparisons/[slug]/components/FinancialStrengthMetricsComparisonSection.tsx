import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";
import styles from "./FinancialStrengthMetricsComparisonSection.module.css";

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

  if (stockOneCurrentRatio === 0 && stockTwoCurrentRatio === 0) {
    return "";
  }

  if (stockOneCurrentRatio === 0) {
    if (categoryTwo === "Low") {
      return `${symbolTwo} presents a low current ratio of ${currentRatioTwo}, signaling possible pressure on its ability to cover immediate liabilities.`;
    } else {
      return "";
    }
  }

  if (stockTwoCurrentRatio === 0) {
    if (categoryOne === "Low") {
      return `${symbolOne}’s current ratio stands at a low ${currentRatioOne}, which could imply a tighter capacity to satisfy short-term debts.`;
    } else {
      return "";
    }
  }

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

  if (stockOneQuickRatio === 0 && stockTwoQuickRatio === 0) {
    return "";
  }

  if (stockOneQuickRatio === 0) {
    if (categoryTwo === "Low") {
      return `${symbolTwo}’s quick ratio of ${quickRatioTwo} suggests a constrained ability to cover its immediate liabilities with highly liquid assets, potentially signaling near-term financial pressure.`;
    } else {
      return "";
    }
  }

  if (stockTwoQuickRatio === 0) {
    if (categoryOne === "Low") {
      return `A quick ratio of ${quickRatioOne} for ${symbolOne} indicates that its readily convertible assets are low relative to short-term obligations, which might necessitate reliance on inventory sales or other funding sources.`;
    } else {
      return "";
    }
  }

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

  if (stockOneDebtToEquityRatio === 0 && stockTwoDebtToEquityRatio === 0) {
    return "";
  }

  if (stockOneDebtToEquityRatio === 0) {
    if (categoryTwo === "High") {
      return `${symbolTwo}’s debt-to-equity ratio of ${debtToEquityRatioTwo} is notably high, indicating substantial reliance on debt financing which can amplify both risks and potential returns.`;
    } else if (categoryTwo === "Negative") {
      return `${symbolTwo} reports a negative debt-to-equity ratio of ${debtToEquityRatioTwo}, typically a sign of negative shareholder equity and significant financial distress.`;
    } else {
      return "";
    }
  }

  if (stockTwoDebtToEquityRatio === 0) {
    if (categoryOne === "High") {
      return `With a debt-to-equity ratio of ${debtToEquityRatioOne}, ${symbolOne} employs a considerable level of leverage, a strategy that could lead to higher volatility in its financial performance.`;
    } else if (categoryOne === "Negative") {
      return `${symbolOne}’s financial structure shows a negative debt-to-equity ratio of ${debtToEquityRatioOne}, pointing to an excess of liabilities over assets and raising concerns about its solvency.`;
    } else {
      return "";
    }
  }

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Both ${symbolOne} (debt-to-equity ratio ${debtToEquityRatioOne}) and ${symbolTwo} (${debtToEquityRatioTwo}) exhibit negative shareholder equity—assets fall short of liabilities—signaling serious balance-sheet stress.`;
  }

  if (categoryOne === "High" && categoryTwo === "High") {
    return `${symbolOne} and ${symbolTwo} both have debt-to-equity ratios above ${DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH.toFixed(1)} (${debtToEquityRatioOne} and ${debtToEquityRatioTwo}), reflecting aggressive use of debt that can amplify gains but also increase vulnerability to rising rates.`;
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

function generateInterestCoverageRatioCommentary(
  stockOneSymbol: string,
  stockOneInterestCoverageRatio: number,
  stockTwoSymbol: string,
  stockTwoInterestCoverageRatio: number,
): string {
  const INTEREST_COVERAGE_RATIO_THRESHOLD_LOW = 1;
  const INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO = 0;

  type InterestCoverageRatioCategory = "Negative" | "Low" | "Normal";

  const getInterestCoverageRatioCategory = (
    ratio: number,
  ): InterestCoverageRatioCategory => {
    if (ratio < INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO) return "Negative";
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

  if (
    stockOneInterestCoverageRatio === 0 &&
    stockTwoInterestCoverageRatio === 0
  ) {
    return "";
  }

  if (stockOneInterestCoverageRatio === 0) {
    if (categoryTwo === "Negative") {
      return `${symbolTwo} reports a negative interest coverage ratio of ${interestCoverageRatioTwo}, indicating its operating earnings are insufficient to cover even basic operations, let alone interest payments, a critical financial concern.`;
    } else if (categoryTwo === "Low") {
      return `${symbolTwo}’s interest coverage ratio of ${interestCoverageRatioTwo} is low, suggesting that its operating income barely covers (or does not cover) its interest expenses, signaling potential difficulty in servicing its debt.`;
    } else {
      return "";
    }
  }

  if (stockTwoInterestCoverageRatio === 0) {
    if (categoryOne === "Negative") {
      return `With a negative interest coverage ratio of ${interestCoverageRatioOne}, ${symbolOne}’s operating income fails to meet its interest obligations, pointing to severe challenges in its core profitability and debt servicing capacity.`;
    } else if (categoryOne === "Low") {
      return `An interest coverage ratio of ${interestCoverageRatioOne} for ${symbolOne} indicates a constrained ability to meet interest payments from its operating earnings, highlighting a notable financial risk.`;
    } else {
      return "";
    }
  }

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Both ${symbolOne} and ${symbolTwo} report negative interest coverage ratios (${interestCoverageRatioOne}, ${interestCoverageRatioTwo}), meaning EBIT itself is negative—neither can cover interest, a critical solvency warning.`;
  }
  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `Both ${symbolOne} (at ${interestCoverageRatioOne}) and ${symbolTwo} (at ${interestCoverageRatioTwo}) have low interest coverage, meaning their operating earnings do not fully cover interest expenses. This indicates financial strain.`;
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
    return `${symbolOne} meets its interest obligations (ratio ${interestCoverageRatioOne}). In stark contrast, ${symbolTwo}’s negative ratio (${interestCoverageRatioTwo}) means its operating earnings (EBIT) don’t cover basic operations, let alone interest, signaling serious financial trouble.`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne}’s low ratio (${interestCoverageRatioOne}) indicates its earnings don’t cover interest. ${symbolTwo} (at ${interestCoverageRatioTwo}) meets its interest obligations.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo}’s low interest coverage (${interestCoverageRatioTwo}) means it doesn’t cover interest from operating earnings. ${symbolOne} (at ${interestCoverageRatioOne}) meets its interest obligations.`;
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
    interestCoverageRatioCommentary,
  ].some((commentary) => commentary !== "");

  const formatNumber = (value: number): string =>
    value === 0 ? "--" : value.toFixed(2);

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
                Current Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.currentRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.currentRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Quick Ratio (TTM)
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockOneRatiosData.quickRatioTTM)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {formatNumber(stockTwoRatiosData.quickRatioTTM)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>

            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                Debt-to-Equity Ratio (TTM)
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
                Interest Coverage Ratio (TTM)
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
