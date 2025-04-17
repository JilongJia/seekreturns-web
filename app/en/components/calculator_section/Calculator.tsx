"use client";

import { useState } from "react";

import { ErrorMessageCard } from "@/app/components/en/content/page/main/calculator/ErrorMessageCard";
import { Form } from "@/app/components/en/content/page/main/calculator/Form";
import { InputCard } from "@/app/components/en/content/page/main/calculator/InputCard";
import { OutputCard } from "@/app/components/en/content/page/main/calculator/OutputCard";
import { Section } from "@/app/components/en/content/page/main/calculator/Section";
import { ScreenReaderH2 } from "@/app/components/en/content/page/main/calculator/ScreenReaderH2";
import styles from "./Calculator.module.css";

type CalculatorProps = { className?: string };

export function Calculator({ className }: CalculatorProps) {
  const [initialInvestmentInput, setInitialInvestmentInput] = useState("1000");
  const [finalValueInput, setFinalValueInput] = useState("1500");

  const initialInvestmentValue = parseFloat(initialInvestmentInput);
  const finalValueValue = parseFloat(finalValueInput);

  let initialInvestmentError = "";
  if (initialInvestmentInput.trim() === "") {
    initialInvestmentError = "Please enter the initial investment.";
  } else if (Number.isNaN(initialInvestmentValue)) {
    initialInvestmentError = "Please enter a valid numeric initial investment.";
  } else if (initialInvestmentValue <= 0) {
    initialInvestmentError = "Initial investment must be greater than 0.";
  }

  let finalValueError = "";
  if (finalValueInput.trim() === "") {
    finalValueError = "Please enter the final value.";
  } else if (Number.isNaN(finalValueValue)) {
    finalValueError = "Please enter a valid numeric final value.";
  } else if (finalValueValue < 0) {
    finalValueError = "Final value must not be less than 0.";
  }

  const errorMessages = [initialInvestmentError, finalValueError].filter(
    Boolean,
  );

  let roi = "";
  if (errorMessages.length === 0) {
    roi = (
      ((finalValueValue - initialInvestmentValue) / initialInvestmentValue) *
      100
    ).toFixed(2);
  }

  return (
    <Section className={className}>
      <ScreenReaderH2>Return on Investment (ROI) Calculator</ScreenReaderH2>
      <Form>
        <InputCard className={styles.inputCard}>
          <InputCard.Label htmlFor="initial-investment-number-input">
            Initial Investment:
          </InputCard.Label>
          <InputCard.NumberInput
            id="initial-investment-number-input"
            value={initialInvestmentInput}
            min="0"
            unit="usd"
            className={styles.numberInput}
            onChange={(e) => setInitialInvestmentInput(e.target.value)}
          />

          <InputCard.Label htmlFor="final-value-number-input">
            Final Value:
          </InputCard.Label>
          <InputCard.NumberInput
            id="final-value-number-input"
            value={finalValueInput}
            min="0"
            unit="usd"
            className={styles.numberInput}
            onChange={(e) => setFinalValueInput(e.target.value)}
          />
        </InputCard>

        {roi && (
          <OutputCard>
            <OutputCard.Label htmlFor="roi-output">
              Return on Investment (ROI):
            </OutputCard.Label>
            <OutputCard.Output
              id="roi-output"
              htmlFor="initial-investment-number-input final-value-number-input"
            >
              {roi}%
            </OutputCard.Output>
            <OutputCard.P>
              With an initial investment of ${initialInvestmentValue} and a
              final value of ${finalValueValue}, the ROI is {roi}%.
            </OutputCard.P>
          </OutputCard>
        )}

        {errorMessages.length > 0 && (
          <ErrorMessageCard>
            {errorMessages.map((message, index) => (
              <ErrorMessageCard.P key={index}>{message}</ErrorMessageCard.P>
            ))}
          </ErrorMessageCard>
        )}
      </Form>
    </Section>
  );
}
