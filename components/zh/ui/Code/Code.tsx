import clsx from "clsx";

import styles from "./Code.module.css";

type CodeProps = { children: React.ReactNode; className?: string };

export function Code({ children, className }: CodeProps) {
  return <code className={clsx(styles.code, className)}>{children}</code>;
}
