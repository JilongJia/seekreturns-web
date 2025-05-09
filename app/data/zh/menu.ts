export type SecondaryMenuData = {
  id: string;
  label: string;
  pathname: string;
}[];

export type PrimaryMenuData = {
  id: string;
  label: string;
  pathname?: string;
  secondaryMenu?: SecondaryMenuData;
}[];

export const primaryMenu: PrimaryMenuData = [
  {
    id: "knowledge",
    label: "百科",
    secondaryMenu: [
      { id: "concepts", label: "概念", pathname: "/zh/concepts" },
      { id: "guides", label: "教程", pathname: "/zh/guides" },
    ],
  },
  {
    id: "tools",
    label: "工具",
    secondaryMenu: [
      { id: "calculators", label: "计算器", pathname: "/zh/calculators" },
      // { id: "charts", label: "图表", pathname: "/zh/charts" },
      { id: "tables", label: "表格", pathname: "/zh/tables" },
      {
        id: "stock-comparisons",
        label: "个股对比",
        pathname: "/zh/stock-comparisons",
      },
    ],
  },
  {
    id: "blog",
    label: "博客",
    secondaryMenu: [{ id: "reviews", label: "测评", pathname: "/zh/reviews" }],
  },
];
