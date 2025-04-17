"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import styles from "./Form.module.css";

type FormProps = { className?: string };

export function Form({ className }: FormProps) {
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");
  const router = useRouter();

  const handleTickerOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTickerOne(e.target.value.toUpperCase());
  };

  const handleTickerTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTickerTwo(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTickerOne = tickerOne.trim();
    const trimmedTickerTwo = tickerTwo.trim();

    if (!trimmedTickerOne || !trimmedTickerTwo) return;

    const destinationUrl = `/zh/stock-comparisons/${trimmedTickerOne.toLowerCase()}-vs-${trimmedTickerTwo.toLowerCase()}`;
    router.push(destinationUrl);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(styles.form, className)}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="AAPL"
          value={tickerOne}
          onChange={handleTickerOneChange}
          className={styles.input}
        />
        <span className={styles.vsText}> 对比 </span>
        <input
          type="text"
          placeholder="NVDA"
          value={tickerTwo}
          onChange={handleTickerTwoChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        比较
      </button>
    </form>
  );
}
