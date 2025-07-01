import clsx from "clsx";

import { Caption } from "./Caption";
import { Tbody } from "./Tbody";
import { Thead } from "./Thead";

import styles from "./Table.module.css";

type TableProps = { children: React.ReactNode; className?: string };

export function Table({ children, className }: TableProps) {
  return <table className={clsx(styles.table, className)}>{children}</table>;
}

Table.Caption = Caption;
Table.Tbody = Tbody;
Table.Thead = Thead;
