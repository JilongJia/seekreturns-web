export type QuickRatioCategory = "Low" | "Normal" | "High";

type QuickRatioZone = {
  upperBound: number;
  category: QuickRatioCategory;
};

type DefaultStandard = {
  type: "Default";
  zones: QuickRatioZone[];
};

type IndustrySpecificStandard = {
  type: "IndustrySpecific";
  zones: QuickRatioZone[];
};

type NotApplicableStandard = {
  type: "NotApplicable";
};

type QuickRatioStandard =
  | DefaultStandard
  | IndustrySpecificStandard
  | NotApplicableStandard;

type QuickRatioIndustryConfig = {
  [industry: string]: QuickRatioStandard;
  _defaults: QuickRatioStandard;
};

export const quickRatioConfig: QuickRatioIndustryConfig = {
  _defaults: {
    type: "Default",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
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

  // Retail Sector (High inventory means very low Quick Ratios)
  "Specialty Retail": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.2, category: "Low" },
      { upperBound: 0.8, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Luxury Goods": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Home Improvement": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.2, category: "Low" },
      { upperBound: 0.8, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Department Stores": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.2, category: "Low" },
      { upperBound: 0.7, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Dealerships": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.1, category: "Low" },
      { upperBound: 0.6, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Apparel - Retail": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.2, category: "Low" },
      { upperBound: 0.8, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Grocery Stores": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.15, category: "Low" },
      { upperBound: 0.7, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Discount Stores": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.2, category: "Low" },
      { upperBound: 0.7, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Furnishings, Fixtures & Appliances": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.2, category: "Low" },
      { upperBound: 0.8, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Technology & Information Sector (Generally less inventory)
  "Internet Content & Information": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Software - Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Software - Infrastructure": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Software - Application": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Information Technology Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.8, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Computer Hardware": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.4, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Communication Equipment": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.4, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Semiconductors: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Consumer Electronics": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Services Sector (Low inventory, QR often similar to CR)
  "Consulting Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Advertising Agencies": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.8, category: "Low" },
      { upperBound: 2.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Publishing: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Broadcasting: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Education & Training Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.7, category: "Low" },
      { upperBound: 2.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Manufacturing Sector (Inventory is a key component)
  "Auto - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Recreational Vehicles": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Auto - Parts": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 0.8, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Apparel - Manufacturers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.1, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Apparel - Footwear & Accessories": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 0.9, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Drug Manufacturers - General": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Drug Manufacturers - Specialty & Generic": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Medical - Pharmaceuticals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Medical - Devices": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Medical - Instruments & Supplies": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Medical - Distribution": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Aerospace & Defense": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // General Manufacturing Rule (for those not specified, inventory sensitive)
  "Industrial Materials": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Construction Materials": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Chemicals - Specialty": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Chemicals: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Packaging & Containers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Tobacco: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Electrical Equipment & Parts": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Agricultural - Machinery": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Hardware, Equipment & Parts": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Technology Distributors": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Utilities Sector (Less inventory-driven, QR can be close to CR)
  "Renewable Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Regulated Water": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.3, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Regulated Gas": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.3, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Regulated Electric": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.3, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Independent Power Producers": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Diversified Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.4, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "General Utilities": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.4, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Telecommunications Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.5, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Construction & Restaurants
  "Residential Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.3, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Engineering & Construction": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.6, category: "Low" },
      { upperBound: 1.3, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Restaurants: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Transportation
  "Airlines, Airports & Air Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.5, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Basic Materials & Commodities (Inventory heavy)
  Steel: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Silver: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Other Precious Metals": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Gold: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Copper: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Aluminum: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Uranium: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  Coal: {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Paper, Lumber & Forest Products": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Energy - Oil & Gas (Oil inventory is significant)
  "Oil & Gas Refining & Marketing": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Integrated": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Exploration & Production": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Midstream": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Drilling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Oil & Gas Equipment & Services": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.4, category: "Low" },
      { upperBound: 1.2, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },

  // Food & Beverage (Inventory considerations)
  "Packaged Foods": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Food Confectioners": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Food Distribution": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.15, category: "Low" },
      { upperBound: 0.7, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Agricultural - Commodities/Milling": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.15, category: "Low" },
      { upperBound: 0.7, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
  "Beverages - Wineries & Distilleries": {
    type: "IndustrySpecific",
    zones: [
      { upperBound: 0.3, category: "Low" },
      { upperBound: 1.0, category: "Normal" },
      { upperBound: Infinity, category: "High" },
    ],
  },
};
