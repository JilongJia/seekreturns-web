import { fetchProfileData } from "@/app/lib/fmp/fetchProfileData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";

type CompanyOverviewSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

function generateMarketCapComparisonCommentary(
  stockOneSymbol: string,
  stockOneMarketCap: number,
  stockOneCurrency: string,
  stockTwoSymbol: string,
  stockTwoMarketCap: number,
  stockTwoCurrency: string,
): string {
  const marketCapRatio = stockOneMarketCap / stockTwoMarketCap;
  const stockOneFormattedMarketCap = (
    stockOneMarketCap / 100000000
  ).toLocaleString("zh", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const stockTwoFormattedMarketCap = (
    stockTwoMarketCap / 100000000
  ).toLocaleString("zh", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (marketCapRatio > 1.5) {
    return `${stockOneSymbol} 的市值为 ${stockOneFormattedMarketCap} 亿 ${stockOneCurrency}，高于 ${stockTwoSymbol}，约为 ${stockTwoSymbol}（${stockTwoFormattedMarketCap} 亿 ${stockTwoCurrency}）的 ${marketCapRatio.toFixed(2)} 倍。`;
  } else if (marketCapRatio < 0.67) {
    const inverseRatio = 1 / marketCapRatio;
    return `${stockTwoSymbol} 的市值为 ${stockTwoFormattedMarketCap} 亿 ${stockTwoCurrency}，高于 ${stockOneSymbol}，约为 ${stockOneSymbol}（${stockOneFormattedMarketCap} 亿 ${stockOneCurrency}）的 ${inverseRatio.toFixed(2)} 倍。`;
  } else {
    return `${stockOneSymbol}（${stockOneFormattedMarketCap} 亿 ${stockOneCurrency}）与 ${stockTwoSymbol}（${stockTwoFormattedMarketCap} 亿 ${stockTwoCurrency}）的市值差距较小。`;
  }
}

function generateBetaComparisonCommentary(
  stockOneSymbol: string,
  stockOneBeta: number,
  stockTwoSymbol: string,
  stockTwoBeta: number,
): string {
  const betaRatio = stockOneBeta / stockTwoBeta;
  if (betaRatio > 1.5) {
    return `${stockOneSymbol} 的 beta 值为 ${stockOneBeta.toFixed(2)}，显示出较高的市场波动性，相比之下，${stockTwoSymbol} 的 ${stockTwoBeta.toFixed(2)} 更为平稳。`;
  } else if (betaRatio < 0.67) {
    return `${stockTwoSymbol} 的 beta 值为 ${stockTwoBeta.toFixed(2)}，波动性较高，而 ${stockOneSymbol} 的 ${stockOneBeta.toFixed(2)} 则相对稳定。`;
  } else {
    return `${stockOneSymbol} 的 beta 值为 ${stockOneBeta.toFixed(2)} 与 ${stockTwoSymbol} 的 ${stockTwoBeta.toFixed(2)} 接近，两者的市场波动性差异不大。`;
  }
}

function generateAdrCommentary(
  stockOneSymbol: string,
  stockOneIsAdr: boolean,
  stockTwoSymbol: string,
  stockTwoIsAdr: boolean,
): string {
  if (stockOneIsAdr && stockTwoIsAdr) {
    return `${stockOneSymbol} 和 ${stockTwoSymbol} 均以 ADR 形式在美国上市，代表海外企业进入美国市场。`;
  } else if (stockOneIsAdr) {
    return `${stockOneSymbol} 以 ADR 形式在美国上市，属于海外公司，而 ${stockTwoSymbol} 为美国本土企业。`;
  } else if (stockTwoIsAdr) {
    return `${stockTwoSymbol} 以 ADR 形式在美国上市，来自海外市场，而 ${stockOneSymbol} 为美国本地公司。`;
  } else {
    return "";
  }
}

export async function CompanyOverviewSection({
  stockOneSymbol,
  stockTwoSymbol,
}: CompanyOverviewSectionProps) {
  const stockOneProfileData = await fetchProfileData(stockOneSymbol);
  const stockTwoProfileData = await fetchProfileData(stockTwoSymbol);

  if (!stockOneProfileData || !stockTwoProfileData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">公司概况</H2>
        <P>暂时无法加载公司概况数据。</P>
      </Section>
    );
  }

  const marketCapComparisonCommentary = generateMarketCapComparisonCommentary(
    stockOneSymbol,
    stockOneProfileData.marketCap,
    stockOneProfileData.currency,
    stockTwoSymbol,
    stockTwoProfileData.marketCap,
    stockTwoProfileData.currency,
  );

  const betaComparisonCommentary = generateBetaComparisonCommentary(
    stockOneSymbol,
    stockOneProfileData.beta,
    stockTwoSymbol,
    stockTwoProfileData.beta,
  );

  const adrCommentary = generateAdrCommentary(
    stockOneSymbol,
    stockOneProfileData.isAdr,
    stockTwoSymbol,
    stockTwoProfileData.isAdr,
  );

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">公司概况</H2>
      <P>{marketCapComparisonCommentary}</P>
      <P>{betaComparisonCommentary}</P>
      {adrCommentary && <P>{adrCommentary}</P>}
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
            <Table.Tbody.Tr.Th scope="row">公司名称</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.companyName}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.companyName}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">国家</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.country}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.country}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">板块</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.sector}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.sector}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">行业</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.industry}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.industry}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">首席执行官</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.ceo}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.ceo}</Table.Tbody.Tr.Td>
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
              {(stockOneProfileData.marketCap / 100000000).toLocaleString(
                "zh",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}{" "}
              亿 {stockOneProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(stockTwoProfileData.marketCap / 100000000).toLocaleString(
                "zh",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}{" "}
              亿 {stockTwoProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">贝塔值 (波动性)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>{stockOneProfileData.beta}</Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>{stockTwoProfileData.beta}</Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">交易所</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.exchange}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.exchange}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">IPO日期</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {new Date(stockOneProfileData.ipoDate).toLocaleDateString("zh", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {new Date(stockTwoProfileData.ipoDate).toLocaleDateString("zh", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
    </Section>
  );
}
