import clsx from "clsx";

import styles from "./Th.module.css";

type ThProps = {
  scope: "row" | "col" | "rowgroup" | "colgroup";
  children: React.ReactNode;
  className?: string;
};

export function Th({ children, scope, className }: ThProps) {
  return (
    <th scope={scope} className={clsx(styles.th, className)}>
      {children}
    </th>
  );
}
