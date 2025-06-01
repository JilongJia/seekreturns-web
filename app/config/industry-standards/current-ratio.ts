export type CurrentRatioCategory = "Low" | "Normal" | "High";

type Zone = {
  upperBound: number;
  category: CurrentRatioCategory;
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

type CurrentRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

type CurrentRatioConfig = {
  [industry: string]: CurrentRatioStandard;
  _defaults: CurrentRatioStandard;
};

export const currentRatioConfig: CurrentRatioConfig = {
  _defaults: {
    type: "Default",
    zones: [
      { upperBound: 1.0, category: "Low" }, // Generally, CR < 1.0 is a concern
      { upperBound: 3.5, category: "Normal" }, // Broad normal range, CR > 3.5 might be inefficient
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Financial & Similar Sectors - Current Ratio Not Typically Applicable
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

  // Retail Sector
  "Specialty Retail": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.2, category: "Low" },
      { upperBound: 4.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Luxury Goods": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.2, category: "Low" },
      { upperBound: 4.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Home Improvement": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.2, category: "Low" },
      { upperBound: 4.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Department Stores": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.2, category: "Low" },
      { upperBound: 3.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Dealerships": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.1, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Apparel - Retail": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.2, category: "Low" },
      { upperBound: 4.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Grocery Stores": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Discount Stores": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Technology & Information Sector
  "Internet Content & Information": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Software - Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Software - Infrastructure": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Software - Application": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Information Technology Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.9, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Electronic Gaming & Multimedia": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Services Sector
  "Consulting Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Advertising Agencies": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.9, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Publishing: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.9, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Broadcasting: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.9, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Education & Training Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Entertainment: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Travel Lodging": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Gambling, Resorts & Casinos": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Utilities Sector (often lower CR due to stable cash flows and capex)
  "Renewable Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Regulated Water": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Regulated Gas": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Regulated Electric": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Independent Power Producers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Diversified Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "General Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Manufacturing & Industrials
  "Residential Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Parts": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Recreational Vehicles": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Engineering & Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Restaurants & Transportation
  Restaurants: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Airlines, Airports & Air Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Telecommunications Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Railroads: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Trucking: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.9, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Marine Shipping": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Basic Materials & Commodities
  Steel: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Silver: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Other Precious Metals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Gold: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Copper: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Aluminum: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Uranium: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Coal: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Energy - Oil & Gas
  "Oil & Gas Refining & Marketing": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Midstream": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Integrated": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Exploration & Production": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Drilling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Consumer Goods (Added or adjusted)
  Tobacco: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Food Distribution": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Agricultural - Commodities/Milling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Healthcare
  "Medical - Care Facilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 1.0, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Other Industrials/Services
  "Waste Management": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Environmental Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Real Estate (Non-REIT)
  "Real Estate - Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Real Estate - Diversified": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Real Estate - Development": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Real Estate - General": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 3.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
};
