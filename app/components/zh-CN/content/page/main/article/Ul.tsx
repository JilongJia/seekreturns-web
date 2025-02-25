import clsx from "clsx";

import { Li } from "./ul/Li";
import styles from "./Ul.module.css";

type UlProps = { children: React.ReactNode; className?: string };

export function Ul({ children, className }: UlProps) {
  return <ul className={clsx(styles.ul, className)}>{children}</ul>;
}

Ul.Li = Li;
