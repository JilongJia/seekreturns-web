import clsx from "clsx";
import Image from "next/image";

import styles from "./HeroSection.module.css";

import seekReturnsStrategically from "./seek-returns-strategically.gif";

type HeroSectionProps = { className?: string };

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero"
      className={clsx(styles.heroSection, className)}
    >
      <div>
        <h1 id="hero" className={styles.h1}>
          <span className={styles.lineOne}>Seek Returns.</span>
          <span className={styles.lineTwo}>
            <span className={styles.highlight}>Strategically.</span>
          </span>
        </h1>
        <p className={styles.p}>
          Combining essential knowledge and practical tools for smarter
          investment decisions.
        </p>
      </div>
      <Image
        src={seekReturnsStrategically}
        alt="Seek returns strategically"
        className={styles.image}
      />
    </section>
  );
}
