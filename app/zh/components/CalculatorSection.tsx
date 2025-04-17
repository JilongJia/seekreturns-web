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
          投资计算工具
        </h2>
        <p className={styles.p}>
          以下工具用于计算投资相关指标，包括投资回报率（ROI）和投资组合表现。输入数据后，可获得清晰的计算结果，用于评估投资方案。
        </p>
        <p className={styles.p}>
          在“计算器”页面查看所有工具，分析您的投资数据。
        </p>
      </div>
      <Calculator />
    </section>
  );
}
