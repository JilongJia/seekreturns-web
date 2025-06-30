type PriceSeriesData = { date: string; price: number }[];

type HistoricalPriceDataPoint = {
  symbol: string;
  date: string;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  volume: number;
};

export async function fetchPriceSeriesData(
  symbol: string,
): Promise<PriceSeriesData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  if (!apiKey) {
    console.error("FINANCIAL_MODELING_PREP_API_KEY is not set.");
    return null;
  }

  const baseEndpoint =
    "https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted";
  const url = `${baseEndpoint}?symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(
        `FMP API error: ${response.status} ${response.statusText}`,
      );
    }

    const rawData: HistoricalPriceDataPoint[] = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("No historical price data returned");
    }

    const dataInAscendingDate = [...rawData].reverse();

    const data: PriceSeriesData = dataInAscendingDate.map(
      (item: HistoricalPriceDataPoint) => ({
        date: item.date,
        price: item.adjClose,
      }),
    );

    return data;
  } catch (error) {
    console.error(
      `Error fetching price series for ${symbol}:`,
      (error as Error).message,
    );
  }

  return null;
}
