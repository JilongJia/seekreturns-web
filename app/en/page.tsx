import clsx from "clsx";
import { Header } from "@/app/components/en/root/page/Header";
import { Footer } from "@/app/components/en/root/page/Footer";
import { HeroSection } from "./components/HeroSection";
import { StockComparisonSection } from "./components/StockComparisonSection";
import { CalculatorSection } from "./components/CalculatorSection";

import styles from "./page.module.css";

async function Page() {
  return (
    <>
      <Header className={clsx(styles.header, "layoutContainer")} />
      <HeroSection className={styles.heroSection} />
      <StockComparisonSection className={styles.stockComparisonSection} />
      <CalculatorSection className={styles.calculatorSection} />
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export default Page;
export const revalidate = 60;
