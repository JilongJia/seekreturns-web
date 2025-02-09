import clsx from "clsx";

import styles from "./Dt.module.css";

type DtProps = {
  children: React.ReactNode;
  className?: string;
};

export function Dt({ children, className }: DtProps) {
  return <dt className={clsx(styles.dt, className)}>{children}</dt>;
}
