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
  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const marketCapOne = (stockOneMarketCap / 1e8).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const marketCapTwo = (stockTwoMarketCap / 1e8).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const currencyOne = stockOneCurrency;
  const currencyTwo = stockTwoCurrency;

  if (stockOneMarketCap === 0 || stockTwoMarketCap === 0) {
    return "";
  }

  const ratio = stockOneMarketCap / stockTwoMarketCap;

  if (ratio > 1.5) {
    return `${symbolOne} 在市值上占据主导地位，其市值为 ${marketCapOne} 亿 ${currencyOne}，显著超过 ${symbolTwo} 的 ${marketCapTwo} 亿 ${currencyTwo}，大约是其 ${ratio.toFixed(2)} 倍。`;
  }

  if (ratio < 0.67) {
    const inverseRatio = (1 / ratio).toFixed(2);
    return `${symbolTwo} 的市值更为突出，为 ${marketCapTwo} 亿 ${currencyTwo}，大约是 ${symbolOne} (${marketCapOne} 亿 ${currencyOne}) 市值的 ${inverseRatio} 倍。`;
  }

  return `${symbolOne} 的市值为 ${marketCapOne} 亿 ${currencyOne}，${symbolTwo} 的市值为 ${marketCapTwo} 亿 ${currencyTwo}，两者市值大致相当。`;
}

function generateBetaComparisonCommentary(
  stockOneSymbol: string,
  stockOneBeta: number,
  stockTwoSymbol: string,
  stockTwoBeta: number,
): string {
  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const betaOne = stockOneBeta.toFixed(2);
  const betaTwo = stockTwoBeta.toFixed(2);

  if (stockOneBeta === 0 || stockTwoBeta === 0) {
    return "";
  }

  const ratio = stockOneBeta / stockTwoBeta;

  if (stockOneBeta > 0 && stockTwoBeta > 0) {
    if (ratio > 1.5) {
      return `${symbolOne} 的 Beta 值 (${betaOne}) 表明其预期市场波幅远大于 ${symbolTwo} 相对平稳的 Beta 值 (${betaTwo})，这意味着其潜在的上涨和下跌空间均可能更大。`;
    }
    if (ratio < 0.67) {
      return `${symbolTwo} 的 Beta 值 (${betaTwo}) 较高，显示其对市场动态的反应更为敏感，而 ${symbolOne} (Beta ${betaOne}) 则相对较为稳健。`;
    }
    return `${symbolOne} (Beta ${betaOne}) 与 ${symbolTwo} (Beta ${betaTwo}) 的 Beta 值相近，表明它们相对于整体市场的波动特征颇为相似。`;
  }

  if (stockOneBeta > 0 && stockTwoBeta < 0) {
    return `${symbolOne} 的 Beta 值 (${betaOne}) 为正，表明其股价倾向于与整体市场同向变动；而 ${symbolTwo} 的 Beta 值 (${betaTwo}) 为负，通常呈反向变动趋势，这可能为投资组合提供分散化或对冲的机会。`;
  }

  if (stockOneBeta < 0 && stockTwoBeta > 0) {
    return `${symbolTwo} 的正 Beta 值 (${betaTwo}) 暗示其走势与市场一致，而 ${symbolOne} 的负 Beta 值 (${betaOne}) 则使其倾向于逆市场大势变动，可能被视为一种防御性投资选择。`;
  }

  if (stockOneBeta < 0 && stockTwoBeta < 0) {
    if (ratio > 1.5) {
      return `${symbolOne} 与 ${symbolTwo} 均为负 Beta (分别为 ${betaOne} 和 ${betaTwo})，但 ${symbolOne} 与市场的负相关性显著更强，在市场下行时可能提供更有效的对冲保护。`;
    }
    if (ratio < 0.67) {
      return `尽管 ${symbolOne} (Beta ${betaOne}) 和 ${symbolTwo} (Beta ${betaTwo}) 的 Beta 值皆为负，但 ${symbolTwo} 表现出与市场之间更为显著的反向联动关系，暗示其可能拥有更突出的防御特性。`;
    }
    return `${symbolOne} (Beta ${betaOne}) 和 ${symbolTwo} (Beta ${betaTwo}) 的 Beta 值均为负且数值接近，预期两者均会在一定程度上反市场主流趋势而动，或可作为投资组合的对冲工具。`;
  }

  return "";
}

function generateAdrCommentary(
  stockOneSymbol: string,
  stockOneIsAdr: boolean,
  stockTwoSymbol: string,
  stockTwoIsAdr: boolean,
): string {
  const symbolOne = stockOneSymbol;
  const symbolTwo = stockTwoSymbol;
  const isAdrOne = stockOneIsAdr;
  const isAdrTwo = stockTwoIsAdr;

  if (isAdrOne && isAdrTwo) {
    return `${symbolOne} 和 ${symbolTwo} 均为美国存托凭证 (ADR) — 这为美国投资者提供了便捷的途径来投资这两家外国公司的股票，而无需直接在海外交易所交易。`;
  }

  if (isAdrOne && !isAdrTwo) {
    return `${symbolOne} 作为 ADR 交易，为美国投资者提供了投资其外国股票的简单途径，而 ${symbolTwo} 则是标准的美国国内上市公司。`;
  }

  if (!isAdrOne && isAdrTwo) {
    return `${symbolTwo} 是一种 ADR，使美国购买者可以直接投资其非美国业务；不同于 ${symbolOne}，后者为纯粹的美国国内公司。`;
  }

  return "";
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
      {marketCapComparisonCommentary && <P>{marketCapComparisonCommentary}</P>}
      {betaComparisonCommentary && <P>{betaComparisonCommentary}</P>}
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
            <Table.Tbody.Tr.Th scope="row">贝塔值 (波动性)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneProfileData.beta.toFixed(2)}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoProfileData.beta.toFixed(2)}
            </Table.Tbody.Tr.Td>
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
