"use client";

import { useRef } from "react";

import styles from "./MobileSearchbox.module.css";

type MobileSearchboxProps = { className?: string };

type IconProps = { ariaHidden?: boolean; className?: string };

function MagnifyingGlassIcon({ ariaHidden = true, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XMarkIcon({ ariaHidden = true, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
        <MagnifyingGlassIcon className={styles.openDialogMagnifyingGlassIcon} />
      </button>
      <dialog className={styles.dialog} ref={dialogRef}>
        <button className={styles.closeButton} onClick={handleCloseDialog}>
          <span className={styles.screenReaderText}>Close searchbox</span>
          <XMarkIcon className={styles.xMarkIcon} />
        </button>
        <form action="/search" className={styles.form}>
          <input
            type="search"
            name="q"
            className={styles.input}
            placeholder="Search…"
            required
            autoFocus
          />
          <button type="submit" className={styles.submitButton}>
            <MagnifyingGlassIcon className={styles.searchMagnifyingGlassIcon} />
          </button>
        </form>
      </dialog>
    </search>
  );
}
