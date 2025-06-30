type KeyMetricsData = {
  evToEBITDATTM: number | null;
  evToSalesTTM: number | null;
  returnOnEquityTTM: number | null;
  returnOnAssetsTTM: number | null;
  returnOnInvestedCapitalTTM: number | null;
  netDebtToEBITDATTM: number | null;
};

export async function fetchKeyMetricsData(
  symbol: string,
): Promise<KeyMetricsData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  if (!apiKey) {
    console.error("FINANCIAL_MODELING_PREP_API_KEY is not set.");
    return null;
  }

  const baseEndpoint =
    "https://financialmodelingprep.com/stable/key-metrics-ttm";
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

    const rawData = await response.json();
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn(`No key metrics data returned for symbol: ${symbol}`);
      return null;
    }

    const item = rawData[0];

    const data: KeyMetricsData = {
      evToEBITDATTM: item.evToEBITDATTM === 0 ? null : item.evToEBITDATTM,
      evToSalesTTM: item.evToSalesTTM === 0 ? null : item.evToSalesTTM,
      returnOnEquityTTM:
        item.returnOnEquityTTM === 0 ? null : item.returnOnEquityTTM,
      returnOnAssetsTTM:
        item.returnOnAssetsTTM === 0 ? null : item.returnOnAssetsTTM,
      returnOnInvestedCapitalTTM:
        item.returnOnInvestedCapitalTTM === 0
          ? null
          : item.returnOnInvestedCapitalTTM,
      netDebtToEBITDATTM:
        item.netDebtToEBITDATTM === 0 ? null : item.netDebtToEBITDATTM,
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
