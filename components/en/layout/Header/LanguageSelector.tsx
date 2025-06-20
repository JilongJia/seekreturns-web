"use client";

import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { LuLanguages, LuChevronUp, LuChevronDown } from "react-icons/lu";
import Link from "next/link";

import styles from "./LanguageSelector.module.css";

type LanguageSelectorProps = {
  hreflangPages: { pathname: string }[];
  className?: string;
};

export function LanguageSelector({
  hreflangPages,
  className,
}: LanguageSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node))
        setIsExpanded(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const availableLanguages = hreflangPages
    .map(({ pathname }) => {
      let label = "";
      let languageClassName = "";

      if (pathname.startsWith("/en")) {
        label = "English";
        languageClassName = styles.english;
      } else if (pathname.startsWith("/zh")) {
        label = "中文";
        languageClassName = styles.simplifiedChinese;
      } else if (pathname.startsWith("/ja")) {
        label = "日本語";
        languageClassName = "";
      }

      return { label, pathname, languageClassName };
    })
    .filter(({ label }) => label !== "");

  return (
    <nav ref={navRef} className={clsx(styles.languageSelector, className)}>
      <button
        id="language-selector-button"
        className={styles.button}
        onClick={handleClick}
        aria-expanded={isExpanded}
        aria-haspopup="menu"
        aria-controls="language-menu"
      >
        <LuLanguages aria-hidden={true} className={styles.languageIcon} />
        <span>Language</span>
        {isExpanded ? (
          <LuChevronUp aria-hidden={true} className={styles.chevronIcon} />
        ) : (
          <LuChevronDown aria-hidden={true} className={styles.chevronIcon} />
        )}
      </button>
      <ul
        id="language-menu"
        aria-labelledby="language-selector-button"
        className={clsx(styles.menu, { [styles.expanded]: isExpanded })}
      >
        {availableLanguages.map(({ label, pathname, languageClassName }) => {
          const isCurrentLanguage = label === "English";

          return (
            <li key={pathname} className={languageClassName}>
              {isCurrentLanguage ? (
                <span className={styles.menuItemText}>{label}</span>
              ) : (
                <Link href={pathname} className={styles.menuItemLink}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
