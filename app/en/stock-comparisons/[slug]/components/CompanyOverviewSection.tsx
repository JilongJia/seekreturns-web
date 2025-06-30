import { generateMarketCapCommentary } from "./lib/generateMarketCapCommentary";
import { generateBetaCommentary } from "./lib/generateBetaCommentary";
import { generateAdrCommentary } from "./lib/generateAdrCommentary";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";

import styles from "./CompanyOverviewSection.module.css";
import type { ProfileData } from "@/app/lib/fmp/fetchProfileData";

type CompanyOverviewSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneProfileData: ProfileData | null;
  stockTwoProfileData: ProfileData | null;
};

export function CompanyOverviewSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneProfileData,
  stockTwoProfileData,
}: CompanyOverviewSectionProps) {
  if (!stockOneProfileData || !stockTwoProfileData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">Company Overview</H2>
        <P>Company overview data is currently unavailable.</P>
      </Section>
    );
  }

  const marketCapCommentary = generateMarketCapCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneMarketCap: stockOneProfileData.marketCap,
    stockOneCurrency: stockOneProfileData.currency,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoMarketCap: stockTwoProfileData.marketCap,
    stockTwoCurrency: stockTwoProfileData.currency,
  });

  const betaCommentary = generateBetaCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneBeta: stockOneProfileData.beta,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoBeta: stockTwoProfileData.beta,
  });

  const adrCommentary = generateAdrCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneIsAdr: stockOneProfileData.isAdr,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoIsAdr: stockTwoProfileData.isAdr,
  });

  const hasCommentary = [
    marketCapCommentary,
    betaCommentary,
    adrCommentary,
  ].some((commentary) => commentary !== "");

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">Company Overview</H2>

      {hasCommentary ? (
        <>
          {marketCapCommentary && <P>{marketCapCommentary}</P>}
          {betaCommentary && <P>{betaCommentary}</P>}
          {adrCommentary && <P>{adrCommentary}</P>}
        </>
      ) : (
        <P>
          For a detailed side-by-side comparison of company overview metrics for{" "}
          {stockOneSymbol} and {stockTwoSymbol}, please refer to the table
          below.
        </P>
      )}

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">Symbol</Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneSymbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoSymbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">Company Name</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.companyName || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.companyName || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">Country</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.country || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.country || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">Sector</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.sector || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.sector || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">Industry</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.industry || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.industry || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">CEO</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.ceo || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.ceo || "--"}
              </Table.Tbody.Tr.Td>
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
                {stockOneProfileData.beta === 0
                  ? "--"
                  : stockOneProfileData.beta.toFixed(2)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.beta === 0
                  ? "--"
                  : stockTwoProfileData.beta.toFixed(2)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">Exchange</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.exchange || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.exchange || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">IPO Date</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.ipoDate
                  ? new Date(stockOneProfileData.ipoDate).toLocaleDateString(
                      "en",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.ipoDate
                  ? new Date(stockTwoProfileData.ipoDate).toLocaleDateString(
                      "en",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "--"}
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
      </div>
    </Section>
  );
}
