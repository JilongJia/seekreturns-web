"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Tabs.module.css";

import pagesRaw from "@/app/data/stock-comparisons/pages.json";

export function Tabs() {
  const pages = pagesRaw.map(({ symbolOne, symbolTwo, slug }) => ({
    title: `${symbolOne}与${symbolTwo}`,
    pathname: `/zh/stock-comparisons/${slug}`,
  }));

  const groups: Record<string, typeof pages> = pages.reduce(
    (acc, page) => {
      const letter = page.title.charAt(0);
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(page);
      return acc;
    },
    {} as Record<string, typeof pages>,
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
          {groups[activeLetter].map((page) => (
            <li key={page.pathname} className={styles.li}>
              <Link
                href={page.pathname}
                prefetch={false}
                className={styles.link}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
