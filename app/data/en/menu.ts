export type SecondaryMenuData = { id: string; label: string; href: string }[];

export type PrimaryMenuData = {
  id: string;
  label: string;
  href?: string;
  secondaryMenuData?: SecondaryMenuData;
}[];

export const primaryMenuData: PrimaryMenuData = [
  {
    id: "knowledge",
    label: "Knowledge",
    secondaryMenuData: [
      { id: "concepts", label: "Concepts", href: "/en/concepts" },
      { id: "guides", label: "Guides", href: "/en/guides" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    secondaryMenuData: [
      { id: "calculators", label: "Calculators", href: "/en/calculators" },
      { id: "charts", label: "Charts", href: "/en/charts" },
      { id: "tables", label: "Tables", href: "/en/tables" },
    ],
  },
  { id: "blog", label: "Blog", href: "/en/blog" },
];
