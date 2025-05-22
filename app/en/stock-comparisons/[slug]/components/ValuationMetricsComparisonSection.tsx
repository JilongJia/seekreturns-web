import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";
import { fetchKeyMetricsData } from "@/app/lib/fmp/fetchKeyMetricsData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

type ValuationMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generatePriceToEarningsRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToEarningsRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToEarningsRatio: number,
): string {
  const PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE = 0;
  const PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH = 100;

  type PriceToEarningsRatioCategory = "Negative" | "Normal" | "High";

  const getPriceToEarningsRatioCategory = (
    ratio: number,
  ): PriceToEarningsRatioCategory => {
    if (ratio < PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE) return "Negative";
    if (ratio > PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH) return "High";
    return "Normal";
  };

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const priceToEarningsRatioOne = stockOnePriceToEarningsRatio.toFixed(2);
  const priceToEarningsRatioTwo = stockTwoPriceToEarningsRatio.toFixed(2);
  const categoryOne = getPriceToEarningsRatioCategory(
    stockOnePriceToEarningsRatio,
  );
  const categoryTwo = getPriceToEarningsRatioCategory(
    stockTwoPriceToEarningsRatio,
  );

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Neither ${symbolOne} nor ${symbolTwo} turned a profit—both carry negative P/E ratios of ${priceToEarningsRatioOne} and ${priceToEarningsRatioTwo}, underscoring continued losses that pressure their valuations.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} posts a negative P/E of ${priceToEarningsRatioOne}, reflecting last year’s net loss, while ${symbolTwo} at ${priceToEarningsRatioTwo} signals healthy earnings.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} shows a negative P/E of ${priceToEarningsRatioTwo}, highlighting a year of losses, whereas ${symbolOne} at ${priceToEarningsRatioOne} trades on solid profitability.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "High") {
    return `${symbolOne} has a negative P/E (${priceToEarningsRatioOne}) due to recent losses. In contrast, ${symbolTwo} commands a premium multiple of ${priceToEarningsRatioTwo}, signaling strong market confidence in its future earnings growth to justify this high valuation.`;
  }
  if (categoryOne === "High" && categoryTwo === "Negative") {
    return `${symbolOne} trades at a lofty P/E of ${priceToEarningsRatioOne}, implying strong growth expectations, in contrast to ${symbolTwo}’s negative P/E of ${priceToEarningsRatioTwo} driven by recent losses.`;
  }

  if (categoryOne === "High" && categoryTwo === "High") {
    return `${symbolOne} and ${symbolTwo} both trade above a 100× earnings multiple (${priceToEarningsRatioOne} and ${priceToEarningsRatioTwo}), reflecting lofty growth narratives priced into their shares.`;
  }

  if (categoryOne === "High" && categoryTwo === "Normal") {
    return `${symbolOne} stands out with a premium P/E of ${priceToEarningsRatioOne}, while ${symbolTwo} at ${priceToEarningsRatioTwo} remains within a more conventional earnings multiple.`;
  }
  if (categoryOne === "Normal" && categoryTwo === "High") {
    return `${symbolTwo} features a high P/E of ${priceToEarningsRatioTwo}, indicating strong growth expectations, compared to ${symbolOne} at ${priceToEarningsRatioOne}, which trades at a more standard valuation based on its current earnings.`;
  }

  return "";
}

function generateForwardPEGRatioCommentary(
  stockOneSymbol: string,
  stockOneForwardPEGRatio: number,
  stockTwoSymbol: string,
  stockTwoForwardPEGRatio: number,
): string {
  const FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE = 0;

  type ForwardPEGRatioCategory = "Negative" | "Normal";

  const getForwardPEGRatioCategory = (
    ratio: number,
  ): ForwardPEGRatioCategory =>
    ratio < FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE ? "Negative" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const forwardPEGRatioOne = stockOneForwardPEGRatio.toFixed(2);
  const forwardPEGRatioTwo = stockTwoForwardPEGRatio.toFixed(2);
  const categoryOne = getForwardPEGRatioCategory(stockOneForwardPEGRatio);
  const categoryTwo = getForwardPEGRatioCategory(stockTwoForwardPEGRatio);

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Analysts assign negative forward PEG ratios to both ${symbolOne} (${forwardPEGRatioOne}) and ${symbolTwo} (${forwardPEGRatioTwo}), suggesting expectation of shrinking or negative earnings in the upcoming period—a worrying sign for their profit outlook.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} posts a negative forward PEG of ${forwardPEGRatioOne}, hinting at anticipated earnings decline, whereas ${symbolTwo} at ${forwardPEGRatioTwo} has projections for stable or growing earnings.`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} shows a negative forward PEG of ${forwardPEGRatioTwo}, signaling expected earnings contraction, while ${symbolOne} at ${forwardPEGRatioOne} maintains analysts’ projections for stable or improved profits.`;
  }

  return "";
}

function generatePriceToBookRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToBookRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToBookRatio: number,
): string {
  const PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE = 0;

  type PriceToBookRatioCategory = "Negative" | "Normal";

  const getPriceToBookRatioCategory = (
    ratio: number,
  ): PriceToBookRatioCategory =>
    ratio < PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE ? "Negative" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const priceToBookRatioOne = stockOnePriceToBookRatio.toFixed(2);
  const priceToBookRatioTwo = stockTwoPriceToBookRatio.toFixed(2);
  const categoryOne = getPriceToBookRatioCategory(stockOnePriceToBookRatio);
  const categoryTwo = getPriceToBookRatioCategory(stockTwoPriceToBookRatio);

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `Book value is underwater for both ${symbolOne} (${priceToBookRatioOne}) and ${symbolTwo} (${priceToBookRatioTwo}), meaning liabilities exceed assets—signaling a critical solvency risk for both companies.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} has a negative P/B ratio of ${priceToBookRatioOne}, indicating its liabilities exceed assets (negative equity). ${symbolTwo}, with a P/B of ${priceToBookRatioTwo}, maintains positive shareholder equity.`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} carries a sub-zero price-to-book ratio of ${priceToBookRatioTwo}, indicating negative equity. In contrast, ${symbolOne} (P/B ${priceToBookRatioOne}) has positive book value.`;
  }

  return "";
}

function generatePriceToFreeCashFlowRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToFreeCashFlowRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToFreeCashFlowRatio: number,
): string {
  const PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE = 0;

  type PriceToFreeCashFlowRatioCategory = "Negative" | "Normal";

  const getPriceToFreeCashFlowRatioCategory = (
    ratio: number,
  ): PriceToFreeCashFlowRatioCategory =>
    ratio < PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE
      ? "Negative"
      : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const priceToFreeCashFlowRatioOne =
    stockOnePriceToFreeCashFlowRatio.toFixed(2);
  const priceToFreeCashFlowRatioTwo =
    stockTwoPriceToFreeCashFlowRatio.toFixed(2);
  const categoryOne = getPriceToFreeCashFlowRatioCategory(
    stockOnePriceToFreeCashFlowRatio,
  );
  const categoryTwo = getPriceToFreeCashFlowRatioCategory(
    stockTwoPriceToFreeCashFlowRatio,
  );

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} and ${symbolTwo} both consumed more free cash flow than they generated last year—P/FCF of ${priceToFreeCashFlowRatioOne} and ${priceToFreeCashFlowRatioTwo}, respectively—highlighting persistent liquidity pressure.`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} has a negative Price-to-Free Cash Flow ratio of ${priceToFreeCashFlowRatioOne}, signaling it consumed more cash than it produced over the last year—an important liquidity warning. In contrast, ${symbolTwo} (P/FCF ${priceToFreeCashFlowRatioTwo}) indicates positive free cash flow generation.`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} reports a negative Price-to-Free Cash Flow ratio of ${priceToFreeCashFlowRatioTwo}, showing a cash flow shortfall that could threaten its operational sustainability, while ${symbolOne} at ${priceToFreeCashFlowRatioOne} maintains positive cash flow.`;
  }

  return "";
}

export async function ValuationMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: ValuationMetricsComparisonSectionProps) {
  const [
    stockOneRatiosData,
    stockOneKeyMetricsData,
    stockTwoRatiosData,
    stockTwoKeyMetricsData,
  ] = await Promise.all([
    fetchRatiosData(stockOneSymbol),
    fetchKeyMetricsData(stockOneSymbol),
    fetchRatiosData(stockTwoSymbol),
    fetchKeyMetricsData(stockTwoSymbol),
  ]);

  if (
    !stockOneRatiosData ||
    !stockOneKeyMetricsData ||
    !stockTwoRatiosData ||
    !stockTwoKeyMetricsData
  ) {
    return (
      <Section ariaLabelledby="valuation-metrics-comparison">
        <H2 id="valuation-metrics-comparison">Valuation Metrics Comparison</H2>
        <P>Valuation metrics data is currently unavailable.</P>
      </Section>
    );
  }

  const priceToEarningsRatioCommentary = generatePriceToEarningsRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.priceToEarningsRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.priceToEarningsRatioTTM,
  );
  const forwardPriceToEarningsGrowthRatioCommentary =
    generateForwardPEGRatioCommentary(
      stockOneSymbol,
      stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM,
      stockTwoSymbol,
      stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM,
    );
  const priceToBookRatioCommentary = generatePriceToBookRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.priceToBookRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.priceToBookRatioTTM,
  );
  const priceToFreeCashFlowRatioCommentary =
    generatePriceToFreeCashFlowRatioCommentary(
      stockOneSymbol,
      stockOneRatiosData.priceToFreeCashFlowRatioTTM,
      stockTwoSymbol,
      stockTwoRatiosData.priceToFreeCashFlowRatioTTM,
    );

  const hasCommentary = [
    priceToEarningsRatioCommentary,
    forwardPriceToEarningsGrowthRatioCommentary,
    priceToBookRatioCommentary,
    priceToFreeCashFlowRatioCommentary,
  ].some((commentary) => commentary !== "");

  return (
    <Section ariaLabelledby="valuation-metrics-comparison">
      <H2 id="valuation-metrics-comparison">Valuation Metrics Comparison</H2>
      {hasCommentary ? (
        <>
          <P>
            The section examines key financial ratios to assess the valuation of{" "}
            {stockOneSymbol} and {stockTwoSymbol} based on earnings, cash flow,
            sales, and book value. Pay attention to the following notable points
            where extreme values stand out.
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
          For a detailed comparison of valuation metrics between{" "}
          {stockOneSymbol} and {stockTwoSymbol}, please refer to the table
          below.
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
              Price-to-Earnings Ratio (P/E, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Forward PEG Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Price-to-Sales Ratio (P/S, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Price-to-Book Ratio (P/B, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Price-to-Free Cash Flow Ratio (P/FCF, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.priceToFreeCashFlowRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.priceToFreeCashFlowRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              EV-to-EBITDA (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneKeyMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoKeyMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">EV-to-Sales (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneKeyMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoKeyMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              EV-to-Free Cash Flow (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneKeyMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoKeyMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
