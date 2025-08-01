import clsx from "clsx";

import { PriceComparisonLineChartFigure } from "@/components/zh/features/chart-figures";
import { Form } from "./Form";
import styles from "./StockComparisonSection.module.css";

import { fetchStockAdjustedCloses } from "@/lib/cloud-storage";

type StockComparisonSectionProps = { className?: string };

export async function StockComparisonSection({
  className,
}: StockComparisonSectionProps) {
  const stockOneSymbol = "AAPL";
  const stockTwoSymbol = "NVDA";

  const [stockOneAdjustedCloses, stockTwoAdjustedCloses] = await Promise.all([
    fetchStockAdjustedCloses(stockOneSymbol),
    fetchStockAdjustedCloses(stockTwoSymbol),
  ]);

  if (!stockOneAdjustedCloses || !stockTwoAdjustedCloses) return null;

  return (
    <section
      aria-labelledby="stock-comparison"
      className={clsx(styles.stockComparisonSection, className)}
    >
      <div className={styles.textContainer}>
        <h2 id="stock-comparison" className={styles.h2}>
          定制图表，助力高效投资决策
        </h2>
        <p className={styles.p}>
          通过定制化图表工具，您可以追踪并对比重点关注的股票（如
          AAPL、NVDA）表现。设置初始投资金额（如1万元），清晰呈现不同标的随时间的回报变化。图表支持交互操作，便于深入分析数据，提升决策效率。
        </p>
        <p className={styles.p}>输入股票代码，即可快速生成对比图表。</p>
      </div>
      <Form className={styles.form} />
      <PriceComparisonLineChartFigure
        stockOneAdjustedCloses={stockOneAdjustedCloses}
        stockTwoAdjustedCloses={stockTwoAdjustedCloses}
        defaultTimeRange="5Y"
      />
    </section>
  );
}
