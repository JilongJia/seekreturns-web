export type PriceToFreeCashFlowRatioCategory =
  | "Negative"
  | "Low"
  | "Moderate"
  | "High"
  | "VeryHigh";

type Zone = {
  upperBound: number;
  category: PriceToFreeCashFlowRatioCategory;
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

export type PriceToFreeCashFlowRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

export type PriceToFreeCashFlowRatioIndustryConfig = {
  [industry: string]: PriceToFreeCashFlowRatioStandard;
  _defaults: PriceToFreeCashFlowRatioStandard;
};

export const priceToFreeCashFlowRatioConfig: PriceToFreeCashFlowRatioIndustryConfig =
  {
    _defaults: {
      type: "Default",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 15, category: "Low" },
        { upperBound: 25, category: "Moderate" },
        { upperBound: 35, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },

    // Industries where standard FCF and P/FCF are Not Applicable or Misleading
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
    "REIT - Specialty": { type: "NotApplicable" },
    "REIT - Retail": { type: "NotApplicable" },
    "REIT - Residential": { type: "NotApplicable" },
    "REIT - Office": { type: "NotApplicable" },
    "REIT - Mortgage": { type: "NotApplicable" },
    "REIT - Industrial": { type: "NotApplicable" },
    "REIT - Hotel & Motel": { type: "NotApplicable" },
    "REIT - Healthcare Facilities": { type: "NotApplicable" },
    "REIT - Diversified": { type: "NotApplicable" },

    // Utilities - Capex is a major factor
    "Telecommunications Services": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 12, category: "Low" },
        { upperBound: 22, category: "Moderate" },
        { upperBound: 32, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Regulated Water": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 15, category: "Low" },
        { upperBound: 24, category: "Moderate" },
        { upperBound: 33, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Regulated Gas": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 14, category: "Low" },
        { upperBound: 22, category: "Moderate" },
        { upperBound: 30, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Regulated Electric": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 14, category: "Low" },
        { upperBound: 22, category: "Moderate" },
        { upperBound: 30, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Diversified Utilities": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 13, category: "Low" },
        { upperBound: 21, category: "Moderate" },
        { upperBound: 29, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "General Utilities": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 13, category: "Low" },
        { upperBound: 21, category: "Moderate" },
        { upperBound: 29, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Renewable Utilities": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 18, category: "Low" },
        { upperBound: 30, category: "Moderate" },
        { upperBound: 40, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Independent Power Producers": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 13, category: "Low" },
        { upperBound: 20, category: "Moderate" },
        { upperBound: 28, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },

    // Energy Sector - Capex & Commodity Price Driven
    "Oil & Gas Integrated": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 10, category: "Low" },
        { upperBound: 18, category: "Moderate" },
        { upperBound: 26, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Oil & Gas Exploration & Production": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 9, category: "Low" },
        { upperBound: 17, category: "Moderate" },
        { upperBound: 24, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Oil & Gas Midstream": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 12, category: "Low" },
        { upperBound: 21, category: "Moderate" },
        { upperBound: 29, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Oil & Gas Refining & Marketing": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 10, category: "Low" },
        { upperBound: 19, category: "Moderate" },
        { upperBound: 28, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Oil & Gas Equipment & Services": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 11, category: "Low" },
        { upperBound: 20, category: "Moderate" },
        { upperBound: 29, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Oil & Gas Drilling": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 9, category: "Low" },
        { upperBound: 18, category: "Moderate" },
        { upperBound: 26, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    Coal: {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 8, category: "Low" },
        { upperBound: 14, category: "Moderate" },
        { upperBound: 21, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },

    // Materials & Industrials - Capex Heavy
    Steel: {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 11, category: "Low" },
        { upperBound: 19, category: "Moderate" },
        { upperBound: 28, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    Aluminum: {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 12, category: "Low" },
        { upperBound: 21, category: "Moderate" },
        { upperBound: 30, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    Chemicals: {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 14, category: "Low" },
        { upperBound: 23, category: "Moderate" },
        { upperBound: 33, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Industrial - Capital Goods": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 15, category: "Low" },
        { upperBound: 25, category: "Moderate" },
        { upperBound: 36, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Aerospace & Defense": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 16, category: "Low" },
        { upperBound: 26, category: "Moderate" },
        { upperBound: 38, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Auto - Manufacturers": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 12, category: "Low" },
        { upperBound: 22, category: "Moderate" },
        { upperBound: 33, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    Semiconductors: {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 17, category: "Low" },
        { upperBound: 28, category: "Moderate" },
        { upperBound: 40, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    "Airlines, Airports & Air Services": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 10, category: "Low" },
        { upperBound: 19, category: "Moderate" },
        { upperBound: 29, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
    Tobacco: {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 12, category: "Low" },
        { upperBound: 19, category: "Moderate" },
        { upperBound: 26, category: "High" },
        { upperBound: Infinity, category: "VeryHigh" },
      ],
    },
  };
