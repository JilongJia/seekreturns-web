import clsx from "clsx";

import styles from "./CopyRight.module.css";

type CopyRightProps = { className?: string };

export function CopyRight({ className }: CopyRightProps) {
  return (
    <small className={clsx(styles.copyRight, className)}>
      版权所有 © 2025 Seek Returns
    </small>
  );
}
