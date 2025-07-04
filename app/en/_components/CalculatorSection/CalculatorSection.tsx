import clsx from "clsx";
import Link from "next/link";

import { ROICalculator } from "@/components/en/features/calculators";

import styles from "./CalculatorSection.module.css";

type CalculatorSectionProps = { className?: string };

export function CalculatorSection({ className }: CalculatorSectionProps) {
  return (
    <section
      aria-labelledby="calculator"
      className={clsx(styles.calculatorSection, className)}
    >
      <div className={styles.textContainer}>
        <h2 id="calculator" className={styles.h2}>
          Streamline Investing with Financial Calculators
        </h2>
        <p className={styles.p}>
          Our suite of financial calculators simplifies complex investment math.
          From ROI to portfolio analysis, these tools provide clear results in
          seconds, helping you evaluate opportunities efficiently.
        </p>
        <p className={styles.p}>
          Explore the{" "}
          <Link href="/en/calculators" className={styles.link}>
            Calculators page
          </Link>{" "}
          to access the full collection and analyze your investments with
          precision.
        </p>
      </div>
      <ROICalculator />
    </section>
  );
}
