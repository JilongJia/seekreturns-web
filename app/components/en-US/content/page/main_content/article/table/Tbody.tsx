import clsx from "clsx";

import { Tr } from "./tbody/Tr";
import styles from "./Tbody.module.css";

type TbodyProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tbody({ children, className }: TbodyProps) {
  return <tbody className={clsx(styles.tbody, className)}>{children}</tbody>;
}

Tbody.Tr = Tr;
