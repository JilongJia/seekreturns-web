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
  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const marketCapOne = (stockOneMarketCap / 1e9).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const marketCapTwo = (stockTwoMarketCap / 1e9).toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const currencyOne = stockOneCurrency;
  const currencyTwo = stockTwoCurrency;
  const ratio = stockOneMarketCap / stockTwoMarketCap;

  if (ratio > 1.5) {
    return `${symbolOne} dominates in value with a market cap of ${marketCapOne} billion ${currencyOne}, eclipsing ${symbolTwo}’s ${marketCapTwo} billion ${currencyTwo} by roughly ${ratio.toFixed(2)}×.`;
  }

  if (ratio < 0.67) {
    const inverseRatio = (1 / ratio).toFixed(2);
    return `${symbolTwo} stands out with ${marketCapTwo} billion ${currencyTwo} in market value—about ${inverseRatio}× ${symbolOne}’s market cap of ${marketCapOne} billion ${currencyOne}.`;
  }

  return `With ${symbolOne} at ${marketCapOne} billion ${currencyOne} and ${symbolTwo} at ${marketCapTwo} billion ${currencyTwo}, their market capitalizations sit in the same ballpark.`;
}

function generateBetaComparisonCommentary(
  stockOneSymbol: string,
  stockOneBeta: number,
  stockTwoSymbol: string,
  stockTwoBeta: number,
): string {
  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const betaOne = stockOneBeta.toFixed(2);
  const betaTwo = stockTwoBeta.toFixed(2);
  const ratio = stockOneBeta / stockTwoBeta;

  if (ratio > 1.5) {
    return `${symbolOne}’s beta of ${betaOne} points to much larger expected swings compared to ${symbolTwo}’s calmer ${betaTwo}, suggesting both higher upside and downside potential.`;
  }

  if (ratio < 0.67) {
    return `${symbolTwo} carries a higher beta at ${betaTwo}, indicating it’s more sensitive to market moves, while ${symbolOne} remains steadier at ${betaOne}.`;
  }

  return `With betas of ${betaOne} for ${symbolOne} and ${betaTwo} for ${symbolTwo}, both show similar volatility profiles relative to the overall market.`;
}

function generateAdrCommentary(
  stockOneSymbol: string,
  stockOneIsAdr: boolean,
  stockTwoSymbol: string,
  stockTwoIsAdr: boolean,
): string {
  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const isAdrOne = stockOneIsAdr;
  const isAdrTwo = stockTwoIsAdr;

  if (isAdrOne && isAdrTwo) {
    return `${symbolOne} and ${symbolTwo} are both ADRs—easy access for U.S. investors to foreign shares without dealing with overseas exchanges.`;
  }

  if (isAdrOne && !isAdrTwo) {
    return `${symbolOne} trades as an ADR, giving U.S. investors a simple on-ramp to its foreign shares, while ${symbolTwo} remains a standard domestic listing.`;
  }

  if (!isAdrOne && isAdrTwo) {
    return `${symbolTwo} is an ADR, letting U.S. buyers tap its non-U.S. business directly, unlike ${symbolOne}, which is purely domestic.`;
  }

  return "";
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
              {(stockOneProfileData.marketCap / 1e9).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              billion {stockOneProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoProfileData.marketCap / 1e9).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              billion {stockTwoProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Beta</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.beta.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.beta.toFixed(2)}
            </Table.Tbody.Tr.Td>
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
