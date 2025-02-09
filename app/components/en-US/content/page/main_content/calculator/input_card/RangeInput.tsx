"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

import styles from "./RangeInput.module.css";

type RangeInputProps = {
  id: string;
  value: string;
  min: string;
  max: string;
  step: string;
  unit?: "dollar" | "percent" | "year" | "month" | "day";
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RangeInput({
  id,
  value,
  min,
  max,
  step,
  unit,
  className,
  onChange,
}: RangeInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const numericValue = parseFloat(value);
  const numericMin = parseFloat(min);
  const numericMax = parseFloat(max);

  const progress =
    !Number.isNaN(numericValue) &&
    !Number.isNaN(numericMin) &&
    !Number.isNaN(numericMax) &&
    numericMax > numericMin
      ? ((numericValue - numericMin) / (numericMax - numericMin)) * 100
      : 0;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.background = `linear-gradient(to right, #2563eb ${progress}%, #e5e5e5 ${progress}%)`;
    }
  }, [progress]);

  return (
    <div className={clsx(styles.rangeInput, className)}>
      <input
        ref={inputRef}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className={styles.input}
        onChange={onChange}
      />
      {unit === "dollar" && (
        <>
          <span className={clsx(styles.unitLabel, styles.left)}>${min}</span>
          <span className={clsx(styles.unitLabel, styles.right)}>${max}</span>
        </>
      )}
      {unit === "year" && (
        <>
          <span className={clsx(styles.unitLabel, styles.left)}>
            {min} years
          </span>
          <span className={clsx(styles.unitLabel, styles.right)}>
            {max} years
          </span>
        </>
      )}
      {unit === "month" && (
        <>
          <span className={clsx(styles.unitLabel, styles.left)}>
            {min} months
          </span>
          <span className={clsx(styles.unitLabel, styles.right)}>
            {max} months
          </span>
        </>
      )}
      {unit === "day" && (
        <>
          <span className={clsx(styles.unitLabel, styles.left)}>
            {min} days
          </span>
          <span className={clsx(styles.unitLabel, styles.right)}>
            {max} days
          </span>
        </>
      )}
      {unit === "percent" && (
        <>
          <span className={clsx(styles.unitLabel, styles.left)}>{min}%</span>
          <span className={clsx(styles.unitLabel, styles.right)}>{max}%</span>
        </>
      )}
    </div>
  );
}
