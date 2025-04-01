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

export type CompanyOverviewData = {
  stockOne: CompanyProfileData;
  stockTwo: CompanyProfileData;
};

type CompanyOverviewSectionProps = {
  companyOverviewData: CompanyOverviewData | null;
};

export function CompanyOverviewSection({
  companyOverviewData,
}: CompanyOverviewSectionProps) {
  if (!companyOverviewData) {
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
      <Table>
        <Table.Thead>
          <Table.Thead.Tr>
            <Table.Thead.Tr.Th scope="col">Symbol</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">
              {companyOverviewData.stockOne.symbol}
            </Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">
              {companyOverviewData.stockTwo.symbol}
            </Table.Thead.Tr.Th>
          </Table.Thead.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Company Name</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.companyName}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.companyName}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Country</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.country}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.country}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Sector</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.sector}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.sector}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Industry</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.industry}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.industry}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">CEO</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.ceo}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.ceo}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Price</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.price.toLocaleString()}{" "}
              {companyOverviewData.stockOne.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.price.toLocaleString()}{" "}
              {companyOverviewData.stockTwo.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Market Cap</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.marketCap.toLocaleString()}{" "}
              {companyOverviewData.stockOne.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.marketCap.toLocaleString()}{" "}
              {companyOverviewData.stockTwo.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Beta</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.beta}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.beta}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Exchange</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.exchange}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.exchange}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">IPO Date</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {new Date(
                companyOverviewData.stockOne.ipoDate,
              ).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {new Date(
                companyOverviewData.stockTwo.ipoDate,
              ).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">ADR</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockOne.isAdr ? "Yes" : "No"}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {companyOverviewData.stockTwo.isAdr ? "Yes" : "No"}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
