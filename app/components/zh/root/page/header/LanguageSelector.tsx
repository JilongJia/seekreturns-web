"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { LuLanguages, LuChevronUp, LuChevronDown } from "react-icons/lu";

import styles from "./LanguageSelector.module.css";

type LanguageSelectorProps = {
  className?: string;
};

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = () => setIsExpanded((prev) => !prev);

  const availableLanguages = [
    { label: "English", path: "/en", languageClassName: styles.english },
    { label: "中文", path: "/zh", languageClassName: styles.simplifiedChinese },
  ];

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
        <span>语言</span>
        {isExpanded ? (
          <LuChevronUp aria-hidden={true} className={styles.chevronIcon} />
        ) : (
          <LuChevronDown aria-hidden={true} className={styles.chevronIcon} />
        )}
      </button>

      <menu
        id="language-menu"
        aria-labelledby="language-selector-button"
        className={clsx(styles.menu, { [styles.expanded]: isExpanded })}
      >
        {availableLanguages.map(({ label, path, languageClassName }) => {
          const isCurrent = label === "中文";
          return (
            <li key={path} className={languageClassName}>
              {isCurrent ? (
                <span className={styles.menuItemText}>{label}</span>
              ) : (
                <Link href={path} className={styles.menuItemLink}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </menu>
    </nav>
  );
}
