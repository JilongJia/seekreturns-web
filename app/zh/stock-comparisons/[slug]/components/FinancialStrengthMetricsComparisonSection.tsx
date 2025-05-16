import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";

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

  const stockOneCurrentRatioCategory =
    getCurrentRatioCategory(stockOneCurrentRatio);
  const stockTwoCurrentRatioCategory =
    getCurrentRatioCategory(stockTwoCurrentRatio);

  if (
    stockOneCurrentRatioCategory === "Low" &&
    stockTwoCurrentRatioCategory === "Low"
  ) {
    return `${stockOneSymbol} (${stockOneCurrentRatio.toFixed(2)}) 和 ${stockTwoSymbol} (${stockTwoCurrentRatio.toFixed(2)}) 的流动比率均低于 1，流动资产不足以覆盖短期债务，需依赖现金流或外部融资支持。这在某些行业较为常见，但若现金流紧张，则需谨慎管理。`;
  }

  if (
    stockOneCurrentRatioCategory === "Low" &&
    stockTwoCurrentRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的流动比率仅为 ${stockOneCurrentRatio.toFixed(2)}，低于 1，流动资产不足以偿还短期债务，需依赖较强的现金流支撑。而 ${stockTwoSymbol} 的 ${stockTwoCurrentRatio.toFixed(2)} 则能充分覆盖短期债务。`;
  }

  if (
    stockOneCurrentRatioCategory === "Normal" &&
    stockTwoCurrentRatioCategory === "Low"
  ) {
    return `${stockTwoSymbol} 的流动比率仅为 ${stockTwoCurrentRatio.toFixed(2)}，低于 1，流动资产无法覆盖短期债务，需依靠现金流维持。而 ${stockOneSymbol} 的 ${stockOneCurrentRatio.toFixed(2)} 足以偿还短期债务。`;
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

  const getQuickRatioCategory = (quickRatio: number): QuickRatioCategory =>
    quickRatio < QUICK_RATIO_THRESHOLD_LOW ? "Low" : "Normal";

  const stockOneQuickRatioCategory = getQuickRatioCategory(stockOneQuickRatio);
  const stockTwoQuickRatioCategory = getQuickRatioCategory(stockTwoQuickRatio);

  if (
    stockOneQuickRatioCategory === "Low" &&
    stockTwoQuickRatioCategory === "Low"
  ) {
    return `${stockOneSymbol} (${stockOneQuickRatio.toFixed(2)}) 和 ${stockTwoSymbol} (${stockTwoQuickRatio.toFixed(2)}) 的速动比率均低于 0.8，去除库存后流动资产不足以偿还债务，需依赖销售收入或融资支持。只要现金流稳定，通常问题不大。`;
  }

  if (
    stockOneQuickRatioCategory === "Low" &&
    stockTwoQuickRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的速动比率仅为 ${stockOneQuickRatio.toFixed(2)}，低于 0.8，现金类资产不足以覆盖短期债务，若缺乏额外资金来源可能面临压力。而 ${stockTwoSymbol} 的 ${stockTwoQuickRatio.toFixed(2)} 显示其流动性较为充足。`;
  }

  if (
    stockOneQuickRatioCategory === "Normal" &&
    stockTwoQuickRatioCategory === "Low"
  ) {
    return `${stockTwoSymbol} 的速动比率仅为 ${stockTwoQuickRatio.toFixed(2)}，低于 0.8，去除库存后流动资产不足以偿还债务，需依赖现金流支持。而 ${stockOneSymbol} 的 ${stockOneQuickRatio.toFixed(2)} 能够较好地应对短期支出。`;
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
    debtToEquityRatio: number,
  ): DebtToEquityRatioCategory => {
    if (debtToEquityRatio < DEBT_TO_EQUITY_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    if (debtToEquityRatio > DEBT_TO_EQUITY_RATIO_THRESHOLD_HIGH) return "High";
    return "Normal";
  };

  const stockOneDebtToEquityRatioCategory = getDebtToEquityRatioCategory(
    stockOneDebtToEquityRatio,
  );
  const stockTwoDebtToEquityRatioCategory = getDebtToEquityRatioCategory(
    stockTwoDebtToEquityRatio,
  );

  if (
    stockOneDebtToEquityRatioCategory === "Negative" &&
    stockTwoDebtToEquityRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的 D/E 为 ${stockOneDebtToEquityRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoDebtToEquityRatio.toFixed(2)}，均为负值，表明股东权益为负，可能是持续亏损或大规模回购所致。部分公司可能有意为之，但需关注其长期稳定性。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "High" &&
    stockTwoDebtToEquityRatioCategory === "High"
  ) {
    return `${stockOneSymbol} 的 D/E 高达 ${stockOneDebtToEquityRatio.toFixed(2)}，${stockTwoSymbol} 达 ${stockTwoDebtToEquityRatio.toFixed(2)}，均超过 3.0，显示债务水平较高。若利率上升或经济环境恶化，可能面临较大风险。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Negative" &&
    stockTwoDebtToEquityRatioCategory === "High"
  ) {
    return `${stockOneSymbol} 的 D/E 为 ${stockOneDebtToEquityRatio.toFixed(2)}，负值表明股东权益为负，可能由持续亏损或回购引起。而 ${stockTwoSymbol} 的 ${stockTwoDebtToEquityRatio.toFixed(2)} 超过 3.0，债务负担较重，存在一定风险。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "High" &&
    stockTwoDebtToEquityRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的 D/E 达 ${stockOneDebtToEquityRatio.toFixed(2)}，超过 3.0，债务水平较高，风险值得关注；而 ${stockTwoSymbol} 的 ${stockTwoDebtToEquityRatio.toFixed(2)} 为负值，股东权益为负，可能源于亏损或回购。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Negative" &&
    stockTwoDebtToEquityRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的 D/E 为 ${stockOneDebtToEquityRatio.toFixed(2)}，负值表明股东权益为负，可能因长期亏损或回购导致。而 ${stockTwoSymbol} 的 ${stockTwoDebtToEquityRatio.toFixed(2)} 处于合理范围，较为稳健。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Normal" &&
    stockTwoDebtToEquityRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} 的 D/E 为 ${stockTwoDebtToEquityRatio.toFixed(2)}，负值显示股东权益为负，可能由亏损或回购引起；而 ${stockOneSymbol} 的 ${stockOneDebtToEquityRatio.toFixed(2)} 保持在稳健水平。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "High" &&
    stockTwoDebtToEquityRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的 D/E 高达 ${stockOneDebtToEquityRatio.toFixed(2)}，超过 3.0，债务负担较重，风险相对较高；而 ${stockTwoSymbol} 的 ${stockTwoDebtToEquityRatio.toFixed(2)} 控制在合理范围。`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Normal" &&
    stockTwoDebtToEquityRatioCategory === "High"
  ) {
    return `${stockTwoSymbol} 的 D/E 达 ${stockTwoDebtToEquityRatio.toFixed(2)}，超过 3.0，债务水平较高，抗风险能力可能较弱；而 ${stockOneSymbol} 的 ${stockOneDebtToEquityRatio.toFixed(2)} 较为稳健。`;
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
    debtToAssetsRatio: number,
  ): DebtToAssetsRatioCategory =>
    debtToAssetsRatio > DEBT_TO_ASSETS_RATIO_THRESHOLD_HIGH ? "High" : "Normal";

  const stockOneDebtToAssetsRatioCategory = getDebtToAssetsRatioCategory(
    stockOneDebtToAssetsRatio,
  );
  const stockTwoDebtToAssetsRatioCategory = getDebtToAssetsRatioCategory(
    stockTwoDebtToAssetsRatio,
  );

  if (
    stockOneDebtToAssetsRatioCategory === "High" &&
    stockTwoDebtToAssetsRatioCategory === "High"
  ) {
    return `${stockOneSymbol} 的 D/A 为 ${stockOneDebtToAssetsRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoDebtToAssetsRatio.toFixed(2)}，均超过 0.8，资产中债务占比过高。若资产价值波动或利率上升，可能带来一定风险，这在重资产行业中较为常见。`;
  }

  if (
    stockOneDebtToAssetsRatioCategory === "High" &&
    stockTwoDebtToAssetsRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的 D/A 高达 ${stockOneDebtToAssetsRatio.toFixed(2)}，超过 0.8，资产主要依赖债务支持，市场波动可能带来压力。而 ${stockTwoSymbol} 的 ${stockTwoDebtToAssetsRatio.toFixed(2)} 较低，财务结构更稳健。`;
  }

  if (
    stockOneDebtToAssetsRatioCategory === "Normal" &&
    stockTwoDebtToAssetsRatioCategory === "High"
  ) {
    return `${stockTwoSymbol} 的 D/A 达 ${stockTwoDebtToAssetsRatio.toFixed(2)}，超过 0.8，债务占资产比例较高，市场下行时可能承压。而 ${stockOneSymbol} 的 ${stockOneDebtToAssetsRatio.toFixed(2)} 较低，风险相对较小。`;
  }

  return "";
}

function generateInterestCoverageRatioCommentary(
  stockOneSymbol: string,
  stockOneInterestCoverageRatio: number,
  stockTwoSymbol: string,
  stockTwoInterestCoverageRatio: number,
): string {
  const INTEREST_COVERAGE_RATIO_THRESHOLD_LOW = 1.5;
  const INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO = 0;

  type InterestCoverageRatioCategory = "Low" | "Zero" | "Normal";

  const getInterestCoverageRatioCategory = (
    interestCoverageRatio: number,
  ): InterestCoverageRatioCategory => {
    if (interestCoverageRatio === INTEREST_COVERAGE_RATIO_THRESHOLD_ZERO)
      return "Zero";
    if (interestCoverageRatio < INTEREST_COVERAGE_RATIO_THRESHOLD_LOW)
      return "Low";
    return "Normal";
  };

  const stockOneInterestCoverageRatioCategory =
    getInterestCoverageRatioCategory(stockOneInterestCoverageRatio);
  const stockTwoInterestCoverageRatioCategory =
    getInterestCoverageRatioCategory(stockTwoInterestCoverageRatio);

  if (
    stockOneInterestCoverageRatioCategory === "Low" &&
    stockTwoInterestCoverageRatioCategory === "Low"
  ) {
    return `${stockOneSymbol} 的利息保障倍数仅为 ${stockOneInterestCoverageRatio.toFixed(2)}，${stockTwoSymbol} 也仅为 ${stockTwoInterestCoverageRatio.toFixed(2)}，均低于 1.5，利润仅能勉强覆盖利息，若盈利下滑，可能面临偿债压力。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Zero" &&
    stockTwoInterestCoverageRatioCategory === "Zero"
  ) {
    return `${stockOneSymbol} 和 ${stockTwoSymbol} 的利息保障倍数均为 “--”，通常表明公司无有息债务或利息支出微乎其微，例如主要靠股权融资或债务成本极低。这种情况在低杠杆公司中常见。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Low" &&
    stockTwoInterestCoverageRatioCategory === "Zero"
  ) {
    return `${stockOneSymbol} 的利息保障倍数仅为 ${stockOneInterestCoverageRatio.toFixed(2)}，低于 1.5，利润仅够支付利息，存在一定风险；而 ${stockTwoSymbol} 为 “--”，显示其几乎没有利息负担，可能因无有息借款或利率极低，财务压力很小。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Zero" &&
    stockTwoInterestCoverageRatioCategory === "Low"
  ) {
    return `${stockOneSymbol} 的利息保障倍数为 “--”，说明利息支出极低或不存在，通常依赖自有资金而非借贷，财务负担轻；而 ${stockTwoSymbol} 仅为 ${stockTwoInterestCoverageRatio.toFixed(2)}，低于 1.5，利润与利息支出接近，需关注盈利稳定性。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Low" &&
    stockTwoInterestCoverageRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的利息保障倍数仅为 ${stockOneInterestCoverageRatio.toFixed(2)}，低于 1.5，利润仅能覆盖利息，波动时可能承压。而 ${stockTwoSymbol} 的 ${stockTwoInterestCoverageRatio.toFixed(2)} 较为宽裕，偿债能力较强。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Normal" &&
    stockTwoInterestCoverageRatioCategory === "Low"
  ) {
    return `${stockTwoSymbol} 的利息保障倍数仅为 ${stockTwoInterestCoverageRatio.toFixed(2)}，低于 1.5，利润与利息支出接近，收入波动可能带来风险；而 ${stockOneSymbol} 的 ${stockOneInterestCoverageRatio.toFixed(2)} 较为稳健。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Zero" &&
    stockTwoInterestCoverageRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的利息保障倍数为 “--”，反映出极低的债务利息成本，通常无需支付显著利息，财务灵活性高；而 ${stockTwoSymbol} 的 ${stockTwoInterestCoverageRatio.toFixed(2)} 表现稳健，能轻松覆盖利息支出。`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Normal" &&
    stockTwoInterestCoverageRatioCategory === "Zero"
  ) {
    return `${stockTwoSymbol} 的利息保障倍数为 “--”，表明几乎无须承担利息开支，可能因债务结构简单或无贷款，财务负担小；而 ${stockOneSymbol} 的 ${stockOneInterestCoverageRatio.toFixed(2)} 也显示出较强的偿债能力。`;
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

  const currentRatioCommentary = generateCurrentRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.currentRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.currentRatioTTM,
  );
  const quickRatioCommentary = generateQuickRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.quickRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.quickRatioTTM,
  );
  const debtToEquityRatioCommentary = generateDebtToEquityRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.debtToEquityRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.debtToEquityRatioTTM,
  );
  const debtToAssetsRatioCommentary = generateDebtToAssetsRatioCommentary(
    stockOneSymbol,
    stockOneRatiosData.debtToAssetsRatioTTM,
    stockTwoSymbol,
    stockTwoRatiosData.debtToAssetsRatioTTM,
  );
  const interestCoverageRatioCommentary =
    generateInterestCoverageRatioCommentary(
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
      <Table>
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
              {stockOneRatiosData.currentRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.currentRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">速动比率 (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.quickRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.quickRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              负债股东权益比 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.debtToEquityRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.debtToEquityRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              负债资产比率 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.debtToAssetsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.debtToAssetsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              利息保障倍数 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.interestCoverageRatioTTM === 0
                ? "--"
                : stockOneRatiosData.interestCoverageRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.interestCoverageRatioTTM === 0
                ? "--"
                : stockTwoRatiosData.interestCoverageRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
