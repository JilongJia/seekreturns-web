import { fetchRatiosData } from "@/app/lib/fmp/fetchRatiosData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Table } from "@/app/components/en/content/page/main/article/Table";
import { Ul } from "@/app/components/en/content/page/main/article/Ul";

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
    return `For both ${stockOneSymbol} (${stockOneCurrentRatio.toFixed(2)}) and ${stockTwoSymbol} (${stockTwoCurrentRatio.toFixed(2)}), current ratios sit below 1. With current assets trailing short-term liabilities, they might tap into cash flow or borrowing to stay afloat—a setup not uncommon in certain sectors, though it bears monitoring if cash gets tight.`;
  }

  if (
    stockOneCurrentRatioCategory === "Low" &&
    stockTwoCurrentRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} posts a current ratio of ${stockOneCurrentRatio.toFixed(2)} under 1, where current assets fall short of covering short-term debts—manageable perhaps with solid cash inflows. Compare that to ${stockTwoSymbol}, sitting at ${stockTwoCurrentRatio.toFixed(2)}, where liabilities are comfortably met.`;
  }

  if (
    stockOneCurrentRatioCategory === "Normal" &&
    stockTwoCurrentRatioCategory === "Low"
  ) {
    return `${stockTwoSymbol}’s current ratio of ${stockTwoCurrentRatio.toFixed(2)} dips below 1, leaving short-term liabilities larger than current assets—a scenario that could hinge on cash flow support. On the other hand, ${stockOneSymbol} at ${stockOneCurrentRatio.toFixed(2)} has enough assets to handle its obligations.`;
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
    return `${stockOneSymbol} (${stockOneQuickRatio.toFixed(2)}) and ${stockTwoSymbol} (${stockTwoQuickRatio.toFixed(2)}) both clock quick ratios under 0.8. Without inventory, their liquid assets don’t match short-term debts, so they might lean on sales or loans to cover the difference—doable if cash keeps flowing.`;
  }

  if (
    stockOneQuickRatioCategory === "Low" &&
    stockTwoQuickRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol}’s quick ratio sits at ${stockOneQuickRatio.toFixed(2)} below 0.8, leaving its cash and near-cash assets shy of short-term obligations—potentially a stretch without extra funds. Meanwhile, ${stockTwoSymbol} lands at ${stockTwoQuickRatio.toFixed(2)}, with enough liquidity to spare.`;
  }

  if (
    stockOneQuickRatioCategory === "Normal" &&
    stockTwoQuickRatioCategory === "Low"
  ) {
    return `At ${stockTwoQuickRatio.toFixed(2)}, ${stockTwoSymbol}’s quick ratio falls below 0.8, where liquid assets, minus inventory, can’t keep up with short-term bills—possibly riding on cash flow. By contrast, ${stockOneSymbol} hits ${stockOneQuickRatio.toFixed(2)}, covering its bases comfortably.`;
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
    return `${stockOneSymbol} (${stockOneDebtToEquityRatio.toFixed(2)}) and ${stockTwoSymbol} (${stockTwoDebtToEquityRatio.toFixed(2)}) both carry negative D/E ratios, a sign of negative equity—likely from piling up losses or aggressive buybacks. This setup might catch some eyes, though certain companies run this way on purpose.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "High" &&
    stockTwoDebtToEquityRatioCategory === "High"
  ) {
    return `With D/E ratios topping 3.0, ${stockOneSymbol} at ${stockOneDebtToEquityRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoDebtToEquityRatio.toFixed(2)} lean heavily on debt over equity. That kind of leverage ups the stakes, particularly if cash gets squeezed by interest or tough times.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Negative" &&
    stockTwoDebtToEquityRatioCategory === "High"
  ) {
    return `${stockOneSymbol} logs a D/E of ${stockOneDebtToEquityRatio.toFixed(2)} in the red, hinting at negative equity—think losses or buybacks pushing it there. Flip to ${stockTwoSymbol}, where ${stockTwoDebtToEquityRatio.toFixed(2)} sails past 3.0, piling on debt that could magnify risks.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "High" &&
    stockTwoDebtToEquityRatioCategory === "Negative"
  ) {
    return `${stockOneSymbol} hits ${stockOneDebtToEquityRatio.toFixed(2)} beyond 3.0, stacking debt high against equity—a risky play if borrowing costs bite. Meanwhile, ${stockTwoSymbol} at ${stockTwoDebtToEquityRatio.toFixed(2)} dips negative, tied to equity in the hole, maybe from losses or repurchasing shares.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Negative" &&
    stockTwoDebtToEquityRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol}’s D/E of ${stockOneDebtToEquityRatio.toFixed(2)} turns negative, likely from eroded equity via losses or buybacks—an odd financial twist. By comparison, ${stockTwoSymbol} holds a tame ${stockTwoDebtToEquityRatio.toFixed(2)}, keeping things steady.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Normal" &&
    stockTwoDebtToEquityRatioCategory === "Negative"
  ) {
    return `${stockTwoSymbol} shows a D/E of ${stockTwoDebtToEquityRatio.toFixed(2)} below zero, suggesting equity’s gone south—perhaps from losses or heavy buybacks. On the flip side, ${stockOneSymbol} at ${stockTwoDebtToEquityRatio.toFixed(2)} sticks to a safer lane.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "High" &&
    stockTwoDebtToEquityRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} racks up a D/E of ${stockOneDebtToEquityRatio.toFixed(2)} over 3.0, leaning hard into debt and flirting with higher risk. Meanwhile, ${stockTwoSymbol} clocks in at ${stockTwoDebtToEquityRatio.toFixed(2)}, staying on firmer ground.`;
  }

  if (
    stockOneDebtToEquityRatioCategory === "Normal" &&
    stockTwoDebtToEquityRatioCategory === "High"
  ) {
    return `${stockTwoSymbol}’s ${stockTwoDebtToEquityRatio.toFixed(2)} D/E breaches 3.0, loading up on debt that could test its resilience. In contrast, ${stockOneSymbol} at ${stockOneDebtToEquityRatio.toFixed(2)} plays it closer to the vest with borrowing.`;
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
    return `${stockOneSymbol} at ${stockOneDebtToAssetsRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoDebtToAssetsRatio.toFixed(2)} both push D/A ratios past 0.8, with over 80% of assets tied to debt. That kind of borrowing heft could shake things up if asset prices slip or interest rates climb, though it’s not unusual for heavy-investment businesses.`;
  }

  if (
    stockOneDebtToAssetsRatioCategory === "High" &&
    stockTwoDebtToAssetsRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} clocks a D/A ratio of ${stockOneDebtToAssetsRatio.toFixed(2)} beyond 0.8, meaning debt funds most of its assets—a setup that might get dicey with financial hiccups. By contrast, ${stockTwoSymbol} rolls in at ${stockTwoDebtToAssetsRatio.toFixed(2)}, keeping borrowing in a lighter range.`;
  }

  if (
    stockOneDebtToAssetsRatioCategory === "Normal" &&
    stockTwoDebtToAssetsRatioCategory === "High"
  ) {
    return `${stockTwoSymbol}’s D/A ratio hits ${stockTwoDebtToAssetsRatio.toFixed(2)} above 0.8, leaning heavily on debt to back its assets—tricky if the market turns sour. Meanwhile, ${stockOneSymbol} at ${stockTwoDebtToAssetsRatio.toFixed(2)} opts for a less debt-driven approach.`;
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
    return `${stockOneSymbol} at ${stockOneInterestCoverageRatio.toFixed(2)} and ${stockTwoSymbol} at ${stockTwoInterestCoverageRatio.toFixed(2)} both scrape by with interest coverage under 1.5. Earnings are stretched thin against interest bills, leaving little wiggle room if profits drop.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Zero" &&
    stockTwoInterestCoverageRatioCategory === "Zero"
  ) {
    return `For ${stockOneSymbol} and ${stockTwoSymbol}, interest coverage shows as “--”, pointing to negligible interest costs—often a sign of slim debt or rock-bottom rates keeping expenses near zero.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Low" &&
    stockTwoInterestCoverageRatioCategory === "Zero"
  ) {
    return `${stockOneSymbol}’s ${stockOneInterestCoverageRatio.toFixed(2)} interest coverage dips below 1.5, with earnings just nudging past interest—tight if pressure hits. Meanwhile, ${stockTwoSymbol} displays “--”, reflecting an interest burden so small it barely registers, likely from minimal debt.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Zero" &&
    stockTwoInterestCoverageRatioCategory === "Low"
  ) {
    return `${stockOneSymbol}’s interest coverage reads “--”, suggesting interest expenses are next to nothing—think tiny debt or ultra-low rates—while ${stockTwoSymbol} at ${stockTwoInterestCoverageRatio.toFixed(2)} teeters below 1.5, earnings barely clearing interest.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Low" &&
    stockTwoInterestCoverageRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} clocks in at ${stockOneInterestCoverageRatio.toFixed(2)} below 1.5, earnings just keeping ahead of interest—dicey if profits stumble. By contrast, ${stockTwoSymbol}’s ${stockTwoInterestCoverageRatio.toFixed(2)} sails through with plenty of cushion.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Normal" &&
    stockTwoInterestCoverageRatioCategory === "Low"
  ) {
    return `${stockTwoSymbol}’s ${stockTwoInterestCoverageRatio.toFixed(2)} sits under 1.5, where earnings hug interest costs too closely—a squeeze if income dips. Meanwhile, ${stockOneSymbol} at ${stockOneInterestCoverageRatio.toFixed(2)} has room to breathe.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Zero" &&
    stockTwoInterestCoverageRatioCategory === "Normal"
  ) {
    return `${stockOneSymbol} posts an interest coverage of “--”, hinting at interest costs so low they’re negligible—often from scant debt or dirt-cheap rates—while ${stockTwoSymbol} at ${stockTwoInterestCoverageRatio.toFixed(2)} handles interest with solid earnings.`;
  }

  if (
    stockOneInterestCoverageRatioCategory === "Normal" &&
    stockTwoInterestCoverageRatioCategory === "Zero"
  ) {
    return `${stockTwoSymbol}’s interest coverage comes up “--”, reflecting interest demands so faint they’re barely there—likely minimal debt or tiny rates—whereas ${stockOneSymbol} at ${stockTwoInterestCoverageRatio.toFixed(2)} cruises past interest with ease.`;
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
        <H2 id="financial-strength-metrics-comparison">
          Financial Strength Metrics Comparison
        </H2>
        <P>Financial strength metrics data is currently unavailable.</P>
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
      <H2 id="financial-strength-metrics-comparison">
        Financial Strength Metrics Comparison
      </H2>
      {hasCommentary ? (
        <>
          <P>
            This section dives into the financial resilience of {stockOneSymbol}{" "}
            and {stockTwoSymbol}, spotlighting key metrics like liquidity,
            leverage, and debt coverage. Check out the standout observations
            below where notable differences or extremes pop up.
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
          Explore the financial strength details for {stockOneSymbol} and{" "}
          {stockTwoSymbol} in the table below.
        </P>
      )}
      <Table>
        <Table.Thead>
          <Table.Thead.Tr>
            <Table.Thead.Tr.Th scope="row">Symbol</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockOneSymbol}</Table.Thead.Tr.Th>
            <Table.Thead.Tr.Th scope="col">{stockTwoSymbol}</Table.Thead.Tr.Th>
          </Table.Thead.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Current Ratio (TTM)
            </Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.currentRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.currentRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">Quick Ratio (TTM)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneRatiosData.quickRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoRatiosData.quickRatioTTM.toFixed(2)}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">
              Debt-to-Equity Ratio (TTM)
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
              Debt-to-Assets Ratio (TTM)
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
              Interest Coverage Ratio (TTM)
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
