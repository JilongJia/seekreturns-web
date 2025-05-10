import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";
import { Ul } from "@/app/components/zh/content/page/main/article/Ul";

type ValuationMetricsData = {
  priceToEarningsRatioTTM: number;
  forwardPriceToEarningsGrowthRatioTTM: number;
  priceToSalesRatioTTM: number;
  priceToBookRatioTTM: number;
  priceToFreeCashFlowRatioTTM: number;
  evToEBITDATTM: number;
  evToSalesTTM: number;
  evToFreeCashFlowTTM: number;
};

type ValuationMetricsComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generatePriceToEarningsRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToEarningsRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToEarningsRatio: number,
): string {
  const PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE = 0;
  const PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH = 100;

  type PriceToEarningsRatioCategory = "Negative" | "Normal" | "High";

  const getPriceToEarningsRatioCategory = (
    priceToEarningsRatio: number,
  ): PriceToEarningsRatioCategory => {
    if (priceToEarningsRatio < PRICE_TO_EARNINGS_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    if (priceToEarningsRatio > PRICE_TO_EARNINGS_RATIO_THRESHOLD_HIGH)
      return "High";
    return "Normal";
  };

  const stockOnePriceToEarningsRatioCategory = getPriceToEarningsRatioCategory(
    stockOnePriceToEarningsRatio,
  );
  const stockTwoPriceToEarningsRatioCategory = getPriceToEarningsRatioCategory(
    stockTwoPriceToEarningsRatio,
  );

  if (
    stockOnePriceToEarningsRatioCategory === "Negative" &&
    stockTwoPriceToEarningsRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的市盈率为 ${stockOnePriceToEarningsRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoPriceToEarningsRatio.toFixed(2)}，均为负值，表明过去一年均未实现盈利。若持续如此，可能对财务稳定性构成挑战。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Negative" &&
    stockTwoPriceToEarningsRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的市盈率为 ${stockOnePriceToEarningsRatio.toFixed(2)}，负值显示过去一年未盈利，股价缺乏利润支撑。而 ${stockTwoSymbol} 的 ${stockTwoPriceToEarningsRatio.toFixed(2)} 表明其具备正收益，盈利能力较为稳健。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Negative" &&
    stockTwoPriceToEarningsRatioCategory === "High"
  ) {
    return `${stockOneSymbol} 的市盈率为 ${stockOnePriceToEarningsRatio.toFixed(2)}，负值表明过去一年未实现盈利。而 ${stockTwoSymbol} 的 ${stockTwoPriceToEarningsRatio.toFixed(2)} 显著偏高，股价远超当前利润，反映市场对其未来增长的强烈预期。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Normal" &&
    stockTwoPriceToEarningsRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} 的市盈率为 ${stockTwoPriceToEarningsRatio.toFixed(2)}，负值显示过去一年未盈利。而 ${stockOneSymbol} 的 ${stockOnePriceToEarningsRatio.toFixed(2)} 保持正收益，盈利基础较为稳固。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "High" &&
    stockTwoPriceToEarningsRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的市盈率为 ${stockOnePriceToEarningsRatio.toFixed(2)}，远高于当前利润，显示市场对其未来高度看好。而 ${stockTwoSymbol} 的 ${stockTwoPriceToEarningsRatio.toFixed(2)} 为负值，表明过去一年未实现盈利。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "High" &&
    stockTwoPriceToEarningsRatioCategory === "High"
  ) {
    return `${stockOneSymbol} 的市盈率为 ${stockOnePriceToEarningsRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoPriceToEarningsRatio.toFixed(2)}，均显著偏高，股价远超当前利润，显示市场对两者未来增长的乐观预期。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "High" &&
    stockTwoPriceToEarningsRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的市盈率为 ${stockOnePriceToEarningsRatio.toFixed(2)}，明显高于当前利润，反映市场对其未来增长的强烈信心。而 ${stockTwoSymbol} 的 ${stockTwoPriceToEarningsRatio.toFixed(2)} 较为合理，与当前盈利水平更匹配。`;
  }
  if (
    stockOnePriceToEarningsRatioCategory === "Normal" &&
    stockTwoPriceToEarningsRatioCategory === "High"
  ) {
    return `${stockTwoSymbol} 的市盈率为 ${stockTwoPriceToEarningsRatio.toFixed(2)}，远超当前利润，表明市场对其未来预期较高。而 ${stockOneSymbol} 的 ${stockOnePriceToEarningsRatio.toFixed(2)} 相对合理，与实际盈利较为一致。`;
  }

  return "";
}

function generateForwardPEGRatioCommentary(
  stockOneSymbol: string,
  stockOneForwardPEGRatio: number,
  stockTwoSymbol: string,
  stockTwoForwardPEGRatio: number,
): string {
  const FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE = 0;

  type ForwardPEGRatioCategory = "Negative" | "Normal";

  const getForwardPEGRatioCategory = (
    forwardPEGRatio: number,
  ): ForwardPEGRatioCategory => {
    if (forwardPEGRatio < FORWARD_PEG_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    return "Normal";
  };

  const stockOneForwardPEGRatioCategory = getForwardPEGRatioCategory(
    stockOneForwardPEGRatio,
  );
  const stockTwoForwardPEGRatioCategory = getForwardPEGRatioCategory(
    stockTwoForwardPEGRatio,
  );

  if (
    stockOneForwardPEGRatioCategory === "Negative" &&
    stockTwoForwardPEGRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的前瞻 PEG 比率为 ${stockOneForwardPEGRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoForwardPEGRatio.toFixed(2)}，均为负值，表明分析师预计未来可能出现亏损或盈利增长放缓，需关注潜在风险。`;
  }
  if (
    stockOneForwardPEGRatioCategory === "Negative" &&
    stockTwoForwardPEGRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的前瞻 PEG 比率为 ${stockOneForwardPEGRatio.toFixed(2)}，负值暗示分析师预测可能出现亏损或盈利下滑。而 ${stockTwoSymbol} 的 ${stockTwoForwardPEGRatio.toFixed(2)} 则显示出较为乐观的前景。`;
  }
  if (
    stockOneForwardPEGRatioCategory === "Normal" &&
    stockTwoForwardPEGRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} 的前瞻 PEG 比率为 ${stockTwoForwardPEGRatio.toFixed(2)}，负值表明分析师预计可能出现亏损或盈利减少，存在一定风险。而 ${stockOneSymbol} 的 ${stockOneForwardPEGRatio.toFixed(2)} 则展现更积极的前景。`;
  }

  return "";
}

function generatePriceToBookRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToBookRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToBookRatio: number,
): string {
  const PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE = 0;

  type PriceToBookRatioCategory = "Negative" | "Normal";

  const getPriceToBookRatioCategory = (
    priceToBookRatio: number,
  ): PriceToBookRatioCategory => {
    if (priceToBookRatio < PRICE_TO_BOOK_RATIO_THRESHOLD_NEGATIVE)
      return "Negative";
    return "Normal";
  };

  const stockOnePriceToBookRatioCategory = getPriceToBookRatioCategory(
    stockOnePriceToBookRatio,
  );
  const stockTwoPriceToBookRatioCategory = getPriceToBookRatioCategory(
    stockTwoPriceToBookRatio,
  );

  if (
    stockOnePriceToBookRatioCategory === "Negative" &&
    stockTwoPriceToBookRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的市净率为 ${stockOnePriceToBookRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoPriceToBookRatio.toFixed(2)}，均为负值，表明债务超过资产，净值已为负，可能反映财务状况的脆弱性。`;
  }
  if (
    stockOnePriceToBookRatioCategory === "Negative" &&
    stockTwoPriceToBookRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的市净率为 ${stockOnePriceToBookRatio.toFixed(2)}，负值显示债务超出资产，财务结构较脆弱。而 ${stockTwoSymbol} 的 ${stockTwoPriceToBookRatio.toFixed(2)} 保持正值，账面价值更稳健。`;
  }
  if (
    stockOnePriceToBookRatioCategory === "Normal" &&
    stockTwoPriceToBookRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} 的市净率为 ${stockTwoPriceToBookRatio.toFixed(2)}，负值表明债务超过资产，财务状况存在一定风险。而 ${stockOneSymbol} 的 ${stockOnePriceToBookRatio.toFixed(2)} 为正值，基础较为稳固。`;
  }

  return "";
}

function generatePriceToFreeCashFlowRatioCommentary(
  stockOneSymbol: string,
  stockOnePriceToFreeCashFlowRatio: number,
  stockTwoSymbol: string,
  stockTwoPriceToFreeCashFlowRatio: number,
): string {
  const PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE = 0;

  type PriceToFreeCashFlowRatioCategory = "Negative" | "Normal";

  const getPriceToFreeCashFlowRatioCategory = (
    priceToFreeCashFlowRatio: number,
  ): PriceToFreeCashFlowRatioCategory => {
    if (
      priceToFreeCashFlowRatio <
      PRICE_TO_FREE_CASH_FLOW_RATIO_THRESHOLD_NEGATIVE
    )
      return "Negative";
    return "Normal";
  };

  const stockOnePriceToFreeCashFlowRatioCategory =
    getPriceToFreeCashFlowRatioCategory(stockOnePriceToFreeCashFlowRatio);
  const stockTwoPriceToFreeCashFlowRatioCategory =
    getPriceToFreeCashFlowRatioCategory(stockTwoPriceToFreeCashFlowRatio);

  if (
    stockOnePriceToFreeCashFlowRatioCategory === "Negative" &&
    stockTwoPriceToFreeCashFlowRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} 的市现率为 ${stockOnePriceToFreeCashFlowRatio.toFixed(2)}，${stockTwoSymbol} 为 ${stockTwoPriceToFreeCashFlowRatio.toFixed(2)}，均为负值，表明过去一年自由现金流为负，现金消耗大于生成，可能需外部融资支持。`;
  }
  if (
    stockOnePriceToFreeCashFlowRatioCategory === "Negative" &&
    stockTwoPriceToFreeCashFlowRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} 的市现率为 ${stockOnePriceToFreeCashFlowRatio.toFixed(2)}，负值显示过去一年现金流出超过流入，存在一定风险。而 ${stockTwoSymbol} 的 ${stockTwoPriceToFreeCashFlowRatio.toFixed(2)} 为正值，现金流状况较为健康。`;
  }
  if (
    stockOnePriceToFreeCashFlowRatioCategory === "Normal" &&
    stockTwoPriceToFreeCashFlowRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} 的市现率为 ${stockTwoPriceToFreeCashFlowRatio.toFixed(2)}，负值表明过去一年现金流为负，可能面临资金压力。而 ${stockOneSymbol} 的 ${stockOnePriceToFreeCashFlowRatio.toFixed(2)} 为正值，现金流表现稳健。`;
  }

  return "";
}

async function fetchValuationMetricsData(
  symbol: string,
): Promise<ValuationMetricsData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const keyMetricsEndpoint = `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${symbol}&apikey=${apiKey}`;
  const ratiosEndpoint = `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${symbol}&apikey=${apiKey}`;
  try {
    const [keyMetricsResponse, ratiosResponse] = await Promise.all([
      fetch(keyMetricsEndpoint),
      fetch(ratiosEndpoint),
    ]);
    const keyMetricsRawData = await keyMetricsResponse.json();
    const ratiosRawData = await ratiosResponse.json();

    if (
      !keyMetricsRawData ||
      keyMetricsRawData.length === 0 ||
      !ratiosRawData ||
      ratiosRawData.length === 0
    ) {
      return null;
    }

    const keyMetricsData = keyMetricsRawData[0];
    const ratiosData = ratiosRawData[0];

    const data: ValuationMetricsData = {
      priceToEarningsRatioTTM: ratiosData.priceToEarningsRatioTTM,
      forwardPriceToEarningsGrowthRatioTTM:
        ratiosData.forwardPriceToEarningsGrowthRatioTTM,
      priceToSalesRatioTTM: ratiosData.priceToSalesRatioTTM,
      priceToBookRatioTTM: ratiosData.priceToBookRatioTTM,
      priceToFreeCashFlowRatioTTM: ratiosData.priceToFreeCashFlowRatioTTM,
      evToEBITDATTM: keyMetricsData.evToEBITDATTM,
      evToSalesTTM: keyMetricsData.evToSalesTTM,
      evToFreeCashFlowTTM: keyMetricsData.evToFreeCashFlowTTM,
    };
    return data;
  } catch (error) {
    console.error("Error fetching valuation metrics for", symbol, error);
    return null;
  }
}

export async function ValuationMetricsComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: ValuationMetricsComparisonSectionProps) {
  const [stockOneValuationMetricsData, stockTwoValuationMetricsData] =
    await Promise.all([
      fetchValuationMetricsData(stockOneSymbol),
      fetchValuationMetricsData(stockTwoSymbol),
    ]);

  if (!stockOneValuationMetricsData || !stockTwoValuationMetricsData) {
    return (
      <Section ariaLabelledby="valuation-metrics-comparison">
        <H2 id="valuation-metrics-comparison">估值指标比较</H2>
        <P>暂时无法加载估值指标数据。</P>
      </Section>
    );
  }

  const priceToEarningsRatioCommentary = generatePriceToEarningsRatioCommentary(
    stockOneSymbol,
    stockOneValuationMetricsData.priceToEarningsRatioTTM,
    stockTwoSymbol,
    stockTwoValuationMetricsData.priceToEarningsRatioTTM,
  );
  const forwardPriceToEarningsGrowthRatioCommentary =
    generateForwardPEGRatioCommentary(
      stockOneSymbol,
      stockOneValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM,
      stockTwoSymbol,
      stockTwoValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM,
    );
  const priceToBookRatioCommentary = generatePriceToBookRatioCommentary(
    stockOneSymbol,
    stockOneValuationMetricsData.priceToBookRatioTTM,
    stockTwoSymbol,
    stockTwoValuationMetricsData.priceToBookRatioTTM,
  );
  const priceToFreeCashFlowRatioCommentary =
    generatePriceToFreeCashFlowRatioCommentary(
      stockOneSymbol,
      stockOneValuationMetricsData.priceToFreeCashFlowRatioTTM,
      stockTwoSymbol,
      stockTwoValuationMetricsData.priceToFreeCashFlowRatioTTM,
    );

  const hasCommentary = [
    priceToEarningsRatioCommentary,
    forwardPriceToEarningsGrowthRatioCommentary,
    priceToBookRatioCommentary,
    priceToFreeCashFlowRatioCommentary,
  ].some((commentary) => commentary !== "");

  return (
    <Section ariaLabelledby="valuation-metrics-comparison">
      <H2 id="valuation-metrics-comparison">估值指标比较</H2>
      {hasCommentary ? (
        <>
          <P>
            这里通过盈利、现金流、销售和账面价值等关键指标，评估{" "}
            {stockOneSymbol} 和 {stockTwoSymbol}{" "}
            的估值。以下几点尤其值得注意，特别是极端情况。
          </P>
          <Ul>
            {priceToEarningsRatioCommentary && (
              <Ul.Li>{priceToEarningsRatioCommentary}</Ul.Li>
            )}
            {forwardPriceToEarningsGrowthRatioCommentary && (
              <Ul.Li>{forwardPriceToEarningsGrowthRatioCommentary}</Ul.Li>
            )}
            {priceToBookRatioCommentary && (
              <Ul.Li>{priceToBookRatioCommentary}</Ul.Li>
            )}
            {priceToFreeCashFlowRatioCommentary && (
              <Ul.Li>{priceToFreeCashFlowRatioCommentary}</Ul.Li>
            )}
          </Ul>
        </>
      ) : (
        <P>
          想了解 {stockOneSymbol} 和 {stockTwoSymbol} 的估值对比，请看下表。
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
            <Table.Tbody.Tr.Th scope="row">市盈率 (P/E, TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToEarningsRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              前瞻 PEG 比率 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.forwardPriceToEarningsGrowthRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">市销率 (P/S, TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToSalesRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">市净率 (P/B, TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToBookRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              市现率 (P/FCF, TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.priceToFreeCashFlowRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.priceToFreeCashFlowRatioTTM.toFixed(
                2,
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">EV/EBITDA (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.evToEBITDATTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              企业价值/销售额 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.evToSalesTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              企业价值/自由现金流 (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneValuationMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoValuationMetricsData.evToFreeCashFlowTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
