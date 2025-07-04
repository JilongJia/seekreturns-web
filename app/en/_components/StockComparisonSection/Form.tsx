"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./Form.module.css";

type FormProps = { className?: string };

export function Form({ className }: FormProps) {
  const [stockOneSymbol, setStockOneSymbol] = useState("");
  const [stockTwoSymbol, setStockTwoSymbol] = useState("");
  const router = useRouter();

  const handleStockOneSymbolChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStockOneSymbol(e.target.value.toUpperCase());
  };

  const handleStockTwoSymbolChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStockTwoSymbol(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const processedStockOneSymbol = stockOneSymbol.trim().toLowerCase();
    const processedStockTwoSymbol = stockTwoSymbol.trim().toLowerCase();

    if (!processedStockOneSymbol || !processedStockTwoSymbol) return;

    const sortedSymbols = [
      processedStockOneSymbol,
      processedStockTwoSymbol,
    ].sort();

    const destinationUrl = `/en/stock-comparisons/${sortedSymbols[0]}-vs-${sortedSymbols[1]}`;
    router.push(destinationUrl);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(styles.form, className)}>
      <div className={styles.inputContainer}>
        <label htmlFor="stockOneSymbol" className={styles.screenReaderLabel}>
          First Stock Symbol
        </label>
        <input
          type="text"
          id="stockOneSymbol"
          name="stockOneSymbol"
          placeholder="AAPL"
          value={stockOneSymbol}
          onChange={handleStockOneSymbolChange}
          className={styles.input}
        />
        <span className={styles.vsText}>vs.</span>

        <label htmlFor="stockTwoSymbol" className={styles.screenReaderLabel}>
          Second Stock Symbol
        </label>
        <input
          type="text"
          id="stockTwoSymbol"
          name="stockTwoSymbol"
          placeholder="NVDA"
          value={stockTwoSymbol}
          onChange={handleStockTwoSymbolChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        Compare
      </button>
    </form>
  );
}
