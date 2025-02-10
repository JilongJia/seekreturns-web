import clsx from "clsx";

import styles from "./Label.module.css";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export function Label({ htmlFor, children, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, className)}>
      {children}
    </label>
  );
}
