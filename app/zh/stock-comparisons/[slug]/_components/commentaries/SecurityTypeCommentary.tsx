import { P } from "@/components/zh/ui/P";
import type { StockPropertyData } from "@/constants/stock-properties";

type SecurityTypeCommentaryProps = {
  stockOneSymbol: string;
  stockOneSecurityType: StockPropertyData["securityType"];
  stockTwoSymbol: string;
  stockTwoSecurityType: StockPropertyData["securityType"];
};

export function SecurityTypeCommentary({
  stockOneSymbol,
  stockOneSecurityType,
  stockTwoSymbol,
  stockTwoSecurityType,
}: SecurityTypeCommentaryProps) {
  if (!stockOneSecurityType || !stockTwoSecurityType) {
    return null;
  }

  if (
    stockOneSecurityType === "Common Stock" &&
    stockTwoSecurityType === "Common Stock"
  ) {
    return null;
  }

  const comparisonKey = `${stockOneSecurityType} vs ${stockTwoSecurityType}`;

  switch (comparisonKey) {
    // --- Common Stock Comparisons ---
    case "Common Stock vs ADR":
      return (
        <P>
          {stockOneSymbol}是标准的美国国内上市公司，而{stockTwoSymbol}
          则以美国存托凭证（ADR）的形式交易，为美国投资者提供了投资这家外国上市公司的便捷途径。
        </P>
      );
    case "Common Stock vs REIT":
      return (
        <P>
          一个关键的结构差异在于，{stockOneSymbol}是传统股票，而
          {stockTwoSymbol}
          是房地产投资信托基金（REIT），这是一种主要投资于创收型房地产的公司。
        </P>
      );
    case "Common Stock vs NY Reg Shrs":
      return (
        <P>
          {stockOneSymbol}是标准的美国国内股票，而{stockTwoSymbol}
          则以纽约注册股票（NY Reg
          Shrs）的形式交易，为美国投资者提供了投资这家外国公司的渠道。
        </P>
      );

    // --- ADR Comparisons ---
    case "ADR vs Common Stock":
      return (
        <P>
          {stockOneSymbol}
          以美国存托凭证（ADR）的形式交易，为美国投资者提供了投资其在海外上市股票的便捷方式。相比之下，
          {stockTwoSymbol}是标准的美国国内上市公司。
        </P>
      );
    case "ADR vs ADR":
      return (
        <P>
          {stockOneSymbol}和{stockTwoSymbol}
          都是美国存托凭证（ADR）。这为美国投资者提供了直接投资这些外国上市公司的便利。
        </P>
      );
    case "ADR vs REIT":
      return (
        <P>
          这两家公司的结构有根本不同：{stockOneSymbol}
          是一家外国公司的美国存托凭证（ADR），而{stockTwoSymbol}
          则是一家专注于房地产资产的房地产投资信托基金（REIT）。
        </P>
      );
    case "ADR vs NY Reg Shrs":
      return (
        <P>
          {stockOneSymbol}和{stockTwoSymbol}
          都为美国投资者提供了投资外国公司的渠道，其中{stockOneSymbol}
          以美国存托凭证（ADR）交易，而
          {stockTwoSymbol}则为纽约注册股票。
        </P>
      );

    // --- REIT Comparisons ---
    case "REIT vs Common Stock":
      return (
        <P>
          一个关键的结构差异在于，{stockOneSymbol}
          是房地产投资信托基金（REIT），主要投资于创收型房地产，而
          {stockTwoSymbol}是传统股票。
        </P>
      );
    case "REIT vs ADR":
      return (
        <P>
          这两家公司的结构有根本不同：{stockOneSymbol}
          是一家专注于房地产资产的房地产投资信托基金（REIT），而
          {stockTwoSymbol}是一家外国公司的美国存托凭证（ADR）。
        </P>
      );
    case "REIT vs REIT":
      return (
        <P>
          {stockOneSymbol}和{stockTwoSymbol}
          都是房地产投资信托基金（REIT）。这类实体需要将其大部分应税收入分配给股东，这通常会带来更高的股息收益率。
        </P>
      );
    case "REIT vs NY Reg Shrs":
      return (
        <P>
          这里的投资类型差异显著：{stockOneSymbol}
          是房地产投资信托基金（REIT），而{stockTwoSymbol}
          则允许美国投资者通过纽约注册股票持有外国公司股票。
        </P>
      );

    // --- NY Reg Shrs Comparisons ---
    case "NY Reg Shrs vs Common Stock":
      return (
        <P>
          {stockOneSymbol}
          以纽约注册股票的形式交易，为美国投资者提供了投资外国公司的渠道，而
          {stockTwoSymbol}是标准的美国国内股票。
        </P>
      );
    case "NY Reg Shrs vs ADR":
      return (
        <P>
          {stockOneSymbol}和{stockTwoSymbol}
          都为美国投资者提供了投资外国公司的渠道，其中{stockOneSymbol}
          以纽约注册股票交易，而
          {stockTwoSymbol}则为美国存托凭证（ADR）。
        </P>
      );
    case "NY Reg Shrs vs REIT":
      return (
        <P>
          这里的投资类型差异显著：{stockOneSymbol}
          允许美国投资者通过纽约注册股票持有外国公司股票，而{stockTwoSymbol}
          是房地产投资信托基金（REIT）。
        </P>
      );
    case "NY Reg Shrs vs NY Reg Shrs":
      return (
        <P>
          {stockOneSymbol}和{stockTwoSymbol}
          都以纽约注册股票的形式交易，这为美国投资者提供了直接拥有这些外国公司股份的渠道。
        </P>
      );

    default:
      return null;
  }
}
