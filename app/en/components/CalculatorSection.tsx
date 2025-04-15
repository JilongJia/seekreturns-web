import clsx from "clsx";

import { Calculator } from "./calculator_section/Calculator";

import styles from "./CalculatorSection.module.css";

type CalculatorSectionProps = { className?: string };

export function CalculatorSection({ className }: CalculatorSectionProps) {
  return (
    <section className={clsx(styles.calculatorSection, className)}>
      <div className={styles.text}>
        <h2 className={styles.h2}>
          A Full Set of Calculators for Smarter Investing
        </h2>
        <p className={styles.p}>
          Our site offers a wide range of financial calculators to help you make
          sense of complex numbers fast and hassle-free.
        </p>
        <p className={styles.p}>
          The one you see here is our ROI calculator. lt crunches ROI to help
          you focus on making decisions.
        </p>
        <p className={styles.p}>
          Ready to explore more? Head over to the Calculator page and try out
          the full collection.
        </p>
      </div>
      <Calculator />
    </section>
  );
}
