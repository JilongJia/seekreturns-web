import { H2 } from "@/components/zh/ui/H2";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
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
        <H2 id="company-profile">公司概况</H2>
        <P>暂时无法加载公司概况数据。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="company-profile">
      <H2 id="company-profile">公司概况</H2>

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
                {getDisplayName("symbol", "zh", "long")}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {formatStockInfo("symbol", stockOneInfo.symbol, {
                  lang: "zh",
                })}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {formatStockInfo("symbol", stockTwoInfo.symbol, {
                  lang: "zh",
                })}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.map((key) => (
              <Table.Tbody.Tr key={key}>
                <Table.Tbody.Tr.Th scope="row">
                  {getDisplayName(key, "zh", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockOneInfo[key], {
                    lang: "zh",
                    currency: stockOneInfo.currency,
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoInfo[key], {
                    lang: "zh",
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
