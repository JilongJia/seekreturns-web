export type ForwardPEGRatioCategory =
  | "Negative"
  | "Low"
  | "Fair"
  | "High"
  | "VeryHigh";

type Zone = {
  upperBound: number;
  category: ForwardPEGRatioCategory;
};

type DefaultStandard = {
  type: "Default";
  zones: Zone[];
};

type IndustrySpecificStandard = {
  type: "IndustrySpecific";
  zones: Zone[];
};

type NotApplicableStandard = {
  type: "NotApplicable";
};

export type ForwardPEGRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

export type ForwardPEGRatioIndustryConfig = {
  [industry: string]: ForwardPEGRatioStandard;
  _defaults: ForwardPEGRatioStandard;
};

export const forwardPEGRatioConfig: ForwardPEGRatioIndustryConfig = {
  _defaults: {
    type: "Default",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Fair" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  Steel: { type: "NotApplicable" },
  Silver: { type: "NotApplicable" },
  "Other Precious Metals": { type: "NotApplicable" },
  Gold: { type: "NotApplicable" },
  Copper: { type: "NotApplicable" },
  Aluminum: { type: "NotApplicable" },
  "Paper, Lumber & Forest Products": { type: "NotApplicable" },
  "Industrial Materials": { type: "NotApplicable" },
  "Construction Materials": { type: "NotApplicable" },
  Chemicals: { type: "NotApplicable" },
  "Agricultural Inputs": { type: "NotApplicable" },
  "Residential Construction": { type: "NotApplicable" },
  Uranium: { type: "NotApplicable" },
  "Oil & Gas Refining & Marketing": { type: "NotApplicable" },
  "Oil & Gas Midstream": { type: "NotApplicable" },
  "Oil & Gas Integrated": { type: "NotApplicable" },
  "Oil & Gas Exploration & Production": { type: "NotApplicable" },
  "Oil & Gas Equipment & Services": { type: "NotApplicable" },
  "Oil & Gas Energy": { type: "NotApplicable" },
  "Oil & Gas Drilling": { type: "NotApplicable" },
  Coal: { type: "NotApplicable" },
  "Shell Companies": { type: "NotApplicable" },
  "Investment - Banking & Investment Services": { type: "NotApplicable" },
  "Insurance - Specialty": { type: "NotApplicable" },
  "Insurance - Reinsurance": { type: "NotApplicable" },
  "Insurance - Property & Casualty": { type: "NotApplicable" },
  "Insurance - Life": { type: "NotApplicable" },
  "Insurance - Diversified": { type: "NotApplicable" },
  "Insurance - Brokers": { type: "NotApplicable" },
  "Financial - Mortgages": { type: "NotApplicable" },
  "Financial - Diversified": { type: "NotApplicable" },
  "Financial - Data & Stock Exchanges": { type: "NotApplicable" },
  "Financial - Credit Services": { type: "NotApplicable" },
  "Financial - Conglomerates": { type: "NotApplicable" },
  "Financial - Capital Markets": { type: "NotApplicable" },
  "Banks - Regional": { type: "NotApplicable" },
  "Banks - Diversified": { type: "NotApplicable" },
  Banks: { type: "NotApplicable" },
  "Asset Management": { type: "NotApplicable" },
  "Asset Management - Bonds": { type: "NotApplicable" },
  "Asset Management - Income": { type: "NotApplicable" },
  "Asset Management - Leveraged": { type: "NotApplicable" },
  "Asset Management - Cryptocurrency": { type: "NotApplicable" },
  "Asset Management - Global": { type: "NotApplicable" },
  "Medical - Healthcare Plans": { type: "NotApplicable" },
  "Medical - Care Facilities": { type: "NotApplicable" },
  Railroads: { type: "NotApplicable" },
  "Marine Shipping": { type: "NotApplicable" },
  "Airlines, Airports & Air Services": { type: "NotApplicable" },
  "Engineering & Construction": { type: "NotApplicable" },
  Construction: { type: "NotApplicable" },
  Conglomerates: { type: "NotApplicable" },
  "Agricultural - Commodities/Milling": { type: "NotApplicable" },
  "REIT - Specialty": { type: "NotApplicable" },
  "REIT - Retail": { type: "NotApplicable" },
  "REIT - Residential": { type: "NotApplicable" },
  "REIT - Office": { type: "NotApplicable" },
  "REIT - Mortgage": { type: "NotApplicable" },
  "REIT - Industrial": { type: "NotApplicable" },
  "REIT - Hotel & Motel": { type: "NotApplicable" },
  "REIT - Healthcare Facilities": { type: "NotApplicable" },
  "REIT - Diversified": { type: "NotApplicable" },
  "Real Estate - Diversified": { type: "NotApplicable" },
  "Real Estate - Development": { type: "NotApplicable" },
  "Real Estate - General": { type: "NotApplicable" },
  "Renewable Utilities": { type: "NotApplicable" },
  "Regulated Water": { type: "NotApplicable" },
  "Regulated Gas": { type: "NotApplicable" },
  "Regulated Electric": { type: "NotApplicable" },
  "Independent Power Producers": { type: "NotApplicable" },
  "Diversified Utilities": { type: "NotApplicable" },
  "General Utilities": { type: "NotApplicable" },
};
