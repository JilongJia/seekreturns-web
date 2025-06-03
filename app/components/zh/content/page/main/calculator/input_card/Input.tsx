import clsx from "clsx";

import styles from "./Input.module.css";

type NumberInputProps = {
  id: string;
  value: string;
  min?: string;
  max?: string;
  step?: string;
  unit?: "usd" | "cny" | "percent" | "year" | "month" | "day";
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function NumberInput({
  id,
  value,
  min,
  max,
  step,
  unit,
  className,
  onChange,
}: NumberInputProps) {
  return (
    <div className={styles.numberInput}>
      {unit === "usd" && (
        <span className={clsx(styles.unitLabel, styles.left)}>$</span>
      )}
      {unit === "cny" && (
        <span className={clsx(styles.unitLabel, styles.left)}>¥</span>
      )}
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={clsx(
          styles.input,
          {
            [styles.year]: unit === "year",
            [styles.month]: unit === "month",
            [styles.day]: unit === "day",
            [styles.percent]: unit === "percent",
            [styles.usd]: unit === "usd",
            [styles.cny]: unit === "cny",
            [styles.default]: !unit,
          },
          className,
        )}
      />
      {unit === "year" && (
        <span className={clsx(styles.unitLabel, styles.right)}>年</span>
      )}
      {unit === "month" && (
        <span className={clsx(styles.unitLabel, styles.right)}>月</span>
      )}
      {unit === "day" && (
        <span className={clsx(styles.unitLabel, styles.right)}>日</span>
      )}
      {unit === "percent" && (
        <span className={clsx(styles.unitLabel, styles.right)}>％</span>
      )}
    </div>
  );
}
