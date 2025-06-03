"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import styles from "./Form.module.css";

type FormProps = { className?: string };

export function Form({ className }: FormProps) {
  const [symbolOne, setSymbolOne] = useState("");
  const [symbolTwo, setSymbolTwo] = useState("");
  const router = useRouter();

  const handleSymbolOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbolOne(e.target.value.toUpperCase());
  };

  const handleSymbolTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbolTwo(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processedSymbolOne = symbolOne.trim().toLowerCase();
    const processedSymbolTwo = symbolTwo.trim().toLowerCase();

    if (!processedSymbolOne || !processedSymbolTwo) return;

    const sortedSymbols = [processedSymbolOne, processedSymbolTwo].sort();

    const destinationUrl = `/zh/stock-comparisons/${sortedSymbols[0]}-vs-${sortedSymbols[1]}`;
    router.push(destinationUrl);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(styles.form, className)}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="AAPL"
          value={symbolOne}
          onChange={handleSymbolOneChange}
          className={styles.input}
        />
        <span className={styles.vsText}>对比</span>
        <input
          type="text"
          placeholder="NVDA"
          value={symbolTwo}
          onChange={handleSymbolTwoChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        比较
      </button>
    </form>
  );
}
