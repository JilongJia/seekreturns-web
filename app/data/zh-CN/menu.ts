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
    label: "百科",
    secondaryMenuData: [
      { id: "concepts", label: "概念", href: "/zh-CN/concepts" },
      { id: "guides", label: "教程", href: "/zh-CN/guides" },
    ],
  },
  {
    id: "tools",
    label: "工具",
    secondaryMenuData: [
      { id: "calculators", label: "计算器", href: "/zh-CN/calculators" },
      { id: "charts", label: "图表", href: "/zh-CN/charts" },
      { id: "tables", label: "表格", href: "/zh-CN/tables" },
    ],
  },
  { id: "blog", label: "博客", href: "/zh-CN/blog" },
];
