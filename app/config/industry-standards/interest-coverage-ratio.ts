export type InterestCoverageRatioCategory =
  | "Negative"
  | "CriticallyLow"
  | "Low"
  | "Adequate"
  | "Strong";

type Zone = {
  upperBound: number;
  category: InterestCoverageRatioCategory;
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

type InterestCoverageRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

type InterestCoverageRatioIndustryConfig = {
  [industry: string]: InterestCoverageRatioStandard;
  _defaults: InterestCoverageRatioStandard;
};

export const interestCoverageRatioConfig: InterestCoverageRatioIndustryConfig =
  {
    _defaults: {
      type: "Default",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 3.0, category: "Low" },
        { upperBound: 6.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },

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
    "Shell Companies": { type: "NotApplicable" },

    "Regulated Water": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.5, category: "Low" },
        { upperBound: 4.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Regulated Gas": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.5, category: "Low" },
        { upperBound: 4.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Regulated Electric": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.5, category: "Low" },
        { upperBound: 4.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Diversified Utilities": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.8, category: "Low" },
        { upperBound: 5.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "General Utilities": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.8, category: "Low" },
        { upperBound: 5.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Renewable Utilities": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.5, category: "Low" },
        { upperBound: 4.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Independent Power Producers": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 3.0, category: "Low" },
        { upperBound: 5.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },

    // Other Capital Intensive or Specific Industries
    "Telecommunications Services": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 2.5, category: "Low" },
        { upperBound: 4.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Airlines, Airports & Air Services": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.2, category: "CriticallyLow" },
        { upperBound: 2.0, category: "Low" },
        { upperBound: 3.5, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },

    // Technology - Profitable companies should have high coverage
    "Software - Application": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 4.0, category: "Low" },
        { upperBound: 8.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Software - Infrastructure": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 4.0, category: "Low" },
        { upperBound: 8.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Software - Services": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 4.0, category: "Low" },
        { upperBound: 8.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
    "Internet Content & Information": {
      type: "IndustrySpecific",
      zones: [
        { upperBound: 0, category: "Negative" },
        { upperBound: 1.5, category: "CriticallyLow" },
        { upperBound: 3.5, category: "Low" },
        { upperBound: 7.0, category: "Adequate" },
        { upperBound: Infinity, category: "Strong" },
      ],
    },
  };
