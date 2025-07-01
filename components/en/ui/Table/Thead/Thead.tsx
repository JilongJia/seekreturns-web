import clsx from "clsx";

import { Tr } from "./Tr";

import styles from "./Thead.module.css";

type TheadProps = { children: React.ReactNode; className?: string };

export function Thead({ children, className }: TheadProps) {
  return <thead className={clsx(styles.thead, className)}>{children}</thead>;
}

Thead.Tr = Tr;
