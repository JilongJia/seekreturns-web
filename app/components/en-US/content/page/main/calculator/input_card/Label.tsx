import clsx from "clsx";

import styles from "./Label.module.css";

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
};

type ScreenReaderLabelProps = {
  children: React.ReactNode;
  htmlFor: string;
};

export function Label({ children, htmlFor, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, className)}>
      {children}
    </label>
  );
}

export function ScreenReaderLabel({
  children,
  htmlFor,
}: ScreenReaderLabelProps) {
  return (
    <label htmlFor={htmlFor} className={styles.screenReaderLabel}>
      {children}
    </label>
  );
}
