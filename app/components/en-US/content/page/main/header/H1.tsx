import clsx from "clsx";

import styles from "./H1.module.css";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export function H1({ children, className }: H1Props) {
  return <h1 className={clsx(styles.h1, className)}>{children}</h1>;
}
