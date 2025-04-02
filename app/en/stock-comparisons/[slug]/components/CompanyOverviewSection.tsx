import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

export type CompanyProfileData = {
  symbol: string;
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

type CompanyOverviewSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

async function fetchCompanyProfileData(
  symbol: string,
): Promise<CompanyProfileData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const endpoint = `https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${apiKey}`;
  try {
    const response = await fetch(endpoint);
    const rawData = await response.json();
    return rawData[0];
  } catch (error) {
    console.error("Error fetching company profile data for", symbol, error);
    return null;
  }
}

function generateMarketCapComparisonParagraph(
  stockOne: CompanyProfileData,
  stockTwo: CompanyProfileData,
): string {
  const marketCapRatio = stockOne.marketCap / stockTwo.marketCap;
  const stockOneFormattedMarketCap = (
    stockOne.marketCap / 1000000000
  ).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const stockTwoFormattedMarketCap = (
    stockTwo.marketCap / 1000000000
  ).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (marketCapRatio > 1.5) {
    return `For market capitalization, ${stockOne.symbol} is notably larger with a market cap of approximately ${stockOneFormattedMarketCap} billion ${stockOne.currency}, roughly ${marketCapRatio.toFixed(
      2,
    )} times that of ${stockTwo.symbol} (${stockTwoFormattedMarketCap} billion ${stockTwo.currency}).`;
  } else if (marketCapRatio < 0.67) {
    const inverseRatio = 1 / marketCapRatio;
    return `In terms of market cap, ${stockTwo.symbol} stands out with a value of approximately ${stockTwoFormattedMarketCap} billion ${stockTwo.currency}, roughly ${inverseRatio.toFixed(2)} times that of ${stockOne.symbol} (${stockOneFormattedMarketCap} billion ${stockOne.currency}).`;
  } else {
    return `Both ${stockOne.symbol} and ${stockTwo.symbol} have comparable market capitalizations, at ${stockOneFormattedMarketCap} billion ${stockOne.currency} and ${stockTwoFormattedMarketCap} billion ${stockTwo.currency}, respectively.`;
  }
}

function generateBetaComparisonParagraph(
  stockOne: CompanyProfileData,
  stockTwo: CompanyProfileData,
): string {
  const betaRatio = stockOne.beta / stockTwo.beta;
  if (betaRatio > 1.5) {
    return `Regarding volatility, ${stockOne.symbol} has a higher beta of ${stockOne.beta.toFixed(
      2,
    )} (suggesting potentially higher volatility relative to the market), compared to ${stockTwo.symbol}'s beta of ${stockTwo.beta.toFixed(2)}.`;
  } else if (betaRatio < 0.67) {
    return `Looking at volatility, ${stockTwo.symbol} shows a higher beta of ${stockTwo.beta.toFixed(
      2,
    )} (suggesting potentially higher volatility relative to the market), while ${stockOne.symbol} has a beta of ${stockOne.beta.toFixed(2)}.`;
  } else {
    return `Both stocks exhibit similar volatility characteristics based on their beta values, with ${stockOne.symbol} at ${stockOne.beta.toFixed(
      2,
    )} and ${stockTwo.symbol} at ${stockTwo.beta.toFixed(2)}.`;
  }
}

export async function CompanyOverviewSection({
  stockOneSymbol,
  stockTwoSymbol,
}: CompanyOverviewSectionProps) {
  const stockOneCompanyProfileData =
    await fetchCompanyProfileData(stockOneSymbol);
  const stockTwoCompanyProfileData =
    await fetchCompanyProfileData(stockTwoSymbol);

  if (!stockOneCompanyProfileData || !stockTwoCompanyProfileData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">Company Overview</H2>
        <P>Company overview data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">Company Overview</H2>
      <P>
        {generateMarketCapComparisonParagraph(
          stockOneCompanyProfileData,
          stockTwoCompanyProfileData,
        )}
      </P>
      <P>
        {generateBetaComparisonParagraph(
          stockOneCompanyProfileData,
          stockTwoCompanyProfileData,
        )}
      </P>
      <P>For a detailed comparison, please refer to the table below.</P>
      <Table>
        <Table.Thead>
          <Table.Thead.Tr>
            <Table.Thead.Tr.Th scope="row">Symbol</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">
              {stockOneCompanyProfileData.symbol}
            </Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">
              {stockTwoCompanyProfileData.symbol}
            </Table.Thead.Tr.Th>
          </Table.Thead.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Company Name</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.companyName}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.companyName}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Country</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.country}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.country}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Sector</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.sector}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.sector}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Industry</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.industry}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.industry}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">CEO</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.ceo}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.ceo}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Price</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.price.toLocaleString()}{" "}
              {stockOneCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.price.toLocaleString()}{" "}
              {stockTwoCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Market Cap</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(
                stockOneCompanyProfileData.marketCap / 1000000000
              ).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              billion {stockOneCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(
                stockTwoCompanyProfileData.marketCap / 1000000000
              ).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              billion {stockTwoCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Beta</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.beta}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.beta}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Exchange</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.exchange}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.exchange}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">IPO Date</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {new Date(stockOneCompanyProfileData.ipoDate).toLocaleDateString(
                "en",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {new Date(stockTwoCompanyProfileData.ipoDate).toLocaleDateString(
                "en",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">ADR</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.isAdr ? "Yes" : "No"}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.isAdr ? "Yes" : "No"}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
