import clsx from "clsx";

import { Dt } from "./Dt";
import { Dd } from "./Dd";

import styles from "./Dl.module.css";

type DlProps = { children: React.ReactNode; className?: string };

export function Dl({ children, className }: DlProps) {
  return <dl className={clsx(styles.dl, className)}>{children}</dl>;
}

Dl.Dt = Dt;
Dl.Dd = Dd;
