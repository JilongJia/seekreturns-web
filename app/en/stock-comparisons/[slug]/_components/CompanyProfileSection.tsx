import { H2 } from "@/components/en/ui/H2";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { SecurityTypeCommentary } from "./commentaries";
import styles from "./CompanyProfileSection.module.css";

import { formatStockInfo, getDisplayName } from "@/lib/stock";
import type { StockInfoData, ProfileKey } from "@/constants/stock";

type CompanyProfileSectionProps = {
  stockOneInfo: StockInfoData | null;
  stockTwoInfo: StockInfoData | null;
};

const tableRows: ProfileKey[] = [
  "companyName",
  "country",
  "sector",
  "industry",
  "marketCapitalization",
  "exchange",
  "listingDate",
  "securityType",
];

export function CompanyProfileSection({
  stockOneInfo,
  stockTwoInfo,
}: CompanyProfileSectionProps) {
  if (!stockOneInfo || !stockTwoInfo) {
    return (
      <Section ariaLabelledby="company-profile">
        <H2 id="company-profile">Company Profile</H2>
        <P>Company profile data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="company-profile">
      <H2 id="company-profile">Company Profile</H2>

      <SecurityTypeCommentary
        stockOneSymbol={stockOneInfo.symbol}
        stockOneSecurityType={stockOneInfo.securityType}
        stockTwoSymbol={stockTwoInfo.symbol}
        stockTwoSecurityType={stockTwoInfo.securityType}
      />

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">
                {getDisplayName("symbol", "en", "long")}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneInfo.symbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoInfo.symbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.map((key) => (
              <Table.Tbody.Tr key={key}>
                <Table.Tbody.Tr.Th scope="row">
                  {getDisplayName(key, "en", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockOneInfo[key], {
                    lang: "en",
                    currency: stockOneInfo.currency,
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoInfo[key], {
                    lang: "en",
                    currency: stockTwoInfo.currency,
                  })}
                </Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
