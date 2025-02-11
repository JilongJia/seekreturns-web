import clsx from "clsx";

import styles from "./H2.module.css";

type H2Props = { id: string; children: React.ReactNode; className?: string };

export function H2({ id, children, className }: H2Props) {
  return (
    <h2 id={id} className={clsx(styles.h2, className)}>
      {children}
    </h2>
  );
}
