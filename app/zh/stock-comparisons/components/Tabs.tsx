"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Tabs.module.css";

import { stockComparisonList } from "@/data/stock-comparisons";

export function Tabs() {
  const comparisonPages = stockComparisonList.map(
    ({ symbolOne, symbolTwo, slug }) => ({
      title: `${symbolOne}与${symbolTwo}`,
      pathname: `/zh/stock-comparisons/${slug}`,
    }),
  );

  const groups: Record<string, typeof comparisonPages> = comparisonPages.reduce(
    (acc, comparisonPage) => {
      const letter = comparisonPage.title.charAt(0);
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(comparisonPage);
      return acc;
    },
    {} as Record<string, typeof comparisonPages>,
  );

  const sortedLetters = Object.keys(groups).sort((a, b) =>
    a.localeCompare(b, "zh"),
  );
  sortedLetters.forEach((letter) =>
    groups[letter].sort((a, b) => a.title.localeCompare(b.title, "zh")),
  );

  const [activeLetter, setActiveLetter] = useState(sortedLetters[0]);

  return (
    <>
      <nav
        className={styles.tabs}
        role="tablist"
        aria-label="个股对比索引选项卡"
      >
        {sortedLetters.map((letter) => {
          const key = letter.toLowerCase();

          return (
            <button
              key={key}
              role="tab"
              id={`tab-${key}`}
              aria-controls={`panel-${key}`}
              aria-selected={letter === activeLetter}
              className={clsx(
                styles.button,
                letter === activeLetter && styles.activeButton,
              )}
              onClick={() => setActiveLetter(letter)}
            >
              {letter}
            </button>
          );
        })}
      </nav>

      <section
        role="tabpanel"
        id={`panel-${activeLetter.toLowerCase()}`}
        aria-labelledby={`tab-${activeLetter.toLowerCase()}`}
      >
        <h2 className={styles.screenReaderH2}>{activeLetter}</h2>
        <ul className={styles.ul}>
          {groups[activeLetter].map((comparisonPage) => (
            <li key={comparisonPage.pathname} className={styles.li}>
              <Link
                href={comparisonPage.pathname}
                prefetch={false}
                className={styles.link}
              >
                {comparisonPage.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
