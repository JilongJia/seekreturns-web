export type PriceToBookRatioCategory =
  | "Negative"
  | "Low"
  | "Moderate"
  | "High"
  | "VeryHigh";

type Zone = {
  upperBound: number;
  category: PriceToBookRatioCategory;
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

export type PriceToBookRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

export type PriceToBookRatioIndustryConfig = {
  [industry: string]: PriceToBookRatioStandard;
  _defaults: PriceToBookRatioStandard;
};

export const priceToBookRatioConfig: PriceToBookRatioIndustryConfig = {
  _defaults: {
    type: "Default",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 6.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  "Shell Companies": { type: "NotApplicable" },
  "Software - Application": { type: "NotApplicable" },
  "Software - Infrastructure": { type: "NotApplicable" },
  "Software - Services": { type: "NotApplicable" },
  "Internet Content & Information": { type: "NotApplicable" },
  "Advertising Agencies": { type: "NotApplicable" },
  "Consulting Services": { type: "NotApplicable" },
  "Staffing & Employment Services": { type: "NotApplicable" },
  "Specialty Business Services": { type: "NotApplicable" },
  "Electronic Gaming & Multimedia": { type: "NotApplicable" },
  "Information Technology Services": { type: "NotApplicable" },

  "Banks - Regional": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.9, category: "Low" },
      { upperBound: 1.4, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Banks - Diversified": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.9, category: "Low" },
      { upperBound: 1.4, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Banks: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.9, category: "Low" },
      { upperBound: 1.4, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Reinsurance": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.6, category: "Moderate" },
      { upperBound: 2.3, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Property & Casualty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.1, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.6, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Life": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Low" },
      { upperBound: 1.4, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Diversified": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Insurance - Brokers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.8, category: "Low" },
      { upperBound: 3.5, category: "Moderate" },
      { upperBound: 6.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Asset Management": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.8, category: "Low" },
      { upperBound: 4.0, category: "Moderate" },
      { upperBound: 7.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Capital Markets": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Investment - Banking & Investment Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Data & Stock Exchanges": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 6.0, category: "Moderate" },
      { upperBound: 12.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Credit Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.5, category: "Low" },
      { upperBound: 3.5, category: "Moderate" },
      { upperBound: 7.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Financial - Mortgages": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.9, category: "Low" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Basic Materials - Asset Heavy
  Steel: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Low" },
      { upperBound: 1.4, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Silver: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Other Precious Metals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Gold: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Copper: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Aluminum: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.6, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Chemicals: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Chemicals - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.8, category: "Low" },
      { upperBound: 3.5, category: "Moderate" },
      { upperBound: 6.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Energy Sector - Asset Heavy, Cyclical
  "Oil & Gas Integrated": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Exploration & Production": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.6, category: "Moderate" },
      { upperBound: 2.3, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Midstream": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.4, category: "Low" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Refining & Marketing": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Equipment & Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Low" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.3, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Drilling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.7, category: "Low" },
      { upperBound: 1.3, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Coal: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.2, category: "Moderate" },
      { upperBound: 1.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Utilities - Asset Heavy
  "Regulated Water": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.4, category: "Low" },
      { upperBound: 2.4, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Gas": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.3, category: "Low" },
      { upperBound: 2.1, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Electric": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.3, category: "Low" },
      { upperBound: 2.0, category: "Moderate" },
      { upperBound: 2.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Diversified Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 1.9, category: "Moderate" },
      { upperBound: 2.7, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "General Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 1.9, category: "Moderate" },
      { upperBound: 2.7, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Renewable Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.5, category: "Low" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Independent Power Producers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.1, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.6, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // REITs - P/B or Price/NAV is Key
  "REIT - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.7, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Retail": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.9, category: "Low" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Residential": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.1, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.6, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Office": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Low" },
      { upperBound: 1.4, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Mortgage": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.85, category: "Low" },
      { upperBound: 1.05, category: "Moderate" },
      { upperBound: 1.3, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Industrial": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.3, category: "Low" },
      { upperBound: 2.1, category: "Moderate" },
      { upperBound: 3.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Hotel & Motel": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.6, category: "Moderate" },
      { upperBound: 2.3, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Healthcare Facilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.1, category: "Low" },
      { upperBound: 1.7, category: "Moderate" },
      { upperBound: 2.4, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "REIT - Diversified": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.6, category: "Moderate" },
      { upperBound: 2.3, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Industries with High Intangibles or High ROE - P/B often high
  "Auto - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Airlines, Airports & Air Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Aerospace & Defense": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.8, category: "Low" },
      { upperBound: 3.5, category: "Moderate" },
      { upperBound: 6.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Semiconductors: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 3.0, category: "Low" },
      { upperBound: 6.0, category: "Moderate" },
      { upperBound: 10.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Computer Hardware": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.0, category: "Low" },
      { upperBound: 4.5, category: "Moderate" },
      { upperBound: 7.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Communication Equipment": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.5, category: "Low" },
      { upperBound: 3.5, category: "Moderate" },
      { upperBound: 6.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Biotechnology: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 6.0, category: "Moderate" },
      { upperBound: 12.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Pharmaceuticals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 5.0, category: "Moderate" },
      { upperBound: 8.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Drug Manufacturers - Specialty & Generic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 5.0, category: "Moderate" },
      { upperBound: 8.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Drug Manufacturers - General": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 5.0, category: "Moderate" },
      { upperBound: 8.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Household & Personal Products": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 3.0, category: "Low" },
      { upperBound: 6.0, category: "Moderate" },
      { upperBound: 10.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Beverages - Alcoholic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 5.0, category: "Moderate" },
      { upperBound: 8.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Beverages - Non-Alcoholic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 3.0, category: "Low" },
      { upperBound: 6.5, category: "Moderate" },
      { upperBound: 11.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Luxury Goods": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 2.5, category: "Low" },
      { upperBound: 6.0, category: "Moderate" },
      { upperBound: 11.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Telecommunications Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Tobacco: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 3.5, category: "Low" },
      { upperBound: 7.0, category: "Moderate" },
      { upperBound: 12.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Healthcare Plans": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Low" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Care Facilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.0, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
};
