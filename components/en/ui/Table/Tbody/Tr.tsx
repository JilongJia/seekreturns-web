import clsx from "clsx";

import { Td } from "./Td";
import { Th } from "./Th";

import styles from "./Tr.module.css";

type TrProps = { children: React.ReactNode; className?: string };

export function Tr({ children, className }: TrProps) {
  return <tr className={clsx(styles.tr, className)}>{children}</tr>;
}

Tr.Th = Th;
Tr.Td = Td;
