import { P } from "@/components/en/ui/P";
import type { StockInfoData } from "@/constants/stock";

type SecurityTypeCommentaryProps = {
  stockOneSymbol: string;
  stockOneSecurityType: StockInfoData["securityType"];
  stockTwoSymbol: string;
  stockTwoSecurityType: StockInfoData["securityType"];
};

export function SecurityTypeCommentary({
  stockOneSymbol,
  stockOneSecurityType,
  stockTwoSymbol,
  stockTwoSecurityType,
}: SecurityTypeCommentaryProps) {
  // Guard clause: If data is missing, render nothing.
  if (!stockOneSecurityType || !stockTwoSecurityType) {
    return null;
  }

  // Special rule: If both are standard common stocks, no special commentary is needed.
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
          {stockOneSymbol} is a standard domestic listing, while{" "}
          {stockTwoSymbol} trades as an American Depositary Receipt (ADR),
          offering U.S. investors access to its foreign-listed shares.
        </P>
      );
    case "Common Stock vs REIT":
      return (
        <P>
          A key difference in structure is that {stockOneSymbol} is a
          conventional stock, whereas {stockTwoSymbol} is a Real Estate
          Investment Trust (REIT), a company that primarily invests in
          income-generating real estate.
        </P>
      );
    case "Common Stock vs NY Reg Shrs":
      return (
        <P>
          {stockOneSymbol} is a standard domestic stock, while {stockTwoSymbol}{" "}
          trades as New York Registered Shares, providing U.S. investors with a
          way to invest in the foreign-based company.
        </P>
      );

    // --- ADR Comparisons ---
    case "ADR vs Common Stock":
      return (
        <P>
          {stockOneSymbol} trades as an American Depositary Receipt (ADR),
          offering U.S. investors a convenient way to access its foreign-listed
          shares. In contrast, {stockTwoSymbol} is a standard domestic listing.
        </P>
      );
    case "ADR vs ADR":
      return (
        <P>
          Both {stockOneSymbol} and {stockTwoSymbol} are American Depositary
          Receipts (ADRs). This provides U.S. investors with straightforward
          access to investing in these foreign-listed companies.
        </P>
      );
    case "ADR vs REIT":
      return (
        <P>
          These companies have fundamentally different structures:{" "}
          {stockOneSymbol} is an American Depositary Receipt (ADR) for a foreign
          company, while {stockTwoSymbol} is a Real Estate Investment Trust
          (REIT) focused on real estate assets.
        </P>
      );
    case "ADR vs NY Reg Shrs":
      return (
        <P>
          Both {stockOneSymbol} and {stockTwoSymbol} offer U.S. investors access
          to foreign companies, with {stockOneSymbol} trading as an American
          Depositary Receipt (ADR) and {stockTwoSymbol} as New York Registered
          Shares.
        </P>
      );

    // --- REIT Comparisons ---
    case "REIT vs Common Stock":
      return (
        <P>
          A key difference in structure is that {stockOneSymbol} is a Real
          Estate Investment Trust (REIT), a company that primarily invests in
          income-generating real estate, whereas {stockTwoSymbol} is a
          conventional stock.
        </P>
      );
    case "REIT vs ADR":
      return (
        <P>
          These companies have fundamentally different structures:{" "}
          {stockOneSymbol} is a Real Estate Investment Trust (REIT) focused on
          real estate assets, while {stockTwoSymbol} is an American Depositary
          Receipt (ADR) for a foreign company.
        </P>
      );
    case "REIT vs REIT":
      return (
        <P>
          Both {stockOneSymbol} and {stockTwoSymbol} are Real Estate Investment
          Trusts (REITs). These entities are required to distribute the majority
          of their taxable income to shareholders, often resulting in higher
          dividend yields.
        </P>
      );
    case "REIT vs NY Reg Shrs":
      return (
        <P>
          The investment types differ significantly here: {stockOneSymbol} is a
          Real Estate Investment Trust (REIT), while {stockTwoSymbol} allows
          U.S. investors to own foreign stock via New York Registered Shares.
        </P>
      );

    // --- NY Reg Shrs Comparisons ---
    case "NY Reg Shrs vs Common Stock":
      return (
        <P>
          {stockOneSymbol} trades as New York Registered Shares, providing U.S.
          investors with access to a foreign company, while {stockTwoSymbol} is
          a standard domestic stock.
        </P>
      );
    case "NY Reg Shrs vs ADR":
      return (
        <P>
          Both {stockOneSymbol} and {stockTwoSymbol} offer U.S. investors access
          to foreign companies, with {stockOneSymbol} trading as New York
          Registered Shares and {stockTwoSymbol} as an American Depositary
          Receipt (ADR).
        </P>
      );
    case "NY Reg Shrs vs REIT":
      return (
        <P>
          The investment types differ significantly here: {stockOneSymbol}{" "}
          allows U.S. investors to own foreign stock via New York Registered
          Shares, while {stockTwoSymbol} is a Real Estate Investment Trust
          (REIT).
        </P>
      );
    case "NY Reg Shrs vs NY Reg Shrs":
      return (
        <P>
          Both {stockOneSymbol} and {stockTwoSymbol} trade as New York
          Registered Shares, which provides U.S. investors with direct access to
          own shares of these foreign-based companies.
        </P>
      );

    default:
      // Return null for any unhandled cases.
      return null;
  }
}
