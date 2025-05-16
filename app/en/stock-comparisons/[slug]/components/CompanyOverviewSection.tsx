import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

type CompanyOverviewSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generateMarketCapComparisonCommentary(
  stockOneSymbol: string,
  stockOneMarketCap: number,
  stockOneCurrency: string,
  stockTwoSymbol: string,
  stockTwoMarketCap: number,
  stockTwoCurrency: string,
): string {
  const marketCapRatio = stockOneMarketCap / stockTwoMarketCap;
  const stockOneFormattedMarketCap = (
    stockOneMarketCap / 1000000000
  ).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const stockTwoFormattedMarketCap = (
    stockTwoMarketCap / 1000000000
  ).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (marketCapRatio > 1.5) {
    return `${stockOneSymbol} dwarfs ${stockTwoSymbol} in market cap, clocking in at ${stockOneFormattedMarketCap} billion ${stockOneCurrency}—about ${marketCapRatio.toFixed(2)} times the ${stockTwoFormattedMarketCap} billion ${stockTwoCurrency} of its counterpart.`;
  } else if (marketCapRatio < 0.67) {
    const inverseRatio = 1 / marketCapRatio;
    return `${stockTwoSymbol} towers over ${stockOneSymbol} with a market cap of ${stockTwoFormattedMarketCap} billion ${stockTwoCurrency}, roughly ${inverseRatio.toFixed(2)} times the ${stockOneFormattedMarketCap} billion ${stockOneCurrency} of its peer.`;
  } else {
    return `${stockOneSymbol} (${stockOneFormattedMarketCap} billion ${stockOneCurrency}) and ${stockTwoSymbol} (${stockTwoFormattedMarketCap} billion ${stockTwoCurrency}) sit neck-and-neck in market cap terms.`;
  }
}

function generateBetaComparisonCommentary(
  stockOneSymbol: string,
  stockOneBeta: number,
  stockTwoSymbol: string,
  stockTwoBeta: number,
): string {
  const betaRatio = stockOneBeta / stockTwoBeta;
  if (betaRatio > 1.5) {
    return `${stockOneSymbol} rides a wilder wave with a beta of ${stockOneBeta.toFixed(2)}, hinting at bigger swings than ${stockTwoSymbol}’s steadier ${stockTwoBeta.toFixed(2)}.`;
  } else if (betaRatio < 0.67) {
    return `${stockTwoSymbol} dances to a riskier tune, sporting a beta of ${stockTwoBeta.toFixed(2)}, while ${stockOneSymbol} keeps it calmer at ${stockOneBeta.toFixed(2)}.`;
  } else {
    return `${stockOneSymbol} at ${stockOneBeta.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoBeta.toFixed(2)} move in sync when it comes to market volatility.`;
  }
}

function generateAdrCommentary(
  stockOneSymbol: string,
  stockOneIsAdr: boolean,
  stockTwoSymbol: string,
  stockTwoIsAdr: boolean,
): string {
  if (stockOneIsAdr && stockTwoIsAdr) {
    return `Heads up: ${stockOneSymbol} and ${stockTwoSymbol} both roll as ADRs, bridging foreign companies to U.S. markets for a taste of global exposure.`;
  } else if (stockOneIsAdr) {
    return `Worth noting: ${stockOneSymbol} flies the ADR flag, tying it to a foreign outfit on U.S. soil, while ${stockTwoSymbol} sticks to plain-vanilla U.S. listing.`;
  } else if (stockTwoIsAdr) {
    return `Quick note: ${stockTwoSymbol} sports an ADR tag, marking it as a foreign player on U.S. exchanges, unlike the homegrown ${stockOneSymbol}.`;
  } else {
    return "";
  }
}

export async function CompanyOverviewSection({
  stockOneSymbol,
  stockTwoSymbol,
}: CompanyOverviewSectionProps) {
  const stockOneProfileData = await fetchProfileData(stockOneSymbol);
  const stockTwoProfileData = await fetchProfileData(stockTwoSymbol);

  if (!stockOneProfileData || !stockTwoProfileData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">Company Overview</H2>
        <P>Company overview data is currently unavailable.</P>
      </Section>
    );
  }

  const marketCapComparisonCommentary = generateMarketCapComparisonCommentary(
    stockOneSymbol,
    stockOneProfileData.marketCap,
    stockOneProfileData.currency,
    stockTwoSymbol,
    stockTwoProfileData.marketCap,
    stockTwoProfileData.currency,
  );

  const betaComparisonCommentary = generateBetaComparisonCommentary(
    stockOneSymbol,
    stockOneProfileData.beta,
    stockTwoSymbol,
    stockTwoProfileData.beta,
  );

  const adrCommentary = generateAdrCommentary(
    stockOneSymbol,
    stockOneProfileData.isAdr,
    stockTwoSymbol,
    stockTwoProfileData.isAdr,
  );

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">Company Overview</H2>
      <P>{marketCapComparisonCommentary}</P>
      <P>{betaComparisonCommentary}</P>
      {adrCommentary && <P>{adrCommentary}</P>}
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
            <Table.Tbody.Tr.Th scope="row">Company Name</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.companyName}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.companyName}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Country</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.country}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.country}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Sector</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.sector}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.sector}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Industry</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.industry}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.industry}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">CEO</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.ceo}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.ceo}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Price</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.price.toLocaleString("en")}{" "}
              {stockOneProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.price.toLocaleString("en")}{" "}
              {stockTwoProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Market Cap</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(stockOneProfileData.marketCap / 1000000000).toLocaleString(
                "en",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}{" "}
              billion {stockOneProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoProfileData.marketCap / 1000000000).toLocaleString(
                "en",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}{" "}
              billion {stockTwoProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Beta</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.beta}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.beta}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Exchange</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.exchange}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.exchange}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">IPO Date</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {new Date(stockOneProfileData.ipoDate).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {new Date(stockTwoProfileData.ipoDate).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">ADR</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.isAdr ? "Yes" : "No"}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.isAdr ? "Yes" : "No"}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
