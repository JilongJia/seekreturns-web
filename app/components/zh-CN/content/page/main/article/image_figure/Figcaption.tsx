import clsx from "clsx";

import styles from "./Figcaption.module.css";

type FigcaptionProps = { children: React.ReactNode; className?: string };

export function Figcaption({ children, className }: FigcaptionProps) {
  return (
    <figcaption className={clsx(styles.figcaption, className)}>
      {children}
    </figcaption>
  );
}
