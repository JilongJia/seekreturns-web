import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

export type ValuationMetricsData = {
  priceToEarningsRatioTTM: number;
  forwardPriceToEarningsGrowthRatioTTM: number;
  priceToSalesRatioTTM: number;
  priceToBookRatioTTM: number;
  priceToFreeCashFlowRatioTTM: number;
  evToEBITDATTM: number;
  evToSalesTTM: number;
  evToFreeCashFlowTTM: number;
  dividendYieldTTM: number;
  earningsYieldTTM: number;
  freeCashFlowYieldTTM: number;
};

export type ValuationMetricsComparisonData = {
  stockOne: ValuationMetricsData;
  stockTwo: ValuationMetricsData;
};

type ValuationMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

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

    const keyMetricsData = keyMetricsRawData[0];
    const ratiosData = ratiosRawData[0];
    if (!keyMetricsData || !ratiosData) return null;

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
      dividendYieldTTM: ratiosData.dividendYieldTTM,
      earningsYieldTTM: keyMetricsData.earningsYieldTTM,
      freeCashFlowYieldTTM: keyMetricsData.freeCashFlowYieldTTM,
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
      <Section ariaLabelledby="valuation-metrics">
        <H2 id="valuation-metrics">Valuation Metrics Comparison</H2>
        <P>Valuation metrics data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="valuation-metrics">
      <H2 id="valuation-metrics">Valuation Metrics Comparison</H2>
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
              Price-to-Earnings (P/E, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Forward PEG Ratio</Table.Tbody.Tr.Th>
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
              Price-to-Sales (P/S, TTM)
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
              Price-to-Book (P/B, TTM)
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
              Price-to-Free Cash Flow (P/FCF, TTM)
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
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Dividend Yield (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(stockOneValuationMetricsData.dividendYieldTTM * 100).toFixed(2)}
              %
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoValuationMetricsData.dividendYieldTTM * 100).toFixed(2)}
              %
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Earnings Yield (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(stockOneValuationMetricsData.earningsYieldTTM * 100).toFixed(2)}
              %
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoValuationMetricsData.earningsYieldTTM * 100).toFixed(2)}
              %
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Free Cash Flow Yield (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(
                stockOneValuationMetricsData.freeCashFlowYieldTTM * 100
              ).toFixed(2)}
              %
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(
                stockTwoValuationMetricsData.freeCashFlowYieldTTM * 100
              ).toFixed(2)}
              %
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
