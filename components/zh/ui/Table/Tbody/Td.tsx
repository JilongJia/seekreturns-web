import clsx from "clsx";

import styles from "./Td.module.css";

type TdProps = { children: React.ReactNode; className?: string };

export function Td({ children, className }: TdProps) {
  return <td className={clsx(styles.td, className)}>{children}</td>;
}
