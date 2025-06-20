import type { PrimaryMenuData } from "./menu.types";

export const primaryMenu: PrimaryMenuData = [
  {
    id: "knowledge",
    label: "Knowledge",
    secondaryMenu: [
      { id: "concepts", label: "Concepts", pathname: "/en/concepts" },
      { id: "guides", label: "Guides", pathname: "/en/guides" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    secondaryMenu: [
      { id: "calculators", label: "Calculators", pathname: "/en/calculators" },
      // { id: "charts", label: "Charts", pathname: "/en/charts" },
      { id: "tables", label: "Tables", pathname: "/en/tables" },
      {
        id: "stock-comparisons",
        label: "Stock Comparisons",
        pathname: "/en/stock-comparisons",
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    secondaryMenu: [
      { id: "reviews", label: "Reviews", pathname: "/en/reviews" },
    ],
  },
];
