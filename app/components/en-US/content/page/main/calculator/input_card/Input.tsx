import clsx from "clsx";

import styles from "./Input.module.css";

type NumberInputProps = {
  id: string;
  value: string;
  min: string;
  max: string;
  step: string;
  unit?: "dollar" | "percent" | "year" | "month" | "day";
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
      {unit === "dollar" && (
        <span className={clsx(styles.unitLabel, styles.left)}>$</span>
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
            [styles.inputYear]: unit === "year",
            [styles.inputMonth]: unit === "month",
            [styles.inputDay]: unit === "day",
            [styles.inputPercent]: unit === "percent",
            [styles.inputDollar]: unit === "dollar",
            [styles.inputDefault]: !unit,
          },
          className,
        )}
      />
      {unit === "year" && (
        <span className={clsx(styles.unitLabel, styles.right)}>Years</span>
      )}
      {unit === "month" && (
        <span className={clsx(styles.unitLabel, styles.right)}>Months</span>
      )}
      {unit === "day" && (
        <span className={clsx(styles.unitLabel, styles.right)}>Days</span>
      )}
      {unit === "percent" && (
        <span className={clsx(styles.unitLabel, styles.right)}>%</span>
      )}
    </div>
  );
}
