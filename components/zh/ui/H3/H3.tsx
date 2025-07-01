import clsx from "clsx";

import styles from "./H3.module.css";

type H3Props = { id?: string; children: React.ReactNode; className?: string };

export function H3({ id, children, className }: H3Props) {
  return (
    <h3 id={id} className={clsx(styles.h3, className)}>
      {children}
    </h3>
  );
}
