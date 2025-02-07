import clsx from "clsx";

import styles from "./DesktopSearchbox.module.css";

type MagnifyingGlassIconProps = {
  ariaHidden?: boolean;
  className?: string;
};

type DesktopSearchboxProps = {
  className?: string;
};

function MagnifyingGlassIcon({
  ariaHidden = true,
  className,
}: MagnifyingGlassIconProps) {
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

export function DesktopSearchbox({ className }: DesktopSearchboxProps) {
  return (
    <search
      aria-label="Sitewide search"
      className={clsx(styles.searchbox, className)}
    >
      <form className={styles.form} action="/search">
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
          <MagnifyingGlassIcon className={styles.icon} />
        </button>
      </form>
    </search>
  );
}
