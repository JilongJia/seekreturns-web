import clsx from "clsx";
import Image from "next/image";

import styles from "./HeroSection.module.css";

import seekReturnsStrategically from "../images/seek-returns-strategically.gif";

type HeroSectionProps = { className?: string };

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={clsx(styles.heroSection, className)}>
      <div>
        <h1 className={styles.h1}>
          <span className={styles.lineOne}>探索、分析、决策——</span>
          <span className={styles.lineTwo}>
            让投资回报<span className={styles.hightlight}>水涨船高</span>
          </span>
        </h1>
      </div>
      <Image
        src={seekReturnsStrategically}
        alt="Seek returns strategically"
        className={styles.image}
      />
    </section>
  );
}
