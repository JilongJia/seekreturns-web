export type DebtToEquityRatioCategory =
  | "Negative"
  | "Optimal"
  | "Moderate"
  | "High"
  | "VeryHigh";

type Zone = {
  upperBound: number;
  category: DebtToEquityRatioCategory;
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

type DebtToEquityRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

type DebtToEquityRatioIndustryConfig = {
  [industry: string]: DebtToEquityRatioStandard;
  _defaults: DebtToEquityRatioStandard;
};

export const debtToEquityRatioConfig: DebtToEquityRatioIndustryConfig = {
  _defaults: {
    type: "Default",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.0, category: "Moderate" },
      { upperBound: 3.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Financial & Similar Sectors - D/E Not Directly Comparable
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

  // Utilities Sector (Typically higher D/E)
  Utilities: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Renewable Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Water": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Gas": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Regulated Electric": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Independent Power Producers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Diversified Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "General Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Solar: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Capital Intensive & Transportation
  "Telecommunications Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Airlines, Airports & Air Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 5.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Waste Management": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Environmental Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Trucking: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Railroads: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 5.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Marine Shipping": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Rental & Leasing Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.5, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 4.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Manufacturing & Industrials (Varies, general rule slightly more lenient than default)
  "Auto - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Steel: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Silver: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Other Precious Metals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Gold: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Copper: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Aluminum: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Paper, Lumber & Forest Products": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial Materials": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Construction Materials": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Chemicals - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Chemicals: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Agricultural Inputs": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Uranium: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Coal: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Manufacturing - Tools & Accessories": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Manufacturing - Textiles": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Manufacturing - Miscellaneous": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Manufacturing - Metal Fabrication": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial - Distribution": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial - Specialties": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial - Pollution & Treatment Controls": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial - Machinery": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial - Infrastructure Operations": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Industrial - Capital Goods": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Tobacco: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Oil & Gas (Capital intensive, commodity exposure)
  "Oil & Gas Integrated": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Exploration & Production": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.5, category: "Optimal" },
      { upperBound: 1.2, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Midstream": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 4.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Refining & Marketing": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Optimal" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Equipment & Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Oil & Gas Drilling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Technology Sector (Generally lower D/E)
  "Software - Application": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.4, category: "Optimal" },
      { upperBound: 1.0, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Software - Infrastructure": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.4, category: "Optimal" },
      { upperBound: 1.0, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Software - Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.4, category: "Optimal" },
      { upperBound: 1.0, category: "Moderate" },
      { upperBound: 2.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Internet Content & Information": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.5, category: "Optimal" },
      { upperBound: 1.2, category: "Moderate" },
      { upperBound: 2.2, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Information Technology Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Semiconductors: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Optimal" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Computer Hardware": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Optimal" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Communication Equipment": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Optimal" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Consumer Electronics": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.8, category: "Optimal" },
      { upperBound: 1.8, category: "Moderate" },
      { upperBound: 2.8, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },

  // Services & Other
  "Consulting Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.3, category: "Optimal" },
      { upperBound: 0.8, category: "Moderate" },
      { upperBound: 1.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Travel Lodging": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 5.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Gambling, Resorts & Casinos": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.2, category: "Optimal" },
      { upperBound: 3.0, category: "Moderate" },
      { upperBound: 5.0, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Residential Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Engineering & Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Construction: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.5, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Pharmaceuticals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Drug Manufacturers - Specialty & Generic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Drug Manufacturers - General": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  Biotechnology: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Devices": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Instruments & Supplies": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 0.6, category: "Optimal" },
      { upperBound: 1.5, category: "Moderate" },
      { upperBound: 2.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Healthcare Plans": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
  "Medical - Care Facilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0, category: "Negative" },
      { upperBound: 1.0, category: "Optimal" },
      { upperBound: 2.2, category: "Moderate" },
      { upperBound: 3.5, category: "High" },
      { upperBound: Infinity, category: "VeryHigh" },
    ],
  },
};
