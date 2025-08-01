"use client";

import { useState } from "react";

import { Section } from "../components/Section";
import { ScreenReaderH2 } from "../components/ScreenReaderH2";
import { Form } from "../components/Form";
import { InputCard } from "../components/InputCard";
import { OutputCard } from "../components/OutputCard";
import { ErrorMessageCard } from "../components/ErrorMessageCard";

import styles from "./PVIFCalculator.module.css";

type PVIFCalculatorProps = { className?: string };

export function PVIFCalculator({ className }: PVIFCalculatorProps) {
  const [interestRateInput, setInterestRateInput] = useState("6.4");
  const [numberOfPeriodsInput, setNumberOfPeriodsInput] = useState("10");

  const interestRatePercentValue = parseFloat(interestRateInput);
  const numberOfPeriodsValue = parseFloat(numberOfPeriodsInput);

  let interestRateError = "";
  if (interestRateInput.trim() === "") {
    interestRateError = "Please enter an interest rate.";
  } else if (Number.isNaN(interestRatePercentValue)) {
    interestRateError = "Please enter a valid numeric interest rate.";
  } else if (interestRatePercentValue < 0) {
    interestRateError = "Interest rate must not be less than 0.";
  }

  let numberOfPeriodsError = "";
  if (numberOfPeriodsInput.trim() === "") {
    numberOfPeriodsError = "Please enter the number of periods.";
  } else if (Number.isNaN(numberOfPeriodsValue)) {
    numberOfPeriodsError = "Please enter a valid numeric number of periods.";
  } else if (numberOfPeriodsValue < 0) {
    numberOfPeriodsError = "Number of periods must not be less than 0.";
  }

  const errorMessages = [interestRateError, numberOfPeriodsError].filter(
    Boolean,
  );

  let pvif = "";
  if (errorMessages.length === 0) {
    const interestRateDecimalValue = interestRatePercentValue / 100;
    pvif = (
      1 / Math.pow(1 + interestRateDecimalValue, numberOfPeriodsValue)
    ).toFixed(4);
  }

  return (
    <Section className={className}>
      <ScreenReaderH2>PVIF Calculator</ScreenReaderH2>
      <Form>
        <InputCard className={styles.inputCard}>
          <InputCard.Label htmlFor="interest-rate-number-input">
            Interest Rate:
          </InputCard.Label>
          <InputCard.NumberInput
            id="interest-rate-number-input"
            value={interestRateInput}
            min="0"
            max="50"
            step="0.01"
            unit="percent"
            className={styles.numberInput}
            onChange={(e) => setInterestRateInput(e.target.value)}
          />
          <InputCard.ScreenReaderLabel htmlFor="interest-rate-range-input">
            Interest Rate:
          </InputCard.ScreenReaderLabel>
          <InputCard.RangeInput
            id="interest-rate-range-input"
            value={interestRateInput}
            min="0"
            max="50"
            step="0.01"
            unit="percent"
            className={styles.rangeInput}
            onChange={(e) => setInterestRateInput(e.target.value)}
          />

          <InputCard.Label htmlFor="number-of-periods-number-input">
            Number of Periods:
          </InputCard.Label>
          <InputCard.NumberInput
            id="number-of-periods-number-input"
            value={numberOfPeriodsInput}
            min="1"
            max="50"
            step="1"
            unit="year"
            className={styles.numberInput}
            onChange={(e) => setNumberOfPeriodsInput(e.target.value)}
          />
          <InputCard.ScreenReaderLabel htmlFor="number-of-periods-range-input">
            Number of Periods:
          </InputCard.ScreenReaderLabel>
          <InputCard.RangeInput
            id="number-of-periods-range-input"
            value={numberOfPeriodsInput}
            min="1"
            max="50"
            step="1"
            unit="year"
            className={styles.rangeInput}
            onChange={(e) => setNumberOfPeriodsInput(e.target.value)}
          />
        </InputCard>

        {pvif && (
          <OutputCard>
            <OutputCard.Label htmlFor="pvif-output">
              Present Value Interest Factor:
            </OutputCard.Label>
            <OutputCard.Output
              id="pvif-output"
              htmlFor="interest-rate-number-input number-of-periods-number-input"
            >
              {pvif}
            </OutputCard.Output>
            <OutputCard.P>
              With an interest rate of {interestRatePercentValue}% over{" "}
              {numberOfPeriodsValue} years, the present value of $1 is ${pvif}.
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
