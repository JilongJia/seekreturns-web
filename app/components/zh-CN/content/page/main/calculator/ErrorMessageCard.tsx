import clsx from "clsx";

import { P } from "./error_message_card/P";
import styles from "./ErrorMessageCard.module.css";

type ErrorMessageCardProps = { children: React.ReactNode; className?: string };

export function ErrorMessageCard({
  children,
  className,
}: ErrorMessageCardProps) {
  return (
    <div
      aria-label="错误信息卡片"
      className={clsx(styles.errorMessageCard, className)}
    >
      {children}
    </div>
  );
}

ErrorMessageCard.P = P;
