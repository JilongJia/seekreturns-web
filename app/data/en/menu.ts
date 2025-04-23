export type SecondaryMenuData = {
  id: string;
  label: string;
  pathname: string;
}[];

export type PrimaryMenuData = {
  id: string;
  label: string;
  pathname?: string;
  secondaryMenuData?: SecondaryMenuData;
}[];

export const primaryMenuData: PrimaryMenuData = [
  {
    id: "knowledge",
    label: "Knowledge",
    secondaryMenuData: [
      { id: "concepts", label: "Concepts", pathname: "/en/concepts" },
      { id: "guides", label: "Guides", pathname: "/en/guides" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    secondaryMenuData: [
      { id: "calculators", label: "Calculators", pathname: "/en/calculators" },
      { id: "charts", label: "Charts", pathname: "/en/charts" },
      { id: "tables", label: "Tables", pathname: "/en/tables" },
    ],
  },
  { id: "blog", label: "Blog", pathname: "/en/blog" },
];
