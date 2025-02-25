import clsx from "clsx";
import { LuSearch } from "react-icons/lu";

import styles from "./DesktopSearchbox.module.css";

type DesktopSearchboxProps = {
  className?: string;
};

export function DesktopSearchbox({ className }: DesktopSearchboxProps) {
  return (
    <search aria-label="全站搜索" className={clsx(styles.searchbox, className)}>
      <form className={styles.form} action="/search">
        <label
          htmlFor="desktop-searchbox-input"
          className={styles.screenReaderLabel}
        >
          搜索
        </label>
        <input
          id="desktop-searchbox-input"
          type="search"
          name="q"
          className={styles.input}
          placeholder="搜索……"
          required
        />
        <button type="submit" className={styles.button}>
          <span className={styles.screenReaderText}>搜索</span>
          <LuSearch aria-hidden={true} className={styles.icon} />
        </button>
      </form>
    </search>
  );
}
