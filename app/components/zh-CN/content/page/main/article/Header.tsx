import clsx from "clsx";

import styles from "./Header.module.css";

type HeaderProps = { children: React.ReactNode; className?: string };

export function Header({ children, className }: HeaderProps) {
  return <header className={clsx(styles.header, className)}>{children}</header>;
}
