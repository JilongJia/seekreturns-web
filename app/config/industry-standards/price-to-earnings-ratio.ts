export type PriceToEarningsRatioCategory =
  | "Negative"
  | "Low"
  | "Moderate"
  | "High"
  | "VeryHigh";

type Zone = {
  upperBound: number;
  category: PriceToEarningsRatioCategory;
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

export type PriceToEarningsRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

export type PriceToEarningsRatioIndustryConfig = {
  [industry: string]: PriceToEarningsRatioStandard;
  _defaults: PriceToEarningsRatioStandard;
};

export const priceToEarningsRatioConfig: PriceToEarningsRatioIndustryConfig = {
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

  "REIT - Specialty": { type: "NotApplicable" },
  "REIT - Retail": { type: "NotApplicable" },
  "REIT - Residential": { type: "NotApplicable" },
  "REIT - Office": { type: "NotApplicable" },
  "REIT - Mortgage": { type: "NotApplicable" },
  "REIT - Industrial": { type: "NotApplicable" },
  "REIT - Hotel & Motel": { type: "NotApplicable" },
  "REIT - Healthcare Facilities": { type: "NotApplicable" },
  "REIT - Diversified": { type: "NotApplicable" },
  "Shell Companies": { type: "NotApplicable" },

  // Financial Services - Typically Lower P/E Ratios
  "Banks - Regional": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 14, category: "Moderate" },
      { upperBound: 18, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Banks - Diversified": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 14, category: "Moderate" },
      { upperBound: 18, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Banks: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 14, category: "Moderate" },
      { upperBound: 18, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 16, category: "Moderate" },
      { upperBound: 22, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Reinsurance": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 16, category: "Moderate" },
      { upperBound: 22, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Property & Casualty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 17, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Life": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 14, category: "Moderate" },
      { upperBound: 20, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Diversified": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 17, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Brokers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management - Bonds": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management - Income": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management - Leveraged": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management - Cryptocurrency": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 25, category: "Moderate" },
      { upperBound: 35, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management - Global": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Capital Markets": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 11, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 25, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Investment - Banking & Investment Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 11, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 25, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Data & Stock Exchanges": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 28, category: "Moderate" },
      { upperBound: 40, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Credit Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 14, category: "Low" },
      { upperBound: 22, category: "Moderate" },
      { upperBound: 32, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Mortgages": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 8, category: "Low" },
      { upperBound: 12, category: "Moderate" },
      { upperBound: 16, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Technology Sector - Generally Higher P/E Ratios due to Growth
  "Software - Application": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 20, category: "Low" },
      { upperBound: 30, category: "Moderate" },
      { upperBound: 50, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Software - Infrastructure": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 20, category: "Low" },
      { upperBound: 33, category: "Moderate" },
      { upperBound: 55, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Software - Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 28, category: "Moderate" },
      { upperBound: 45, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Internet Content & Information": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 20, category: "Low" },
      { upperBound: 33, category: "Moderate" },
      { upperBound: 55, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Information Technology Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 16, category: "Low" },
      { upperBound: 25, category: "Moderate" },
      { upperBound: 36, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Computer Hardware": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 13, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Electronic Gaming & Multimedia": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 30, category: "Moderate" },
      { upperBound: 48, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Semiconductors: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 17, category: "Low" },
      { upperBound: 27, category: "Moderate" },
      { upperBound: 42, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Communication Equipment": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 22, category: "Moderate" },
      { upperBound: 30, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Technology Distributors": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 25, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Consumer Electronics": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 13, category: "Low" },
      { upperBound: 21, category: "Moderate" },
      { upperBound: 30, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Utilities Sector - Generally Lower P/E, except for growth segments
  "Regulated Water": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 22, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Gas": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 14, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 26, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Electric": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 14, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 26, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Diversified Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 21, category: "Moderate" },
      { upperBound: 27, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "General Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 21, category: "Moderate" },
      { upperBound: 27, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Renewable Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 28, category: "Moderate" },
      { upperBound: 40, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Independent Power Producers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 13, category: "Low" },
      { upperBound: 19, category: "Moderate" },
      { upperBound: 26, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Solar: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 30, category: "Moderate" },
      { upperBound: 45, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Cyclical & Mature Industries
  "Telecommunications Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Airlines, Airports & Air Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 17, category: "Moderate" },
      { upperBound: 24, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Steel: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 16, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Silver: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Other Precious Metals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Gold: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 14, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 35, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Copper: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 16, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Aluminum: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 16, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Chemicals - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 35, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Chemicals: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 20, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Residential Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 14, category: "Moderate" },
      { upperBound: 20, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Auto - Parts": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 11, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 25, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Auto - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 8, category: "Low" },
      { upperBound: 13, category: "Moderate" },
      { upperBound: 18, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Refining & Marketing": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 8, category: "Low" },
      { upperBound: 14, category: "Moderate" },
      { upperBound: 20, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Midstream": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 11, category: "Low" },
      { upperBound: 17, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Integrated": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 15, category: "Moderate" },
      { upperBound: 22, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Exploration & Production": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 9, category: "Low" },
      { upperBound: 15, category: "Moderate" },
      { upperBound: 24, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Equipment & Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 11, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 26, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Drilling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 17, category: "Moderate" },
      { upperBound: 24, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Coal: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 7, category: "Low" },
      { upperBound: 12, category: "Moderate" },
      { upperBound: 18, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Railroads: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 13, category: "Low" },
      { upperBound: 21, category: "Moderate" },
      { upperBound: 28, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Aerospace & Defense": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 33, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Engineering & Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 11, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 26, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Conglomerates: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 13, category: "Low" },
      { upperBound: 21, category: "Moderate" },
      { upperBound: 29, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Consumer Goods & Services
  Publishing: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 25, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Broadcasting: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 19, category: "Moderate" },
      { upperBound: 27, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Entertainment: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 26, category: "Moderate" },
      { upperBound: 40, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Media & Entertainment": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 26, category: "Moderate" },
      { upperBound: 40, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Apparel - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 13, category: "Low" },
      { upperBound: 21, category: "Moderate" },
      { upperBound: 30, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Tobacco: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 10, category: "Low" },
      { upperBound: 16, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Household & Personal Products": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 16, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 33, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Packaged Foods": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 22, category: "Moderate" },
      { upperBound: 30, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Beverages - Alcoholic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 16, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 33, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Beverages - Non-Alcoholic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 26, category: "Moderate" },
      { upperBound: 36, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Consulting Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 33, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Healthcare Sector - R&D, growth, and defensive characteristics vary
  "Medical - Pharmaceuticals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 16, category: "Low" },
      { upperBound: 25, category: "Moderate" },
      { upperBound: 36, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Instruments & Supplies": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 18, category: "Low" },
      { upperBound: 28, category: "Moderate" },
      { upperBound: 40, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Healthcare Plans": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 18, category: "Moderate" },
      { upperBound: 25, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Healthcare Information Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 20, category: "Low" },
      { upperBound: 30, category: "Moderate" },
      { upperBound: 50, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Distribution": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 22, category: "Moderate" },
      { upperBound: 30, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Diagnostics & Research": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 22, category: "Low" },
      { upperBound: 35, category: "Moderate" },
      { upperBound: 55, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Devices": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 20, category: "Low" },
      { upperBound: 30, category: "Moderate" },
      { upperBound: 48, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Care Facilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 12, category: "Low" },
      { upperBound: 17, category: "Moderate" },
      { upperBound: 23, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Drug Manufacturers - Specialty & Generic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 14, category: "Low" },
      { upperBound: 22, category: "Moderate" },
      { upperBound: 33, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Drug Manufacturers - General": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 15, category: "Low" },
      { upperBound: 24, category: "Moderate" },
      { upperBound: 35, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Biotechnology: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 25, category: "Low" },
      { upperBound: 40, category: "Moderate" },
      { upperBound: 60, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
};
