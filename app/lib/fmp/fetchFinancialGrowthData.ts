type FinancialGrowthDataPoint = {
  symbol: string;
  date: string;
  revenueGrowth: number;
  epsgrowth: number;
  freeCashFlowGrowth: number;
};

type FinancialGrowthData = {
  date: string;
  revenueGrowth: number;
  epsgrowth: number;
  freeCashFlowGrowth: number;
}[];

export async function fetchFinancialGrowthData(
  symbol: string,
): Promise<FinancialGrowthData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const baseEndpoint =
    "https://financialmodelingprep.com/stable/financial-growth";
  const url = `${baseEndpoint}?symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(
        `FMP API error: ${response.status} ${response.statusText}`,
      );
    }

    const rawData: FinancialGrowthDataPoint[] = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("No financial growth data returned");
    }

    const dataInAscendingDate = [...rawData].reverse();

    const data: FinancialGrowthData = dataInAscendingDate.map(
      (item: FinancialGrowthDataPoint) => ({
        date: item.date,
        revenueGrowth: item.revenueGrowth,
        epsgrowth: item.epsgrowth,
        freeCashFlowGrowth: item.freeCashFlowGrowth,
      }),
    );

    return data;
  } catch (error) {
    console.error(
      `Error fetching financial growth for ${symbol}:`,
      (error as Error).message,
    );
  }

  return null;
}
