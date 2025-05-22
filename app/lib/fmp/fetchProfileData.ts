type ProfileData = {
  companyName: string;
  country: string;
  sector: string;
  industry: string;
  ceo: string;
  price: number;
  marketCap: number;
  beta: number;
  exchange: string;
  ipoDate: string;
  isAdr: boolean;
  currency: string;
};

export async function fetchProfileData(
  symbol: string,
): Promise<ProfileData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const baseEndpoint = "https://financialmodelingprep.com/stable/profile";
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
      throw new Error("No profile data returned");
    }

    const item = rawData[0];
    const data: ProfileData = {
      companyName: item.companyName,
      country: item.country,
      sector: item.sector,
      industry: item.industry,
      ceo: item.ceo,
      price: item.price,
      marketCap: item.marketCap,
      beta: item.beta,
      exchange: item.exchange,
      ipoDate: item.ipoDate,
      isAdr: item.isAdr,
      currency: item.currency,
    };

    return data;
  } catch (error) {
    console.error(
      `Error fetching company profile for ${symbol}:`,
      (error as Error).message,
    );
    return null;
  }
}
