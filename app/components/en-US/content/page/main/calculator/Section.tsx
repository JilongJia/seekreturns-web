import clsx from "clsx";

import styles from "./Section.module.css";

type SectionProps = { children: React.ReactNode; className?: string };

export function Section({ children, className }: SectionProps) {
  return (
    <section
      aria-labelledby="calculator"
      className={clsx(styles.section, className)}
    >
      {children}
    </section>
  );
}
