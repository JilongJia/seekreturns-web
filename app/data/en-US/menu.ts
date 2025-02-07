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
      {
        id: "concepts",
        label: "Concepts",
        href: "/en-US/concepts",
      },
      {
        id: "guides",
        label: "Guides",
        href: "/en-US/guides",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    secondaryMenuData: [
      {
        id: "calculators",
        label: "Calculators",
        href: "/en-US/calculators",
      },
      {
        id: "charts",
        label: "Charts",
        href: "/en-US/charts",
      },
      {
        id: "tables",
        label: "Tables",
        href: "/en-US/tables",
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    href: "/en-US/blog",
  },
];
