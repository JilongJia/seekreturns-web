import { H2 } from "@/components/en/ui/H2";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { SecurityTypeCommentary } from "./commentaries";
import styles from "./CompanyOverviewSection.module.css";
import type { StockPropertyData } from "@/constants/stock-properties";

type CompanyOverviewSectionProps = {
  stockOneData: StockPropertyData | null;
  stockTwoData: StockPropertyData | null;
};

const tableRows: { key: keyof StockPropertyData; label: string }[] = [
  { key: "companyName", label: "Company Name" },
  { key: "country", label: "Country" },
  { key: "sector", label: "GICS Sector" },
  { key: "industry", label: "GICS Industry" },
  { key: "marketCapitalization", label: "Market Capitalization" },
  { key: "exchange", label: "Exchange" },
  { key: "ipoDate", label: "IPO Date" },
  { key: "securityType", label: "Security Type" },
];

export function CompanyOverviewSection({
  stockOneData,
  stockTwoData,
}: CompanyOverviewSectionProps) {
  if (!stockOneData || !stockTwoData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">Company Overview</H2>
        <P>Company overview data is currently unavailable.</P>
      </Section>
    );
  }

  const formatValue = (
    key: keyof StockPropertyData,
    data: StockPropertyData,
  ): string => {
    const value = data[key];

    if (value === null || value === undefined) {
      return "--";
    }

    switch (key) {
      case "marketCapitalization":
        return `${(Number(value) / 1000).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} billion ${data.currency}`;

      case "ipoDate":
        return new Date(value as string).toLocaleDateString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

      default:
        return String(value);
    }
  };

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">Company Overview</H2>

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
              <Table.Thead.Tr.Th scope="row">Symbol</Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneData.symbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoData.symbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableRows.map(({ key, label }) => (
              <Table.Tbody.Tr key={key}>
                <Table.Tbody.Tr.Th scope="row">{label}</Table.Tbody.Tr.Th>
                <Table.Tbody.Tr.Td>
                  {formatValue(key, stockOneData)}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatValue(key, stockTwoData)}
                </Table.Tbody.Tr.Td>
              </Table.Tbody.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
