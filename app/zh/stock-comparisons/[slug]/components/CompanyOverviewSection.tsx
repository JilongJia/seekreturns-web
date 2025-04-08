import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Table } from "@/app/components/zh/content/page/main/article/Table";

type CompanyProfileData = {
  companyName: string;
  country: string;
  sector: string;
  industry: string;
  ceo: string;
  price: number;
  marketCap: number;
  beta: number;
  exchange: string;
  ipoDate: string;
  isAdr: boolean;
  currency: string;
};

type CompanyOverviewSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

async function fetchCompanyProfileData(
  symbol: string,
): Promise<CompanyProfileData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const endpoint = `https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${apiKey}`;
  try {
    const response = await fetch(endpoint);
    const profileRawData = await response.json();
    if (!profileRawData || profileRawData.length === 0) return null;

    const profileData = profileRawData[0];
    const data: CompanyProfileData = {
      companyName: profileData.companyName,
      country: profileData.country,
      sector: profileData.sector,
      industry: profileData.industry,
      ceo: profileData.ceo,
      price: profileData.price,
      marketCap: profileData.marketCap,
      beta: profileData.beta,
      exchange: profileData.exchange,
      ipoDate: profileData.ipoDate,
      isAdr: profileData.isAdr,
      currency: profileData.currency,
    };
    return data;
  } catch (error) {
    console.error("Error fetching company profile data for", symbol, error);
    return null;
  }
}

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
  const stockOneCompanyProfileData =
    await fetchCompanyProfileData(stockOneSymbol);
  const stockTwoCompanyProfileData =
    await fetchCompanyProfileData(stockTwoSymbol);

  if (!stockOneCompanyProfileData || !stockTwoCompanyProfileData) {
    return (
      <Section ariaLabelledby="company-overview">
        <H2 id="company-overview">公司概况</H2>
        <P>暂时无法加载公司概况数据。</P>
      </Section>
    );
  }

  const marketCapComparisonCommentary = generateMarketCapComparisonCommentary(
    stockOneSymbol,
    stockOneCompanyProfileData.marketCap,
    stockOneCompanyProfileData.currency,
    stockTwoSymbol,
    stockTwoCompanyProfileData.marketCap,
    stockTwoCompanyProfileData.currency,
  );

  const betaComparisonCommentary = generateBetaComparisonCommentary(
    stockOneSymbol,
    stockOneCompanyProfileData.beta,
    stockTwoSymbol,
    stockTwoCompanyProfileData.beta,
  );

  const adrCommentary = generateAdrCommentary(
    stockOneSymbol,
    stockOneCompanyProfileData.isAdr,
    stockTwoSymbol,
    stockTwoCompanyProfileData.isAdr,
  );

  return (
    <Section ariaLabelledby="company-overview">
      <H2 id="company-overview">公司概况</H2>
      <P>{marketCapComparisonCommentary}</P>
      <P>{betaComparisonCommentary}</P>
      {adrCommentary && <P>{adrCommentary}</P>}
      <P>具体信息，见下表。</P>
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
              {stockOneCompanyProfileData.companyName}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.companyName}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">国家</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.country}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.country}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">板块</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.sector}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.sector}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">行业</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.industry}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.industry}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">首席执行官</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.ceo}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.ceo}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">价格</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.price.toLocaleString("zh")}{" "}
              {stockOneCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.price.toLocaleString("zh")}{" "}
              {stockTwoCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">市值</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {(
                stockOneCompanyProfileData.marketCap / 100000000
              ).toLocaleString("zh", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              亿 {stockOneCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {(
                stockTwoCompanyProfileData.marketCap / 100000000
              ).toLocaleString("zh", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              亿 {stockTwoCompanyProfileData.currency}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">贝塔值 (波动性)</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.beta}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.beta}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">交易所</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.exchange}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.exchange}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">IPO日期</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {new Date(stockOneCompanyProfileData.ipoDate).toLocaleDateString(
                "zh",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {new Date(stockTwoCompanyProfileData.ipoDate).toLocaleDateString(
                "zh",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
          <Table.Tbody.Tr>
            <Table.Tbody.Tr.Th scope="row">ADR</Table.Tbody.Tr.Th>
            <Table.Tbody.Tr.Td>
              {stockOneCompanyProfileData.isAdr ? "是" : "否"}
            </Table.Tbody.Tr.Td>
            <Table.Tbody.Tr.Td>
              {stockTwoCompanyProfileData.isAdr ? "是" : "否"}
            </Table.Tbody.Tr.Td>
          </Table.Tbody.Tr>
        </Table.Tbody>
      </Table>
    </Section>
  );
}
