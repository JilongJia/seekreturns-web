type RatiosData = {
  priceToEarningsRatioTTM: number;
  forwardPriceToEarningsGrowthRatioTTM: number;
  priceToSalesRatioTTM: number;
  priceToBookRatioTTM: number;
  netProfitMarginTTM: number;
  grossProfitMarginTTM: number;
  operatingProfitMarginTTM: number;
  currentRatioTTM: number;
  quickRatioTTM: number;
  debtToEquityRatioTTM: number;
  debtToAssetsRatioTTM: number;
  interestCoverageRatioTTM: number;
  dividendYieldTTM: number;
  dividendPayoutRatioTTM: number;
};

export async function fetchRatiosData(
  symbol: string,
): Promise<RatiosData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const baseEndpoint = "https://financialmodelingprep.com/stable/ratios-ttm";
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
      throw new Error("No ratios data returned");
    }

    const item = rawData[0];
    const data: RatiosData = {
      priceToEarningsRatioTTM: item.priceToEarningsRatioTTM,
      forwardPriceToEarningsGrowthRatioTTM:
        item.forwardPriceToEarningsGrowthRatioTTM,
      priceToSalesRatioTTM: item.priceToSalesRatioTTM,
      priceToBookRatioTTM: item.priceToBookRatioTTM,
      netProfitMarginTTM: item.netProfitMarginTTM,
      grossProfitMarginTTM: item.grossProfitMarginTTM,
      operatingProfitMarginTTM: item.operatingProfitMarginTTM,
      currentRatioTTM: item.currentRatioTTM,
      quickRatioTTM: item.quickRatioTTM,
      debtToEquityRatioTTM: item.debtToEquityRatioTTM,
      debtToAssetsRatioTTM: item.debtToAssetsRatioTTM,
      interestCoverageRatioTTM: item.interestCoverageRatioTTM,
      dividendYieldTTM: item.dividendYieldTTM,
      dividendPayoutRatioTTM: item.dividendPayoutRatioTTM,
    };

    return data;
  } catch (error) {
    console.error(
      `Error fetching ratios for ${symbol}:`,
      (error as Error).message,
    );
    return null;
  }
}
