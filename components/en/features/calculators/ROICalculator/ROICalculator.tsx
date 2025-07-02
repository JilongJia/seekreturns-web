"use client";

import { useState } from "react";

import { Section } from "../components/Section";
import { ScreenReaderH2 } from "../components/ScreenReaderH2";
import { Form } from "../components/Form";
import { InputCard } from "../components/InputCard";
import { OutputCard } from "../components/OutputCard";
import { ErrorMessageCard } from "../components/ErrorMessageCard";

import styles from "./ROICalculator.module.css";

type ROICalculatorProps = { className?: string };

export function ROICalculator({ className }: ROICalculatorProps) {
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
