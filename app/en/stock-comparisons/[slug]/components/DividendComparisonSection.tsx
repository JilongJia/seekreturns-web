import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

export type DividendData = {
  symbol: string;
  dividendYieldTTM: number;
};

type DividendComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

async function fetchDividendData(symbol: string): Promise<DividendData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const endpoint = `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${symbol}&apikey=${apiKey}`;
  try {
    const response = await fetch(endpoint);
    const rawData = await response.json();
    const data = rawData[0];
    return {
      symbol: data.symbol,
      dividendYieldTTM: data.dividendYieldTTM,
    };
  } catch (error) {
    console.error("Error fetching dividend data for", symbol, error);
    return null;
  }
}

function generateDividendYieldCommentary(
  stockOneSymbol: string,
  stockOneDividendYield: number,
  stockTwoSymbol: string,
  stockTwoDividendYield: number,
): string {
  const DIVIDEND_YIELD_THRESHOLD_NONE = 0;
  const SIGNIFICANT_RELATIVE_GAP_THRESHOLD = 0.5;

  type DividendYieldCategory = "None" | "Has";

  function getDividendYieldCategory(
    dividendYield: number,
  ): DividendYieldCategory {
    return dividendYield <= DIVIDEND_YIELD_THRESHOLD_NONE ? "None" : "Has";
  }

  const stockOneCategory = getDividendYieldCategory(stockOneDividendYield);
  const stockTwoCategory = getDividendYieldCategory(stockTwoDividendYield);

  if (stockOneCategory === "None" && stockTwoCategory === "None") {
    return `Neither ${stockOneSymbol} nor ${stockTwoSymbol} pays dividends, suggesting both reinvest all profits into growth—likely expansion or innovation—favoring long-term value over immediate income.`;
  }

  if (stockOneCategory === "None" && stockTwoCategory === "Has") {
    return `${stockOneSymbol} pays no dividends, focusing all profits on growth, appealing to capital-gains investors. Meanwhile, ${stockTwoSymbol}’s ${stockTwoDividendYield.toFixed(2)}% yield rewards shareholders, showing financial confidence while supporting objectives—a contrast to ${stockOneSymbol}’s growth-only approach.`;
  }

  if (stockOneCategory === "Has" && stockTwoCategory === "None") {
    return `${stockOneSymbol}’s ${stockOneDividendYield.toFixed(2)}% yield offers steady income while retaining earnings for growth, unlike ${stockTwoSymbol}, which pays none, reinvesting fully—likely in expansion or R&D—for investors eyeing future gains. This pits ${stockOneSymbol}’s balanced approach against ${stockTwoSymbol}’s long-term focus.`;
  }

  if (stockOneCategory === "Has" && stockTwoCategory === "Has") {
    const baseCommentary = `Both ${stockOneSymbol} at ${stockOneDividendYield.toFixed(2)}% and ${stockTwoSymbol} at ${stockTwoDividendYield.toFixed(2)}% pay dividends, blending income with growth in their strategies.`;

    const higherYield = Math.max(stockOneDividendYield, stockTwoDividendYield);
    const lowerYield = Math.min(stockOneDividendYield, stockTwoDividendYield);
    const relativeDifference = (higherYield - lowerYield) / lowerYield;
    const percentageDifference = (relativeDifference * 100).toFixed(0);

    if (relativeDifference > SIGNIFICANT_RELATIVE_GAP_THRESHOLD) {
      const higherStock =
        stockOneDividendYield > stockTwoDividendYield
          ? stockOneSymbol
          : stockTwoSymbol;
      const lowerStock =
        stockOneDividendYield > stockTwoDividendYield
          ? stockTwoSymbol
          : stockOneSymbol;
      const higherYieldValue = higherYield.toFixed(2);
      const lowerYieldValue = lowerYield.toFixed(2);
      return `${baseCommentary} Yet ${higherStock}’s ${higherYieldValue}% yield, ${percentageDifference}% above ${lowerStock}’s ${lowerYieldValue}%, suggests a focus on generous payouts—possibly from stronger profits—while ${lowerStock} leans toward reinvestment, perhaps due to tighter margins.`;
    }

    return `${baseCommentary} Their yields align closely, indicating similar income-growth balances.`;
  }

  return "";
}

export async function DividendComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: DividendComparisonSectionProps) {
  const stockOneDividendData = await fetchDividendData(stockOneSymbol);
  const stockTwoDividendData = await fetchDividendData(stockTwoSymbol);

  if (!stockOneDividendData || !stockTwoDividendData) {
    return (
      <Section ariaLabelledby="dividend-comparison">
        <H2 id="dividend-comparison">Dividend Comparison</H2>
        <P>Dividend data is currently unavailable.</P>
      </Section>
    );
  }

  const dividendYieldCommentary = generateDividendYieldCommentary(
    stockOneSymbol,
    stockOneDividendData.dividendYieldTTM,
    stockTwoSymbol,
    stockTwoDividendData.dividendYieldTTM,
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
              {(stockOneDividendData.dividendYieldTTM * 100).toFixed(2)}%
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoDividendData.dividendYieldTTM * 100).toFixed(2)}%
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
