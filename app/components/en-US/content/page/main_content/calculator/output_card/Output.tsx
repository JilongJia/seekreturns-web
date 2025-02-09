import clsx from "clsx";

import styles from "./Output.module.css";

type OutputProps = {
  id: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
};

export function Output({ id, htmlFor, children, className }: OutputProps) {
  return (
    <output
      id={id}
      htmlFor={htmlFor}
      className={clsx(styles.output, className)}
    >
      {children}
    </output>
  );
}
