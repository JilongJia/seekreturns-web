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
  const [totalUnitsInput, setTotalUnitsInput] = useState("100");
  const [portionUnitsInput, setPortionUnitsInput] = useState("25");
  const [totalAmountInput, setTotalAmountInput] = useState("1000");

  const totalUnitsValue = parseFloat(totalUnitsInput);
  const portionUnitsValue = parseFloat(portionUnitsInput);
  const totalAmountValue = parseFloat(totalAmountInput);

  let totalUnitsError = "";
  if (totalUnitsInput.trim() === "") {
    totalUnitsError = "Please enter the total units.";
  } else if (Number.isNaN(totalUnitsValue)) {
    totalUnitsError = "Please enter a valid numeric value for total units.";
  } else if (totalUnitsValue < 0) {
    totalUnitsError = "Total units must not be less than 0.";
  }

  let portionUnitsError = "";
  if (portionUnitsInput.trim() === "") {
    portionUnitsError = "Please enter the portion units.";
  } else if (Number.isNaN(portionUnitsValue)) {
    portionUnitsError = "Please enter a valid numeric value for portion units.";
  } else if (portionUnitsValue < 0) {
    portionUnitsError = "Portion units must not be less than 0.";
  } else if (
    !Number.isNaN(totalUnitsValue) &&
    portionUnitsValue > totalUnitsValue
  ) {
    portionUnitsError = "Portion units must not be greater than total units.";
  }

  let totalAmountError = "";
  if (totalAmountInput.trim() === "") {
    totalAmountError = "Please enter the total amount.";
  } else if (Number.isNaN(totalAmountValue)) {
    totalAmountError = "Please enter a valid numeric value for total amount.";
  }

  const errorMessages = [
    totalUnitsError,
    portionUnitsError,
    totalAmountError,
  ].filter(Boolean);

  let proRataAmount = "";
  if (errorMessages.length === 0) {
    proRataAmount = (
      (portionUnitsValue / totalUnitsValue) *
      totalAmountValue
    ).toFixed(2);
  }

  return (
    <Section className={className}>
      <ScreenReaderH2>Pro Rata Calculator</ScreenReaderH2>
      <Form>
        <InputCard className={styles.inputCard}>
          <InputCard.Label htmlFor="total-units-number-input">
            Total Units:
          </InputCard.Label>
          <InputCard.NumberInput
            id="total-units-number-input"
            value={totalUnitsInput}
            min="0"
            className={styles.numberInput}
            onChange={(e) => setTotalUnitsInput(e.target.value)}
          />

          <InputCard.Label htmlFor="portion-units-number-input">
            Portion Units:
          </InputCard.Label>
          <InputCard.NumberInput
            id="portion-units-number-input"
            value={portionUnitsInput}
            min="0"
            className={styles.numberInput}
            onChange={(e) => setPortionUnitsInput(e.target.value)}
          />

          <InputCard.Label htmlFor="total-amount-number-input">
            Total Amount:
          </InputCard.Label>
          <InputCard.NumberInput
            id="total-amount-number-input"
            value={totalAmountInput}
            unit="usd"
            className={styles.numberInput}
            onChange={(e) => setTotalAmountInput(e.target.value)}
          />
        </InputCard>

        {proRataAmount && (
          <OutputCard>
            <OutputCard.Label htmlFor="pro-rata-output">
              Pro Rata Amount:
            </OutputCard.Label>
            <OutputCard.Output
              id="pro-rata-output"
              htmlFor="total-units-number-input portion-units-number-input total-amount-number-input"
            >
              {proRataAmount}
            </OutputCard.Output>
            <OutputCard.P>
              For a total of {totalUnitsValue} units, with {portionUnitsValue}{" "}
              portion units, the pro rata amount is ${proRataAmount} from a
              total amount of ${totalAmountValue}.
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
