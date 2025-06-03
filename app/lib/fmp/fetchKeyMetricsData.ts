type KeyMetricsData = {
  evToEBITDATTM: number;
  evToSalesTTM: number;
  returnOnEquityTTM: number;
  returnOnAssetsTTM: number;
  netDebtToEBITDATTM: number;
};

export async function fetchKeyMetricsData(
  symbol: string,
): Promise<KeyMetricsData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const baseEndpoint =
    "https://financialmodelingprep.com/stable/key-metrics-ttm";
  const url = `${baseEndpoint}?symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) {
      throw new Error(
        `FMP API error: ${response.status} ${response.statusText}`,
      );
    }

    const rawData = await response.json();
    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("No key metrics data returned");
    }

    const item = rawData[0];
    const data: KeyMetricsData = {
      evToEBITDATTM: item.evToEBITDATTM,
      evToSalesTTM: item.evToSalesTTM,
      returnOnEquityTTM: item.returnOnEquityTTM,
      returnOnAssetsTTM: item.returnOnAssetsTTM,
      netDebtToEBITDATTM: item.netDebtToEBITDATTM,
    };

    return data;
  } catch (error) {
    console.error(
      `Error fetching key metrics for ${symbol}:`,
      (error as Error).message,
    );
    return null;
  }
}
