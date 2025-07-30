import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";
import { Table } from "@/components/zh/ui/Table";
import { PriceComparisonLineChartFigure } from "@/components/zh/features/chart-figures";
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
        <H2 id="historical-performance">历史表现</H2>
        <P>暂时无法加载历史表现数据。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="historical-performance">
      <H2 id="historical-performance">历史表现</H2>
      <P>
        此图表通过追踪$10,000的初始投资在每只股票中的增长情况，来比较{" "}
        {stockOneInfo.symbol}和{stockTwoInfo.symbol}{" "}
        的表现。请使用选项卡选择所需的时间周期。数据已根据股息和股票拆分进行调整。
      </P>

      <PriceComparisonLineChartFigure
        stockOneAdjustedCloses={stockOneAdjustedCloses}
        stockTwoAdjustedCloses={stockTwoAdjustedCloses}
        defaultTimeRange="1Y"
      />

      <H3>历史表现概览</H3>
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
                  })}
                </Table.Tbody.Tr.Td>
                <Table.Tbody.Tr.Td>
                  {formatStockInfo(key, stockTwoInfo[key], {
                    lang: "zh",
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
