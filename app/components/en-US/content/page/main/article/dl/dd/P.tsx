import clsx from "clsx";

import styles from "./P.module.css";

type PProps = {
  children: React.ReactNode;
  className?: string;
};

export function P({ children, className }: PProps) {
  return <p className={clsx(styles.p, className)}>{children}</p>;
}
