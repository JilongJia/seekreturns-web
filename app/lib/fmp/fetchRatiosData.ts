type RatiosData = {
  priceToEarningsRatioTTM: number | null;
  forwardPriceToEarningsGrowthRatioTTM: number | null;
  priceToSalesRatioTTM: number | null;
  priceToBookRatioTTM: number | null;
  priceToFreeCashFlowRatioTTM: number | null;
  netProfitMarginTTM: number | null;
  grossProfitMarginTTM: number | null;
  operatingProfitMarginTTM: number | null;
  currentRatioTTM: number | null;
  quickRatioTTM: number | null;
  debtToEquityRatioTTM: number | null;
  debtToAssetsRatioTTM: number | null;
  interestCoverageRatioTTM: number | null;
  dividendYieldTTM: number;
  dividendPayoutRatioTTM: number;
};

export async function fetchRatiosData(
  symbol: string,
): Promise<RatiosData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  if (!apiKey) {
    console.error("FINANCIAL_MODELING_PREP_API_KEY is not set.");
    return null;
  }

  const baseEndpoint = "https://financialmodelingprep.com/stable/ratios-ttm";
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
      console.warn(`No ratios data returned for symbol: ${symbol}`);
      return null;
    }

    const item = rawData[0];
    const data: RatiosData = {
      priceToEarningsRatioTTM:
        item.priceToEarningsRatioTTM === 0
          ? null
          : item.priceToEarningsRatioTTM,
      forwardPriceToEarningsGrowthRatioTTM:
        item.forwardPriceToEarningsGrowthRatioTTM === 0
          ? null
          : item.forwardPriceToEarningsGrowthRatioTTM,
      priceToSalesRatioTTM:
        item.priceToSalesRatioTTM === 0 ? null : item.priceToSalesRatioTTM,
      priceToBookRatioTTM:
        item.priceToBookRatioTTM === 0 ? null : item.priceToBookRatioTTM,
      priceToFreeCashFlowRatioTTM:
        item.priceToFreeCashFlowRatioTTM === 0
          ? null
          : item.priceToFreeCashFlowRatioTTM,
      netProfitMarginTTM:
        item.netProfitMarginTTM === 0 ? null : item.netProfitMarginTTM,
      grossProfitMarginTTM:
        item.grossProfitMarginTTM === 0 ? null : item.grossProfitMarginTTM,
      operatingProfitMarginTTM:
        item.operatingProfitMarginTTM === 0
          ? null
          : item.operatingProfitMarginTTM,
      currentRatioTTM: item.currentRatioTTM === 0 ? null : item.currentRatioTTM,
      quickRatioTTM: item.quickRatioTTM === 0 ? null : item.quickRatioTTM,
      debtToEquityRatioTTM:
        item.debtToEquityRatioTTM === 0 ? null : item.debtToEquityRatioTTM,
      debtToAssetsRatioTTM:
        item.debtToAssetsRatioTTM === 0 ? null : item.debtToAssetsRatioTTM,
      interestCoverageRatioTTM:
        item.interestCoverageRatioTTM === 0
          ? null
          : item.interestCoverageRatioTTM,

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
