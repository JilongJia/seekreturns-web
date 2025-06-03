type FinancialGrowthData = {
  revenueGrowth: number;
  epsGrowth: number;
};

export async function fetchFinancialGrowthData(
  symbol: string,
): Promise<FinancialGrowthData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const baseEndpoint =
    "https://financialmodelingprep.com/stable/financial-growth";
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
      throw new Error("No financial growth data returned");
    }

    const item = rawData[0];
    const data: FinancialGrowthData = {
      revenueGrowth: item.revenueGrowth,
      epsGrowth: item.epsgrowth,
    };

    return data;
  } catch (error) {
    console.error(
      `Error fetching financial growth for ${symbol}:`,
      (error as Error).message,
    );
    return null;
  }
}
