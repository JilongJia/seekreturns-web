import clsx from "clsx";

import styles from "./Li.module.css";

type LiProps = { children: React.ReactNode; className?: string };

export function Li({ children, className }: LiProps) {
  return <li className={clsx(styles.li, className)}>{children}</li>;
}
