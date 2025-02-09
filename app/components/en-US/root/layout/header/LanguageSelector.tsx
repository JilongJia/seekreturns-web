"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./LanguageSelector.module.css";

type LanguageIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type ArrowDropUpIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type ArrowDropDownIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type LanguageSelectorProps = {
  hreflangAlternates: { path: string }[];
  className?: string;
};

function LanguageIcon({ ariaHidden = true, className }: LanguageIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
      />
    </svg>
  );
}

function ChevronUpIcon({ ariaHidden = true, className }: ArrowDropUpIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}

function ChevronDownIcon({
  ariaHidden = true,
  className,
}: ArrowDropDownIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function LanguageSelector({
  hreflangAlternates,
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

  const availableLanguages = hreflangAlternates
    .map(({ path }) => {
      let label = "";
      let fontClassName = "";

      if (path.startsWith("/en-US")) {
        label = "English";
        fontClassName = "font-inter";
      } else if (path.startsWith("/zh-CN")) {
        label = "中文 - 简体";
        fontClassName = "font-noto-sans-sc";
      } else if (path.startsWith("/zh-TW")) {
        label = "中文 - 繁體";
        fontClassName = "";
      } else if (path.startsWith("/ja-JP")) {
        label = "日本語";
        fontClassName = "";
      }

      return { label, path, fontClassName };
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
        <LanguageIcon className={styles.languageIcon} />
        <span>Language</span>
        {isExpanded ? (
          <ChevronUpIcon className={styles.chevronIcon} />
        ) : (
          <ChevronDownIcon className={styles.chevronIcon} />
        )}
      </button>
      <menu
        id="language-menu"
        aria-labelledby="language-selector-button"
        className={clsx(styles.menu, { [styles.expanded]: isExpanded })}
      >
        {availableLanguages.map(({ label, path, fontClassName }) => {
          const isCurrentLanguage = label === "English";

          return (
            <li key={path} className={fontClassName}>
              {isCurrentLanguage ? (
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
