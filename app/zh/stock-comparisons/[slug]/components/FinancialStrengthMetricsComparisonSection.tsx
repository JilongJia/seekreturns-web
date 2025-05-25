import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";
import styles from "./CompanyOverviewSection.module.css";

type FinancialStrengthMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generateCurrentRatioCommentary(
  stockOneSymbol: string,
  stockOneCurrentRatio: number,
  stockTwoSymbol: string,
  stockTwoCurrentRatio: number,
): string {
  const CURRENT_RATIO_THRESHOLD_LOW = 1;

  type CurrentRatioCategory = "Low" | "Normal";

  const getCurrentRatioCategory = (
    currentRatio: number,
  ): CurrentRatioCategory =>
    currentRatio < CURRENT_RATIO_THRESHOLD_LOW ? "Low" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const currentRatioOne = stockOneCurrentRatio.toFixed(2);
  const currentRatioTwo = stockTwoCurrentRatio.toFixed(2);
  const categoryOne = getCurrentRatioCategory(stockOneCurrentRatio);
  const categoryTwo = getCurrentRatioCategory(stockTwoCurrentRatio);

  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `鉴于 ${symbolOne} 的流动比率为 ${currentRatioOne}，${symbolTwo} 的流动比率为 ${currentRatioTwo}，两者的流动资产均低于短期负债。这可能导致其营运资金紧张，并迫使它们依赖额外融资。`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne} 的流动比率 ${currentRatioOne} 暗示可能存在流动性压力，而 ${symbolTwo} 的流动比率 ${currentRatioTwo} 则显示其能从容覆盖短期债务。`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo} 的流动比率 ${currentRatioTwo} 表明其资产可能不足以覆盖近期债务，相较而言，${symbolOne} (流动比率 ${currentRatioOne}) 维持着较为健康的流动性。`;
  }

  return "";
}

function generateQuickRatioCommentary(
  stockOneSymbol: string,
  stockOneQuickRatio: number,
  stockTwoSymbol: string,
  stockTwoQuickRatio: number,
): string {
  const QUICK_RATIO_THRESHOLD_LOW = 0.8;

  type QuickRatioCategory = "Low" | "Normal";

  const getQuickRatioCategory = (ratio: number): QuickRatioCategory =>
    ratio < QUICK_RATIO_THRESHOLD_LOW ? "Low" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const quickRatioOne = stockOneQuickRatio.toFixed(2);
  const quickRatioTwo = stockTwoQuickRatio.toFixed(2);
  const categoryOne = getQuickRatioCategory(stockOneQuickRatio);
  const categoryTwo = getQuickRatioCategory(stockTwoQuickRatio);

  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `${symbolOne} (速动比率 ${quickRatioOne}) 和 ${symbolTwo} (速动比率 ${quickRatioTwo}) 的速动比率均低于 ${QUICK_RATIO_THRESHOLD_LOW}，这意味着他们最具流动性的资产 (不包括存货) 不足以应付短期债务。这可能迫使他们依赖应收账款、存货周转或外部融资。`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne} 的速动比率 ${quickRatioOne} 表明，其可能难以在不出售存货或筹集现金的情况下覆盖即期负债，而 ${symbolTwo} (速动比率 ${quickRatioTwo}) 则维持着较为充裕的流动资产缓冲。`;
  }

  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo} 的速动比率 ${quickRatioTwo} 表明其以最具流动性的资产来覆盖短期债务的能力有限 — 而 ${symbolOne} (速动比率 ${quickRatioOne}) 则展现出更强的流动性韧性。`;
  }

  return "";
}

function generateDebtToEquityRatioCommentary(
  stockOneSymbol: string,
  stockOneDebtToEquityRatio: number,
  stockTwoSymbol: string,
  stockTwoDebtToEquityRatio: number,
): string {
  const DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH = 3.0;
  const DEBT_TO_EQUITY_RATIO_THRESHOLD_NEGATIVE = 0;

  type DebtToEquityRatioCategory = "Negative" | "High" | "Normal";

  const getDebtToEquityRatioCategory = (
    ratio: number,
  ): DebtToEquityRatioCategory => {
    if (ratio < DEBT_TO_EQUITY_RATIO_THRESHOLD_NEGATIVE) return "Negative";
    if (ratio > DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH) return "High";
    return "Normal";
  };

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const debtToEquityRatioOne = stockOneDebtToEquityRatio.toFixed(2);
  const debtToEquityRatioTwo = stockTwoDebtToEquityRatio.toFixed(2);
  const categoryOne = getDebtToEquityRatioCategory(stockOneDebtToEquityRatio);
  const categoryTwo = getDebtToEquityRatioCategory(stockTwoDebtToEquityRatio);

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} (D/E ${debtToEquityRatioOne}) 和 ${symbolTwo} (D/E ${debtToEquityRatioTwo}) 均呈现负股东权益 — 其资产低于负债 — 表明两者均存在严重的资产负债表压力。`;
  }

  if (categoryOne === "High" && categoryTwo === "High") {
    return `${symbolOne} 和 ${symbolTwo} 的 D/E 比率均高于 ${DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH.toFixed(1)} (分别为 ${debtToEquityRatioOne} 和 ${debtToEquityRatioTwo})，反映了其积极利用债务杠杆。这既可能放大收益，但也增加了在利率上升时的脆弱性。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "High") {
    return `${symbolOne} 显示为负股东权益 (D/E ${debtToEquityRatioOne})，而 ${symbolTwo} 则杠杆率过高 (D/E ${debtToEquityRatioTwo})，两者揭示了不同类型的资产负债表风险。`;
  }
  if (categoryOne === "High" && categoryTwo === "Negative") {
    return `${symbolOne} 杠杆率较高 (D/E ${debtToEquityRatioOne})，而 ${symbolTwo} 则为负股东权益 (D/E ${debtToEquityRatioTwo})，两者均体现了显著的资本结构问题。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `${symbolOne} 的股东权益为负 (D/E ${debtToEquityRatioOne})，这是一个异常的警示信号；而 ${symbolTwo} (D/E ${debtToEquityRatioTwo}) 则维持着常规的债务股本平衡。`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolTwo} 的股东权益为负 (D/E ${debtToEquityRatioTwo})，可能意味着资产不足；相较而言，${symbolOne} (D/E ${debtToEquityRatioOne}) 保持着更健康的股东权益覆盖水平。`;
  }

  if (categoryOne === "High" && categoryTwo === "Normal") {
    return `${symbolOne} 杠杆率较高 (D/E ${debtToEquityRatioOne})，这可能提高回报，但若借贷成本上升则会增加风险；而 ${symbolTwo} (D/E ${debtToEquityRatioTwo}) 的杠杆保持在更温和的水平。`;
  }
  if (categoryOne === "Normal" && categoryTwo === "High") {
    return `${symbolTwo} 的杠杆率很高 (D/E ${debtToEquityRatioTwo})，同时推高了潜在收益和风险；相比之下，${symbolOne} (D/E ${debtToEquityRatioOne}) 维持着更稳健的资本结构。`;
  }

  return "";
}

function generateDebtToAssetsRatioCommentary(
  stockOneSymbol: string,
  stockOneDebtToAssetsRatio: number,
  stockTwoSymbol: string,
  stockTwoDebtToAssetsRatio: number,
): string {
  const DEBT_TO_ASSETS_RATIO_THRESHOLD_HIGH = 0.8;

  type DebtToAssetsRatioCategory = "High" | "Normal";

  const getDebtToAssetsRatioCategory = (
    ratio: number,
  ): DebtToAssetsRatioCategory =>
    ratio > DEBT_TO_ASSETS_RATIO_THRESHOLD_HIGH ? "High" : "Normal";

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const debtToAssetsRatioOne = stockOneDebtToAssetsRatio.toFixed(2);
  const debtToAssetsRatioTwo = stockTwoDebtToAssetsRatio.toFixed(2);
  const categoryOne = getDebtToAssetsRatioCategory(stockOneDebtToAssetsRatio);
  const categoryTwo = getDebtToAssetsRatioCategory(stockTwoDebtToAssetsRatio);

  if (categoryOne === "High" && categoryTwo === "High") {
    return `由于债务资金占总资产比例均超过80% (${symbolOne} 为 ${debtToAssetsRatioOne}，${symbolTwo} 为 ${debtToAssetsRatioTwo})，两家公司都运用了高杠杆。这既可能提高回报，但也增加了在资产价值下跌或借贷成本攀升时的风险。`;
  }

  if (categoryOne === "High" && categoryTwo === "Normal") {
    return `${symbolOne} 的负债占资产比率 ${debtToAssetsRatioOne} 表明其严重依赖债务来支持资产 — 这在经济下行时可能具有风险 — 而 ${symbolTwo} (比率 ${debtToAssetsRatioTwo}) 则将借贷保持在更温和的水平。`;
  }

  if (categoryOne === "Normal" && categoryTwo === "High") {
    return `${symbolTwo} 的负债占资产比率 ${debtToAssetsRatioTwo} 显示其资产主要通过债务融资，而 ${symbolOne} (比率 ${debtToAssetsRatioOne}) 则选择了更为保守的融资结构。`;
  }

  return "";
}

function generateInterestCoverageRatioCommentary(
  stockOneSymbol: string,
  stockOneInterestCoverageRatio: number,
  stockTwoSymbol: string,
  stockTwoInterestCoverageRatio: number,
): string {
  const INTEREST_COVERAGE_RATIO_THRESHOLD_LOW = 1;
  const INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO = 0;

  type InterestCoverageRatioCategory = "Negative" | "Low" | "Normal";

  const getInterestCoverageRatioCategory = (
    ratio: number,
  ): InterestCoverageRatioCategory => {
    if (ratio < INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO) return "Negative";
    if (ratio < INTEREST_COVERAGE_RATIO_THRESHOLD_LOW) return "Low";
    return "Normal";
  };

  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const interestCoverageRatioOne = stockOneInterestCoverageRatio.toFixed(2);
  const interestCoverageRatioTwo = stockTwoInterestCoverageRatio.toFixed(2);
  const categoryOne = getInterestCoverageRatioCategory(
    stockOneInterestCoverageRatio,
  );
  const categoryTwo = getInterestCoverageRatioCategory(
    stockTwoInterestCoverageRatio,
  );

  if (categoryOne === "Negative" && categoryTwo === "Negative") {
    return `${symbolOne} 和 ${symbolTwo} 的利息保障倍数均为负 (分别为 ${interestCoverageRatioOne} 和 ${interestCoverageRatioTwo})，意味着息税前利润 (EBIT) 为负 — 两者均无法覆盖利息支出，这是严重的偿付能力警告。`;
  }
  if (categoryOne === "Low" && categoryTwo === "Low") {
    return `${symbolOne} (${interestCoverageRatioOne}) 和 ${symbolTwo} (${interestCoverageRatioTwo}) 的利息保障倍数均较低，意味着其营业利润不足以完全覆盖利息支出。这表明存在财务压力。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Low") {
    return `${symbolOne} 的利息保障倍数为负 (${interestCoverageRatioOne})，反映了经营亏损。${symbolTwo} (比率 ${interestCoverageRatioTwo}) 也面临困难，因为其营业利润无法覆盖利息支出。`;
  }
  if (categoryOne === "Low" && categoryTwo === "Negative") {
    return `${symbolOne} (低利息保障倍数 ${interestCoverageRatioOne}) 的营业利润无法覆盖其利息支出，而 ${symbolTwo} 的息税前利润 (EBIT) 为负 (利息保障倍数 ${interestCoverageRatioTwo})。`;
  }

  if (categoryOne === "Negative" && categoryTwo === "Normal") {
    return `由于息税前利润 (EBIT) 为负 (${interestCoverageRatioOne})，${symbolOne} 无法覆盖其利息。而 ${symbolTwo} (利息保障倍数 ${interestCoverageRatioTwo}) 则能履行其付息义务。`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Negative") {
    return `${symbolOne} 能履行其付息义务 (利息保障倍数 ${interestCoverageRatioOne})。与此形成鲜明对比的是，${symbolTwo} 的负比率 (${interestCoverageRatioTwo}) 意味着其营业利润 (EBIT) 不足以覆盖基本运营成本，更不用说利息了，这预示着严重的财务困境。`;
  }

  if (categoryOne === "Low" && categoryTwo === "Normal") {
    return `${symbolOne} 的低利息保障倍数 (${interestCoverageRatioOne}) 表明其收益无法覆盖利息。${symbolTwo} (比率 ${interestCoverageRatioTwo}) 则能履行其付息义务。`;
  }
  if (categoryOne === "Normal" && categoryTwo === "Low") {
    return `${symbolTwo} 的低利息保障倍数 (${interestCoverageRatioTwo}) 意味着其无法从营业利润中覆盖利息。${symbolOne} (比率 ${interestCoverageRatioOne}) 则能履行其付息义务。`;
  }

  return "";
}

export async function FinancialStrengthMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: FinancialStrengthMetricsComparisonSectionProps) {
  const [stockOneRatiosData, stockTwoRatiosData] = await Promise.all([
    fetchRatiosData(stockOneSymbol),
    fetchRatiosData(stockTwoSymbol),
  ]);

  if (!stockOneRatiosData || !stockTwoRatiosData) {
    return (
      <Section ariaLabelledby="financial-strength-metrics-comparison">
        <H2 id="financial-strength-metrics-comparison">财务状况指标比较</H2>
        <P>暂时无法加载财务状况数据。</P>
      </Section>
    );
  }

  const currentRatioCommentary =
    stockOneRatiosData.currentRatioTTM === 0 ||
    stockTwoRatiosData.currentRatioTTM === 0
      ? ""
      : generateCurrentRatioCommentary(
          stockOneSymbol,
          stockOneRatiosData.currentRatioTTM,
          stockTwoSymbol,
          stockTwoRatiosData.currentRatioTTM,
        );

  const quickRatioCommentary =
    stockOneRatiosData.quickRatioTTM === 0 ||
    stockTwoRatiosData.quickRatioTTM === 0
      ? ""
      : generateQuickRatioCommentary(
          stockOneSymbol,
          stockOneRatiosData.quickRatioTTM,
          stockTwoSymbol,
          stockTwoRatiosData.quickRatioTTM,
        );

  const debtToEquityRatioCommentary =
    stockOneRatiosData.debtToEquityRatioTTM === 0 ||
    stockTwoRatiosData.debtToEquityRatioTTM === 0
      ? ""
      : generateDebtToEquityRatioCommentary(
          stockOneSymbol,
          stockOneRatiosData.debtToEquityRatioTTM,
          stockTwoSymbol,
          stockTwoRatiosData.debtToEquityRatioTTM,
        );

  const debtToAssetsRatioCommentary =
    stockOneRatiosData.debtToAssetsRatioTTM === 0 ||
    stockTwoRatiosData.debtToAssetsRatioTTM === 0
      ? ""
      : generateDebtToAssetsRatioCommentary(
          stockOneSymbol,
          stockOneRatiosData.debtToAssetsRatioTTM,
          stockTwoSymbol,
          stockTwoRatiosData.debtToAssetsRatioTTM,
        );

  const interestCoverageRatioCommentary =
    stockOneRatiosData.interestCoverageRatioTTM === 0 ||
    stockTwoRatiosData.interestCoverageRatioTTM === 0
      ? ""
      : generateInterestCoverageRatioCommentary(
          stockOneSymbol,
          stockOneRatiosData.interestCoverageRatioTTM,
          stockTwoSymbol,
          stockTwoRatiosData.interestCoverageRatioTTM,
        );

  const hasCommentary = [
    currentRatioCommentary,
    quickRatioCommentary,
    debtToEquityRatioCommentary,
    debtToAssetsRatioCommentary,
    interestCoverageRatioCommentary,
  ].some((commentary) => commentary !== "");

  const formatNumber = (value: number): string =>
    value === 0 ? "--" : value.toFixed(2);

  return (
    <Section ariaLabelledby="financial-strength-metrics-comparison">
      <H2 id="financial-strength-metrics-comparison">财务状况指标比较</H2>

      {hasCommentary ? (
        <>
          <P>
            这里对比了 {stockOneSymbol} 和 {stockTwoSymbol}{" "}
            的财务状况，重点看流动性、杠杆和债务情况。下方列出关键点，突出明显差异或极端情况。
          </P>
          <Ul>
            {currentRatioCommentary && <Ul.Li>{currentRatioCommentary}</Ul.Li>}
            {quickRatioCommentary && <Ul.Li>{quickRatioCommentary}</Ul.Li>}
            {debtToEquityRatioCommentary && (
              <Ul.Li>{debtToEquityRatioCommentary}</Ul.Li>
            )}
            {debtToAssetsRatioCommentary && (
              <Ul.Li>{debtToAssetsRatioCommentary}</Ul.Li>
            )}
            {interestCoverageRatioCommentary && (
              <Ul.Li>{interestCoverageRatioCommentary}</Ul.Li>
            )}
          </Ul>
        </>
      ) : (
        <P>
          请查看下方表格，了解 {stockOneSymbol} 和 {stockTwoSymbol} 的财务状况。
        </P>
      )}

      <Table className={styles.table}>
        <Table.Thead>
          <Table.Thead.Tr>
            <Table.Thead.Tr.Th scope="row">代码</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockOneSymbol}</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockTwoSymbol}</Table.Thead.Tr.Th>
          </Table.Thead.Tr>
        </Table.Thead>

        <Table.Tbody>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">流动比率 (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockOneRatiosData.currentRatioTTM)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockTwoRatiosData.currentRatioTTM)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>

          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">速动比率 (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockOneRatiosData.quickRatioTTM)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockTwoRatiosData.quickRatioTTM)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>

          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              负债股东权益比 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockOneRatiosData.debtToEquityRatioTTM)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockTwoRatiosData.debtToEquityRatioTTM)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>

          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              负债资产比率 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockOneRatiosData.debtToAssetsRatioTTM)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockTwoRatiosData.debtToAssetsRatioTTM)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>

          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              利息保障倍数 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockOneRatiosData.interestCoverageRatioTTM)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {formatNumber(stockTwoRatiosData.interestCoverageRatioTTM)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
