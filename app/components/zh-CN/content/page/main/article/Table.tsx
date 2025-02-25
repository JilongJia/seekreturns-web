import clsx from "clsx";

import { Caption } from "./table/Caption";
import { Thead } from "./table/Thead";
import { Tbody } from "./table/Tbody";
import styles from "./Table.module.css";

type TableProps = { children: React.ReactNode; className?: string };

export function Table({ children, className }: TableProps) {
  return <table className={clsx(styles.table, className)}>{children}</table>;
}

Table.Caption = Caption;
Table.Thead = Thead;
Table.Tbody = Tbody;
