import clsx from "clsx";

import { Li } from "./ol/Li";
import styles from "./Ol.module.css";

type OlProps = { children: React.ReactNode; className?: string };

export function Ol({ children, className }: OlProps) {
  return <ol className={clsx(styles.ol, className)}>{children}</ol>;
}

Ol.Li = Li;
