import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { Table } from "@/components/en/ui/Table";
import { PriceComparisonLineChartFigure } from "@/components/en/features/chart-figures";
import styles from "./HistoricalPerformanceSection.module.css";

import { formatStockInfo, getDisplayName } from "@/lib/stock";

import type {
  StockInfoData,
  HistoricalPerformanceKey,
} from "@/constants/stock";
import type { StockAdjustedClosesData } from "@/lib/cloud-storage";

type HistoricalPerformanceSectionProps = {
  stockOneInfo: StockInfoData | null;
  stockTwoInfo: StockInfoData | null;
  stockOneAdjustedCloses: StockAdjustedClosesData | null;
  stockTwoAdjustedCloses: StockAdjustedClosesData | null;
};

const tableRows: HistoricalPerformanceKey[] = [
  "priceReturnDaily5d",
  "priceReturnDaily13w",
  "priceReturnDaily26w",
  "priceReturnDaily52w",
  "priceReturnDailyMtd",
  "priceReturnDailyYtd",
  "averageTradingVolume10d",
  "averageTradingVolume3m",
  "dailyReturnStandardDeviation3m",
  "beta",
];

export function HistoricalPerformanceSection({
  stockOneInfo,
  stockTwoInfo,
  stockOneAdjustedCloses,
  stockTwoAdjustedCloses,
}: HistoricalPerformanceSectionProps) {
  if (
    !stockOneInfo ||
    !stockTwoInfo ||
    !stockOneAdjustedCloses ||
    !stockTwoAdjustedCloses
  ) {
    return (
      <Section ariaLabelledby="historical-performance">
        <H2 id="historical-performance">Historical Performance</H2>
        <P>Performance data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="historical-performance">
      <H2 id="historical-performance">Historical Performance</H2>
      <P>
        This chart compares the performance of {stockOneInfo.symbol} and{" "}
        {stockTwoInfo.symbol} by tracking the growth of an initial $10,000
        investment in each. Use the tabs to select the desired time period. Data
        is adjusted for dividends and splits.
      </P>

      <PriceComparisonLineChartFigure
        stockOneAdjustedCloses={stockOneAdjustedCloses}
        stockTwoAdjustedCloses={stockTwoAdjustedCloses}
        defaultTimeRange="1Y"
      />

      <H3>Historical Performance at a Glance</H3>
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
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoInfo[key], {
                    lang: "en",
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
