import clsx from "clsx";
import { LuSearch } from "react-icons/lu";

import styles from "./DesktopSearchbox.module.css";

type DesktopSearchboxProps = {
  className?: string;
};

export function DesktopSearchbox({ className }: DesktopSearchboxProps) {
  return (
    <search
      aria-label="Sitewide search"
      className={clsx(styles.searchbox, className)}
    >
      <form className={styles.form} action="/en/search">
        <label
          htmlFor="desktop-searchbox-input"
          className={styles.screenReaderLabel}
        >
          Search
        </label>
        <input
          id="desktop-searchbox-input"
          type="search"
          name="q"
          className={styles.input}
          placeholder="Search…"
          required
        />
        <button type="submit" className={styles.button}>
          <span className={styles.screenReaderText}>Search</span>
          <LuSearch aria-hidden={true} className={styles.icon} />
        </button>
      </form>
    </search>
  );
}
