import clsx from "clsx";

import { P } from "./P";

import styles from "./ErrorMessageCard.module.css";

type ErrorMessageCardProps = { children: React.ReactNode; className?: string };

export function ErrorMessageCard({
  children,
  className,
}: ErrorMessageCardProps) {
  return (
    <div
      aria-label="Error message card"
      className={clsx(styles.errorMessageCard, className)}
    >
      {children}
    </div>
  );
}

ErrorMessageCard.P = P;
