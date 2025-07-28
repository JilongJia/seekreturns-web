import { H2 } from "@/components/zh/ui/H2";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
import { SecurityTypeCommentary } from "./commentaries";
import styles from "./CompanyOverviewSection.module.css";

import { formatPropertyValue, getPropertyName } from "@/lib/stock-properties";
import type {
  StockPropertyData,
  ProfileKey,
} from "@/constants/stock-properties";

type CompanyOverviewSectionProps = {
  stockOneData: StockPropertyData | null;
  stockTwoData: StockPropertyData | null;
};

const tableRows: ProfileKey[] = [
  "companyName",
  "country",
  "sector",
  "industry",
  "marketCapitalization",
  "exchange",
  "ipoDate",
  "securityType",
];

export function CompanyOverviewSection({
  stockOneData,
  stockTwoData,
}: CompanyOverviewSectionProps) {
  if (!stockOneData || !stockTwoData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">公司概况</H2>
        <P>暂时无法加载公司概况数据。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">公司概况</H2>

      <SecurityTypeCommentary
        stockOneSymbol={stockOneData.symbol}
        stockOneSecurityType={stockOneData.securityType}
        stockTwoSymbol={stockTwoData.symbol}
        stockTwoSecurityType={stockTwoData.securityType}
      />

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">
                {getPropertyName("symbol", "zh", "long")}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneData.symbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoData.symbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.map((key) => (
              <Table.Tbody.Tr key={key}>
                <Table.Tbody.Tr.Th scope="row">
                  {getPropertyName(key, "zh", "long")}
                </Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatPropertyValue(key, stockOneData[key], {
                    lang: "zh",
                    currency: stockOneData.currency,
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatPropertyValue(key, stockTwoData[key], {
                    lang: "zh",
                    currency: stockTwoData.currency,
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
