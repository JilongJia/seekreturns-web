import Image from "next/image";
import clsx from "clsx";

import styles from "./HeroSection.module.css";

import seekReturnsStrategically from "../images/seek-returns-strategically.gif";

type HeroSectionProps = { className?: string };

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero"
      className={clsx(styles.heroSection, className)}
    >
      <div>
        <h1 id="hero" className={styles.h1}>
          <span className={styles.lineOne}>探索、分析、决策——</span>
          <span className={styles.lineTwo}>
            让投资回报<span className={styles.hightlight}>水涨船高</span>
          </span>
        </h1>
      </div>
      <Image
        src={seekReturnsStrategically}
        alt="策略性地追求收益"
        className={styles.image}
      />
    </section>
  );
}
