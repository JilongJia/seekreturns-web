import clsx from "clsx";
import Image from "next/image";

import styles from "./HeroSection.module.css";

import coin from "../images/coin.gif";

type HeroSectionProps = { className?: string };

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={clsx(styles.heroSection, className)}>
      <div>
        <h1 className={styles.h1}>
          Seek Returns.
          <br />
          Strategically.
        </h1>
        <p className={styles.p}>
          Combining essential knowledge and practical tools for smarter
          investment decisions.
        </p>
      </div>
      <Image src={coin} alt="Animated illustration" className={styles.image} />
    </section>
  );
}
