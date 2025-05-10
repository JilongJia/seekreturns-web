import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

type ValuationMetricsData = {
  priceToEarningsRatioTTM: number;
  forwardPriceToEarningsGrowthRatioTTM: number;
  priceToSalesRatioTTM: number;
  priceToBookRatioTTM: number;
  priceToFreeCashFlowRatioTTM: number;
  evToEBITDATTM: number;
  evToSalesTTM: number;
  evToFreeCashFlowTTM: number;
};

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
    priceToEarningsRatio: number,
  ): PriceToEarningsRatioCategory => {
    if (priceToEarningsRatio < PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    if (priceToEarningsRatio > PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH)
      return "High";
    return "Normal";
  };

  const stockOnePriceToEarningsRatioCategory = getPriceToEarningsRatioCategory(
    stockOnePriceToEarningsRatio,
  );
  const stockTwoPriceToEarningsRatioCategory = getPriceToEarningsRatioCategory(
    stockTwoPriceToEarningsRatio,
  );

  if (
    stockOnePriceToEarningsRatioCategory === "Negative" &&
    stockTwoPriceToEarningsRatioCategory === "Negative"
  ) {
    return `Both ${stockOneSymbol} at ${stockOnePriceToEarningsRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoPriceToEarningsRatio.toFixed(2)} have negative P/E values over the past twelve months. This reflects consistent losses rather than profits, meaning their current operations aren’t generating positive net income—a situation that could challenge their financial stability if prolonged.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Negative" &&
    stockTwoPriceToEarningsRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} has a negative P/E of ${stockOnePriceToEarningsRatio.toFixed(2)}, indicating it’s been unprofitable over the past year with no net earnings to support its stock price. On the other hand, ${stockTwoSymbol} at ${stockTwoPriceToEarningsRatio.toFixed(2)} has maintained positive earnings, showing a healthier profit profile.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Negative" &&
    stockTwoPriceToEarningsRatioCategory === "High"
  ) {
    return `${stockOneSymbol} posts a negative P/E of ${stockOnePriceToEarningsRatio.toFixed(2)}, meaning it’s been running at a loss over the past twelve months with no positive earnings. Conversely, ${stockTwoSymbol} at ${stockTwoPriceToEarningsRatio.toFixed(2)} commands a notably elevated P/E, where its stock price reflects a premium far exceeding its current earnings—a sign investors are betting heavily on future gains.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Normal" &&
    stockTwoPriceToEarningsRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} shows a negative P/E of ${stockTwoPriceToEarningsRatio.toFixed(2)}, highlighting a year of losses with no net profit generated. Meanwhile, ${stockOneSymbol} at ${stockOnePriceToEarningsRatio.toFixed(2)} has sustained positive earnings, offering a more stable earnings foundation.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "High" &&
    stockTwoPriceToEarningsRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} carries a lofty P/E of ${stockOnePriceToEarningsRatio.toFixed(2)}, where its market price towers over its earnings from the past year—investors are paying a significant premium for each dollar of profit. In stark contrast, ${stockTwoSymbol} at ${stockTwoPriceToEarningsRatio.toFixed(2)} is negative, revealing a complete absence of net earnings over the same period.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "High" &&
    stockTwoPriceToEarningsRatioCategory === "High"
  ) {
    return `Both ${stockOneSymbol} at ${stockOnePriceToEarningsRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoPriceToEarningsRatio.toFixed(2)} exhibit P/E values well above typical levels. Their stock prices are trading at substantial multiples of their current earnings, suggesting the market anticipates robust future profitability or sees value beyond today’s income statements.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "High" &&
    stockTwoPriceToEarningsRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} stands out with a P/E of ${stockOnePriceToEarningsRatio.toFixed(2)}, far exceeding conventional benchmarks. This elevated figure means its stock price is disproportionately large compared to its earnings over the past twelve months, often reflecting strong investor optimism about its future. Meanwhile, ${stockTwoSymbol} at ${stockTwoPriceToEarningsRatio.toFixed(2)} aligns with more typical earnings multiples.`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Normal" &&
    stockTwoPriceToEarningsRatioCategory === "High"
  ) {
    return `${stockTwoSymbol} has a notably high P/E of ${stockTwoPriceToEarningsRatio.toFixed(2)}, where its market price commands a steep multiple of its earnings from the past year—indicating investors are pricing in significant future potential. On the flip side, ${stockOneSymbol} at ${stockOnePriceToEarningsRatio.toFixed(2)} maintains a P/E within a more standard range, tied closer to its current profitability.`;
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
    forwardPEGRatio: number,
  ): ForwardPEGRatioCategory => {
    if (forwardPEGRatio < FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    return "Normal";
  };

  const stockOneForwardPEGRatioCategory = getForwardPEGRatioCategory(
    stockOneForwardPEGRatio,
  );
  const stockTwoForwardPEGRatioCategory = getForwardPEGRatioCategory(
    stockTwoForwardPEGRatio,
  );

  if (
    stockOneForwardPEGRatioCategory === "Negative" &&
    stockTwoForwardPEGRatioCategory === "Negative"
  ) {
    return `Both ${stockOneSymbol} at ${stockOneForwardPEGRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoForwardPEGRatio.toFixed(2)} show negative Forward PEG values. This signals that analysts foresee either outright losses or a decline in earnings over the next period—a troubling outlook that casts doubt on their near-term profit potential.`;
  }
  if (
    stockOneForwardPEGRatioCategory === "Negative" &&
    stockTwoForwardPEGRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} carries a negative Forward PEG of ${stockOneForwardPEGRatio.toFixed(2)}, hinting at analyst expectations of losses or shrinking earnings in the coming period—a potential warning for its future performance. On the flip side, ${stockTwoSymbol} at ${stockTwoForwardPEGRatio.toFixed(2)} sidesteps this concern with a more favorable outlook.`;
  }
  if (
    stockOneForwardPEGRatioCategory === "Normal" &&
    stockTwoForwardPEGRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} has a negative Forward PEG of ${stockTwoForwardPEGRatio.toFixed(2)}, suggesting analysts predict either a drop in earnings or no profits at all in the near future—a red flag for its growth trajectory. Meanwhile, ${stockOneSymbol} at ${stockOneForwardPEGRatio.toFixed(2)} avoids such a pessimistic forecast.`;
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
    priceToBookRatio: number,
  ): PriceToBookRatioCategory => {
    if (priceToBookRatio < PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    return "Normal";
  };

  const stockOnePriceToBookRatioCategory = getPriceToBookRatioCategory(
    stockOnePriceToBookRatio,
  );
  const stockTwoPriceToBookRatioCategory = getPriceToBookRatioCategory(
    stockTwoPriceToBookRatio,
  );

  if (
    stockOnePriceToBookRatioCategory === "Negative" &&
    stockTwoPriceToBookRatioCategory === "Negative"
  ) {
    return `Both ${stockOneSymbol} at ${stockOnePriceToBookRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoPriceToBookRatio.toFixed(2)} have negative Price-to-Book values. This means their liabilities outstrip their assets, leaving them with negative net worth—a dire signal that their financial foundations are deeply strained, potentially teetering on the edge of insolvency.`;
  }
  if (
    stockOnePriceToBookRatioCategory === "Negative" &&
    stockTwoPriceToBookRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} shows a negative Price-to-Book of ${stockOnePriceToBookRatio.toFixed(2)}, revealing that its liabilities surpass its assets. This precarious position suggests a fragile balance sheet, where the company’s market value hinges on factors beyond its tangible worth. On the other hand, ${stockTwoSymbol} at ${stockTwoPriceToBookRatio.toFixed(2)} maintains a positive net worth, free of this troubling indicator.`;
  }
  if (
    stockOnePriceToBookRatioCategory === "Normal" &&
    stockTwoPriceToBookRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} posts a negative Price-to-Book of ${stockTwoPriceToBookRatio.toFixed(2)}, where its liabilities exceed its assets—a stark warning of underlying financial weakness that could threaten its long-term viability. Meanwhile, ${stockOneSymbol} at ${stockOnePriceToBookRatio.toFixed(2)} stands on firmer ground with a positive book value.`;
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
    priceToFreeCashFlowRatio: number,
  ): PriceToFreeCashFlowRatioCategory => {
    if (
      priceToFreeCashFlowRatio <
      PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE
    )
      return "Negative";
    return "Normal";
  };

  const stockOnePriceToFreeCashFlowRatioCategory =
    getPriceToFreeCashFlowRatioCategory(stockOnePriceToFreeCashFlowRatio);
  const stockTwoPriceToFreeCashFlowRatioCategory =
    getPriceToFreeCashFlowRatioCategory(stockTwoPriceToFreeCashFlowRatio);

  if (
    stockOnePriceToFreeCashFlowRatioCategory === "Negative" &&
    stockTwoPriceToFreeCashFlowRatioCategory === "Negative"
  ) {
    return `Both ${stockOneSymbol} at ${stockOnePriceToFreeCashFlowRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoPriceToFreeCashFlowRatio.toFixed(2)} have negative Price-to-Free Cash Flow values. This reveals they’ve been consuming more cash than they generate over the past year—a persistent cash drain that could strain their ability to operate without external funding.`;
  }
  if (
    stockOnePriceToFreeCashFlowRatioCategory === "Negative" &&
    stockTwoPriceToFreeCashFlowRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} shows a negative Price-to-Free Cash Flow of ${stockOnePriceToFreeCashFlowRatio.toFixed(2)}, meaning it’s been burning through cash faster than it can produce it over the past twelve months—a troubling sign for its financial resilience. On the flip side, ${stockTwoSymbol} at ${stockTwoPriceToFreeCashFlowRatio.toFixed(2)} has managed to keep its cash flow in positive territory.`;
  }
  if (
    stockOnePriceToFreeCashFlowRatioCategory === "Normal" &&
    stockTwoPriceToFreeCashFlowRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} has a negative Price-to-Free Cash Flow of ${stockTwoPriceToFreeCashFlowRatio.toFixed(2)}, indicating it’s spent more cash than it’s brought in over the past year—a cash flow shortfall that raises questions about its operational sustainability. Meanwhile, ${stockOneSymbol} at ${stockOnePriceToFreeCashFlowRatio.toFixed(2)} maintains a positive cash position.`;
  }

  return "";
}

async function fetchValuationMetricsData(
  symbol: string,
): Promise<ValuationMetricsData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const keyMetricsEndpoint = `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${symbol}&apikey=${apiKey}`;
  const ratiosEndpoint = `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${symbol}&apikey=${apiKey}`;
  try {
    const [keyMetricsResponse, ratiosResponse] = await Promise.all([
      fetch(keyMetricsEndpoint),
      fetch(ratiosEndpoint),
    ]);
    const keyMetricsRawData = await keyMetricsResponse.json();
    const ratiosRawData = await ratiosResponse.json();

    if (
      !keyMetricsRawData ||
      keyMetricsRawData.length === 0 ||
      !ratiosRawData ||
      ratiosRawData.length === 0
    ) {
      return null;
    }

    const keyMetricsData = keyMetricsRawData[0];
    const ratiosData = ratiosRawData[0];

    const data: ValuationMetricsData = {
      priceToEarningsRatioTTM: ratiosData.priceToEarningsRatioTTM,
      forwardPriceToEarningsGrowthRatioTTM:
        ratiosData.forwardPriceToEarningsGrowthRatioTTM,
      priceToSalesRatioTTM: ratiosData.priceToSalesRatioTTM,
      priceToBookRatioTTM: ratiosData.priceToBookRatioTTM,
      priceToFreeCashFlowRatioTTM: ratiosData.priceToFreeCashFlowRatioTTM,
      evToEBITDATTM: keyMetricsData.evToEBITDATTM,
      evToSalesTTM: keyMetricsData.evToSalesTTM,
      evToFreeCashFlowTTM: keyMetricsData.evToFreeCashFlowTTM,
    };
    return data;
  } catch (error) {
    console.error("Error fetching valuation metrics for", symbol, error);
    return null;
  }
}

export async function ValuationMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: ValuationMetricsComparisonSectionProps) {
  const [stockOneValuationMetricsData, stockTwoValuationMetricsData] =
    await Promise.all([
      fetchValuationMetricsData(stockOneSymbol),
      fetchValuationMetricsData(stockTwoSymbol),
    ]);

  if (!stockOneValuationMetricsData || !stockTwoValuationMetricsData) {
    return (
      <Section ariaLabelledby="valuation-metrics-comparison">
        <H2 id="valuation-metrics-comparison">Valuation Metrics Comparison</H2>
        <P>Valuation metrics data is currently unavailable.</P>
      </Section>
    );
  }

  const priceToEarningsRatioCommentary = generatePriceToEarningsRatioCommentary(
    stockOneSymbol,
    stockOneValuationMetricsData.priceToEarningsRatioTTM,
    stockTwoSymbol,
    stockTwoValuationMetricsData.priceToEarningsRatioTTM,
  );
  const forwardPriceToEarningsGrowthRatioCommentary =
    generateForwardPEGRatioCommentary(
      stockOneSymbol,
      stockOneValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM,
      stockTwoSymbol,
      stockTwoValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM,
    );
  const priceToBookRatioCommentary = generatePriceToBookRatioCommentary(
    stockOneSymbol,
    stockOneValuationMetricsData.priceToBookRatioTTM,
    stockTwoSymbol,
    stockTwoValuationMetricsData.priceToBookRatioTTM,
  );
  const priceToFreeCashFlowRatioCommentary =
    generatePriceToFreeCashFlowRatioCommentary(
      stockOneSymbol,
      stockOneValuationMetricsData.priceToFreeCashFlowRatioTTM,
      stockTwoSymbol,
      stockTwoValuationMetricsData.priceToFreeCashFlowRatioTTM,
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
              {stockOneValuationMetricsData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Forward PEG Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Price-to-Sales Ratio (P/S, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Price-to-Book Ratio (P/B, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Price-to-Free Cash Flow Ratio (P/FCF, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToFreeCashFlowRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToFreeCashFlowRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              EV-to-EBITDA (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">EV-to-Sales (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              EV-to-Free Cash Flow (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
