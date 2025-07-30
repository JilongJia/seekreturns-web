import clsx from "clsx";

import { PriceComparisonLineChartFigure } from "@/components/en/features/chart-figures";
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
          Visualize Stock Performance with Custom Charts
        </h2>
        <p className={styles.p}>
          Our charting tool makes it simple to compare stock performance over
          time. For example, track how a $10,000 investment in stocks like AAPL
          or NVDA evolves, with interactive charts showing values and returns
          for any date.
        </p>
        <p className={styles.p}>
          Choose your tickers and build tailored comparisons quickly to analyze
          market trends with clarity.
        </p>
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
