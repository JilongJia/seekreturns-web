import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

type DividendComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generateDividendYieldCommentary(
  stockOneSymbol: string,
  stockOneDividendYield: number,
  stockTwoSymbol: string,
  stockTwoDividendYield: number,
): string {
  const DIVIDEND_YIELD_THRESHOLD_NONE = 0;
  const DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP = 0.5;

  type DividendYieldCategory = "None" | "Has";

  const getDividendYieldCategory = (
    dividendYield: number,
  ): DividendYieldCategory =>
    dividendYield <= DIVIDEND_YIELD_THRESHOLD_NONE ? "None" : "Has";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const categoryOne = getDividendYieldCategory(stockOneDividendYield);
  const categoryTwo = getDividendYieldCategory(stockTwoDividendYield);
  const dividendYieldOne = (stockOneDividendYield * 100).toFixed(2);
  const dividendYieldTwo = (stockTwoDividendYield * 100).toFixed(2);

  if (categoryOne === "None" && categoryTwo === "None") {
    return `Neither ${symbolOne} nor ${symbolTwo} currently pays a dividend yield; this often indicates they are reinvesting earnings for growth, prioritizing long-term expansion over immediate cash returns to shareholders.`;
  }

  if (categoryOne === "None" && categoryTwo === "Has") {
    return `${symbolOne} offers a 0% dividend yield, suggesting it may be reinvesting available cash back into the business for future growth, while ${symbolTwo} provides a ${dividendYieldTwo}% dividend yield, giving investors a steady income stream.`;
  }

  if (categoryOne === "Has" && categoryTwo === "None") {
    return `${symbolOne} delivers a ${dividendYieldOne}% dividend yield, blending income with growth, whereas ${symbolTwo} appears to retain its profits, possibly to fund operations, R&D, or other growth initiatives.`;
  }

  const absoluteGap = Math.abs(stockOneDividendYield - stockTwoDividendYield);
  const smallerDividendYield = Math.min(
    stockOneDividendYield,
    stockTwoDividendYield,
  );
  const relativeGapPercent = (
    (absoluteGap / smallerDividendYield) *
    100
  ).toFixed(0);

  if (
    stockOneDividendYield >
    stockTwoDividendYield * (1 + DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP)
  ) {
    return `${symbolOne}’s dividend yield of ${dividendYieldOne}% is about ${relativeGapPercent}% higher than ${symbolTwo}’s ${dividendYieldTwo}%, underscoring its stronger focus on returning cash to shareholders.`;
  }

  if (
    stockTwoDividendYield >
    stockOneDividendYield * (1 + DIVIDEND_THRESHOLD_SIGNIFICANT_RELATIVE_GAP)
  ) {
    return `${symbolTwo} stands out with a ${dividendYieldTwo}% dividend yield—around ${relativeGapPercent}% above ${symbolOne}’s ${dividendYieldOne}%—highlighting its emphasis on generous payouts.`;
  }

  return `Both ${symbolOne} and ${symbolTwo} offer similar dividend yields (${dividendYieldOne}% vs. ${dividendYieldTwo}%), indicating comparable approaches to balancing income and growth.`;
}

export async function DividendComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: DividendComparisonSectionProps) {
  const stockOneRatiosData = await fetchRatiosData(stockOneSymbol);
  const stockTwoRatiosData = await fetchRatiosData(stockTwoSymbol);

  if (!stockOneRatiosData || !stockTwoRatiosData) {
    return (
      <Section ariaLabelledby="dividend-comparison">
        <H2 id="dividend-comparison">Dividend Comparison</H2>
        <P>Dividend data is currently unavailable.</P>
      </Section>
    );
  }

  const dividendYieldCommentary = generateDividendYieldCommentary(
    stockOneSymbol,
    stockOneRatiosData.dividendYieldTTM,
    stockTwoSymbol,
    stockTwoRatiosData.dividendYieldTTM,
  );

  return (
    <Section ariaLabelledby="dividend-comparison">
      <H2 id="dividend-comparison">Dividend Comparison</H2>
      <P>{dividendYieldCommentary}</P>
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
              Dividend Yield (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(stockOneRatiosData.dividendYieldTTM * 100).toFixed(2)}%
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoRatiosData.dividendYieldTTM * 100).toFixed(2)}%
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
