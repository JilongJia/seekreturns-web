import { generateMarketCapCommentary } from "./lib/generateMarketCapCommentary";
import { generateBetaCommentary } from "./lib/generateBetaCommentary";
import { generateAdrCommentary } from "./lib/generateAdrCommentary";

import { H2 } from "@/components/zh/ui/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";

import styles from "./CompanyOverviewSection.module.css";
import type { ProfileData } from "@/app/lib/fmp/fetchProfileData";

type CompanyOverviewSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneProfileData: ProfileData | null;
  stockTwoProfileData: ProfileData | null;
};

export function CompanyOverviewSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneProfileData,
  stockTwoProfileData,
}: CompanyOverviewSectionProps) {
  if (!stockOneProfileData || !stockTwoProfileData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">公司概况</H2>
        <P>暂时无法加载公司概况数据。</P>
      </Section>
    );
  }

  const marketCapCommentary = generateMarketCapCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneMarketCap: stockOneProfileData.marketCap,
    stockOneCurrency: stockOneProfileData.currency,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoMarketCap: stockTwoProfileData.marketCap,
    stockTwoCurrency: stockTwoProfileData.currency,
  });

  const betaCommentary = generateBetaCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneBeta: stockOneProfileData.beta,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoBeta: stockTwoProfileData.beta,
  });

  const adrCommentary = generateAdrCommentary({
    stockOneSymbol: stockOneSymbol,
    stockOneIsAdr: stockOneProfileData.isAdr,
    stockTwoSymbol: stockTwoSymbol,
    stockTwoIsAdr: stockTwoProfileData.isAdr,
  });

  const hasCommentary = [
    marketCapCommentary,
    betaCommentary,
    adrCommentary,
  ].some((commentary) => commentary !== "");

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">公司概况</H2>

      {hasCommentary ? (
        <>
          {marketCapCommentary && <P>{marketCapCommentary}</P>}
          {betaCommentary && <P>{betaCommentary}</P>}
          {adrCommentary && <P>{adrCommentary}</P>}
        </>
      ) : (
        <P>
          {stockOneSymbol}与{stockTwoSymbol}的详细公司概况对比，请参见下方表格。
        </P>
      )}

      <div className={styles.tableContainer}>
        <Table>
          <Table.Thead>
            <Table.Thead.Tr>
              <Table.Thead.Tr.Th scope="row">代码</Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockOneSymbol}
              </Table.Thead.Tr.Th>
              <Table.Thead.Tr.Th scope="col">
                {stockTwoSymbol}
              </Table.Thead.Tr.Th>
            </Table.Thead.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">公司名称</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.companyName || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.companyName || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">国家</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.country || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.country || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">板块</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.sector || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.sector || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">行业</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.industry || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.industry || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">首席执行官</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.ceo || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.ceo || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">价格</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.price.toLocaleString("zh")}{" "}
                {stockOneProfileData.currency}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.price.toLocaleString("zh")}{" "}
                {stockTwoProfileData.currency}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">市值</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {(stockOneProfileData.marketCap / 1e8).toLocaleString("zh", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                亿 {stockOneProfileData.currency}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {(stockTwoProfileData.marketCap / 1e8).toLocaleString("zh", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                亿 {stockTwoProfileData.currency}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">
                贝塔值（波动性）
              </Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.beta === 0
                  ? "--"
                  : stockOneProfileData.beta.toFixed(2)}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.beta === 0
                  ? "--"
                  : stockTwoProfileData.beta.toFixed(2)}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">交易所</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.exchange || "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.exchange || "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">IPO日期</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.ipoDate
                  ? new Date(stockOneProfileData.ipoDate).toLocaleDateString(
                      "zh",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "--"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.ipoDate
                  ? new Date(stockTwoProfileData.ipoDate).toLocaleDateString(
                      "zh",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "--"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
            <Table.Tbody.Tr>
              <Table.Tbody.Tr.Th scope="row">ADR</Table.Tbody.Tr.Th>
              <Table.Tbody.Tr.Td>
                {stockOneProfileData.isAdr ? "是" : "否"}
              </Table.Tbody.Tr.Td>
              <Table.Tbody.Tr.Td>
                {stockTwoProfileData.isAdr ? "是" : "否"}
              </Table.Tbody.Tr.Td>
            </Table.Tbody.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </Section>
  );
}
