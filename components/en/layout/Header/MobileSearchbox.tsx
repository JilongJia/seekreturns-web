"use client";

import { useRef } from "react";
import { LuSearch, LuX } from "react-icons/lu";

import styles from "./MobileSearchbox.module.css";

type MobileSearchboxProps = { className?: string };

export function MobileSearchbox({ className }: MobileSearchboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <search aria-label="Sitewide search" className={className}>
      <button className={styles.openDialogButton} onClick={handleOpenDialog}>
        <span className={styles.screenReaderText}>Open searchbox</span>
        <LuSearch
          aria-hidden={true}
          className={styles.openDialogMagnifyingGlassIcon}
        />
      </button>
      <dialog className={styles.dialog} ref={dialogRef}>
        <button className={styles.closeButton} onClick={handleCloseDialog}>
          <span className={styles.screenReaderText}>Close searchbox</span>
          <LuX aria-hidden={true} className={styles.xMarkIcon} />
        </button>
        <form action="/en/search" className={styles.form}>
          <label
            htmlFor="mobile-searchbox-input"
            className={styles.screenReaderLabel}
          >
            Search
          </label>
          <input
            id="mobile-searchbox-input"
            type="search"
            name="q"
            className={styles.input}
            placeholder="Search…"
            required
            autoFocus
          />
          <button type="submit" className={styles.submitButton}>
            <span className={styles.screenReaderText}>Search</span>
            <LuSearch
              aria-hidden={true}
              className={styles.searchMagnifyingGlassIcon}
            />
          </button>
        </form>
      </dialog>
    </search>
  );
}
