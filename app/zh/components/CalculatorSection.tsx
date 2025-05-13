import Link from "next/link";
import clsx from "clsx";

import { Calculator } from "./calculator_section/Calculator";

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
          多种多样的投资交易计算器
        </h2>
        <p className={styles.p}>
          我们丰富的金融计算器简化了复杂的投资计算。从投资回报率（ROI）到投资组合分析，这些工具能在几秒内提供清晰结果，助您高效评估投资机会。
        </p>
        <p className={styles.p}>
          访问“
          <Link href="/zh/calculators" className={styles.link}>
            计算器
          </Link>
          ”页面，体验完整工具集合，清晰分析您的投资机会。
        </p>
      </div>
      <Calculator />
    </section>
  );
}
