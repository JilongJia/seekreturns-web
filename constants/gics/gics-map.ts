import type { GicsSectorData } from "./types";

export const gicsMap: GicsSectorData[] = [
  {
    sector: "Energy",
    industryGroups: [
      {
        industryGroup: "Energy",
        industries: [
          {
            industry: "Energy Equipment & Services",
            subIndustries: [
              { subIndustry: "Oil & Gas Drilling" },
              { subIndustry: "Oil & Gas Equipment & Services" },
            ],
          },
          {
            industry: "Oil, Gas & Consumable Fuels",
            subIndustries: [
              { subIndustry: "Integrated Oil & Gas" },
              { subIndustry: "Oil & Gas Exploration & Production" },
              { subIndustry: "Oil & Gas Refining & Marketing" },
              { subIndustry: "Oil & Gas Storage & Transportation" },
              { subIndustry: "Coal & Consumable Fuels" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Materials",
    industryGroups: [
      {
        industryGroup: "Materials",
        industries: [
          {
            industry: "Chemicals",
            subIndustries: [
              { subIndustry: "Commodity Chemicals" },
              { subIndustry: "Diversified Chemicals" },
              { subIndustry: "Fertilizers & Agricultural Chemicals" },
              { subIndustry: "Industrial Gases" },
              { subIndustry: "Specialty Chemicals" },
            ],
          },
          {
            industry: "Construction Materials",
            subIndustries: [{ subIndustry: "Construction Materials" }],
          },
          {
            industry: "Containers & Packaging",
            subIndustries: [
              { subIndustry: "Metal, Glass & Plastic Containers" },
              {
                subIndustry: "Paper & Plastic Packaging Products & Materials",
              },
            ],
          },
          {
            industry: "Metals & Mining",
            subIndustries: [
              { subIndustry: "Aluminum" },
              { subIndustry: "Diversified Metals & Mining" },
              { subIndustry: "Copper" },
              { subIndustry: "Gold" },
              { subIndustry: "Precious Metals & Minerals" },
              { subIndustry: "Silver" },
              { subIndustry: "Steel" },
            ],
          },
          {
            industry: "Paper & Forest Products",
            subIndustries: [
              { subIndustry: "Forest Products" },
              { subIndustry: "Paper Products" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Industrials",
    industryGroups: [
      {
        industryGroup: "Capital Goods",
        industries: [
          {
            industry: "Aerospace & Defense",
            subIndustries: [{ subIndustry: "Aerospace & Defense" }],
          },
          {
            industry: "Building Products",
            subIndustries: [{ subIndustry: "Building Products" }],
          },
          {
            industry: "Construction & Engineering",
            subIndustries: [{ subIndustry: "Construction & Engineering" }],
          },
          {
            industry: "Electrical Equipment",
            subIndustries: [
              { subIndustry: "Electrical Components & Equipment" },
              { subIndustry: "Heavy Electrical Equipment" },
            ],
          },
          {
            industry: "Industrial Conglomerates",
            subIndustries: [{ subIndustry: "Industrial Conglomerates" }],
          },
          {
            industry: "Machinery",
            subIndustries: [
              {
                subIndustry:
                  "Construction Machinery & Heavy Transportation Equipment",
              },
              { subIndustry: "Agricultural & Farm Machinery" },
              { subIndustry: "Industrial Machinery & Supplies & Components" },
            ],
          },
          {
            industry: "Trading Companies & Distributors",
            subIndustries: [
              { subIndustry: "Trading Companies & Distributors" },
            ],
          },
        ],
      },
      {
        industryGroup: "Commercial & Professional Services",
        industries: [
          {
            industry: "Commercial Services & Supplies",
            subIndustries: [
              { subIndustry: "Commercial Printing" },
              { subIndustry: "Environmental & Facilities Services" },
              { subIndustry: "Office Services & Supplies" },
              { subIndustry: "Diversified Support Services" },
              { subIndustry: "Security & Alarm Services" },
            ],
          },
          {
            industry: "Professional Services",
            subIndustries: [
              { subIndustry: "Human Resource & Employment Services" },
              { subIndustry: "Research & Consulting Services" },
              { subIndustry: "Data Processing & Outsourced Services" },
            ],
          },
        ],
      },
      {
        industryGroup: "Transportation",
        industries: [
          {
            industry: "Air Freight & Logistics",
            subIndustries: [{ subIndustry: "Air Freight & Logistics" }],
          },
          {
            industry: "Passenger Airlines",
            subIndustries: [{ subIndustry: "Passenger Airlines" }],
          },
          {
            industry: "Marine Transportation",
            subIndustries: [{ subIndustry: "Marine Transportation" }],
          },
          {
            industry: "Ground Transportation",
            subIndustries: [
              { subIndustry: "Rail Transportation" },
              { subIndustry: "Cargo Ground Transportation" },
              { subIndustry: "Passenger Ground Transportation" },
            ],
          },
          {
            industry: "Transportation Infrastructure",
            subIndustries: [
              { subIndustry: "Airport Services" },
              { subIndustry: "Highways & Railtracks" },
              { subIndustry: "Marine Ports & Services" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Consumer Discretionary",
    industryGroups: [
      {
        industryGroup: "Automobiles & Components",
        industries: [
          {
            industry: "Automobile Components",
            subIndustries: [
              { subIndustry: "Automotive Parts & Equipment" },
              { subIndustry: "Tires & Rubber" },
            ],
          },
          {
            industry: "Automobiles",
            subIndustries: [
              { subIndustry: "Automobile Manufacturers" },
              { subIndustry: "Motorcycle Manufacturers" },
            ],
          },
        ],
      },
      {
        industryGroup: "Consumer Durables & Apparel",
        industries: [
          {
            industry: "Household Durables",
            subIndustries: [
              { subIndustry: "Consumer Electronics" },
              { subIndustry: "Home Furnishings" },
              { subIndustry: "Homebuilding" },
              { subIndustry: "Household Appliances" },
              { subIndustry: "Housewares & Specialties" },
            ],
          },
          {
            industry: "Leisure Products",
            subIndustries: [{ subIndustry: "Leisure Products" }],
          },
          {
            industry: "Textiles, Apparel & Luxury Goods",
            subIndustries: [
              { subIndustry: "Apparel, Accessories & Luxury Goods" },
              { subIndustry: "Footwear" },
              { subIndustry: "Textiles" },
            ],
          },
        ],
      },
      {
        industryGroup: "Consumer Services",
        industries: [
          {
            industry: "Hotels, Restaurants & Leisure",
            subIndustries: [
              { subIndustry: "Casinos & Gaming" },
              { subIndustry: "Hotels, Resorts & Cruise Lines" },
              { subIndustry: "Leisure Facilities" },
              { subIndustry: "Restaurants" },
            ],
          },
          {
            industry: "Diversified Consumer Services",
            subIndustries: [
              { subIndustry: "Education Services" },
              { subIndustry: "Specialized Consumer Services" },
            ],
          },
        ],
      },
      {
        industryGroup: "Consumer Discretionary Distribution & Retail",
        industries: [
          {
            industry: "Distributors",
            subIndustries: [{ subIndustry: "Distributors" }],
          },
          {
            industry: "Broadline Retail",
            subIndustries: [{ subIndustry: "Broadline Retail" }],
          },
          {
            industry: "Specialty Retail",
            subIndustries: [
              { subIndustry: "Apparel Retail" },
              { subIndustry: "Computer & Electronics Retail" },
              { subIndustry: "Home Improvement Retail" },
              { subIndustry: "Other Specialty Retail" },
              { subIndustry: "Automotive Retail" },
              { subIndustry: "Homefurnishing Retail" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Consumer Staples",
    industryGroups: [
      {
        industryGroup: "Consumer Staples Distribution & Retail",
        industries: [
          {
            industry: "Consumer Staples Distribution & Retail",
            subIndustries: [
              { subIndustry: "Drug Retail" },
              { subIndustry: "Food Distributors" },
              { subIndustry: "Food Retail" },
              { subIndustry: "Consumer Staples Merchandise Retail" },
            ],
          },
        ],
      },
      {
        industryGroup: "Food, Beverage & Tobacco",
        industries: [
          {
            industry: "Beverages",
            subIndustries: [
              { subIndustry: "Brewers" },
              { subIndustry: "Distillers & Vintners" },
              { subIndustry: "Soft Drinks & Non-alcoholic Beverages" },
            ],
          },
          {
            industry: "Food Products",
            subIndustries: [
              { subIndustry: "Agricultural Products & Services" },
              { subIndustry: "Packaged Foods & Meats" },
            ],
          },
          {
            industry: "Tobacco",
            subIndustries: [{ subIndustry: "Tobacco" }],
          },
        ],
      },
      {
        industryGroup: "Household & Personal Products",
        industries: [
          {
            industry: "Household Products",
            subIndustries: [{ subIndustry: "Household Products" }],
          },
          {
            industry: "Personal Care Products",
            subIndustries: [{ subIndustry: "Personal Care Products" }],
          },
        ],
      },
    ],
  },
  {
    sector: "Health Care",
    industryGroups: [
      {
        industryGroup: "Health Care Equipment & Services",
        industries: [
          {
            industry: "Health Care Equipment & Supplies",
            subIndustries: [
              { subIndustry: "Health Care Equipment" },
              { subIndustry: "Health Care Supplies" },
            ],
          },
          {
            industry: "Health Care Providers & Services",
            subIndustries: [
              { subIndustry: "Health Care Distributors" },
              { subIndustry: "Health Care Services" },
              { subIndustry: "Health Care Facilities" },
              { subIndustry: "Managed Health Care" },
            ],
          },
          {
            industry: "Health Care Technology",
            subIndustries: [{ subIndustry: "Health Care Technology" }],
          },
        ],
      },
      {
        industryGroup: "Pharmaceuticals, Biotechnology & Life Sciences",
        industries: [
          {
            industry: "Biotechnology",
            subIndustries: [{ subIndustry: "Biotechnology" }],
          },
          {
            industry: "Pharmaceuticals",
            subIndustries: [{ subIndustry: "Pharmaceuticals" }],
          },
          {
            industry: "Life Sciences Tools & Services",
            subIndustries: [{ subIndustry: "Life Sciences Tools & Services" }],
          },
        ],
      },
    ],
  },
  {
    sector: "Financials",
    industryGroups: [
      {
        industryGroup: "Banks",
        industries: [
          {
            industry: "Banks",
            subIndustries: [
              { subIndustry: "Diversified Banks" },
              { subIndustry: "Regional Banks" },
            ],
          },
        ],
      },
      {
        industryGroup: "Financial Services",
        industries: [
          {
            industry: "Financial Services",
            subIndustries: [
              { subIndustry: "Diversified Financial Services" },
              { subIndustry: "Multi-Sector Holdings" },
              { subIndustry: "Specialized Finance" },
              { subIndustry: "Commercial & Residential Mortgage Finance" },
              { subIndustry: "Transaction & Payment Processing Services" },
            ],
          },
          {
            industry: "Consumer Finance",
            subIndustries: [{ subIndustry: "Consumer Finance" }],
          },
          {
            industry: "Capital Markets",
            subIndustries: [
              { subIndustry: "Asset Management & Custody Banks" },
              { subIndustry: "Investment Banking & Brokerage" },
              { subIndustry: "Diversified Capital Markets" },
              { subIndustry: "Financial Exchanges & Data" },
            ],
          },
          {
            industry: "Mortgage Real Estate Investment Trusts (REITs)",
            subIndustries: [{ subIndustry: "Mortgage REITs" }],
          },
        ],
      },
      {
        industryGroup: "Insurance",
        industries: [
          {
            industry: "Insurance",
            subIndustries: [
              { subIndustry: "Insurance Brokers" },
              { subIndustry: "Life & Health Insurance" },
              { subIndustry: "Multi-line Insurance" },
              { subIndustry: "Property & Casualty Insurance" },
              { subIndustry: "Reinsurance" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Information Technology",
    industryGroups: [
      {
        industryGroup: "Software & Services",
        industries: [
          {
            industry: "IT Services",
            subIndustries: [
              { subIndustry: "IT Consulting & Other Services" },
              { subIndustry: "Internet Services & Infrastructure" },
            ],
          },
          {
            industry: "Software",
            subIndustries: [
              { subIndustry: "Application Software" },
              { subIndustry: "Systems Software" },
            ],
          },
        ],
      },
      {
        industryGroup: "Technology Hardware & Equipment",
        industries: [
          {
            industry: "Communications Equipment",
            subIndustries: [{ subIndustry: "Communications Equipment" }],
          },
          {
            industry: "Technology Hardware, Storage & Peripherals",
            subIndustries: [
              { subIndustry: "Technology Hardware, Storage & Peripherals" },
            ],
          },
          {
            industry: "Electronic Equipment, Instruments & Components",
            subIndustries: [
              { subIndustry: "Electronic Equipment & Instruments" },
              { subIndustry: "Electronic Components" },
              { subIndustry: "Electronic Manufacturing Services" },
              { subIndustry: "Technology Distributors" },
            ],
          },
        ],
      },
      {
        industryGroup: "Semiconductors & Semiconductor Equipment",
        industries: [
          {
            industry: "Semiconductors & Semiconductor Equipment",
            subIndustries: [
              { subIndustry: "Semiconductor Materials & Equipment" },
              { subIndustry: "Semiconductors" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Communication Services",
    industryGroups: [
      {
        industryGroup: "Telecommunication Services",
        industries: [
          {
            industry: "Diversified Telecommunication Services",
            subIndustries: [
              { subIndustry: "Alternative Carriers" },
              { subIndustry: "Integrated Telecommunication Services" },
            ],
          },
          {
            industry: "Wireless Telecommunication Services",
            subIndustries: [
              { subIndustry: "Wireless Telecommunication Services" },
            ],
          },
        ],
      },
      {
        industryGroup: "Media & Entertainment",
        industries: [
          {
            industry: "Media",
            subIndustries: [
              { subIndustry: "Advertising" },
              { subIndustry: "Broadcasting" },
              { subIndustry: "Cable & Satellite" },
              { subIndustry: "Publishing" },
            ],
          },
          {
            industry: "Entertainment",
            subIndustries: [
              { subIndustry: "Movies & Entertainment" },
              { subIndustry: "Interactive Home Entertainment" },
            ],
          },
          {
            industry: "Interactive Media & Services",
            subIndustries: [{ subIndustry: "Interactive Media & Services" }],
          },
        ],
      },
    ],
  },
  {
    sector: "Utilities",
    industryGroups: [
      {
        industryGroup: "Utilities",
        industries: [
          {
            industry: "Electric Utilities",
            subIndustries: [{ subIndustry: "Electric Utilities" }],
          },
          {
            industry: "Gas Utilities",
            subIndustries: [{ subIndustry: "Gas Utilities" }],
          },
          {
            industry: "Multi-Utilities",
            subIndustries: [{ subIndustry: "Multi-Utilities" }],
          },
          {
            industry: "Water Utilities",
            subIndustries: [{ subIndustry: "Water Utilities" }],
          },
          {
            industry: "Independent Power and Renewable Electricity Producers",
            subIndustries: [
              { subIndustry: "Independent Power Producers & Energy Traders" },
              { subIndustry: "Renewable Electricity" },
            ],
          },
        ],
      },
    ],
  },
  {
    sector: "Real Estate",
    industryGroups: [
      {
        industryGroup: "Equity Real Estate Investment Trusts (REITs)",
        industries: [
          {
            industry: "Diversified REITs",
            subIndustries: [{ subIndustry: "Diversified REITs" }],
          },
          {
            industry: "Industrial REITs",
            subIndustries: [{ subIndustry: "Industrial REITs" }],
          },
          {
            industry: "Hotel & Resort REITs",
            subIndustries: [{ subIndustry: "Hotel & Resort REITs" }],
          },
          {
            industry: "Office REITs",
            subIndustries: [{ subIndustry: "Office REITs" }],
          },
          {
            industry: "Health Care REITs",
            subIndustries: [{ subIndustry: "Health Care REITs" }],
          },
          {
            industry: "Residential REITs",
            subIndustries: [
              { subIndustry: "Multi-Family Residential REITs" },
              { subIndustry: "Single-Family Residential REITs" },
            ],
          },
          {
            industry: "Retail REITs",
            subIndustries: [{ subIndustry: "Retail REITs" }],
          },
          {
            industry: "Specialized REITs",
            subIndustries: [
              { subIndustry: "Other Specialized REITs" },
              { subIndustry: "Self-Storage REITs" },
              { subIndustry: "Telecom Tower REITs" },
              { subIndustry: "Timber REITs" },
              { subIndustry: "Data Center REITs" },
            ],
          },
        ],
      },
      {
        industryGroup: "Real Estate Management & Development",
        industries: [
          {
            industry: "Real Estate Management & Development",
            subIndustries: [
              { subIndustry: "Diversified Real Estate Activities" },
              { subIndustry: "Real Estate Operating Companies" },
              { subIndustry: "Real Estate Development" },
              { subIndustry: "Real Estate Services" },
            ],
          },
        ],
      },
    ],
  },
];
