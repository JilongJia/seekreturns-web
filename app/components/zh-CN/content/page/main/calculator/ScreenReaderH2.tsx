import styles from "./ScreenReaderH2.module.css";

type ScreenReaderH2Props = { children: React.ReactNode };

export function ScreenReaderH2({ children }: ScreenReaderH2Props) {
  return (
    <h2 id="calculator" className={styles.screenReaderH2}>
      {children}
    </h2>
  );
}
